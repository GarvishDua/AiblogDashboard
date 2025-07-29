import React, { useState } from 'react'
import './WebhookForm.css'

const WebhookForm = () => {
  // Use environment variable for webhook URL, fallback to localhost for development
  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook-test/58473550-ed5a-4140-87a7-a28767175bf5'
  
  const [formData, setFormData] = useState({
    category: '',
    keywords: '',
    promptText: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const testWebhook = async () => {
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const testPayload = {
        category: "anime",
        keywords: "test",
        promptText: "This is a test message",
        timestamp: new Date().toISOString(),
        source: 'blogging-dashboard-test'
      }

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      })

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text()
        throw new Error(`HTTP ${webhookResponse.status}: ${errorText}`)
      }

      const responseData = await webhookResponse.text()
      setResponse({
        status: 'success',
        message: 'Test webhook successful!',
        payload: testPayload,
        webhookResponse: responseData || 'No response body'
      })

    } catch (err) {
      console.error('Test Webhook Error:', err)
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        if (WEBHOOK_URL.includes('localhost')) {
          setError(`Development mode: Cannot connect to localhost webhook from deployed app. Please configure VITE_WEBHOOK_URL environment variable for production.`)
        } else {
          setError(`Network error: Cannot connect to webhook. Please check the webhook URL and ensure it's accessible.`)
        }
      } else if (err.message.includes('404')) {
        setError(`Webhook not found (404): The n8n webhook is not active. Go to http://localhost:5678, open your workflow, and click "Execute workflow" to activate the test webhook.`)
      } else if (err.message.includes('CORS')) {
        setError(`CORS error: The webhook is blocking requests from the browser.`)
      } else {
        setError(`Test failed: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.category.trim() || !formData.keywords.trim() || !formData.promptText.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      // Prepare the JSON payload
      const payload = {
        category: formData.category,
        keywords: formData.keywords,
        promptText: formData.promptText,
        timestamp: new Date().toISOString(),
        source: 'blogging-dashboard'
      }

      // Send data to hardcoded webhook
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!webhookResponse.ok) {
        throw new Error(`HTTP error! status: ${webhookResponse.status}`)
      }

      const responseData = await webhookResponse.text()
      setResponse({
        status: 'success',
        message: 'Data sent successfully!',
        payload: payload,
        webhookResponse: responseData || 'No response body'
      })
      
      // Clear form after successful submission
      setFormData({
        category: '',
        keywords: '',
        promptText: ''
      })

    } catch (err) {
      console.error('Webhook Error:', err)
      
      // Check if it's a network error
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        if (WEBHOOK_URL.includes('localhost')) {
          setError(`Development mode: Cannot connect to localhost webhook from deployed app. Please configure VITE_WEBHOOK_URL environment variable for production.`)
        } else {
          setError(`Network error: Cannot connect to webhook. Please check the webhook URL and ensure it's accessible.`)
        }
      } else if (err.message.includes('404')) {
        setError(`Webhook not found (404): The n8n webhook is not active. Go to http://localhost:5678, open your workflow, and click "Execute workflow" to activate the webhook.`)
      } else if (err.message.includes('CORS')) {
        setError(`CORS error: The webhook is blocking requests from the browser. Try enabling CORS on the webhook.`)
      } else {
        setError(`Failed to send data: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="webhook-form">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            <option value="anime">Anime</option>
            <option value="marvel">Marvel</option>
            <option value="manga">Manga</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Keywords:</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            placeholder="Enter keywords separated by commas (e.g., react, javascript, web development)"
            className="form-input"
            required
          />
          <small className="form-help">Separate multiple keywords with commas</small>
        </div>

        <div className="form-group">
          <label htmlFor="promptText">Prompt Text:</label>
          <textarea
            id="promptText"
            name="promptText"
            value={formData.promptText}
            onChange={handleInputChange}
            placeholder="Enter your prompt text here..."
            className="form-textarea"
            rows="6"
            required
          />
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send to Webhook'}
          </button>
          
          <button 
            type="button" 
            className="test-button"
            onClick={testWebhook}
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test Webhook'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div className="success-message">
          <h3>✅ {response.message}</h3>
          <div className="response-details">
            <h4>Sent Payload:</h4>
            <pre className="json-display">
              {JSON.stringify(response.payload, null, 2)}
            </pre>
            <h4>Webhook Response:</h4>
            <pre className="json-display">
              {response.webhookResponse}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebhookForm
