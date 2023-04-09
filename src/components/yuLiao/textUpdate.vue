<template>
  <el-input v-model="prompt" placeholder="请输入主题" style="width: 70%;float: left"/>
  <el-input type="textarea" rows="10" v-model="completion" placeholder="请输入内容" style="width: 70%;float: left" />
  <el-button  @click="AddNewPage" :loading="isload">
    新增
  </el-button>
  <el-table :data="tableData" border style="width: 100%;height: 300px">
    <el-table-column
        prop="doc_name"
        label="名称">
    </el-table-column>
    <el-table-column
        label="操作">
      <template #header>
        <el-input v-model="search" size="small" placeholder="input search info" style="width: 40%;"/>
        <el-button type="primary" :icon="Search" size="small" @click="searchDoc" style="margin-left: 10px">Search</el-button>
        <el-button type="primary" size="small" @click="ReSetDoc">Reset</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button size="small" @click="handlePreView(scope.$index, scope.row)">
          预览
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="预览数据库中存的语料">
    <div v-html="content" style="text-align: left"></div>
    <!--    <el-input v-model="content" autocomplete="off" type="textarea" rows="15" :disabled="true" />-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false" >取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref } from 'vue'
import {useStore } from 'vuex'
import {ElMessage} from "element-plus";
import {
  addFileInfo,
  deleteFileInfo,
  fileInfo,
} from "../../api/file"
export default {
  name:"textUpdate",
  mounted() {
    this.getFileInfo();
  },
  setup() {
    const completion = ref('');
    const prompt = ref('');

    const dialogFormVisible = ref(false);
    const store = useStore()
    const tableData=ref([])
    const content=ref('');
    const search = ref('')
    const orgData=ref([])
    const isload=ref(false);

    const getFileInfo = async ()=>{
      try {
        let response=await fileInfo({"bot_id":store.state.userInfo.bot_id,"type":2})
        if(!response.data.ActionType===1){
          ElMessage.error('获取数据失败.')
          return;
        }
        tableData.value=[];
        let items=response.data.data;
        for(let item of items){
          tableData.value.push({
            id: item.id,
            doc_name: item.doc_name,
            content: item.content
          });
          orgData.value.push({
            id: item.id,
            doc_name: item.doc_name,
            content: item.content
          })
        }
      }
      catch (err){
        console.log(err);
      }
    }

    function removeEmoji (content) {
      let conByte = new TextEncoder("utf-8").encode(content);
      for (let i = 0; i < conByte.length; i++) {
        if ((conByte[i] & 0xF8) == 0xF0) {
          for (let j = 0; j < 4; j++) {
            conByte[i+j]=0x30;
          }
          i += 3;
        }
      }
      content = new TextDecoder("utf-8").decode(conByte);
      return content.replaceAll("0000", "");
    }
    const AddNewPage = async ()=>{
      //
      isload.value=true;
      if(prompt.value===''|| completion.value===''){
        ElMessage.error("请输入主题和内容")
        isload.value=false;
        return
      }
      prompt.value = removeEmoji(prompt.value);
      completion.value = removeEmoji(completion.value);
      try{
        let botInfo={
          "bot_id": store.state.userInfo.bot_id,
          "doc_name": prompt.value,
          "type": 2,
          "content": completion.value
        }
        let res=await addFileInfo(botInfo);
        if(!res.data.ActionType==="OK"){
          ElMessage.error("上传失败")
          isload.value=false;
        }
        else {
          ElMessage.success("上传成功")
          isload.value=false;
          try {
            await getFileInfo({"bot_id":store.state.userInfo.bot_id,"type":2});
          }
          catch (err){
            console.log(err);
          }
        }
      }
      catch (err){
        console.log(err);
      }
    }
    const searchDoc = () =>{
      if(!search.value){
        return;
      }
      tableData.value=[];
      for (let item of orgData.value){
        if(item.content.includes(search.value)){
          tableData.value.push(item);
        }
      }
    }
    const ReSetDoc = ()=>{
      search.value='';
      for(let item of orgData.value){
        tableData.value.push(item);
      }
    }

    const handlePreView = (index,  item)=>{
      content.value=item.content;
      const regExp = new RegExp(search.value, 'g')
      content.value = item.content.replace(regExp, `<span style="background: yellow;">${search.value}</span>`);
      dialogFormVisible.value = true;
    }
    const handleDelete =async (index,  item)=>{
      console.log(item);
      try {
        let response=await deleteFileInfo({"id":item.id,"doc_name":item.doc_name})
        if(!response.data.ActionType===1){
          ElMessage.error('删除失败.')
          return;
        }
        else {
          if (index !== -1) {
            tableData.value.splice(index, 1);
          }
        }
      }
      catch (err){
        console.log(err)
        ElMessage.error("删除失败")
      }
    }
    return {
      completion,
      AddNewPage,
      tableData,
      content,
      handlePreView,
      dialogFormVisible,
      handleDelete,
      search,
      ReSetDoc,
      getFileInfo,
      searchDoc,
      isload,
      prompt
    }
  }
}
</script>