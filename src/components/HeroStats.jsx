import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './HeroStats.css'

const HeroStats = ({ stats = [], style }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  if (!stats.length) {
    return null
  }

  return (
    <div className="hero-stats-container" style={style}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="hero-stat-card"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.48,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default HeroStats
