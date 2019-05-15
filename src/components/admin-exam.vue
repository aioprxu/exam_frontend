<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-setting"></i>考试管理</template>
          <el-menu-item index="/admin-exam" @click="adminExam()">查询考试</el-menu-item>
          <el-menu-item index="1-2" @click="addExam()">添加考试</el-menu-item>
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
        <el-form ref='AccountFrom' lable-position='left' lable-width='10px' :inline="true"
                 class='demo-ruleForm login-container'  style="text-align:left">

          <el-form-item prop="model" style="width:10%;">
            <el-input type="text" v-model="modelId" auto-complete="off" placeholder="机型"></el-input>
          </el-form-item>
          <el-form-item style="width:10%;">
            <el-button type="primary" style="width:100%;" @click='searchExam'>查询
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="examId" label="id" width="140">
          </el-table-column>
          <el-table-column prop="name" label="考试名称" width="120">
          </el-table-column>
          <el-table-column prop="startTime" label="考试时间">
          </el-table-column>
          <el-table-column prop="isOpen" label="是否开卷(1是开卷，0是闭卷)">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="score(scope.row)">判卷</el-button>

              <el-button type="info" @click="editExam(scope.row)">编辑</el-button>

              <el-button type="info" @click="deleteExam(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="编辑考试"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm login-container' style="text-align:center">
            <el-form-item prop="modelId" >机型
              <el-input type="text" v-model="modelId" style="width: 50%" auto-complete="off" :placeholder="modelId"></el-input>
            </el-form-item>
            <el-form-item prop="questionstem">姓名
              <el-input type="text" v-model="name" style="width: 50%" auto-complete="off" :placeholder="name"></el-input>
            </el-form-item>
            <el-form-item prop="answer">试卷
              <el-input type="text" v-model="paperId" style="width: 50%" auto-complete="off" :placeholder="paperId"></el-input>
            </el-form-item>
            <el-form-item prop="answer">考生
              <el-input type="text" v-model="userId" style="width: 50%" auto-complete="off" :placeholder="userId"></el-input>
            </el-form-item>
            <el-form-item prop="answer">开卷
              <el-input type="text" v-model="isOpen" style="width: 50%" auto-complete="off" :placeholder="isOpenText"></el-input>
            </el-form-item>
            <el-form-item prop="answer">开始
              <el-input type="text" v-model="startTime" style="width: 50%" auto-complete="off" :placeholder="startTime"></el-input>
            </el-form-item>
            <el-form-item prop="answer">结束
              <el-input type="text" v-model="stopTime" style="width: 50%" auto-complete="off" :placeholder="stopTime"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='updateExam'>确定
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
              <el-button type="primary" @click='ensureDeleteExam'>确定
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
            <el-form-item prop="questionstem">姓名
              <el-input type="text" v-model="name" style="width: 50%" auto-complete="off" :placeholder="name"></el-input>
            </el-form-item>
            <el-form-item prop="answer">试卷
              <el-input type="text" v-model="paperId" style="width: 50%" auto-complete="off" :placeholder="paperId"></el-input>
            </el-form-item>
            <el-form-item prop="answer">考生
              <el-input type="text" v-model="userId" style="width: 50%" auto-complete="off" :placeholder="userId"></el-input>
            </el-form-item>
            <el-form-item prop="answer">开卷
              <el-input type="text" v-model="isOpen" style="width: 50%" auto-complete="off" :placeholder="isOpenText"></el-input>
            </el-form-item>
            <el-form-item prop="answer">开始
              <el-input type="text" v-model="startTime" style="width: 50%" auto-complete="off" :placeholder="startTime"></el-input>
            </el-form-item>
            <el-form-item prop="answer">结束
              <el-input type="text" v-model="stopTime" style="width: 50%" auto-complete="off" :placeholder="stopTime"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='ensureAddQuestion'>确定
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
  import {formatDate} from "@/components/date";
  import {dateForm} from "@/components/date";

  export default {
    name: 'admin-exam',
    data() {
      return {
        tableData:[],
        dialogVisible : false,
        isDelete : false,
        addFlag : false,
        examId : "",
        modelId : "",
        name : "",
        paperId : "",
        userId : "",
        isOpen : "",
        startTime : "2019-05-13 18:35",
        stopTime : "2019-05-13 19:35",
        isOpenText : "1是开卷，0是闭卷",
        pickerOptionsStart: {
          disabledDate (time) {
            return time.getTime() < 1488297600000 || time.getTime() <= Date.now();
          }
        },
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        let param = {modelId: 0};
        axios.get('/exam/getAll').then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.startTime = formatDate(new Date(item.startTime), "yyyy-MM-dd hh:mm");
            item.stopTime = formatDate(new Date(item.stopTime), "yyyy-MM-dd hh:mm");
          });
          console.log(this.tableData);
        });
      },
      getQuestion() {
        this.loadData();
      },
      adminUser() {
        this.$router.push({path: '/admin-user'});
      },
      adminAnswer() {
        this.$router.push({path: '/admin-answer'});
      },
      adminExam() {
        this.$router.push({path: '/admin-exam'});
      },
      adminPaper() {
        this.$router.push({path: '/admin-paper'});
      },
      adminQuestion() {
        this.$router.push({path: '/admin-question'});
      },
      logout() {
        this.$router.push({path: '/login'});
      },
      searchExam() {
        axios.get('/exam/getByModel', {
          params: {
            model: this.modelId
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.startTime = formatDate(new Date(item.startTime), "yyyy-MM-dd hh:mm");
            item.stopTime = formatDate(new Date(item.stopTime), "yyyy-MM-dd hh:mm");
          });
          console.log(this.tableData);
        });
        this.$router.push({path: '/admin-exam'});
      },
      editExam(rowData) {
        this.examId = rowData.examId;
        this.modelId = rowData.modelId;
        this.name = rowData.name;
        this.paperId = rowData.paperId;
        this.userId = rowData.userId;
        this.isOpen = rowData.isOpen;
        this.startTime = rowData.startTime;
        this.stopTime = rowData.stopTime;
        this.dialogVisible = true;
      },
      updateExam () {
        this.startTime = dateForm(this.startTime);
        this.stopTime = dateForm(this.stopTime);
        axios.post('/exam/update', {data:JSON.stringify({examId:this.examId,modelId:this.modelId,name:this.name,
            paperId:this.paperId,userId:this.userId,isOpen:this.isOpen,
            startTime:this.startTime,stopTime:this.stopTime})}).then((result) => {
        });
        this.dialogVisible = false;
      },
      deleteExam (rowData) {
        this.examId = rowData.examId;
        this.isDelete = true;
      },
      ensureDeleteExam() {
        axios.get('/exam/del', {
          params: {
            examId: this.examId
          }
        }).then((result) => {
          this.isDelete = false;
          this.$router.push({path: '/admin'});
        });
      },
      addExam () {
        this.addFlag = true;
      },
      ensureAddQuestion() {
        this.startTime = dateForm(this.startTime);
        this.stopTime = dateForm(this.stopTime);
        axios.post('/exam/add', {data:JSON.stringify({
            examId:this.examId,modelId:this.modelId,name:this.name,
            paperId:this.paperId,userId:this.userId,isOpen:this.isOpen,
            startTime:this.startTime,stopTime:this.stopTime
          })}).then((result) => {
          this.addFlag = false;
          this.$router.push({path: '/admin'});
        });
      },
      score (rowData) {
        sessionStorage.setItem("examId", rowData.examId);
        this.$router.push({path: '/admin-answer'});
      }
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
