import React, { Component } from 'react'

import WeirdRoundFractal from './weirdRoundFractal'

export default class App extends Component {
  state = {
    isMounted: false
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    const { isMounted } = this.state

    if (!isMounted) return null

    return (
        <WeirdRoundFractal />
    )
  }
}
