import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './AgentDemo.module.css'

type Kind = 'user' | 'tool' | 'ask' | 'deny' | 'prompt' | 'done'

// One loop of the demo, matching what claude-code-guardrails actually does:
// the YNAB guard turns a money write into a plain-English prompt, and the mail
// guard denies deleting email outright because it can't be undone.
const SCRIPT: { kind: Kind; text: string; step: number }[] = [
  { kind: 'user', text: 'pay the gas bill, clear old receipts', step: 0 },
  { kind: 'tool', text: 'ynab.create_transaction(£62.40, "Gas")', step: 0 },
  { kind: 'ask', text: 'guard: money write → ask the human', step: 1 },
  { kind: 'prompt', text: 'Pay £62.40 to Gas from Current? 1. Yes  2. No', step: 1 },
  { kind: 'tool', text: 'apple-mail.delete_message(id: 4821)', step: 0 },
  { kind: 'deny', text: 'guard: delete is irreversible → denied', step: 2 },
  { kind: 'done', text: 'Payment waiting for your yes. Deleting mail stays with you.', step: 2 },
]

const STEPS = ['Agent acts', 'Hook checks', 'Risky paths fail closed']

const CODE_URL = 'https://github.com/erineland/claude-code-guardrails/blob/main/hooks/mail-write-guard.py'

// Lines lifted verbatim from hooks/mail-write-guard.py; "…" marks where text was cut
const CODE = `GUARDED = {
    "mcp__apple-mail__delete_message": (
        "deny",
        "Deleting email is irreversible and is blocked …",
    ),
    …
    "mcp__apple-mail__send_email": (
        "ask",
        "Sending email on the user's behalf — confirm …",
    ),
}

def main():
    try:
        payload = json.load(sys.stdin)
        tool = payload.get("tool_name", "")
        …
    except Exception:
        # Fail closed: if we cannot parse the call, do not silently allow it.
        decide("ask", "mail-write-guard could not parse the tool call.")
        return

    short = tool.split("__")[-1]
    if short in READ_ONLY:
        return  # no output = no opinion = normal handling
    if short not in GUARDED_SHORT:
        decide("ask", f"MAIL GUARD: '{tool}' isn't a known read-only …")
        return`

// Minimal Python colouring: strings and comments only
function highlight(line: string) {
  return line.split(/("(?:[^"\\]|\\.)*"|#.*$)/).map((part, i) => {
    if (part.startsWith('#')) return <span key={i} className={styles.codeComment}>{part}</span>
    if (part.startsWith('"')) return <span key={i} className={styles.codeString}>{part}</span>
    return part
  })
}

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
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    if (reduceMotion || !inView || showCode) return
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
  }, [shown, typed, inView, reduceMotion, showCode])

  const visible = reduceMotion ? SCRIPT.length : shown
  const activeStep = reduceMotion
    ? -1
    : visible === 0 ? 0 : SCRIPT[Math.min(visible, SCRIPT.length) - 1].step

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
          <span className={styles.title}>
            {showCode ? 'hooks/mail-write-guard.py' : 'claude · claude-code-guardrails'}
          </span>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowCode(c => !c)}
            aria-pressed={showCode}
          >
            {showCode ? 'Demo' : 'Code'}
          </button>
        </div>

        {showCode ? (
          <div className={styles.codeWrap}>
            <pre className={styles.code}>
              {CODE.split('\n').map((line, i) => (
                <div key={i}>{highlight(line) }{line === '' ? ' ' : null}</div>
              ))}
            </pre>
            <a className={styles.codeLink} href={CODE_URL} target="_blank" rel="noopener noreferrer">
              Full file on GitHub →
            </a>
          </div>
        ) : (
        <div
          className={styles.body}
          role="img"
          aria-label="Demo: a Claude Code agent tries to make a payment and delete an email. A guard hook asks the human before the payment and blocks the delete."
        >
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
        )}
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
