import React from 'react'
import { motion } from 'framer-motion'

const TechDecoration = () => {
  return (
    <>
      {/* 左上角科技装饰 */}
      <motion.div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(14, 165, 233, 0.3)',
          borderRadius: '50%',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            height: '60%',
            border: '2px solid rgba(99, 102, 241, 0.5)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>

      {/* 右下角科技装饰 */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '50%'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: 'easeOut'
            }}
          />
        ))}
      </motion.div>

      {/* 顶部装饰线条 */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #0ea5e9, #6366f1, #10b981, transparent)',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* 底部装饰线条 */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #6366f1, #0ea5e9, #10b981, transparent)',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      />

      {/* 浮动数据点 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#0ea5e9',
            boxShadow: '0 0 10px #0ea5e9',
            left: `${20 + i * 15}%`,
            top: '50%',
            zIndex: 1,
            pointerEvents: 'none'
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}
    </>
  )
}

export default TechDecoration

