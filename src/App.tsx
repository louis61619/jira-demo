import React from 'react'
import { useUndo } from './useUndo'
function App() {
  const [
    countState,
    { set: setCount, reset: resetCount, undo: undoCount, redo: redoCount, canRedo, canUndo }
  ] = useUndo<number>(0)
  const { present: presentCount } = countState

  return (
    // <ErrorBoundary fallbackRender={PageError}>
    //   <div className="App">{user ? <Main /> : <Login />}</div>
    // </ErrorBoundary>
    <div>
      <p>count: {presentCount}</p>
      <button onClick={() => setCount(presentCount + 1)}>+</button>
      <button onClick={() => setCount(presentCount - 1)}>-</button>
      <button onClick={redoCount} disabled={!canRedo}>
        下一步
      </button>
      <button onClick={undoCount} disabled={!canUndo}>
        上一步
      </button>
      <button onClick={() => resetCount(0)}>reset</button>
    </div>
  )
}

export default App
