import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Contact.module.css'

const LINKS = [
  {
    label: 'GitHub',
    handle: 'github.com/erineland',
    href: 'https://github.com/erineland',
    icon: <GitHubIcon />,
    color: '#e2e8f0',
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/erineland',
    href: 'https://www.linkedin.com/in/erineland/',
    icon: <LinkedInIcon />,
    color: '#0a66c2',
  },
  {
    label: 'Email',
    handle: 'erin@erineland.com',
    href: 'mailto:erin@erineland.com',
    icon: <EmailIcon />,
    color: '#ff2d78',
  },
]

function GitHubIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label" style={{ textAlign: 'center' }}>What's next?</p>
          <h2 className={styles.heading}>Get In Touch</h2>
          <p className={styles.sub}>
            I'm always open to interesting conversations, collaborations, or new opportunities.
            Whether you have a question or just want to say hi — my inbox is always open.
          </p>

          <motion.a
            href="mailto:erin@erineland.com"
            className={styles.emailBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(255,45,120,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Say Hello
          </motion.a>

          <div className={styles.links}>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={styles.linkCard}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: l.color }}
              >
                <span className={styles.linkIcon} style={{ color: l.color }}>{l.icon}</span>
                <div>
                  <p className={styles.linkLabel}>{l.label}</p>
                  <p className={styles.linkHandle}>{l.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className={styles.footer}>
        <p>Designed & built by <strong>Erin Eland</strong> · React + TypeScript + Three.js</p>
        <p className={styles.footerSub}>© {new Date().getFullYear()} erineland.com</p>
      </footer>
    </section>
  )
}
