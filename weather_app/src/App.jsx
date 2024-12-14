import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeCenter from './components/HomeCenter/HomeCenter.tsx'
import Homeleft from './components/HomeLeftSide/Homeleft'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomeCenter/>
      <Homeleft/>
    </>
  )
}

export default App
