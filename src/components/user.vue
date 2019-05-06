<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button type="info" @click="addUser">我的考试</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">我的成绩</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">退出登陆</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

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
