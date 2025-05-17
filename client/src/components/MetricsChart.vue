<template>
  <div class="chart-wrapper">
    <h3>{{ title }}</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, LineElement,
  CategoryScale, LinearScale, PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'MetricsChart',
  components: { Line },
  props: {
    title: String,
    chartData: Object,
    chartOptions: Object
  }
}
</script>

<style scoped>
.chart-wrapper {
  margin-bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  height: 300px;
}
.chart-wrapper canvas {
  height: 100% !important;
  width: 100% !important;
}
</style>
