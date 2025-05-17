<template>
  <div class="logs-page">
    <h1>Security Event Logs</h1>

    <!-- 📊 Log Activity Chart -->
    <LogActivityChart :logs="logs" />
    <button @click="downloadCSV" class="download-btn">⬇️ Download Logs (CSV)</button>


    <!-- 📋 Log Table -->
    <table class="log-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Event</th>
          <th>IP Address</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in logs" :key="index">
          <td>{{ log.time }}</td>
          <td>{{ log.event }}</td>
          <td>{{ log.ip }}</td>
          <td>
            <span :class="log.status === 'Blocked' ? 'status-bad' : 'status-good'">
              {{ log.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LogActivityChart from '../components/LogActivityChart.vue'

export default {
  name: 'Logs',
  components: { LogActivityChart },
  data() {
    return {
      logs: [],
    }
  },
  mounted() {
    this.fetchLogs()
    setInterval(this.fetchLogs, 10000) // Refresh every 10s
  },
  methods: {
  fetchLogs() {
    fetch('http://localhost:4000/api/logs')
      .then(res => res.json())
      .then(data => {
        this.logs = data
      })
      .catch(err => console.error('Failed to load logs:', err))
  },
  downloadCSV() {
    if (!this.logs.length) return

    const headers = Object.keys(this.logs[0]).join(',')
    const rows = this.logs.map(log =>
      Object.values(log).map(val => `"${val}"`).join(',')
    )
    const csvContent = [headers, ...rows].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'security-logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

}
</script>

<style scoped>

.download-btn {
  margin-bottom: 1rem;
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.download-btn:hover {
  background-color: #1d4ed8;
}

.logs-page {
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.log-table th, .log-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.status-good {
  color: green;
  font-weight: bold;
}

.status-bad {
  color: red;
  font-weight: bold;
}
</style>
