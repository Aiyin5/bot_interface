<template>
  <el-input v-model="token" placeholder="Please input notion token" style="width: 40%;float:left;margin-left: 1px"/>
  <el-input v-model="input" placeholder="Please input doc_name" style="width: 40%;float:left;margin-left: 1px"/>
  <el-input v-model="pageInfo" placeholder="Please input notion pageId" style="width: 40%;float:left;margin-left: 1px"/>
  <el-switch
      v-model="value1"
      inline-prompt
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;float:left;margin-left: 1px"
      active-text="只搜集当前页面"
      inactive-text="搜索子页面"
  />
  <el-button  @click="AddNewPage" :loading="isload">
    新增
  </el-button>
  <el-table :data="tableData" border style="width: 100%;height: 300px">
    <el-table-column
        prop="doc_name"
        label="文件">
    </el-table-column>
    <el-table-column
        prop="page_id"
        label="文件id">
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
import {addNotionInfo, deleteNotionInfo, notionInfo} from "../../api/file"
export default {
  name:"notionUpdate",
  mounted() {
    this.getNotionInfo();
  },
  setup() {
    const value1 = ref(true)
    const input = ref('')
    const pageInfo = ref('')
    const token = ref('')
    const dialogFormVisible = ref(false);
    const store = useStore()
    const tableData=ref([])
    const content=ref('');
    const search = ref('')
    const orgData=ref([])
    const isload=ref(false);
    const AddNewPage = async ()=>{
      //
      isload.value=true;
      if(token.value===''|| pageInfo.value==='' || input.value===''){
        ElMessage.error("请完善notion链接信息")
        isload.value=false;
        return
      }
      try {
          let num=2;
          if(!value1.value){
            num=10;
          }
          console.log(num)
          let data={
            "token":token.value,
            "page_id":pageInfo.value,
            "bot_id":store.state.userInfo.bot_id,
            "doc_name":input.value,
            "subNum":num
          }
          let res =  await addNotionInfo(data);
          if(res.data.ActionType==="OK"){
            let dataInfo=res.data.data;
            console.log(dataInfo)
            tableData.value.push(dataInfo)
            ElMessage.success("新增数据成功")
          }
          else {
            ElMessage.error("获取数据失败")
          }
          isload.value=false;
      }
      catch (err){
        console.log(err)
        ElMessage.error("获取数据失败")
        isload.value=false;
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

    const getNotionInfo = async ()=>{
      try {
        let response=await notionInfo({"bot_id":store.state.userInfo.bot_id})
        if(!response.data.ActionType===1){
          ElMessage.error('获取数据失败.')
          return;
        }
        tableData.value=[];
        let items=response.data.data;
        for(let item of items){
          tableData.value.push(item);
          orgData.value.push(item)
        }
      }
      catch (err){
        console.log(err);
      }
    }
    const handleDelete =async (index,  item)=>{
      console.log(item);
      try {
        let response=await deleteNotionInfo({"page_id":item.page_id,"doc_name":item.doc_name})
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
      input,
      pageInfo,
      AddNewPage,
      tableData,
      content,
      getNotionInfo,
      handlePreView,
      dialogFormVisible,
      handleDelete,
      search,
      ReSetDoc,
      searchDoc,
      token,
      value1,
      isload
    }
  }
}
</script>