<template>
  <div>
    <el-row>
      <div class="baseInfo">
        个人信息   <!--<el-button type="primary" :icon="Edit" size="small" circle
                              @click="editBaseInfo"/>-->
      </div>
    </el-row>
    <el-form class="baseForm"
             label-width="100px"
             :model="formData"
    >
      <el-form-item label="昵称">
        <el-input v-model="formData.name" :disabled="!editShow" style="max-width: 180px" />
      </el-form-item>
      <el-form-item label="邮箱"  style="position: relative; margin-top: -10px;">
        <el-input v-model="formData.emailInfo" :disabled="true" style="max-width: 180px" />
      </el-form-item>
      <el-form-item label="机器人id"  style="position: relative; margin-top: -10px;">
        <el-input v-model="formData.botId" :disabled="true" style="max-width: 180px" />
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
    <el-button  type="primary" size="large" style="margin-top: 50px;margin-right: 100px;float:right; "
                @click="handleExit">
      退出登录
    </el-button>
  </div>

</template>

<script>
import { ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton} from 'element-plus';
import { reactive } from 'vue';
import {Edit} from "@element-plus/icons-vue";
import {useStore } from 'vuex'
import {useRouter} from 'vue-router'

export default {
  name: 'userInfo',
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
    const router = useRouter()
    const store = useStore()
    const editShow=ref(false);
    const formData = reactive({
      name: store.state.userInfo.name,
      emailInfo: store.state.userInfo.email,
      botId: store.state.userInfo.bot_id
    })

    const handleExit=()=>{
      localStorage.removeItem("token")
      store.commit("clearUserInfo")
      router.push("/login")
    }
    const editBaseInfo=()=>{
      editShow.value=true;
    }
    const handleCancel= ()=>{
      editShow.value=false;
    }
    const handleConform= ()=>{

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
      handleExit,
      editShow,
      formData,
      editBaseInfo,
      handleCancel,
      handleConform,
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
