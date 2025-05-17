<template>
  <div class="chart-box">
    <h3>Log Activity (Last 10 Minutes)</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale)

export default {
  name: 'LogActivityChart',
  components: { Bar },
  props: ['logs'],
  computed: {
    chartData() {
      const labels = []
      const counts = []
      const now = new Date()

      for (let i = 9; i >= 0; i--) {
        const bucketTime = new Date(now.getTime() - i * 60000)
        const label = bucketTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
        labels.push(label)

        // Count logs that fall into the same minute bucket
        const count = this.logs.filter((log) => {
          if (!log.time || !log.time.includes(':')) return false

          const [hourMinute, meridian] = log.time.split(' ')
          if (!hourMinute || !meridian) return false

          const [hourStr, minuteStr] = hourMinute.split(':')
          let hour = parseInt(hourStr)
          const minute = parseInt(minuteStr)

          if (isNaN(hour) || isNaN(minute)) return false

          // Convert to 24-hour time
          if (meridian === 'PM' && hour !== 12) hour += 12
          if (meridian === 'AM' && hour === 12) hour = 0

          return (
            hour === bucketTime.getHours() &&
            minute === bucketTime.getMinutes()
          )
        }).length

        counts.push(count)
      }

      return {
        labels,
        datasets: [
          {
            label: 'Log Count',
            backgroundColor: '#3b82f6',
            data: counts
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-box {
  background: white;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
