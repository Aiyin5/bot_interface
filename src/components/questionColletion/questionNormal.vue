<template>
  <el-row>
    <el-col :span="8">
      <el-row>
        <el-tag class="tag4">问题</el-tag>
      </el-row>
      <el-row>
        <el-input class="input_question"
                  v-model="question"
                  placeholder="Please input">
        </el-input>
      </el-row>
      <el-row>
        <el-tag class="tag4">答案</el-tag>
      </el-row>
      <el-row>
        <el-input class="input_question"
                  v-model="answer"
                  :rows="6"
                  type="textarea"
                  placeholder="Please input">
        </el-input>
      </el-row>
      <el-button class="buttonquestion"
                 type="primary"
                 size="small"
                 @click="handleAdd()">
        新增
      </el-button>
      <el-row>
        <el-tag class="tag3">示例</el-tag>
      </el-row>
      <el-row>
        <el-card  class="card1">
          <div>问题：</div>
          <div class="content1">seedao,使命</div>
          <div class="content1">回答：</div>
          <div class="content1">其使命是连接 100 万 web3 领域的华人，并促进社区成员的“连接、流动、交换、自由”。</div>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="16" class="output1">
        <el-card shadow="hover" v-loading="loading">
          <el-table :data="tableData" border style="width: 100%;height: 400px">
            <el-table-column  prop="prompt" width="250px" label="输入">
            </el-table-column>
            <el-table-column prop="completion" label="输出">
            </el-table-column>
          </el-table>
          <el-button class="buttonright"
                     type="primary"
                     size="small"
                     @click="handleSend()">
            发送
          </el-button>
          <el-button class="buttonright"
                     type="primary"
                     size="small"
                     @click="handleClean()">
            清空
          </el-button>
        </el-card>
    </el-col>
  </el-row>

</template>

<script>

import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
export default {
  name: 'questionNormal',
  setup() {
    const loading = ref(false)
    const question= ref('');
    const answer= ref('');
    const tableData = ref([
    ]);

    const contentData=ref('')
    const handleAdd = ()=>{
      if(question.value!='' && answer.value!=''){
        question.value=question.value.replaceAll("，",",");
        question.value=question.value.toLowerCase();
        tableData.value.push({"prompt":question.value,"completion":answer.value});
        question.value='';
        answer.value='';
      }
      else {
        ElMessage('请输入内容')
      }
    }
    const handleSend = ()=>{
      let data=tableData.value;
      axios.post('/server/addMulti',data,{
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
    }
    const handleClean = ()=>{
      tableData.value=[];
    }
    return {
      question,
      answer,
      contentData,
      loading,
      tableData,
      handleSend,
      handleClean,
      handleAdd
    }
  },
}
</script>


<style scoped>
.input_question{
  position: relative;
  float:left;
  margin-top: 5px;
  margin-right: 40px;
}
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
.output1{
  float:left;
  margin-top: 20px;
  position: relative;
}
.button1{
  position: relative;
}
.tag3{
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
.tag4{
  float:left;
  margin-top: 10px;
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
  margin-top: 20px;
  margin-right: 40px;
  font-size: 16px;
  text-align: left;
}
.buttonright{
  position: relative;
  margin-top: 20px;
  margin-right: 40px;
}
.content1{
  position: relative;
  margin-top: 5px;
}
.buttonquestion{
  float:right;
  margin-right: 40px;
}
</style>