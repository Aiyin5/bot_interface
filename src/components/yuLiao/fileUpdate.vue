<template>
  <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      multiple
  >
    <el-icon class="el-icon--upload" ><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        测试阶段pdf请使用小于10M的文件
      </div>
    </template>
  </el-upload>
  <el-table :data="tableData" border style="width: 100%;height: 300px">
    <el-table-column
                     prop="doc_name"
                     label="文件">
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
import { UploadFilled } from '@element-plus/icons-vue'
import {useStore } from 'vuex'
import {ref,computed} from "vue";
import {ElMessage} from "element-plus";
import {fileInfo,updateBotInfo,deleteFileInfo} from '@/api/file'
import * as PdfJs from 'pdfjs-dist/legacy/build/pdf.js'
export default {
  name: 'fileUpload',
  components: {},
  mounted() {
    this.getFileInfo();
  },
  setup() {
    const dialogFormVisible = ref(false);
    const store = useStore()
    const tableData=ref([])
    const content=ref('');
    const search = ref('')
    const orgData=ref([])
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
    const getFileInfo = async ()=>{
      try {
        let response=await fileInfo({"bot_id":store.state.userInfo.bot_id,"type":1})
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
   async function handleBeforeUpload(file) {
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        ElMessage.error('只能上传 PDF 文件')
        //this.$message.error('只能上传 PDF 文件')
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        //this.$message.error('上传的文件大小不能超过 10MB')
        ElMessage.error('上传的文件大小不能超过 10MB')
        return false;
      }
      return isLt2M && isPDF; // 阻止默认上传行为
    }

    async function convertPdfToText(file) {
        PdfJs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
        // 创建一个新的PDF文件对象
        const pdfDoc = await PdfJs.getDocument({ url: URL.createObjectURL(file.raw) }).promise;
        // 获取第一页
        let pageNum= pdfDoc.numPages;
        let texts="";
        for(let i=1;i<=pageNum;i++){
          let page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const text = textContent.items.map(item => item.str).join('');
          texts+=text;
        }
        // 将页面文本渲染到画布
        return texts;
    }
    // 上传成功后的回调函数
   async function handleError(err, file, fileList) {
     let textContent = await convertPdfToText(file);
     textContent = removeEmoji(textContent);
     try{
       let botInfo={
         "bot_id": store.state.userInfo.bot_id,
         "doc_name": file.name,
         "type": 1,
         "content": textContent
       }
       let res=await updateBotInfo(botInfo);
       if(!res.data.ActionType==="OK"){
         ElMessage("上传失败")
       }
       else {
         ElMessage("上传成功")
         try {
           await getFileInfo({"bot_id":store.state.userInfo.bot_id,"type":1});
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
      handleBeforeUpload,
      handleError,
      convertPdfToText,
      getFileInfo,
      tableData,
      content,
      handlePreView,
      dialogFormVisible,
      handleDelete,
      search,
      ReSetDoc,
      searchDoc
    }
  }
}
</script>

<style scoped>

</style>