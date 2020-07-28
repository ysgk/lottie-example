import React from 'react'
import logo from './logo.svg'
import './App.css'
import useLottie from './useLottie'
import animationData from './animation.json'

const mockRequest = (checked: boolean) => {
  return new Promise<{ checked: boolean }>((resolve) => {
    window.setTimeout(() => {
      resolve({ checked })
    }, 400)
  })
}

function App() {
  const [checked, setChecked] = React.useState(false)
  const { replay, render } = useLottie({
    animationData,
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const checked = e.currentTarget.checked
    // mock network connection
    const result = await mockRequest(checked)
    setChecked(result.checked)

    if (result.checked) {
      replay()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {render()}
        <input type={'checkbox'} checked={checked} onChange={handleChange} />
      </header>
    </div>
  )
}

export default App
