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
          <el-menu-item index="1-2" @click="addPaper()">添加考卷</el-menu-item>
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
        <el-form ref='AccountFrom' :inline="true"
                 class='demo-ruleForm login-container'  style="position: relative;right: 520px;">

            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-form-item style="width:10%;">
            <el-button type="primary" style="width:100%;" @click='searchPaper'>查询
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="paperId" label="id" width="140">
          </el-table-column>
          <el-table-column prop="name" label="试卷名称" width="120">
          </el-table-column>
          <el-table-column prop="modelId" label="机型">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="toFile(scope.row)">归档</el-button>

              <el-button type="info" @click="editPaper(scope.row)">编辑</el-button>

              <el-button type="info" @click="deletePaper(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="编辑考卷"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm' style="text-align:center">
            <el-table :data="questionData">
              <el-table-column prop="id" label="id" width="140">
              </el-table-column>
              <el-table-column prop="questionType" label="类型" width="120">
              </el-table-column>
              <el-table-column prop="questionstem" label="题目" >
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
          title="添加考卷"
          :visible.sync="addFlag"
          width="50%"
        >
          <el-form ref='AccountFrom' lable-position='left' lable-width='10px'
                   class='demo-ruleForm login-container' style="text-align:left">
            <el-form-item prop="modelId">机型
              <el-select v-model="value" placeholder="请选择" style="width: 175px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
    name: 'admin-paper',
    data() {
      return {
        options:[{
          value: '0',
          label: '水陆两用飞机'
        }, {
          value: '1',
          label: '喷气式飞机'
        }, {
          value: '2',
          label: '水陆运输飞机'
        }, {
          value: '3',
          label: '直升机'
        }, {
          value: '4',
          label: '螺旋桨飞机'
        }, {
          value: '5',
          label: '螺旋桨式喷气飞机'
        }],
        value:"",
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
        let param = {modelId: 0};
        axios.get('/paper/getAll').then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          console.log(this.tableData);
          this.tableData.forEach(item => {
            item.modelId = this.convertToModel(item.modelId)
          });
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
      searchPaper() {
        axios.get('/paper/getByModel', {
          params: {
            model: this.value
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          console.log(this.tableData);
          this.tableData.forEach(item => {
            item.modelId = this.convertToModel(item.modelId)
          });
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
      convertToModel(modelId){
        switch (modelId) {
          case 0:return "水陆两用飞机";
          case 1:return "喷气式飞机";
          case 2:return "水陆运输飞机";
          case 3:return "直升机";
          case 4:return "螺旋桨飞机";
          case 5:return "螺旋桨式喷气飞机";
        }
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
        this.loadData();
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
          this.loadData();
        });
      },
      addPaper () {
        this.addFlag = true;
      },
      ensureAddPaper() {
        axios.post('/paper/add', {data:JSON.stringify({
            modelId:this.value,name:this.name,
          })}).then((result) => {
          this.addFlag = false;
          this.loadData();
        });
      },
      deleteQuestion(rowData) {
        this.id = rowData.id;
        this.isDelete = true;
      },
      toFile(rowData) {
        window.location.href="http://localhost:8080/paper/download?paperId="+rowData.paperId
      }
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
