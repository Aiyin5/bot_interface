<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="question"
          label="问题">
      </el-table-column>
      <el-table-column
          prop="answer"
          label="答案">
      </el-table-column>
      <el-table-column
          prop="other"
          label="相关数据">
      </el-table-column>
      <el-table-column
          prop="create_date"
          label="时间">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { ref } from 'vue';
import {ElMessage} from "element-plus";
import {useStore } from 'vuex'
import {membersFind} from "@/api";
import {getLogInfo} from "@/api/logInfo";
export default {
  name: 'logInfo',
  mounted() {
    this.handleGet();
  },
  setup() {
    const store = useStore()
    let total = ref(0);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const tableData = ref([
    ]);
    const editingRow = ref(null);

    const handleSizeChange = (val) => {
      pageSize.value = val
    }
    const handleCurrentChange = (val) => {
      currentPage.value = val
    }
    const handleBlur = () => {
      // 保存修改后的数据
      editingRow.value = null;
    };

    const handleDelete = async (row) => {

    };

    const handleGet = async ()=>{
      tableData.value=[];
      if(store.state.userInfo.bot_id==='0'){
        return;
      }
      try{
        let response=await getLogInfo({"bot_id":store.state.userInfo.bot_id});
        if(!response.data.ActionType===1){
          ElMessage.error('获取数据失败.')
          return;
        }
        let items=response.data.data;
        for(let item of items){
          console.log(item)
          tableData.value.push(
            item
          );
        }
        total.value=tableData.value.length;
        ElMessage('获取数据成功.')
      }
      catch (err){
        ElMessage.error('获取数据失败.'+err)
        console.log(err)
      }
    }
    return {
      tableData,
      editingRow,
      handleGet,
      handleBlur,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
    };
  },

}
</script>
