import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Skills.module.css'

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    icon: '⚛️',
    color: '#00d4ff',
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Angular', 'HTML/CSS', 'SASS', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Platform',
    icon: '⚙️',
    color: '#ff2d78',
    skills: ['Node.js', 'Express', 'Java Spring Boot', 'REST APIs', 'GraphQL', 'OAuth2/OIDC', 'MCP (Claude)', 'Vault / Whisper'],
  },
  {
    label: 'Infrastructure & Cloud',
    icon: '☁️',
    color: '#9333ea',
    skills: ['AWS (EKS, ECS, S3)', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Splunk', 'DynamoDB', 'Cassandra', 'CloudFront'],
  },
  {
    label: 'Testing & Quality',
    icon: '🧪',
    color: '#10b981',
    skills: ['Playwright', 'Jest', 'Mocha', 'A/B Testing', 'Test Automation', 'TDD'],
  },
  {
    label: 'Data',
    icon: '🗄️',
    color: '#f59e0b',
    skills: ['Cassandra', 'MongoDB', 'PostgreSQL', 'Oracle', 'MySQL', 'SQL'],
  },
  {
    label: 'Languages & Tools',
    icon: '🛠️',
    color: '#e2e8f0',
    skills: ['TypeScript', 'JavaScript', 'Java', 'C#', 'Python', 'Bash', 'Git', 'Jira'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills</h2>
          <div className="section-divider" />
        </motion.div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              className={styles.group}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>{group.icon}</span>
                <h3 className={styles.groupLabel} style={{ color: group.color }}>{group.label}</h3>
              </div>
              <div className={styles.pills}>
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className={styles.pill}
                    style={{ '--pill-color': group.color } as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.04 + 0.2 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
