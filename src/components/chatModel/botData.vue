<template>
  <div>
    <el-row>
    <el-select v-model="selectedId" placeholder="当前模型使用的数据" @change="handleChange" style="
    margin-left: 20px;margin-top: 10px;">
      <el-option v-for="option in options" :key="option.option" :label="option.option" :value="option.id"></el-option>
    </el-select>
    </el-row>
    <el-row>
    <el-input style="margin-top: 20px;width: 85%; margin-left: 20px;"
              v-model="selectedValue"
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
  <el-dialog v-model="dialogFormVisible" title="增加语料">
    <span>主题：<el-input v-model="prompt" autocomplete="off" style="width: 70%;"/></span>
    <div>内容：<el-input type="textarea" rows="15" v-model="completion" autocomplete="off" style="width: 70%;" /></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addDataToSer" style="margin-right: 10px">
          添加到语料库
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElSelect, ElOption, ElMessage} from 'element-plus';
import axios from "axios";
import {ref} from "vue";
import {useStore } from 'vuex'
import {getUnstInfo,updateUnstInfo,addUnstInfo} from '@/api/bot'
export default {
  components: { ElSelect, ElOption },
  name:"botData",
  mounted() {
    this.handleGet();
  },
  setup() {
    const store = useStore()
    const options = ref([]);
    let selectedId = ref("");
    let selectedOption = ref("");
    const dialogFormVisible = ref(false);
    const prompt = ref("");
    const completion = ref("");
    const selectedValue = ref("");
    const handleGet = async ()=> {
      options.value = [];
      try {
        let res = await getUnstInfo({"bot_id": store.state.userInfo.bot_id});
        if (!res.data.ActionType === "OK") {
          ElMessage("信息获取失败")
        } else {
          let items = res.data.data;
          //console.log(items)
          for (let item of items) {
            options.value.push({
              id: item.id,
              bot_id: item.bot_id,
              option: item.keywords,
              value: item.content
            });
          }
        }
      }
      catch (err){
        ElMessage("信息获取失败")
        console.log(err)
      }
    }
    const handleEdit=async ()=>{
      let data={
        "data":{"keywords":selectedOption.value,
        "bot_id":store.state.userInfo.bot_id,
        "content":selectedValue.value},
        "where":{"id":selectedId.value}
      }
      try {
        let res = await updateUnstInfo(data);
        if (!res.data.ActionType === "OK") {
          ElMessage.error("更新失败，请重试")
        } else {
          await handleGet()
          ElMessage.success("更新成功")
          }
        }
      catch (err){
        ElMessage("更新失败，请重试")
        console.log(err)
      }
    }
    const handleAdd=()=>{
      dialogFormVisible.value=true;
    }
    const addDataToSer=async ()=>{
      let data={
        "bot_id":store.state.userInfo.bot_id,
        "keywords":prompt.value,
        "content":completion.value
      }
      try {
        let res = await addUnstInfo(data);
        if (!res.data.ActionType === "OK") {
          ElMessage.error("添加失败，请重试")
        } else {
          await handleGet()
          ElMessage.success("添加成功")
        }
      }
      catch(error){
        // 处理错误
        ElMessage.error('添加失败.' + error)
      }
    }
      const handleChange=()=>{
        // 可以在这里执行选择框选项变化时需要的操作
        for(let item of options.value){
          if(item.id===selectedId.value){
            selectedValue.value=item.value;
            selectedOption.value=item.option;
            break;
          }
        }
        //console.log(selectedOption.value);
      }
      return {
        options,
        selectedOption,
        handleGet,
        handleChange,
        handleAdd,
        dialogFormVisible,
        addDataToSer,
        prompt,
        handleEdit,
        completion,
        selectedId,
        selectedValue,

      };
    }
  }
</script>
