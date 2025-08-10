import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import Songs from './components/Songs'

function App() {
  return (
    <div className='bg-text'>
      <Navbar />
      <Hero />
      <Section title="Top Albums" />
      <Section title="New Albums" />
      <Songs />
    </div>
  )
}

export default App