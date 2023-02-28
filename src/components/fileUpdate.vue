<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">上传文件</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  setup() {
    const file = ref(null);

    const handleFileUpload = (event) => {
      // 获取上传的文件
      file.value = event.target.files[0];
    };

    const uploadFile = () => {
      // 创建 FormData 对象并添加文件
      const formData = new FormData();
      formData.append('file', file.value);

      // 发送 POST 请求上传文件
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
          .then(() => {
            console.log('文件上传成功');
          })
          .catch(error => {
            console.error('文件上传失败', error);
          });
    };

    return {
      file,
      handleFileUpload,
      uploadFile
    };
  }
}
</script>
