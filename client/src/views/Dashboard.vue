<template>
  <div class="dashboard">
    <h1>Dashboard Overview</h1>

    <div class="metrics-wrapper">
      <MetricsChart
        title="CPU Usage (%)"
        :chartData="cpuData"
        :chartOptions="chartOptions"
      />

      <MetricsChart
        title="Memory Usage (%)"
        :chartData="memoryData"
        :chartOptions="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import MetricsChart from '../components/MetricsChart.vue'

export default {
  name: 'Dashboard',
  components: { MetricsChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 20 }
          }
        }
      },
      cpuData: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
        datasets: [{
          label: 'CPU',
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          data: [20, 45, 35, 60, 40],
          fill: true,
          tension: 0.4
        }]
      },
      memoryData: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],
        datasets: [{
          label: 'Memory',
          backgroundColor: '#10b981',
          borderColor: '#059669',
          data: [30, 50, 25, 70, 55],
          fill: true,
          tension: 0.4
        }]
      }
    }
  },
  mounted() {
    setInterval(() => {
      const time = new Date().toLocaleTimeString().slice(0, 5) // 'HH:MM'

      // Generate a random value
      const newCpu = Math.floor(Math.random() * 80) + 10 // 10–90%
      const newMem = Math.floor(Math.random() * 80) + 10

      // Push to CPU chart
      this.cpuData.labels.push(time)
      this.cpuData.datasets[0].data.push(newCpu)

      // Keep last 6 entries
      if (this.cpuData.labels.length > 6) {
        this.cpuData.labels.shift()
        this.cpuData.datasets[0].data.shift()
      }

      // Push to Memory chart
      this.memoryData.labels.push(time)
      this.memoryData.datasets[0].data.push(newMem)

      if (this.memoryData.labels.length > 6) {
        this.memoryData.labels.shift()
        this.memoryData.datasets[0].data.shift()
      }
    }, 5000) // update every 5 seconds
  }
}
</script>


<style scoped>
.dashboard {
  padding: 1.5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.metrics-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
</style>
