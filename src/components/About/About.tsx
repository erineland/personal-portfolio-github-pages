import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './About.module.css'

const FACTS = [
  { icon: '🎓', text: 'BSc Computer Science, 1st Class — University of Manchester' },
  { icon: '🍎', text: 'Senior Software Engineer (ICT4) at Apple · AOS Retail Engineering' },
  { icon: '📍', text: 'Based in London, UK' },
  { icon: '☁️', text: 'Full-stack across React, Node.js, Java Spring Boot & AWS' },
  { icon: '🤖', text: 'Built an MCP Server for AI-assisted development workflows' },
  { icon: '🚀', text: 'Shipped features generating millions in revenue on apple.com' },
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
              I'm a <strong>Senior Software Engineer</strong> with 10+ years of experience building scalable
              web applications used by millions — at <strong>Apple</strong>, <strong>Microsoft</strong> and
              <strong> Booking.com</strong>. Driven by curiosity and a belief that great engineering should
              make complex things feel effortless.
            </p>
            <p>
              I specialise across the full stack in <strong>JavaScript/TypeScript</strong> and the
              <strong> Java</strong> ecosystem — from React frontends and Node.js/Express APIs to
              Java Spring Boot microservices and cloud infrastructure on AWS. I care deeply about
              security, developer experience, and shipping things that directly move the needle.
            </p>
            <p>
              Outside of work I explore the cutting edge of AI tooling — I've built MCP servers that
              connect Claude to real engineering workflows, and I'm genuinely excited about where that
              intersection of AI and software development goes next.
            </p>

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
