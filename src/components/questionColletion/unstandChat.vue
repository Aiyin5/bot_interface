<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-tag class="tag1">文本框输入</el-tag>
      </el-col>
      <el-col :span="16">
        <el-tag class="tag2">预览</el-tag>
      </el-col>
    </el-row>
  </div>
  <div>
    <el-row>
      <el-col :span="8"><div class="grid-content ep-bg-purple" />
        <el-row>
          <el-input class="input1"
                    v-model="textarea"
                    :rows="8"
                    type="textarea"
                    placeholder="Please input">
          </el-input>
        </el-row>
        <el-button class="button1" type="primary" size="small" @click="showText">开始识别</el-button>
        <el-row>
        <el-tag class="tag3">示例</el-tag>
        </el-row>
        <el-card class="card1" shadow="hover">{{contentData}}
        </el-card>
      </el-col>
      <el-col :span="16"><div class="grid-content ep-bg-purple-light" />
        <div v-loading="loading" class="completion1">
          <el-card shadow="hover">
            <el-table :data="tableData" border style="width: 100%;height: 400px">
<!--              <el-table-column width="180px" prop="input" label="问题">
              </el-table-column>-->
              <el-table-column width="200px"
                  prop="prompt"
                  label="问题">
                <template #default="scope">
                  <el-input
                      type="textarea"
                      rows="2"
                      v-model="scope.row.prompt"
                      size="small"
                      @blur="handleBlur(scope.row)">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column width="380px" prop="completion" label="答案">
              </el-table-column>
              <el-table-column width="80px"
                  label="操作">
                <template #default="scope">
<!--                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                  </el-button>-->
                  <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="upDateToData" >
              添加到问答库
            </el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogFormVisible" title="编辑非标问答">
    <span>提问：<el-input v-model="prompt" autocomplete="off" style="width: 70%;"/></span>
    <div>回答：<el-input v-model="completion" autocomplete="off" style="width: 70%;" /></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="upDateToData" style="margin-right: 10px">
          添加到问答库
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'unstandChat',
  setup() {
    const prompt=ref('');
    const completion=ref('');
    const dialogFormVisible = ref(false);
    const loading = ref(false)
    const textarea = ref('');
    const tableData = ref([

    ]);

    const contentData=ref('宣传公会是外界了解 SeeDAO 的窗口。SeeDAO为Web3观点碰撞、创意与实践提供了土壤。每天都有新鲜的观点、高价值的对话、前沿而好玩的产品、先锋前卫的创作在这里诞生。而我们，就是将这些内容呈现给外界的管道。我们有对 Web3 的理解和态度，并试图影响更多对此感兴趣的人们。欢迎一切热心于文字、视觉、传播工作的朋友加入我们。')
    const showText = ()=>{
      tableData.value=[];
      loading.value=true;
      let finalText="将下面的内容拆分为多个提问和回答，以问答对(Q:和A:)的格式展示。";
      finalText=finalText+textarea.value;
      let item={"message":finalText};
      axios.post('/app/question',item,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        ElMessage('发送成功.')
        console.log(response);
        let res=JSON.stringify(response.data);
        res=res.toString();
        console.log(res);
        res=res.replaceAll("：",":");
        res=res.replaceAll("\\n","");
        if(res.includes("Q:"))
        {
          let item=res.split("Q:");
          for(let one of item){
            if(!one.includes("A:")){
              continue;
            }
            let pair=one.split("A:");
            let tableMem={};
            tableMem.prompt=pair[0];
            tableMem.completion=pair[1];
            tableData.value.push(tableMem);
          }
        }
        else if(res.includes("提问:"))
        {
          let item=res.split("提问:");
          for(let one of item){
            if(!one.includes("回答:")){
              continue;
            }
            let pair=one.split("回答:");
            let tableMem={};
            tableMem.prompt=pair[0];
            tableMem.completion=pair[1];
            tableData.value.push(tableMem);
          }
        }
        else{
          ElMessage('解析失败.')
        }

        //displayText.value=response.data.message;
        loading.value=false;
        // 处理响应
      }).catch(error => {
        // 处理错误
        ElMessage('发送失败.')
        //displayText.value=error;
        loading.value=false;
        console.log(error);
      });
    }
    const handleEdit = (index,  item)=>{
      prompt.value=item.prompt;
      completion.value=item.completion;
      dialogFormVisible.value = true;
    }
    const handleDelete = (index,  item)=>{
      console.log(item);
      if (index !== -1) {
        tableData.value.splice(index, 1);
      }
    }

    const upDateToData = ()=>{
      let data=[];
      for(let item of tableData.value){
        let tableMem={};
        tableMem.prompt=item.prompt;
        tableMem.completion=item.completion;
        tableMem.prompt=tableMem.prompt.replaceAll("，",",");
        tableMem.prompt=tableMem.prompt.toLowerCase();
        data.push(tableMem);
      }
      axios.post('/server/addMulti',data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        console.log(response);
        ElMessage('发送成功.')
        tableData.value=[];
      }).catch(error => {
        // 处理错误
        ElMessage('发送失败.')
        //displayText.value=error;
        console.log(error);
      });
/*      prompt.value=prompt.value.replaceAll("，",",");
      let content=prompt.value.toLowerCase();
      let data={
        "prompt":content,
        "completion":completion.value
      }
      axios.post('/server/add',data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        console.log(response);
        ElMessage('发送成功.')
      }).catch(error => {
        // 处理错误
        ElMessage('发送失败.')
        //displayText.value=error;
        console.log(error);
      });
      dialogFormVisible.value = false*/
    }
    return {
      textarea,
      contentData,
      showText,
      loading,
      tableData,
      handleEdit,
      dialogFormVisible,
      prompt,
      completion,
      upDateToData,
      handleDelete
    }
  },
}
</script>


<style scoped>
.tag1 {
  /* 文本框输入 */
  position: relative;
  float:left;
  margin-top: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  color: #000000;
}
.tag2 {
  /* 文本框输入 */
  position: relative;
  float:left;
  margin-top: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  color: #000000;
}

.input1 {
  position: relative;
  margin-top: 20px;
  margin-right: 40px;
}
.completion1{
  float:left;
  margin-top: 20px;
  position: relative;
}
.button1{
  float:right;
  margin-right: 40px;
  position: relative;
}
.tag3{
  float:left;
  margin-top: 20px;
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */
  color: #000000;
}
.card1{
  position: relative;
  float:right;
  margin-top: 20px;
  margin-right: 40px;
  font-size: 14px;
  text-align: left;
}
</style>