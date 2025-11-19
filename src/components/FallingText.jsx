import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import Matter from 'matter-js'
import './FallingText.css'

const DEFAULT_CONFIG = {
  gravity: 0.56,
  fontSize: '2rem',
  backgroundColor: 'transparent',
  trigger: 'hover',
  highlightClass: 'highlighted',
  wireframes: false,
  mouseConstraintStiffness: 0.9
}

const toPixels = (fontSize) => {
  if (typeof fontSize === 'number') {
    return fontSize
  }

  if (typeof fontSize !== 'string') {
    return 32
  }

  const trimmed = fontSize.trim().toLowerCase()

  if (trimmed.endsWith('px')) {
    return parseFloat(trimmed.replace('px', '')) || 32
  }

  if (trimmed.endsWith('rem') || trimmed.endsWith('em')) {
    const base = 16
    return (parseFloat(trimmed.replace('rem', '').replace('em', '')) || 2) * base
  }

  return parseFloat(trimmed) || 32
}

const normalizeWord = (word = '') => word.replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase()

const splitWords = (text = '') =>
  (text.match(/\S+/g) || []).map((token, index) => ({
    raw: token,
    normalized: normalizeWord(token),
    id: `${token}-${index}`
  }))

const FallingText = ({
  text,
  highlightWords = [],
  highlightClass = DEFAULT_CONFIG.highlightClass,
  trigger = DEFAULT_CONFIG.trigger,
  backgroundColor = DEFAULT_CONFIG.backgroundColor,
  wireframes = DEFAULT_CONFIG.wireframes,
  gravity = DEFAULT_CONFIG.gravity,
  fontSize = DEFAULT_CONFIG.fontSize,
  mouseConstraintStiffness = DEFAULT_CONFIG.mouseConstraintStiffness,
  className = '',
  style
}) => {
  const containerRef = useRef(null)
  const spansRef = useRef([])
  const engineRef = useRef(null)
  const runnerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mouseConstraintRef = useRef(null)
  const isRunningRef = useRef(false)

  const words = useMemo(() => splitWords(text), [text])
  const normalizedHighlights = useMemo(
    () => highlightWords.map(normalizeWord),
    [highlightWords]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || !words.length) return

    const engine = Matter.Engine.create()
    engine.gravity.y = gravity
    engineRef.current = engine

    const fontSizePx = toPixels(fontSize)
    const padding = 32

    const width = container.clientWidth || container.offsetWidth || 600
    const height = container.clientHeight || container.offsetHeight || 320

    const bodies = words.map((word, index) => {
      const bodyWidth = Math.max(fontSizePx * 0.55 * word.raw.length + 24, fontSizePx * 1)
      const bodyHeight = fontSizePx * 1.25

      const x = padding + Math.random() * Math.max(width - bodyWidth - padding * 2, 40)
      const y = Math.random() * -height - index * 12

      const body = Matter.Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.015,
        angle: (Math.random() - 0.5) * 0.5,
        render: {
          fillStyle: 'rgba(255, 255, 255, 0)'
        }
      })

      body.render.custom = {
        width: bodyWidth,
        height: bodyHeight
      }

      body.label = `word-${word.id}`
      return body
    })

    const floor = Matter.Bodies.rectangle(width / 2, height + 40, Math.max(width, 400), 80, {
      isStatic: true
    })
    const leftWall = Matter.Bodies.rectangle(-40, height / 2, 80, Math.max(height, 400), {
      isStatic: true
    })
    const rightWall = Matter.Bodies.rectangle(width + 40, height / 2, 80, Math.max(height, 400), {
      isStatic: true
    })
    const ceiling = Matter.Bodies.rectangle(width / 2, -height - 40, Math.max(width, 400), 80, {
      isStatic: true
    })

    Matter.World.add(engine.world, [...bodies, floor, leftWall, rightWall, ceiling])

    const mouse = Matter.Mouse.create(container)
    mouse.pixelRatio = window.devicePixelRatio || 1
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    })
    mouseConstraintRef.current = mouseConstraint
    Matter.World.add(engine.world, mouseConstraint)

    const updateSpans = () => {
      bodies.forEach((body, index) => {
        const span = spansRef.current[index]
        if (!span) return
        const { position, angle } = body
        span.style.transform = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${angle}rad)`
      })
      animationFrameRef.current = requestAnimationFrame(updateSpans)
    }

    const start = () => {
      if (isRunningRef.current) return
      isRunningRef.current = true
      const runner = Matter.Runner.create()
      runnerRef.current = runner
      Matter.Runner.run(runner, engine)
      animationFrameRef.current = requestAnimationFrame(updateSpans)
    }

    const stop = () => {
      if (!isRunningRef.current) return
      isRunningRef.current = false
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current)
        runnerRef.current = null
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }

    if (trigger === 'load') {
      start()
    } else if (trigger === 'hover') {
      const handlePointerEnter = () => start()
      container.addEventListener('pointerenter', handlePointerEnter, { once: true })
    } else if (trigger === 'click') {
      const handleClick = () => start()
      container.addEventListener('click', handleClick, { once: true })
    } else {
      start()
    }

    return () => {
      stop()
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
      if (mouseConstraintRef.current) {
        Matter.World.remove(engine.world, mouseConstraintRef.current)
      }
    }
  }, [words, gravity, fontSize, trigger, mouseConstraintStiffness])

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      style={{
        backgroundColor,
        fontSize,
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        ...(style || {})
      }}
    >
      {words.map((word, index) => {
        const isHighlighted = normalizedHighlights.includes(word.normalized)

        return (
          <span
            key={word.id}
            ref={(el) => {
              spansRef.current[index] = el
            }}
            className={`falling-text-word ${isHighlighted ? highlightClass : ''}`}
            style={{
              position: 'absolute',
              top: '-200px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.2em 0.4em',
              borderRadius: '999px',
              pointerEvents: 'auto',
              fontWeight: isHighlighted ? 700 : 500
            }}
          >
            {word.raw}
          </span>
        )
      })}
      <div className={`falling-text-hint ${wireframes ? 'wireframes' : ''}`}>
        {trigger === 'hover' && 'Hover to unleash gravity'}
        {trigger === 'click' && 'Click to unleash gravity'}
      </div>
    </div>
  )
}

FallingText.propTypes = {
  text: PropTypes.string.isRequired,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  highlightClass: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'load', 'click']),
  backgroundColor: PropTypes.string,
  wireframes: PropTypes.bool,
  gravity: PropTypes.number,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mouseConstraintStiffness: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

export default FallingText
