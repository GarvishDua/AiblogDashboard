import React, { useState } from 'react'
import WebhookForm from './components/WebhookForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Blogging Dashboard</h1>
        <p>Enter keywords and prompt text to send to your webhook</p>
        <WebhookForm />
      </div>
    </div>
  )
}

export default App
