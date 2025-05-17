const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 4000
const SECRET_KEY = 'sait-kishan-devops-secret' // In production, use env var

app.use(cors())
app.use(express.json())

// Memory store for logs
let logs = [
  { time: '10:01 AM', event: 'Failed Login', ip: '192.168.1.12', status: 'Blocked' },
  { time: '10:08 AM', event: 'Successful Login', ip: '192.168.1.8', status: 'Success' }
]

// Generate random log events
function generateRandomLog() {
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const events = ['Failed Login', 'Successful Login', 'Password Changed', 'New User Added']
  const ips = ['192.168.1.5', '10.0.0.3', '172.16.0.9', '127.0.0.1']
  const event = events[Math.floor(Math.random() * events.length)]
  const ip = ips[Math.floor(Math.random() * ips.length)]
  const status = event === 'Failed Login' ? 'Blocked' : 'Success'

  logs.push({ time, event, ip, status })
  if (logs.length > 20) logs.shift()
}

setInterval(generateRandomLog, 10000)

// GET logs route
app.get('/api/logs', (req, res) => {
  res.json(logs)
})

// ✅ LOGIN route using JWT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  // Basic mock user
  const validEmail = 'admin@example.com'
  const validPassword = 'password123'

  if (email === validEmail && password === validPassword) {
    const token = jwt.sign({ email, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' })
    res.json({ token })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
