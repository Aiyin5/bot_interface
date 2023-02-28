<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" >
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  <h>当前无需登录，可以直接跳转</h>
</template>

<script>
import { ref } from 'vue';
import router from '../../router'
export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      // 在这里可以添加提交登录表单的逻辑
      console.log(`Email: ${email.value}, Password: ${password.value}`);
      router.push('/homePage');
    }

    return {
      email,
      password,
      handleSubmit,
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
