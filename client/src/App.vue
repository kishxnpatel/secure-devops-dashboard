<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  padding: 1.5rem;
  background-color: #f9f9f9;
}
</style>
