import { Component } from 'react'

// If WebGL is unavailable or a scene throws, render nothing and let the CSS
// glow underneath stand in — the page content never depends on the 3D layer.
export default class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('3D scene disabled:', err?.message || err)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}
