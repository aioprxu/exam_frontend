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
          <el-form ref='AccountFrom'
                   class='demo-ruleForm login-container' style="position: relative;">
            <el-table :data="answerData">
              <el-table-column prop="title" label="问题" width="140">
              </el-table-column>
              <el-table-column prop="answer" label="答案" width="120">
              </el-table-column>
              <el-table-column prop="score" label="分数" >
              </el-table-column>
              <el-table-column label="打分"  width="160">
                <template slot-scope="scope">
                  <el-form :model="scope.row" ref="scope.row" >
                    <el-form-item prop="paramValue">
                      <el-input v-show="true" size="small" v-model="scope.row.score" style="width:100px"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='updateAnswer'>确定
              </el-button>
              <el-button type="primary" @click='dialogVisible = false'>取消
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
        answerData:[],
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
      score(rowData) {
        axios.get('/answer/get',{params:{examId:sessionStorage.getItem("examId"), userId:rowData.userId}}).then((result) => {
          console.log(result.data.data);
          this.answerData = result.data.data;
          this.dialogVisible = true;
          console.log(this.answerData);
        });
      },
      updateAnswer() {
        console.log(this.answerData);
        axios.post('/answer/update', {data:JSON.stringify({
            answerList:this.answerData
          })}).then((result) => {
          this.dialogVisible = false;
          this.loadData();
        });
      },
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
