import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Experience.module.css'

const JOBS = [
  {
    company: 'Apple',
    logo: '🍎',
    role: 'Senior Software Engineer (ICT4)',
    subRole: 'Promoted from ICT3 · Jun 2021 – Present',
    period: 'Jun 2021 – Present',
    location: 'London, UK · Hybrid',
    color: '#ff2d78',
    bullets: [
      'Developed and maintained two key internal tooling platforms for the Apple Online Store (apple.com): an analytics tag management tool and a business-facing SEO management tool used across apple.com product pages',
      'Built React/TypeScript features that drove millions of dollars in revenue by improving search visibility and enabling the content team to manage SEO at scale',
      'Architected and delivered the OAuth2/OIDC authentication migration for internal retail engineering systems, replacing legacy auth flows and improving security posture',
      "Built Java Spring Boot microservices, implementing security configurations, certificate management, and integration with Apple's internal identity management system (IDMS)",
      'Created and maintained shared Node.js modules adopted by multiple teams, establishing semantic versioning and CI pipeline standards that reduced integration issues',
      'Led the migration from Vault to Whisper for credential management, ensuring zero downtime across production environments',
      'Managed containerised deployments using Docker on AWS EKS, including Splunk logging integration, security hardening, and Cassandra operations on production Kubernetes clusters',
      'Developed an MCP (Model Context Protocol) Server enabling AI-assisted development workflows and improving developer productivity across the team',
      'Drove Playwright test automation adoption across the team, significantly improving release confidence and reducing manual QA cycles',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Java Spring Boot', 'Docker', 'AWS EKS', 'Playwright', 'OAuth2/OIDC', 'Cassandra', 'MCP'],
  },
  {
    company: 'Booking.com',
    logo: '✈️',
    role: 'Senior Developer',
    period: 'Feb 2020 – Jun 2021',
    location: 'Manchester, UK',
    color: '#0071c2',
    bullets: [
      'Led engineering for the "Free Taxi" project — designing and shipping the airport transfer booking flow that drove a measurable 5–10% increase in accommodation bookings across global markets',
      'Mentored junior developers on React component architecture and coordinated cross-team delivery across frontend and API teams',
      'Served as technical point of contact for dependent teams consuming our Node.js APIs — defining contracts, supporting integration, and troubleshooting production issues',
      'Collaborated with product and data teams to prioritise features based on A/B testing outcomes and booking conversion metrics',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'AWS', 'REST APIs', 'A/B Testing', 'Microservices'],
  },
  {
    company: 'Booking.com',
    logo: '🌍',
    role: 'Frontend Software Engineer',
    period: 'Mar 2018 – Aug 2019',
    location: 'Amsterdam, Netherlands',
    color: '#0071c2',
    bullets: [
      'Developed and scaled API endpoints and frontend UI on Docker ECS / AWS, handling high-traffic booking flows across 200+ countries',
      'Built and released customer-facing features in React and Node.js following rigorous A/B testing methodologies to validate conversion impact before full rollout',
      'Contributed to the migration of legacy frontend components to modern React patterns, improving code maintainability and reducing developer onboarding time',
    ],
    tech: ['React', 'Node.js', 'JavaScript', 'Docker', 'AWS ECS', 'A/B Testing'],
  },
  {
    company: 'Microsoft',
    logo: '🪟',
    role: 'Software Engineer',
    period: 'Aug 2016 – Mar 2018',
    location: 'Copenhagen, Denmark · On-site',
    color: '#9333ea',
    bullets: [
      'Developed, released, and scaled Microsoft Invoicing for web, iOS, and Android as part of Office 365 Business Premium — reaching hundreds of thousands of SMB users worldwide',
      'Built cross-platform features using React, TypeScript, C#, and Cordova, shipping to production on a regular release cadence with automated test coverage',
      'Worked within an agile team collaborating with PMs and designers across the Microsoft Office ecosystem',
    ],
    tech: ['React', 'TypeScript', 'C#', 'Cordova', 'Azure', 'iOS', 'Android'],
  },
  {
    company: 'Dream Agility',
    logo: '💡',
    role: 'Software Developer (Part-Time)',
    period: 'Sep 2015 – Apr 2016',
    location: 'Manchester, UK',
    color: '#10b981',
    bullets: [
      'Built the platform\'s central API call monitoring dashboard using D3.js, providing clients with real-time visibility into call results and system health',
      'Contributed to the company\'s SaaS platform managing Google Ad APIs using Node.js, Angular, and Loopback.io on Azure',
    ],
    tech: ['Node.js', 'Angular', 'D3.js', 'Loopback.io', 'Azure'],
  },
  {
    company: 'ARM',
    logo: '⚙️',
    role: 'Software Engineer Intern',
    period: 'Jun 2015 – Sep 2015',
    location: 'Cambridge, UK',
    color: '#f59e0b',
    bullets: [
      'Rewrote a legacy ETL engine from SAP/Oracle database integration to the .NET framework in C#, modernising data pipeline processing for internal analytics teams',
    ],
    tech: ['C#', '.NET', 'SAP', 'Oracle', 'MySQL'],
  },
]

function JobCard({ job, i }: { job: typeof JOBS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={styles.jobRow}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08 }}
    >
      <div className={styles.timelineCol}>
        <div className={styles.dot} style={{ background: job.color, boxShadow: `0 0 12px ${job.color}88` }} />
        {i < JOBS.length - 1 && <div className={styles.line} />}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardLeft}>
            <span className={styles.companyLogo}>{job.logo}</span>
            <div>
              <h3 className={styles.role}>{job.role}</h3>
              <p className={styles.company} style={{ color: job.color }}>{job.company}</p>
              {'subRole' in job && job.subRole && (
                <p className={styles.subRole}>{job.subRole}</p>
              )}
            </div>
          </div>
          <div className={styles.cardMeta}>
            <span className={styles.period}>{job.period}</span>
            <span className={styles.location}>{job.location}</span>
          </div>
        </div>

        <ul className={styles.bullets}>
          {job.bullets.map((b, bi) => (
            <li key={bi}><span className={styles.bulletDot} />{b}</li>
          ))}
        </ul>

        <div className={styles.techRow}>
          {job.tech.map(t => (
            <span key={t} className={styles.tech}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Where I've worked</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
        </motion.div>

        <div className={styles.timeline}>
          {JOBS.map((job, i) => (
            <JobCard key={`${job.company}-${i}`} job={job} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
