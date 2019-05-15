<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-setting"></i>考试管理</template>
          <el-menu-item index="/admin-exam" @click="adminExam()">查询考试</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i>考题管理</template>
          <el-menu-item index="/admin-question" @click="adminQuestion()">查询考题</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>考卷管理</template>
          <el-menu-item index="3-1" @click="adminPaper()">查询考卷</el-menu-item>
        </el-submenu>
        <el-submenu index="4" @click="adminUser()">
          <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
          <el-menu-item index="4-1" @click="adminUser()">查询用户</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: left; font-size: 25px">
        在线航理考试系统
        <el-button type="info" style="position: relative; left: 900px" @click="logout()">退出登陆</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="userId" label="userId" width="140">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="120">
          </el-table-column>
          <el-table-column prop="examName" label="考试名" width="120">
          </el-table-column>
          <el-table-column prop="score" label="分数" width="120">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="score(scope.row)">判卷</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="判卷"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm login-container' style="text-align:center">
            <el-table :data="questionData">
              <el-table-column prop="id" label="id" width="140">
              </el-table-column>
              <el-table-column prop="questionType" label="类型" width="120">
              </el-table-column>
              <el-table-column prop="questionstem" label="题目">
              </el-table-column>
            </el-table>
            <el-form-item prop="modelId" >添加试题（逗号分隔）
              <el-input type="text" v-model="questionId" style="width: 50%" auto-complete="off" :placeholder="questionId"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='updatePaper'>确定
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
              <el-button type="primary" @click='ensureDeletePaper'>确定
              </el-button>
              <el-button type="primary" @click='isDelete = false'>取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="添加考试"
          :visible.sync="addFlag"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm login-container' style="text-align:center">
            <el-form-item prop="modelId" >机型
              <el-input type="text" v-model="modelId" style="width: 50%" auto-complete="off" :placeholder="modelId"></el-input>
            </el-form-item>
            <el-form-item prop="questionstem">名称
              <el-input type="text" v-model="name" style="width: 50%" auto-complete="off" :placeholder="name"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='ensureAddPaper'>确定
              </el-button>
              <el-button type="primary" @click='addFlag = false'>取消
              </el-button>
            </el-form-item>
          </el-form>      </el-dialog>
      </el-main>
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
    name: 'admin-answer',
    data() {
      return {
        tableData:[],
        questionData:[],
        dialogVisible : false,
        isDelete : false,
        addFlag : false,
        examId : "",
        modelId : "",
        name : "",
        paperId : "",
        id : 0,
        questionId : "",
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        axios.get('/result/getByExam',{params:{exam:sessionStorage.getItem("examId")}}).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          console.log(this.tableData);
        });
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
      searchPaper() {
        axios.get('/paper/getByModel', {
          params: {
            model: this.modelId
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          console.log(this.tableData);
        });
        this.$router.push({path: '/admin-paper'});
      },
      editPaper(rowData) {
        this.paperId = rowData.paperId;
        axios.get('/question/getByPaper',{params:{paper: rowData.paperId}}).then((result) => {
          console.log(result.data);
          this.questionData = result.data.data;
          this.questionData.forEach(item => {
            item.questionType = this.convertType(item.questionType)
          });
          console.log(this.tableData);
        });
        this.dialogVisible = true;
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
      updatePaper () {
        axios.post('/paper/update', {data:JSON.stringify({
            paperId:this.paperId,
            questionId : this.questionId
          })}).then((result) => {
        });
        this.dialogVisible = false;
      },
      deletePaper (rowData) {
        this.paperId = rowData.paperId;
        this.isDelete = true;
      },
      ensureDeletePaper() {
        axios.get('/paper/del', {
          params: {
            id: this.paperId
          }
        }).then((result) => {
          this.isDelete = false;
          this.$router.push({path: '/admin'});
        });
      },
      addPaper () {
        this.addFlag = true;
      },
      ensureAddPaper() {
        axios.post('/paper/add', {data:JSON.stringify({
            modelId:this.modelId,name:this.name,
          })}).then((result) => {
          this.addFlag = false;
          this.$router.push({path: '/admin'});
        });
      },
      deleteQuestion(rowData) {
        this.id = rowData.id;
        this.isDelete = true;
      }
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
