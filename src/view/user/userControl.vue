<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="name"
          label="昵称">
      </el-table-column>
      <el-table-column
          prop="email"
          label="账号">
      </el-table-column>
      <el-table-column
          prop="level"
          label="权限">
      </el-table-column>
      <el-table-column
          label="操作">
        <template #default="scope">
          <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { ref } from 'vue';
import {ElMessage} from "element-plus";
import {useStore } from 'vuex'
import {membersFind} from "@/api";
export default {
  name: 'userControl',
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
     /* let data={
        "id":row.id
      }
      try {
        let res = await deletPreInfo(data);
        if(!res.data.ActionType==="OK"){
          ElMessage.error('删除失败.');
        }
        else {
          ElMessage('删除成功.')
        }
      }
      catch (err){
        ElMessage.error('删除失败.'+err);
        console.log(err);
      }
      const index = tableData.value.indexOf(row);
      //console.log(index);
      if (index !== -1) {
        tableData.value.splice(index, 1);
      }
      total.value=tableData.value.length;*/
    };

    const handleGet = async ()=>{
      tableData.value=[];
      if(store.state.userInfo.bot_id==='0'){
        return;
      }
      try{
        let response=await membersFind({"bot_id":store.state.userInfo.bot_id});
        if(!response.data.ActionType===1){
          ElMessage.error('获取数据失败.')
          return;
        }
        let items=response.data.data;
        for(let item of items){
          tableData.value.push({
            name:item.name,
            email: item.email,
            level: item.level
          });
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
