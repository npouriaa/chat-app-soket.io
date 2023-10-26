import React from 'react'
import './App.css'
import io from 'socket.io-client'
const socket =  io.connect('http://localhost:5174')

const App = () => {
  console.log(socket)
  return (
    <div>App</div>
  )
}

export default App