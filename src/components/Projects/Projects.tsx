import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    title: 'Apple Online Store',
    emoji: '🍎',
    description:
      'Engineering apple.com — one of the world\'s highest-traffic e-commerce platforms. Delivered new product launch experiences, internal SEO tooling, auth migrations, and shared Node.js platform modules adopted across Apple\'s AOS engineering teams.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Redis', 'Playwright', 'MCP'],
    link: { label: 'Visit apple.com', href: 'https://apple.com', external: true },
    github: null,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#00d4ff',
    highlight: 'Apple · Jun 2021–Present',
  },
  {
    title: 'Free Taxi — Booking.com',
    emoji: '✈️',
    description:
      'Led engineering for Booking.com\'s "Free Taxi" feature — offering complimentary airport transfers with hotel bookings. Shipped the full React frontend and Node.js API stack on AWS ECS. The feature drove a measurable 5–10% increase in daily hotel bookings.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Docker', 'AWS ECS'],
    link: { label: 'Visit Booking.com', href: 'https://booking.com', external: true },
    github: null,
    gradient: 'linear-gradient(135deg, #003580 0%, #0071c2 100%)',
    accentColor: '#00d4ff',
    highlight: 'Booking.com · 2018–2021',
  },
  {
    title: 'Microsoft Invoicing',
    emoji: '🪟',
    description:
      'Developed, released and scaled the Microsoft Invoicing app across web, iOS and Android as part of Office 365 for Business Premium — shipped to enterprise customers globally. Built with React, TypeScript and C# using the Cordova cross-platform framework.',
    tech: ['React', 'TypeScript', 'C#', 'Cordova', 'iOS', 'Android', 'Office 365'],
    link: { label: 'Microsoft 365', href: 'https://microsoft.com/en-gb/microsoft-365', external: true },
    github: null,
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    accentColor: '#9333ea',
    highlight: 'Microsoft · 2016–2018',
  },
]

function ProjectCard({ project, i }: { project: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: -y * 8, y: x * 8 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
    >
      <div
        ref={cardRef}
        className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
        style={{
          transform: hovered
            ? `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`
            : '',
          '--accent': project.accentColor,
        } as React.CSSProperties}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setRotate({ x: 0, y: 0 }) }}
      >
        <div className={styles.cardTop} style={{ background: project.gradient }}>
          <span className={styles.emoji}>{project.emoji}</span>
          <span className={styles.highlightBadge}>{project.highlight}</span>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.desc}>{project.description}</p>
          <div className={styles.techRow}>
            {project.tech.map(t => (
              <span key={t} className={styles.tech}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.cardFooter}>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtnPrimary}
              style={{ background: project.accentColor }}
            >
              <ExternalIcon /> {project.link.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I've worked on</p>
          <h2 className="section-title">Featured Work</h2>
          <div className="section-divider" />
        </motion.div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} i={i} />
          ))}
        </div>

        <motion.div
          className={styles.moreProjects}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>Want to see personal projects and code katas?</p>
          <a
            href="https://github.com/erineland"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <GitHubIcon /> View all repos on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
