import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'

function App() {
  return (
    <div className='bg-text'>
      <Navbar />
      <Hero />
      <Section title="Top Albums" />
      <Section title="New Albums" />
    </div>
  )
}

export default App