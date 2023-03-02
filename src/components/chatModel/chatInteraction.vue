<template>
  <div>
    <div style="text-align: left;">
      <el-input v-model="inputText" placeholder="请输入内容" style="height: 100%; width: 60%"></el-input>
      <el-button type="primary" @click="showText">发送</el-button>
    </div>
    <div v-loading="loading" style="height: 100%; width: 60%;padding-top: 50px">
      <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <v-md-preview :text="displayText" style="text-align: left; font-size: 16px"></v-md-preview>
      </el-card>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: 'chatInteraction',
  setup() {
    const inputText = ref('')
    const displayText = ref('')
    const loading = ref(false)
    const showText = ()=>{
      loading.value=true;
      let item={"data":inputText.value};
      axios.post('/app/api/bing',item,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        ElMessage('发送成功.')
        console.log(response);
        displayText.value=response.data.message;
        loading.value=false;
        // 处理响应
      }).catch(error => {
        // 处理错误
        ElMessage('发送失败.')
        displayText.value=error;
        loading.value=false;
        console.log(error);
      });
    }
    return {
      inputText,
      displayText,
      showText,
      loading,
    }
  },
}
</script>
