<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="当前语料库（即将遗弃）" name="first"><BotData /></el-tab-pane>
    <el-tab-pane label="PDF上传" name="second"><file-upload /></el-tab-pane>
    <el-tab-pane label="文本更新" name="third">文本更新</el-tab-pane>
    <el-tab-pane label="Notion" name="fourth">Notion</el-tab-pane>
  </el-tabs>
</template>
<script>
import { ref } from 'vue'
import BotData from "@/components/chatModel/botData.vue";
import FileUpload from "@/components/fileUpdate.vue";
export default {
name:"yuLiao",
  components: {FileUpload, BotData},
  setup() {
    const activeName = ref('first')
    const handleClick = (tab,event) => {
      console.log(tab, event)
    }
    return {
      handleClick,
      activeName
    }
  }
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
