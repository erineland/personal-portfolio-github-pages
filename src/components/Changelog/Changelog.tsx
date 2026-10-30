import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Changelog.module.css'

// Newest first. Add a line here whenever something ships.
const ENTRIES = [
  {
    date: 'Oct 2026',
    tag: 'Open source',
    title: 'eventkit-reminders-mcp',
    text: 'Apple Reminders for Claude in native Swift. Reads ~4,400 reminders in under a second. Read-only by default, dry-run batches, every write logged.',
    href: 'https://github.com/erineland/eventkit-reminders-mcp',
  },
  {
    date: 'Oct 2026',
    tag: 'Open source',
    title: 'claude-code-guardrails',
    text: 'PreToolUse hooks that turn "always ask first" from an instruction into a mechanic. Deleting mail is denied outright.',
    href: 'https://github.com/erineland/claude-code-guardrails',
  },
  {
    date: 'Oct 2026',
    tag: 'Open source',
    title: 'Three read-only MCP servers',
    text: 'WhatsApp, iMessage and iCloud Drive for Claude. No send tools, network blocked, one-time codes redacted.',
    href: 'https://github.com/erineland?tab=repositories',
  },
  {
    date: 'Oct 2026',
    tag: 'Site',
    title: 'erineland.com, rebuilt',
    text: 'This site, refocused on agent tooling, with a live demo of the guard hooks in the hero.',
    href: 'https://github.com/erineland/personal-portfolio-github-pages',
  },
  {
    date: 'Jun 2026',
    tag: 'Role',
    title: 'Joined Feeld',
    text: 'Senior Web Engineer, building the Feeld website in React and TypeScript.',
    href: '#experience',
  },
]

export default function Changelog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="changelog" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Changelog</p>
          <h2 className="section-title">Recently shipped</h2>
          <div className="section-divider" />
        </motion.div>

        <ol className={styles.grid}>
          {ENTRIES.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <a
                className={styles.card}
                href={e.href}
                target={e.href.startsWith('#') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <div className={styles.meta}>
                  <time className={styles.date}>{e.date}</time>
                  <span className={styles.tag}>{e.tag}</span>
                </div>
                <h3 className={styles.title}>{e.title}</h3>
                <p className={styles.text}>{e.text}</p>
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
