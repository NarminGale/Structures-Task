import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="home">
      <h1>Welcome to VEBISS Task</h1>
      <h3>
        <Link to="/structures">Structures</Link>
      </h3>
    </div>
  )
}

export default Home
