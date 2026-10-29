import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './AgentDemo.module.css'

type Kind = 'user' | 'tool' | 'ask' | 'deny' | 'prompt' | 'done'

// One loop of the demo: the agent tries two risky things, the PreToolUse guard
// turns one into a question and blocks the other, then the agent carries on.
const SCRIPT: { kind: Kind; text: string; step: number }[] = [
  { kind: 'user', text: 'pay the gas bill and file the receipt', step: 0 },
  { kind: 'tool', text: 'budget.create_transaction(£62.40, "Gas")', step: 0 },
  { kind: 'ask', text: 'guard: money write → ask the human', step: 1 },
  { kind: 'prompt', text: 'Pay £62.40 to Gas from Current? [y/N]', step: 1 },
  { kind: 'tool', text: 'Bash(cat ~/.config/secrets.env)', step: 0 },
  { kind: 'deny', text: 'guard: secret access → denied', step: 2 },
  { kind: 'done', text: 'Receipt filed. Payment waiting for your yes.', step: 2 },
]

const STEPS = ['Agent acts', 'Hook checks', 'Risky paths fail closed']

const PREFIX: Record<Kind, string> = {
  user: '>',
  tool: '●',
  ask: '?',
  deny: '✗',
  prompt: '└',
  done: '✓',
}

const TYPE_MS = 32
const LINE_MS = 950
const HOLD_MS = 3200

export default function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40px' })
  const reduceMotion = useReducedMotion()

  const [shown, setShown] = useState(0)
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (reduceMotion || !inView) return
    let timeout: ReturnType<typeof setTimeout>

    if (shown === 0) {
      // Type the user's prompt character by character before anything else runs
      const prompt = SCRIPT[0].text
      if (typed < prompt.length) {
        timeout = setTimeout(() => setTyped(typed + 1), TYPE_MS)
      } else {
        timeout = setTimeout(() => setShown(1), 450)
      }
    } else if (shown < SCRIPT.length) {
      timeout = setTimeout(() => setShown(shown + 1), LINE_MS)
    } else {
      timeout = setTimeout(() => { setShown(0); setTyped(0) }, HOLD_MS)
    }
    return () => clearTimeout(timeout)
  }, [shown, typed, inView, reduceMotion])

  const visible = reduceMotion ? SCRIPT.length : shown
  const activeStep = reduceMotion
    ? -1
    : visible === 0 ? 0 : SCRIPT[Math.min(visible, SCRIPT.length) - 1].step

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.window} role="img" aria-label="Demo: a Claude Code agent tries to make a payment and read a secrets file. A guard hook asks the human before the payment and blocks the secrets read.">
        <div className={styles.titleBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
          <span className={styles.title}>claude · claude-code-guardrails</span>
        </div>

        <div className={styles.body} aria-hidden="true">
          <div className={`${styles.line} ${styles.user}`}>
            <span className={styles.prefix}>{PREFIX.user}</span>
            <span>
              {/* The full text is always in the DOM and revealed by width, so
                  reading-aid extensions that rewrite text nodes can't garble it */}
              <span
                className={styles.typed}
                style={reduceMotion ? undefined : { width: `${typed}ch` }}
              >
                {SCRIPT[0].text}
              </span>
              {!reduceMotion && visible === 0 && <span className={styles.caret} />}
            </span>
          </div>

          {SCRIPT.slice(1, visible).map((line, i) => (
            <motion.div
              key={`${i}-${line.text}`}
              className={`${styles.line} ${styles[line.kind]}`}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.prefix}>{PREFIX[line.kind]}</span>
              <span>{line.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s} className={i === activeStep ? styles.stepActive : styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}
