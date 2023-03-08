<template>
  <div>
    <h1>配置机器人的信息</h1>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="机器人的用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="休息">休息</el-radio>
          <el-radio label="工作">工作</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="配置新人进入后的自动回复" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div class="avatar-update">
    <el-image :src="avatarUrl" fit="cover" alt="avatar" class="avatar-preview">
      <template #error>
        <i class="el-icon-user"></i>
      </template>
    </el-image>
    <el-upload
        class="avatar-upload"
        action="/api/avatar/upload"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
    >
      <el-button type="primary" icon="el-icon-upload">
        上传新头像
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElRadio, ElRadioGroup ,ElImage, ElButton, ElUpload} from 'element-plus';
import { reactive } from 'vue';
export default {
  name: 'botAction',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElImage,
    ElButton,
    ElUpload,
  },
  setup() {
    const form = ref({
      name: '',
      gender: '',
      birthdate: '',
      occupation: '',
      address: ''
    });

    const state = reactive({
      avatarUrl: '/default-avatar.jpg',
    })

    function beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传 JPG/PNG 格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB')
      }
      return isJpgOrPng && isLt2M
    }

    function handleUploadSuccess(response) {
      if (response.code === 200) {
        state.avatarUrl = response.data.url
        this.$message.success('头像上传成功')
      } else {
        this.$message.error(response.message)
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
      form,
      submitForm,
      state,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
    };
  }
};
</script>
<style>
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
