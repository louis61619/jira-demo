import React, { Component } from 'react'

type fallbackRender = (props: { error: Error | null }) => React.ReactElement

interface Props {
  fallbackRender: fallbackRender
}
interface State {
  error: Error | null
}

// 可以使用react-error-boundary這個庫
export default class ErrorBoundary extends Component<React.PropsWithChildren<Props>, State> {
  state = {
    error: null
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({ error })
    }

    return children
  }
}
