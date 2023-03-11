<template>
  <div>
    <el-row>
      <div class="baseInfo">
        基础信息   <el-button type="primary" :icon="Edit" size="small" circle
      @click="editBaseInfo"/>
      </div>
    </el-row>
    <el-form class="baseForm"
        :label-position="'top'"
        label-width="100px"
        :model="formData"
    >
      <el-form-item label="机器人名称">
        <el-input v-model="formData.name" :disabled="!editShow" style="max-width: 100px" />
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar :size="80" :src="formData.avatar" />
      </el-form-item>
      <el-form-item>
        <el-upload
            class="avatar-upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-error="handleUploadError"
            action="#"
            :http-request="httpRequest"
        >
          <el-button type="primary" size="small" v-if="editShow" style="float:left;">
            上传新头像
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="新成员加入后的自动引导内容"  style="position: relative; margin-top: -10px;">
        <el-input v-model="formData.initInfo" type="textarea" rows="6" :disabled="!editShow" />
      </el-form-item>
      <el-button  v-if="editShow" type="primary" size="small" style="float:left;"
                 @click="handleCancel">
        取消
      </el-button>
      <el-button  v-if="editShow" type="primary" size="small" style="float:left; "
                 @click="handleConform">
        保存
      </el-button>
    </el-form>
  </div>

</template>

<script>
import { ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton, ElMessage} from 'element-plus';
import { reactive } from 'vue';
import {Edit} from "@element-plus/icons-vue";
import axios from "axios";
export default {
  name: 'botAction',
  mounted() {
    this.getInfo();
  },
  computed: {
    Edit() {
      return Edit
    },
    readType(){
      return this.editShow.value;
    }
  },
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  setup() {
    const editShow=ref(false);
    const formData = reactive({
      name: 'AMA_BOT',
      avatar: '123',
      initInfo: '--------------------------------',
      base64String:'',
    })
    const state = reactive({
      avatarUrl: '/default-avatar.jpg',
    })
    const editBaseInfo=()=>{
      editShow.value=true;
    }
    const handleCancel= ()=>{
      editShow.value=false;
    }
    const handleConform= ()=>{
      let data= {"data":{
          "name":formData.name,
          "avatar":formData.base64String,
          "status":"0",
          "contents":formData.initInfo,
          "info":"nothing"
        }}
      axios.post('/server/botInfo',data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        console.log(response);
        axios.post('/api/botInfo', {"data":"update"},{
          headers: {
            'Content-Type': 'application/json'
          }}).then(response => {
          console.log(response);
          ElMessage('更新成功.')
          editShow.value=false;
        }).catch(error => {
          // 处理错误
          ElMessage('更新失败.')
          //displayText.value=error;
          console.log(error);
        });
      }).catch(error => {
        // 处理错误
        ElMessage('更新失败.')
        //displayText.value=error;
        console.log(error);
      });

    }

    const getInfo=()=>{
      axios.get('/server/botInfo').
      then(response => {
        let items = response.data[0];
        console.log(items);
        formData.name=items.name;
        formData.initInfo=items.contents;
        formData.base64String=items.avatar;
        const blob = base64ToBlob(formData.base64String, 'image/jpeg');
        const url = URL.createObjectURL(blob);
        formData.avatar=url;
      }).catch(error => {
        // 处理错误
        ElMessage('获取机器人数据失败'+error)
        console.log(error);
      });
    }
    function transFormImage(file){
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        formData.base64String = base64String;
      },
      reader.readAsDataURL(file);
    }
    function beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传 JPG/PNG 格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB')
        ElMessage('上传头像图片大小不能超过 1MB')
      }
      return isJpgOrPng && isLt2M
    }
    function httpRequest (data) {
      let file = data.file
      transFormImage(file)
      const url = URL.createObjectURL(file);
      formData.avatar=url;
    }
    function base64ToBlob(base64String, type = 'image/jpeg') {
      const bytes = window.atob(base64String.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(bytes.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < bytes.length; i++) {
        uint8Array[i] = bytes.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type });
    }

    function handleUploadError(error) {
      this.$message.error('头像上传失败，请稍后再试')
      console.error(error)
    }
    const submitForm = () => {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送表单数据到服务器
        } else {
          console.log('表单校验失败');
          return false;
        }
      });
    };

    return {
      submitForm,
      state,
      editShow,
      formData,
      beforeUpload,
      handleUploadError,
      editBaseInfo,
      handleCancel,
      handleConform,
      getInfo,
      httpRequest,
      transFormImage,
      base64ToBlob,
    };
  }
};
</script>
<style>
.baseForm{
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  max-width: 800px;
}
.baseInfo{
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
}
.nickName{
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
}
.avatar-update {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-preview i {
  font-size: 60px;
  color: #c0c4cc;
}

.avatar-upload {
  display: flex;
  justify-content: center;
}
</style>
