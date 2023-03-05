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
        <el-input class="input1"
                  v-model="textarea"
                  :rows="8"
                  type="textarea"
                  placeholder="Please input">
        </el-input>
        <el-button class="button1" type="info" @click="showText">Send</el-button>
        <el-tag class="tag3">示例</el-tag>
        <el-card class="card1" shadow="hover">{{contentData}}
        </el-card>
      </el-col>
      <el-col :span="16"><div class="grid-content ep-bg-purple-light" />
        <div v-loading="loading" class="output1">
          <el-card shadow="hover">
            <el-table :data="tableData" border style="width: 100%;height: 350px">
              <el-table-column style="width: 40%;" prop="input" label="输入"  />
              <el-table-column prop="output" label="输出"  />
            </el-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'unstandChat',
  setup() {
    const loading = ref(false)
    const textarea = ref('');
    const tableData = ref([
    ]);
    const contentData=ref('宣传公会是外界了解 SeeDAO 的窗口。SeeDAO为Web3观点碰撞、创意与实践提供了土壤。每天都有新鲜的观点、高价值的对话、前沿而好玩的产品、先锋前卫的创作在这里诞生。而我们，就是将这些内容呈现给外界的管道。我们有对 Web3 的理解和态度，并试图影响更多对此感兴趣的人们。欢迎一切热心于文字、视觉、传播工作的朋友加入我们。')
    const showText = ()=>{
      loading.value=true;
      let item={"message":textarea.value};
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
            tableMem.input=pair[0];
            tableMem.output=pair[1];
            tableData.value.push(tableMem);
          }
        }
        else if(res.includes("问:"))
        {
          let item=res.split("问:");
          for(let one of item){
            if(!one.includes("答:")){
              continue;
            }
            let pair=one.split("答:");
            let tableMem={};
            tableMem.input=pair[0];
            tableMem.output=pair[1];
            this.tableData.value.push(tableMem);
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

    return {
      textarea,
      contentData,
      showText,
      loading,
      tableData,
    }
  },
}
</script>


<style scoped>
.tag1 {
  /* 文本框输入 */
  position: relative;
  top: 30px;
  left: -130px;
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
  top: 30px;
  left: -330px;
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
  left: 15px;
  top: 50px;
  width: 80%;
}
.output1{
  position: relative;
  left: 30px;
  top: 50px;
  width: 90%;
  high:300px;
}
.button1{
  position: relative;
  left: -60px;
  top: 35px;
}
.tag3{
  position: relative;
  left: -150px;
  top: 55px;
}
.card1{
  position: relative;
  left: 20px;
  top: 70px;
  width: 80%;
  font-size: 12px;
  text-align: left;
}
</style>