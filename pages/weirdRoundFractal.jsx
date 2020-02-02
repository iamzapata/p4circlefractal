import React, { Component } from 'react'

export default class WeirdRoundFractal extends Component {
  factor = 0
  r = 0

  state = {
    isMounted: false
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.Sketch = require('react-p5')
    this.setState({ isMounted: true })
  }

  setup = (p5, canvasParentRef) => {
    this.instanceP5 = p5
    const { height } = p5
    const { innerHeight, innerWidth } = window
    console.warn({height})

    p5.createCanvas(innerWidth - 100, innerHeight).parent(canvasParentRef)
    
    this.r = innerHeight / 2 - 16
  }

  getVector(index, total) {
    const { instanceP5 } = this
    const { PI, TWO_PI } = instanceP5
    const angle = instanceP5.map(index % total, 0, total, 0, TWO_PI)
    const v = p5.Vector.fromAngle(angle + PI)
    v.mult(this.r)
    return v
  }

  draw = (p5) => {
    const { width, height } = this.instanceP5
    p5.background(0)
    const total = 500
    this.factor += 0.015

    p5.translate(width / 2, height / 2)
    p5.stroke(255, 150)
    p5.strokeWeight(2)
    p5.noFill()
    p5.ellipse(0, 0, this.r * 2)

    p5.strokeWeight(2)

    for (let i = 0; i < total; i++) {
      const a = this.getVector(i, total)
      const b = this.getVector(i * this.factor, total)
      p5.line(a.x, a.y, b.x, b.y)
    }
  }

  render() {
    const { isMounted } = this.state

    if (!isMounted) return null

    return <this.Sketch setup={this.setup} draw={this.draw} ref={this.canvasParentRef} />
  }
}
