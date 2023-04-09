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
        <el-avatar :size="80" :src="formData.avatarUrl" />
      </el-form-item>
      <el-form-item>
        <el-upload
            class="avatar-upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-error="handleUploadError"
            action="https://api.imgbb.com/1/upload"
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
      <el-form-item label="机器人邀请链接，可以通过这个链接邀请机器人到你的Discord中" style="position: relative; margin-top: -10px;">
        <el-input v-model="formData.link"  :disabled="true" />
      </el-form-item>
      <el-button  v-if="editShow" type="primary" size="small" style="float:left;"
                 @click="handleCancel">
        取消
      </el-button>
      <el-button  v-if="editShow" type="primary" size="small" style="float:left; "
                 @click="handleConform">
        保存
      </el-button>
      <el-button  type="primary"  style="margin-left: 50px;float: right"
                  @click="reBot">
        重启机器人
      </el-button>
      <el-button
          type="primary"
          style="margin-left: 50px;float: right"
          @click="handleBotUpdate">
        更新机器人的数据
      </el-button>
    </el-form>
  </div>
  <el-dialog v-model="dialogFormVisible" title="更新机器人数据">
    请通过Discord，对机器人执行/更新机器人命令进行更新
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton, ElMessage} from 'element-plus';
import { reactive } from 'vue';
import {Edit} from "@element-plus/icons-vue";
import {botInfo,postAvator,updateBotInfo} from "@/api";
import {useStore } from 'vuex'
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
    const store = useStore()
    const editShow=ref(false);
    const dialogFormVisible = ref(false);

    const formData = reactive({
      name: 'AMA_BOT',
      avatarUrl: '/default-avatar.jpg',
      initInfo: '--------------------------------',
      base64String:'',
      link:""
    })
    const editBaseInfo=()=>{
      editShow.value=true;
    }
    const handleCancel= ()=>{
      editShow.value=false;
    }
    const reBot=()=>{
      ElMessage("暂时没有实现")
    }

    const handleBotUpdate=()=>{
      dialogFormVisible.value = true;
    }
    const handleConform=async ()=>{
      let data= {"data":{
          "name":formData.name,
          "avatar":formData.avatarUrl,
          "contents":formData.initInfo,
          "info":formData.link
        },
      "where":{
        "bot_id":store.state.userInfo.bot_id
      }}
      try {
        const response=await updateBotInfo(data);
        if(!response.data.ActionType===1){
          ElMessage.error('更新失败.请重试')
          return;
        }
        ElMessage.success("更新成功")
      }
      catch (err){
        ElMessage.error('更新失败.请重试')
      }
    }
    const getInfo= async ()=>{
      try {
        let res=await botInfo({"bot_id":store.state.userInfo.bot_id});
        if(!res.data.ActionType==="OK"){
          ElMessage("信息获取失败")
        }
        else {
          let items=res.data.data;
          formData.name=items.name;
          formData.initInfo=items.contents;
          formData.link=items.info;
          formData.avatarUrl = items.avatar;
        }
      }
      catch (err){
        console.log(err)
      }
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
    async function httpRequest (data) {
      let file = data.file
      console.log(file)
      //file.name="testimage"
      const skey="A92655d7f490EBab3478d97c9a20c57b";
      let avatarUrl = URL.createObjectURL(file);
      let postData={
        "key":skey.toLowerCase(),
        "image":avatarUrl
      }
      console.log(postData)
      try {
        let res = await postAvator(postData);
        //console.log(res.data);
        if(res.success){
          formData.avatarUrl = res.data.url;
          ElMessage.success("头像上传成功")
        }
        else {
          ElMessage.error("头像上传失败")
        }
      }
      catch (err){
        ElMessage.error("头像上传失败")
        console.log(err)
      }
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
      editShow,
      formData,
      beforeUpload,
      handleUploadError,
      editBaseInfo,
      handleCancel,
      handleConform,
      getInfo,
      httpRequest,
      reBot,
      handleBotUpdate,
      dialogFormVisible
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
