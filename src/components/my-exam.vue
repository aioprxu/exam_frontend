<template>
  <el-container>
    <span style="font-size: 25px">在线航理考试系统</span>
    <el-header style="text-align: left">
      <el-col :span="24">
        <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 :router="true">
          <el-menu-item index="/my-exam">我的考试</el-menu-item>
          <el-menu-item index="/my-result">我的成绩</el-menu-item>
          <el-menu-item @click="explain">成绩分析</el-menu-item>
          <el-menu-item index="/" style="position: relative; left: 1100px">退出登陆</el-menu-item>
        </el-menu>
      </el-col>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="examId" label="id" width="140">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
        </el-table-column>
        <el-table-column prop="stopTime" label="结束时间">
        </el-table-column>
        <!--第二步  开始进行修改和查询操作-->
        <el-table-column label="操作" align="center" min-width="100">

          <template slot-scope="scope">

            <el-button type="info" @click="startExam(scope.row)">开始考试</el-button>

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
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import {formatDate} from "@/components/date";

  export default {
    name: 'my-exam',
    data() {
      return {
        tableData: [],
        dialogVisible : false,
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        let param = {modelId: 0};
        let id = window.sessionStorage.getItem("id");
        axios.get('/exam/get', {
          params: {
            id: id
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.startTime = formatDate(new Date(item.startTime), "yyyy-MM-dd hh:mm");
            item.stopTime = formatDate(new Date(item.stopTime), "yyyy-MM-dd hh:mm");
          });
        });
      },
      startExam(rowData) {
        console.log(rowData.userId);
        sessionStorage.setItem("userId",rowData.userId);
        sessionStorage.setItem("examId",rowData.examId);
        this.$router.push({path: '/exam'});
      },
      explain(){

      }
    }
  }
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
