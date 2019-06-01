<template>
  <el-container>
    <span style="font-size: 25px">在线航理考试系统</span>
    <el-header style="text-align: left">
      <el-col :span="24">
        <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 :router="true">
          <el-menu-item index="/my-exam">我的考试</el-menu-item>
          <el-menu-item index="/my-result">我的成绩</el-menu-item>
          <el-menu-item index="/" style="position: relative; left: 1100px">退出登陆</el-menu-item>
        </el-menu>
      </el-col>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="userName" label="考生姓名" width="180">
        </el-table-column>
        <el-table-column prop="examName" label="考试名称" width="180">
        </el-table-column>
        <el-table-column prop="score" label="成绩" width="180">
        </el-table-column>
        <!--第二步  开始进行修改和查询操作-->
        <el-table-column label="操作" align="center" min-width="100">

          <template slot-scope="scope">

            <el-button type="text" @click="qa(scope.row)">对此成绩有疑问？</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'my-result',
    data() {
      return {
        tableData: []
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        let param = {modelId: 0};
        let id = window.sessionStorage.getItem("id");
        axios.get('/result/get', {
          params: {
            id: id
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data
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
