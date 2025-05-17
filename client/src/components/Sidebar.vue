<template>
  <nav class="sidebar">
    <h2 class="logo">🔐 DevOps Dashboard</h2>
    <ul>
      <li><router-link to="/dashboard">📊 Dashboard</router-link></li>
      <li><router-link to="/metrics">📈 Metrics</router-link></li>
      <li><router-link to="/logs">📜 Logs</router-link></li>
      <li><router-link to="/users">👥 Users</router-link></li>
      <li><router-link to="/settings">⚙️ Settings</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #1e293b;
  color: white;
  height: 100vh;
  padding: 20px;
}
.logo {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
a.router-link-exact-active {
  font-weight: bold;
}
</style>
