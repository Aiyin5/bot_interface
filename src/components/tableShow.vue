<template>
  <div>
    <el-button
        type="primary"
        size="small"
        @click="handleAdd">
      新增
    </el-button>
    <el-button
        type="primary"
        size="small"
        @click="handleGet">获取当前数据</el-button>
    <el-button
        type="primary"
        size="small"
        @click="handleUpdate">
      更新到机器人
    </el-button>
    <el-button
        type="primary"
        size="small"
        @click="handleSaveLocal">
      保存至本地
    </el-button>
  </div>
  <div>
    <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%">
      <el-table-column
          prop="name"
          label="输入">
        <template #default="scope">
          <el-input
              v-model="scope.row.name"
              size="small"
              @blur="handleBlur(scope.row)">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          label="输出">
        <template #default="scope">
          <el-input
              v-model="scope.row.address"
              size="small"
              @blur="handleBlur(scope.row)">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          label="操作">
        <template #default="scope">
        <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)">
          更新
        </el-button>
        <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row)">
          删除
        </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
</div>
</template>


<script>
import { ref } from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: 'tableShow',
  mounted() {
    this.handleGet();
  },
  setup() {
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
    const handleAdd = () => {
      tableData.value.push({
        id: tableData.value.length + 1,
        name: '1',
        address: '1'
      });
      total.value=tableData.value.length;


    };
    const handleUpdate= () => {
      let str=getFile();
      let item={data:str}
      axios.post('/app/update',item,{
        headers: {
          'Content-Type': 'application/json'
        }}).
      then(response => {
        console.log(response);
        ElMessage('更新成功.')
        // 处理响应
      }).catch(error => {
        // 处理错误
        ElMessage('更新失败.'+error)
        console.log(error);
      });
    }
    const getFile=()=>{
      let out=[];
      for(let one of tableData.value){
        let cur={};
        cur.prompt=[];
        one.name=one.name.replaceAll("，",",");
        if(!one.name.includes(",")){
          cur.prompt.push(one.name);
        }
        else {
          cur.prompt=one.name.split(',');
        }
        cur.completion=one.address;
        let str=JSON.stringify(cur);
        out.push(str);
      }
      return out;
    }
    const handleSaveLocal = () => {
      const blob = new Blob([getFile], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "表格数据.json";
      link.click();
      URL.revokeObjectURL(url);
    }

    const handleEdit = (row) => {
      let data={
        "data":{
          "prompt":row.name,
          "completion":row.address
        },
        "where":{"id":row.id}
      }
      axios.post('/server/update',data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        console.log(response);
        ElMessage('更新成功.')
      }).catch(error => {
        // 处理错误
        ElMessage('更新失败.')
        //displayText.value=error;
        console.log(error);
      });
    };

    const handleBlur = () => {
      // 保存修改后的数据
      editingRow.value = null;
    };

    const handleChange = () => {
      // 保存修改后的数据
    };

    const handleDelete = (row) => {
      console.log(row);
      let data={
        "id":row.id
      }
      axios.post('/server/delete',data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        console.log(response);
        ElMessage('删除成功.')
      }).catch(error => {
        // 处理错误
        ElMessage('删除失败.')
        //displayText.value=error;
        console.log(error);
      });
      const index = tableData.value.indexOf(row);
      //console.log(index);
      if (index !== -1) {

        tableData.value.splice(index, 1);
      }
      total.value=tableData.value.length;
    };

    const handleGet = ()=>{
      tableData.value=[];
      axios.get('/server/data').
      then(response => {
        let items=response.data;
        for(let item of items){
          tableData.value.push({
            id: item.id,
            name: item.prompt.toString(),
            address: item.completion
          });
        }
        total.value=tableData.value.length;
        ElMessage('获取数据成功.')
        // 处理响应
      }).catch(error => {
        // 处理错误
        ElMessage('获取数据失败.'+error)
        console.log(error);
      });
    }
    return {
      tableData,
      editingRow,
      handleAdd,
      handleGet,
      handleEdit,
      handleBlur,
      handleChange,
      response: null,
      error: null,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      handleSaveLocal,
      total,
      pageSize,
      handleUpdate,
      currentPage,
    };
  },

}
</script>
