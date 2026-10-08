import { useRef } from 'react'
import { prefersReducedMotion } from '../hooks/reducedMotion'

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Pointer-driven 3D tilt with a moving specular glare. Children can sit on
// different depths with `transform: translateZ()` (see .tilt-layer in CSS).
// Wrap — don't replace — elements that GSAP animates, so transforms don't clash.
export default function Tilt({
  as: Tag = 'div',
  max = 9,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef()
  const enabled = useRef(!prefersReducedMotion() && canHover())

  const onMove = (e) => {
    if (!enabled.current) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }
  const onEnter = () => enabled.current && ref.current.classList.add('is-tilting')
  const onLeave = () => {
    const el = ref.current
    el.classList.remove('is-tilting')
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
