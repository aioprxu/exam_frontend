<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-setting"></i>考试管理</template>
          <el-menu-item index="/admin-exam" @click="adminExam()">查询考试</el-menu-item>
          <el-menu-item index="1-2" @click="addUser()">添加考试</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i>考题管理</template>
          <el-menu-item index="/admin-question" @click="adminQuestion()">查询考题</el-menu-item>
          <el-menu-item index="2-1" @click="addQuestion()">添加题目</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>考卷管理</template>
          <el-menu-item index="3-1" @click="adminPaper()">查询考卷</el-menu-item>
          <el-menu-item index="3-2" @click="addUser()">添加考卷</el-menu-item>
        </el-submenu>
        <el-submenu index="4" @click="adminUser()">
          <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
          <el-menu-item index="4-1" @click="adminUser()">查询用户</el-menu-item>
          <el-menu-item index="4-2" @click="addUser()">添加用户</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: left; font-size: 25px">
        在线航理考试系统
        <el-button type="info" style="position: relative; left: 900px" @click="logout()">退出登陆</el-button>
      </el-header>

      <el-main>
        <el-form ref='AccountFrom' lable-position='left' lable-width='10px' :inline="true"
                 class='demo-ruleForm login-container'  style="text-align:left">

          <el-form-item prop="model" style="width:10%;">
            <el-input type="text" v-model="modelId" auto-complete="off" placeholder="机型"></el-input>
          </el-form-item>
          <el-form-item style="width:10%;">
            <el-button type="primary" style="width:100%;" @click='searchQuestion'>查询
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="id" label="id" width="140">
          </el-table-column>
          <el-table-column prop="questionType" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="questionstem" label="题目">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="editQuestion(scope.row)">编辑</el-button>

              <el-button type="info" @click="deleteQuestion(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-dialog
        title="考题"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                 class='demo-ruleForm login-container' style="text-align:center">
          <el-form-item prop="modelId" >机型
            <el-input type="text" v-model="modelId" style="width: 50%" auto-complete="off" :placeholder="modelId"></el-input>
          </el-form-item>
          <el-form-item prop="questionstem">题目
            <el-input type="text" v-model="questionstem" style="width: 50%" auto-complete="off" :placeholder="questionstem"></el-input>
          </el-form-item>
          <el-form-item prop="answer">选项
            <el-input type="text" v-model="options" style="width: 50%" auto-complete="off" :placeholder="options"></el-input>
          </el-form-item>
          <el-form-item prop="answer">答案
            <el-input type="text" v-model="answer" style="width: 50%" auto-complete="off" :placeholder="answer"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" @click='updateQuestion'>确定
            </el-button>
            <el-button type="primary" @click='dialogVisible = false'>取消
            </el-button>
          </el-form-item>
        </el-form>      </el-dialog>
      <el-dialog
        title="是否删除"
        :visible.sync="isDelete"
        width="50%"
      >
        <el-form>
          <el-form-item style="width:100%;">
            <el-button type="primary" @click='ensureDeleteQuestion'>确定
            </el-button>
            <el-button type="primary" @click='isDelete = false'>取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="添加考题"
        :visible.sync="addFlag"
        width="50%"
      >
        <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                 class='demo-ruleForm login-container' style="text-align:center">
          <el-form-item prop="modelId" >机型:
          <el-input type="text" v-model="modelId" style="width: 50%" auto-complete="off" :placeholder="modelId"></el-input>
        </el-form-item>
          <el-form-item prop="questionstem">题目:
            <el-input type="text" v-model="questionstem" style="width: 50%" auto-complete="off" :placeholder="questionstem"></el-input>
          </el-form-item>
          <el-form-item prop="questionstem">类型:
            <el-input type="text" v-model="questionType" style="width: 50%" auto-complete="off" :placeholder="questionType"></el-input>
          </el-form-item>
          <el-form-item prop="answer">选项:
            <el-input type="text" v-model="options" style="width: 50%" auto-complete="off" :placeholder="options"></el-input>
          </el-form-item>
          <el-form-item prop="answer">答案:
            <el-input type="text" v-model="answer" style="width: 50%" auto-complete="off" :placeholder="answer"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" @click='ensureAddQuestion'>确定
            </el-button>
            <el-button type="primary" @click='addFlag = false'>取消
            </el-button>
          </el-form-item>
        </el-form>      </el-dialog>
    </el-container>
  </el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  import axios from 'axios';

  export default {
    name: 'admin-question',
    data() {
      return {
        tableData:[],
        dialogVisible : false,
        isDelete : false,
        addFlag : false,
        questionstem : "",
        model : "",
        answer : "",
        id : 0,
        questionType : "",
        options : "",
        modelId : "",
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        axios.get('/question/getAll').then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.questionType = this.convertType(item.questionType)
          });
          console.log(this.tableData);
        });
      },
      convertType(questionType) {
        switch (questionType) {
          case 1://填空
            return '填空题';
            break;
          case 5://简答
            return '简答题';
            break;
          case 6://程序
            return '程序题';
            break;
          case 2://选择
            return '单选题';
            break;
          case 4://判断
            return '判断题';
            break;
          case 3://多选
            return '多选题';
            break;
        }
      },
      unConvertType(questionType) {
        switch (questionType) {
          case '填空题'://填空
            return 1;
            break;
          case '简答题'://简答
            return 5;
            break;
          case '单选题'://选择
            return 2;
            break;
          case '判断题'://判断
            return 4;
            break;
          case '多选题'://多选
            return 3;
            break;
        }
      },
      getQuestion() {
        this.loadData();
      },
      adminUser() {
        this.$router.push({path: '/admin-user'});
      },
      adminExam() {
        this.$router.push({path: '/admin-exam'});
      },
      adminPaper() {
        this.$router.push({path: '/admin-paper'});
      },
      adminAnswer() {
        this.$router.push({path: '/admin-answer'});
      },
      adminQuestion() {
        this.$router.push({path: '/admin-question'});
      },
      logout() {
        this.$router.push({path: '/login'});
      },
      editQuestion(rowData) {
        this.dialogVisible = true;
        console.log(rowData);
        this.modelId = rowData.modelId;
        this.questionstem = rowData.questionstem;
        this.answer = rowData.answer;
        this.id = rowData.id;
        this.questionType = rowData.questionType;
        this.options = rowData.options;
      },
      searchQuestion() {
        axios.get('/question/getByModel', {
          params: {
            model: this.modelId
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.questionType = this.convertType(item.questionType)
          });
          console.log(this.tableData);
        });
        this.$router.push({path: '/admin-question'});
      },
      updateQuestion() {
        this.questionType = this.unConvertType(this.questionType);
        axios.post('/question/update', {data:JSON.stringify({id:this.id,modelId:this.modelId,questionType:this.questionType,
            questionstem:this.questionstem,options:this.options,answer:this.answer})}).then((result) => {
        });
        this.dialogVisible = false;
      },
      deleteQuestion(rowData) {
        this.id = rowData.id;
        this.isDelete = true;
      },
      ensureDeleteQuestion() {
        axios.get('/question/del', {
          params: {
            id: this.id
          }
        }).then((result) => {
          this.isDelete = false;
          this.$router.push({path: '/admin'});
        });
      },
      addQuestion() {
        this.addFlag = true;
      },
      ensureAddQuestion() {
        axios.post('/question/add', {data:JSON.stringify({
            modelId : this.modelId,
            questionType : this.questionType,
            questionstem : this.questionstem,
            options : this.options,
            answer : this.answer
          })}).then((result) => {
          this.addFlag = false;
          this.$router.push({path: '/admin'});
        });
      }
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
