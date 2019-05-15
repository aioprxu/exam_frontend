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
  </el-container>
</template>
2
<script>
  export default {
    name: 'user'
  }
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
