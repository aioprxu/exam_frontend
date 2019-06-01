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
          <el-menu-item index="2-1" @click="addQuestion()">添加题目</el-menu-item>
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
            <el-button type="primary" style="width:100%;" @click='searchQuestion'>查询
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData">
          <el-table-column prop="id" label="id" width="140">
          </el-table-column>
          <el-table-column prop="questionType" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="questionstem" label="题目">
          </el-table-column>
          <!--第二步  开始进行修改和查询操作-->
          <el-table-column label="操作" align="center" min-width="100">

            <template slot-scope="scope">

              <el-button type="info" @click="editQuestion(scope.row)">编辑</el-button>

              <el-button type="info" @click="deleteQuestion(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-dialog
        title="考题"
        :visible.sync="dialogVisible"
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
          <el-form-item prop="questionstem">题目
            <el-input type="text" v-model="questionstem" style="width: 50%" auto-complete="off" :placeholder="questionstem"></el-input>
          </el-form-item>
          <el-form-item prop="answer">选项
            <el-input type="text" v-model="option" style="width: 50%" auto-complete="off" :placeholder="option"></el-input>
          </el-form-item>
          <el-form-item prop="answer">答案
            <el-input type="text" v-model="answer" style="width: 50%" auto-complete="off" :placeholder="answer"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" @click='updateQuestion'>确定
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
            <el-button type="primary" @click='ensureDeleteQuestion'>确定
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
                 class='demo-ruleForm login-container' style="text-align:left">
          <el-form-item prop="modelId" >机型:
          <el-input type="text" v-model="modelId" style="width: 50%" auto-complete="off" :placeholder="modelId"></el-input>
        </el-form-item>
          <el-form-item prop="questionstem">题目:
            <el-input type="text" v-model="questionstem" style="width: 50%" auto-complete="off" :placeholder="questionstem"></el-input>
          </el-form-item>
          <el-form-item prop="questionstem">类型:
            <el-input type="text" v-model="questionType" style="width: 50%" auto-complete="off" :placeholder="questionType"></el-input>
          </el-form-item>
          <el-form-item prop="answer">选项:
            <el-input type="text" v-model="option" style="width: 50%" auto-complete="off" :placeholder="option"></el-input>
          </el-form-item>
          <el-form-item prop="answer">答案:
            <el-input type="text" v-model="answer" style="width: 50%" auto-complete="off" :placeholder="answer"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" @click='ensureAddQuestion'>确定
            </el-button>
            <el-button type="primary" @click='addFlag = false'>取消
            </el-button>
          </el-form-item>
        </el-form>      </el-dialog>
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
    name: 'admin-question',
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
        dialogVisible : false,
        isDelete : false,
        addFlag : false,
        questionstem : "",
        model : "",
        answer : "",
        id : 0,
        questionType : "",
        option : "",
        modelId : "",
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      loadData() {
        axios.get('/question/getAll').then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.questionType = this.convertType(item.questionType)
          });
          console.log(this.tableData);
        });
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
      unConvertType(questionType) {
        switch (questionType) {
          case '填空题'://填空
            return 1;
            break;
          case '简答题'://简答
            return 5;
            break;
          case '单选题'://选择
            return 2;
            break;
          case '判断题'://判断
            return 4;
            break;
          case '多选题'://多选
            return 3;
            break;
        }
      },
      getQuestion() {
        this.loadData();
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
      editQuestion(rowData) {
        this.dialogVisible = true;
        console.log(rowData);
        this.value = this.convertToModel(rowData.modelId);
        this.questionstem = rowData.questionstem;
        this.answer = rowData.answer;
        this.id = rowData.id;
        this.questionType = rowData.questionType;
        this.option = rowData.options;
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
      searchQuestion() {
        axios.get('/question/getByModel', {
          params: {
            model: this.value
          }
        }).then((result) => {
          console.log(result.data.data);
          this.tableData = result.data.data;
          this.tableData.forEach(item => {
            item.questionType = this.convertType(item.questionType)
          });
          console.log(this.tableData);
        });
        this.$router.push({path: '/admin-question'});
      },
      updateQuestion() {
        this.questionType = this.unConvertType(this.questionType);
        axios.post('/question/update', {data:JSON.stringify({id:this.id,modelId:this.value,questionType:this.questionType,
            questionstem:this.questionstem,options:this.option,answer:this.answer})}).then((result) => {
        });
        this.loadData();
        this.dialogVisible = false;
      },
      deleteQuestion(rowData) {
        this.id = rowData.id;
        this.isDelete = true;
      },
      ensureDeleteQuestion() {
        axios.get('/question/del', {
          params: {
            id: this.id
          }
        }).then((result) => {
          this.isDelete = false;
          this.loadData();
        });
      },
      addQuestion() {
        this.addFlag = true;
      },
      ensureAddQuestion() {
        axios.post('/question/add', {data:JSON.stringify({
            modelId : this.value,
            questionType : this.questionType,
            questionstem : this.questionstem,
            options : this.option,
            answer : this.answer
          })}).then((result) => {
          this.addFlag = false;
          this.loadData();
        });
      }
    }
  }

</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
