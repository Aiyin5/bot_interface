<template>
  <el-input v-model="token" placeholder="Please input notion token" />
  <el-input v-model="input" placeholder="Please input doc_name" />
  <el-input v-model="pageInfo" placeholder="Please input notion pageId" />
  <el-button  @click="AddNewPage">
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
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref } from 'vue'
import {useStore } from 'vuex'
import {ElMessage} from "element-plus";
import {addNotionInfo, deleteFileInfo, deleteNotionInfo, notionInfo} from "../../api/file"
import {getHashFromArticle,read_block} from "../../utils/notion"
export default {
  name:"notionUpdate",
  setup() {
    const input = ref('')
    const pageInfo = ref('')
    const token = ref('')
    const dialogFormVisible = ref(false);
    const store = useStore()
    const tableData=ref([])
    const content=ref('');
    const search = ref('')
    const orgData=ref([])
    const AddNewPage = async ()=>{
      //
      try {
        console.log("start")
        let res = await read_block(pageInfo.value,token.value);
        console.log(res)
      }
      catch (err){
        console.log(err)
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
    const handleDelete =async (index,  item)=>{
      console.log(item);
      try {
        let response=await deleteNotionInfo({"id":item.id,"doc_name":item.doc_name})
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
      handlePreView,
      dialogFormVisible,
      handleDelete,
      search,
      ReSetDoc,
      searchDoc,
      token
    }
  }
}
</script>