import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './About.module.css'

const FACTS = [
  { icon: '🔒', text: 'Least privilege first: read-only by default, writes go through a guard a human approves' },
  { icon: '📨', text: 'Untrusted text is data, never instructions: messages and emails can\'t steer the agent' },
  { icon: '🚪', text: 'Fail closed: if a guard can\'t understand a request, it asks rather than allows' },
  { icon: '🔍', text: 'Small, boring, auditable: plain Python and the standard library where possible' },
  { icon: '🎓', text: 'BSc Computer Science, 1st Class, University of Manchester' },
  { icon: '📍', text: 'Based in London, UK' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get to know me</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p>
              I'm a software engineer in London with ten years of shipping web products at scale:
              <strong> Microsoft</strong>, <strong>Booking.com</strong>, <strong>Apple</strong>, and
              now <strong>Feeld</strong>. Mostly <strong>TypeScript</strong>, React and Node.js, with
              Java, AWS and CI along the way.
            </p>
            <p>
              These days most of my building happens around the code: I design AI agent systems that
              do real work, safely. I run a personal <strong>Claude Code</strong> setup every day with
              dozens of skills, my own <strong>MCP servers</strong>, hooks and scheduled jobs. It handles
              mail, calendar, budgeting checks, smart home and admin, and it's built so that it
              can't do the dangerous things by accident.
            </p>
            <p>How I like to build:</p>

            <div className={styles.facts}>
              {FACTS.map((f, i) => (
                <motion.div
                  key={i}
                  className={styles.fact}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                >
                  <span className={styles.factIcon}>{f.icon}</span>
                  <span className={styles.factText}>{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.photoWrap}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.photoFrame}>
              <div className={styles.photoGlow} />
              <img
                src="/erin-headshot.jpg"
                alt="Erin Eland"
                className={styles.photo}
              />
              <div className={styles.photoBorder} />
            </div>
            <div className={styles.photoDecor1} />
            <div className={styles.photoDecor2} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
