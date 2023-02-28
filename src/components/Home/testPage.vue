<template>
  <div class="container">
    <div class="left-menu">
      <el-menu
          v-model:selectedKeys="selectedKey"
          :default-openeds="defaultOpeneds"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span >导航二</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <div v-if="selectedKey === '1-1'" key="1">选项1的内容</div>
      <div v-if="selectedKey === '1-2'" key="2">选项2的内容</div>
      <div v-if="selectedKey === '1-3'" key="3">选项3的内容</div>
      <div v-if="selectedKey === '1-4-1'" key="4">选项4-1的内容</div>
      <div v-if="selectedKey === '2'" key="5">导航二的内容</div>
    </div>
  </div>
</template>

<script>
import { ref ,watchEffect } from 'vue'

export default {
  setup() {
    const selectedKey = ref('1-2') // 默认选中的菜单项
    const defaultOpeneds = ref(['1']) // 默认展开的菜单项

    function handleOpen(index) {
      console.log(index)
    }

    function handleClose(index) {
      console.log(index)
    }

    watchEffect(() => {
      if (selectedKey.value) {
        console.log('Show the message')
      } else {
        console.log('Hide the message')
      }
    })

    return {
      selectedKey,
      defaultOpeneds,
      handleOpen,
      handleClose
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.left-menu {
  width: 200px;
  border-right: 1px solid #ebeef5;
}

.content {
  padding: 20px;
}
</style>
