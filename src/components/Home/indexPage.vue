<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="product">产品介绍</el-menu-item>
        <el-menu-item index="login">登录</el-menu-item>
        <el-menu-item index="register">注册</el-menu-item>
      </el-menu>
    </el-header>

    <!-- 主体内容区域 -->
    <el-main>
      <!-- 首页内容 -->
      <div v-if="activeIndex === 'home'">
        <h1>欢迎来到我们的网站！</h1>
        <p>我们是一家专业的产品公司，致力于为客户提供最优质的产品和服务。</p>
        <p>请在顶部导航栏中选择您感兴趣的页面。</p>
      </div>

      <!-- 产品介绍 -->
      <div v-if="activeIndex === 'product'">
        <h1>我们的产品</h1>
        <p>我们的产品是一款功能强大、易于使用的软件。</p>
        <p>它可以帮助您提高工作效率、简化工作流程，让您更轻松地完成工作。</p>
        <p>了解更多关于我们的产品，请访问我们的官方网站。</p>
      </div>

      <!-- 登录 -->
      <div v-if="activeIndex === 'login'">
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 注册 -->
      <div v-if="activeIndex === 'register'">
        <el-form ref="registerForm" :model="registerForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { ElHeader ,ElMain,ElMenu, ElMenuItem, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'

export default {
  components: {
    ElHeader,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  setup() {
// 表单数据对象
    const loginForm = reactive({
      username: '',
      password: '',
    })
    const registerForm = reactive({
      username: '',
      password: '',
      confirmPassword: '',
    })
    // 当前选中的菜单项索引
    const activeIndex = reactive('home')
// 处理菜单项选择事件
    function handleSelect(index) {
      activeIndex.value = index
    }

// 处理登录表单提交事件
    function login() {
      console.log('登录：', loginForm)
    }

// 处理注册表单提交事件
    function register() {
      console.log('注册：', registerForm)
    }

    return {
      loginForm,
      registerForm,
      activeIndex,
      handleSelect,
      login,
      register,
    }},
}
</script>
