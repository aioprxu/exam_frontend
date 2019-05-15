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
          <el-table-column prop="id" label="id" width="140">
          </el-table-column>
          <el-table-column prop="name" label="用户名" width="120">
          </el-table-column>
          <el-table-column prop="profession" label="用户类型">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="editUser(scope.row)">编辑</el-button>

              <el-button type="info" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="用户编辑"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm login-container' style="text-align:center">
            <el-form-item style="width:100%;">
              <el-form-item prop="name" >名称:
                <el-input type="text" v-model="name" style="width: 50%" auto-complete="off" :placeholder="name"></el-input>
              </el-form-item>
              <el-form-item prop="password">密码:
                <el-input type="text" v-model="password" style="width: 50%" auto-complete="off" :placeholder="password"></el-input>
              </el-form-item>
              <el-form-item prop="profession">职业:
                <el-input type="text" v-model="profession" style="width: 50%" auto-complete="off" :placeholder="profession"></el-input>
              </el-form-item>
              <el-form-item prop="info">描述:
                <el-input type="text" v-model="info" style="width: 50%" auto-complete="off" :placeholder="info"></el-input>
              </el-form-item>
              <el-button type="primary" @click='updateUser'>确定
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
              <el-button type="primary" @click='ensureDeleteUser'>确定
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
            <el-form-item prop="name" >姓名:
              <el-input type="text" v-model="name" style="width: 50%" auto-complete="off" :placeholder="name"></el-input>
            </el-form-item>
            <el-form-item prop="password">密码:
              <el-input type="text" v-model="password" style="width: 50%" auto-complete="off" :placeholder="password"></el-input>
            </el-form-item>
            <el-form-item prop="profession">职业:
              <el-input type="text" v-model="profession" style="width: 50%" auto-complete="off" :placeholder="profession"></el-input>
            </el-form-item>
            <el-form-item prop="info">描述:
              <el-input type="text" v-model="info" style="width: 50%" auto-complete="off" :placeholder="info"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button type="primary" @click='ensureAddUser'>确定
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
    name: 'admin-user',
    data() {
      return {
        tableData:[],
        dialogVisible : false,
        isDelete : false,
        addFlag : false,
        name : "",
        id : 0,
        password : "",
        profession : "",
        info : "",
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        let param = {modelId: 0};
        axios.get('/user/getAll').then((result) => {
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
      adminQuestion() {
        this.$router.push({path: '/admin-question'});
      },
      adminAnswer() {
        this.$router.push({path: '/admin-answer'});
      },
      logout() {
        this.$router.push({path: '/login'});
      },
      editUser(rowData) {
        this.id = rowData.id;
        this.name = rowData.name;
        this.password = rowData.password;
        this.profession = rowData.profession;
        this.info = rowData.info;
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
      updateUser () {
        axios.post('/user/update', {data:JSON.stringify({
            id:this.id,
            name : this.name,
            password: this.password,
            profession: this.profession,
            info : this.info,
          })}).then((result) => {
        });
        this.dialogVisible = false;
      },
      deleteUser (rowData) {
        this.id = rowData.id;
        this.isDelete = true;
      },
      ensureDeleteUser() {
        axios.get('/user/del', {
          params: {
            id: this.id
          }
        }).then((result) => {
          this.isDelete = false;
          this.$router.push({path: '/admin'});
        });
      },
      addUser () {
        this.addFlag = true;
      },
      ensureAddUser() {
        axios.post('/user/add', {data:JSON.stringify({
            name : this.name,
            password: this.password,
            profession: this.profession,
            info : this.info,
          })}).then((result) => {
          this.addFlag = false;
          this.$router.push({path: '/admin'});
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
