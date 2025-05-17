<template>
  <div class="login-page">
    <h2>🔐 Admin Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })

        if (!res.ok) throw new Error('Invalid email or password')
        const data = await res.json()

        localStorage.setItem('authToken', data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 4rem auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
form input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
form button {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem;
  border: none;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
