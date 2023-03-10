<template>
  <div>
    <el-row>
    <el-select v-model="selectedOption" placeholder="当前模型使用的数据" @change="handleChange" style="
    margin-left: 20px;margin-top: 10px;">
      <el-option v-for="option in options" :key="option.option" :label="option.option" :value="option.value"></el-option>
    </el-select>
    </el-row>
    <el-row>
    <el-input style="margin-top: 20px;width: 85%; margin-left: 20px;"
              v-model="selectedOption"
              :rows="18"
              type="textarea"
              placeholder="请选择数据关键词">
    </el-input>
    </el-row>
    <el-row>
      <el-col :span="17">
      </el-col>
      <el-col :span="4">
        <el-button style="position: relative; margin-left:30px; margin-top:10px;"
                   type="primary"
                   @click="handleEdit()">
          更新
        </el-button>
        <el-button style="position: relative;margin-left:30px; margin-top: 10px;"
                   type="primary"
                   @click="handleAdd()">
          新增
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ElSelect, ElOption, ElMessage} from 'element-plus';
import axios from "axios";
import {ref} from "vue";

export default {
  components: { ElSelect, ElOption },
  name:"botData",
  mounted() {
    this.handleGet();
  },
  setup() {
    const options = ref([]);
    let selectedOption = ref("");
    const handleGet = () => {
      options.value = [];
      axios.get('/server/unpre').then(response => {
        let items = response.data;
        console.log(items)
        for (let item of items) {
          options.value.push({
            id: item.id,
            option: item.keywords,
            value: item.content
          });
        }
        // 处理响应
      }).catch(error => {
        // 处理错误
        ElMessage('获取数据失败.' + error)
        console.log(error);
      });
    }
      const handleChange=()=>{
        // 可以在这里执行选择框选项变化时需要的操作
        console.log(selectedOption.value);
      }
      return {
        options,
        selectedOption,
        handleGet,
        handleChange
      };
    }
  }
</script>
