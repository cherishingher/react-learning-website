import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="切换主题"
    >
      <motion.div
        className="theme-toggle-inner"
        animate={{
          rotate: isDark ? 180 : 0
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {isDark ? (
          <motion.span
            className="theme-icon moon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            className="theme-icon sun"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            ☀️
          </motion.span>
        )}
      </motion.div>
      
      {/* 光晕效果 */}
      <motion.div
        className="theme-toggle-glow"
        animate={{
          opacity: isDark ? [0.3, 0.6, 0.3] : [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.button>
  )
}

export default ThemeToggle

