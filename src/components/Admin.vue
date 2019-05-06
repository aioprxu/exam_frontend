<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button type="info" @click="addUser">考试管理</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">用户管理</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">试题管理</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addUser">试卷管理</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'admin'
  }
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
