<template>
  <el-row>
    <el-col :span="10" class="view_container">
      <el-row>
        <h class="content">你好<br/>欢迎来到AMA_Bot管理后台</h>
      </el-row>
      <div class="imageview">
        <el-image style="width: 300px; height: 300px" :src="url"/>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="login-container">
        <el-form class="login-form" size="large" :model="form" :rules="rules" ref="regForm">
          <label style="margin-bottom: 20px">注册</label>
          <el-form-item class="form-group" prop="name">
            <el-input placeholder="昵称" id="name" v-model="form.name" />
          </el-form-item>
          <el-form-item class="form-group" prop="email">
            <el-input placeholder="邮箱" id="email" v-model="form.email" />
          </el-form-item>
          <el-form-item class="form-group" prop="password">
            <el-input  placeholder="密码" type="password" v-model="form.password" />
          </el-form-item>
          <el-form-item class="form-group" prop="confirmword">
            <el-input  placeholder="确认密码" type="password" v-model="form.confirmword" />
          </el-form-item>
          <el-button class="subbutton" :loading="isload" type="primary"  @click="handleSubmit(ruleFormRef)">注册</el-button>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {reactive, ref} from 'vue';
import router from '../../router/index.js'
import {ElNotification} from "element-plus";
import {register} from "@/api";
import {useStore} from "vuex";

export default {
  name:"registerPage",
  setup() {
    const store = useStore()
    const form =reactive ({
      password: '',
      email:'',
      confirmword:'',
      name:''
    })
    const regForm=ref();
    const isload=ref(false);
    const item = ref('')
    const url =require('@/assets/ama_bot.jpg')
    const handleSubmit = async () => {
      isload.value=true;
      await regForm.value.validate(async (valid)=>{
        if(valid){
          const regInfo={
            "name":form.name,
            "email":form.email,
            "password":form.password,
            "bot_id":"0",
            "level":2
          }
          try {
            let res=await register(regInfo);
            if(res.data.ActionType==="OK"){
              console.log(res.data);
              store.commit("changeUserInfo",regInfo)
              store.commit("changeGetterRouter",false)
              router.push('/question/ylhub')
            }
            else {
              ElNotification({
                title: 'Error',
                message: '注册失败,请换个邮箱',
                type: 'error',
              })
              isload.value=false;
            }
          }
          catch (err){
            ElNotification({
              title: 'Error',
              message: '注册失败,请换个邮箱',
              type: 'error',
            })
            isload.value=false;
          }
        }
      })
      isload.value=false;
    }
    const rules = reactive({
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: ['blur', 'change'] },
      ],
      confirmword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: ['blur', 'change'] },
      ],
      name: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 1, max: 20, message: '密码长度在 6 到 20 个字符', trigger: ['blur', 'change'] },
      ],
    })
    return {
      handleSubmit,
      url,
      rules,
      form,
      item,
      isload,
      regForm,
    }
  }
}
</script>

<style>
.view_container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #F5F5F5;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F0F2F6;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 2rem;
  box-shadow: 0px 4px 15px #D9D9D9;
  border-radius: 5px;
  background-color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.subbutton{
  margin-top: 10px;
}
label {
  font-weight: bold;
}
.inputtext {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.title{
  display: inline;
  font-weight: bold;
  justify-content: left;
}
.content {
  position: relative;
  font-weight: bold;
  text-align: left;
  font-size: 20px;
}
.imageview{
  position: relative;
  margin-top: 20px;
}
</style>
