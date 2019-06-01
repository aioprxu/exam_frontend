<template lang="html">
  <div class="exam-card">
    <div class="card-header clearfix">
      <div class="time f-l">
        <i class="el-icon-time"></i>
        <span v-cloak>{{hour}}:{{min}}</span>
      </div>
      <div class="answer-card f-l m-l-20" @click="dialogVisible = true">
        <i class="el-icon-date"></i>
        <span>答题卡</span>
      </div>
      <div class="submit-paper f-r">
        <el-button type="primary" round @click="submitPaper">交卷</el-button>
      </div>
    </div>
    <div class="card-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>第{{questionId}}题（{{questionTypeText}}）</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="nextQuestion">下一题</el-button>
        </div>
        <div>
          <!-- 单选 -->
          <div class="q-single" v-show="questionType == 2">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item" v-for="(item,index) in currentQuestion.options">
                <el-radio v-model="radio" :label="index">{{item}}</el-radio>
              </div>
            </div>
          </div>

          <!-- 多选 -->
          <div class="q-multiple" v-show="questionType == 3">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item" v-for="(item,index) in currentQuestion.choice">
                <el-checkbox  v-model="checked[index]" :label="index">{{item}}</el-checkbox>
              </div>
            </div>
          </div>

          <!-- 判断 -->
          <div class="q-true-or-false" v-show="questionType == 4">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-radio v-model="radio" label="0">正确</el-radio>
              </div>
              <div class="answer-item">
                <el-radio v-model="radio" label="1">错误</el-radio>
              </div>
            </div>
          </div>

          <!-- 填空 -->
          <div class="q-fill-in" v-show="questionType == 1">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入答案"
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </div>

          <!-- 简答 -->
          <div class="q-short-answer" v-show="questionType == 5">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-input
                  type="textarea"
                  :rows="15"
                  placeholder="请输入答案"
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </div>

          <!-- 程序 -->
          <div class="q-program" v-show="questionType == 6">
            <div class="question">
              {{currentQuestion.questionstem}}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-input
                  type="textarea"
                  :rows="15"
                  placeholder="请输入答案"
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </div>
        </div>

      </el-card>
    </div>
    <el-dialog
      title="答题卡"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-button v-for="(i,index) in questionList" key="index" type="primary" class="stu-answer-item" @click="clickAnswerCard(index)">{{index+1}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import { Message,MessageBox  } from 'element-ui';
  import axios from 'axios';
  import * as qs from "qs";

  export default {
    name:"exam",
    data(){
      return{
        dialogVisible: false,
        currentQuestion : {},
        questionList : [],
        questionType : 2,
        textarea : '',
        radio : '',
        checked : [],
        questionId : 1,
        instId : 0,
        startTime : '',
        endTime : '',
        transformChar : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        hour : 0,
        min : 0,
        sec : 0,
        timer : 0,
        onblurTime : 0,
      }
    },
    computed : {
      questionTypeText : function(){
        switch(this.questionType)
        {
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
      }
    },
    mounted: function () {
      this.loadData();
    },
    methods: {
      initExam() {
        console.log("dafaefef")
        console.log(this.questionList)
        let that = this;
        // window.onblur = function () {
        //   that.onblurTime++;
        //   if (that.onblurTime == 2) {
        //
        //     // that.submitPaper();
        //     MessageBox("你已交卷", '提示', {
        //       confirmButtonText: '确定',
        //       type: 'error'
        //     });
        //   } else {
        //     MessageBox("考试期间不能离开此页面哦~这一次只是提醒，下次离开就会直接交卷了哦", '提示', {
        //       confirmButtonText: '确定',
        //       type: 'error'
        //     });
        //   }
        //
        // };
        this.timer = window.setInterval(() => {

          let timeLast = new Date(this.endTime).getTime() - new Date().getTime();
          let hour = parseInt(timeLast / (1000 * 60 * 60));
          let min = parseInt((timeLast % (1000 * 60 * 60)) / (1000 * 60));
          this.hour = hour < 10 ? '0' + hour : hour;
          this.min = min < 10 ? '0' + min : min;

          if (this.hour == 0 && this.min == 0) {
            window.clearInterval(this.timer);
            this.submitPaper;
          }

        }, 1000);
        console.log(sessionStorage.getItem("userId"));
        this.currentQuestion = this.questionList[this.questionId-1];
        console.log(this.currentQuestion);
      },
      submitPaper() {
        console.log(this.questionList);
        console.log("route");
        window.onblur = null;
        // this.saveAnswer();
        let answer = {};
        for (let i = 0; i < this.questionList.length; i++) {

          switch (this.questionList[i].questionType) {
            case 1://填空
            case 5:
            case 6:
              answer[i] = this.questionList[i].answer;
              break;
            case 2://选择
              answer[i] = this.transformChar[this.questionList[i].answer];
              break;
            case 4://判断
              if (this.questionList[i].answer == '0') {
                answer[i] = '1';
              } else {
                answer[i] = '0';
              }
              break;
            case 3://多选
              for (let j = 0; j < this.questionList[i].answer; j++) {
                if (this.questionList[i].answer[j]) {
                  answer[i] += this.transformChar[j];
                }
              }
              break;
          }

        }
        let answerList = [];
        for(var key in answer){
          answerList.push(answer[key]);
        }
        console.log(answerList);
        console.log(answer);

        axios.post("/exam/submitPaper", {data:JSON.stringify({
          answers : answerList,
          userId : sessionStorage.getItem("userId"),
          examId : sessionStorage.getItem("examId")
        })})
          .then((res) => {
            if (flag == true && res.data.respCode == '200') {
              this.$router.push(`/my-exam`);
            }
          });

      },
      clickAnswerCard(index) {
        console.log("aaaaaaaaaaaaaaaaaaaaa"+index);
        this.questionId = index+1;
        this.currentQuestion = this.questionList[this.questionId - 1];
        this.questionType = this.currentQuestion.questionType;
        this.radio = this.questionList[this.questionId - 1].answer;
        this.textarea = this.questionList[this.questionId - 1].answer;
        this.dialogVisible = false;
        this.$router.push({path: '/exam'});
      },
      saveAnswer(type) {
        let questionId = this.questionId;

        let answer = '';
        switch (this.questionType) {
          case 1://填空
          case 5://简答
          case 6://程序
            answer = this.textarea;
            if (this.questionList.length  != questionId && type) {
              this.textarea = '';
            }
            break;
          case 2://选择
          case 4://判断
            answer = this.radio;
            if (this.questionList.length  != questionId && type) {
              this.radio = '';
            }
            break;
          case 3://多选
            answer = this.checked;
            if (this.questionList.length != questionId && type) {
              this.checked = [];
            }
            break;
        }

        this.questionList[questionId-1].answer = answer;
        axios.post("/exam/saveCache", {data:JSON.stringify({
            examId:sessionStorage.getItem("examId"),
            userId:sessionStorage.getItem("userId"),
            answer : this.questionList,
          })})
      },
      nextQuestion() {
        this.saveAnswer(true);
        if (this.questionList.length == this.questionId) {
          Message.success({
            showClose: true,
            message: "这是最后一题啦",
            type: 'success'
          });
          return;
        }
        this.questionId = this.questionId+1;
        this.currentQuestion = this.questionList[this.questionId-1];
        this.questionType = this.currentQuestion.questionType;
        this.radio = this.questionList[this.questionId - 1].answer;
        this.textarea = this.questionList[this.questionId - 1].answer;
        this.$router.push({path: '/exam'});
      },
      setAnswer(questionType, answer) {
        switch (questionType) {
          case 1://填空
          case 5://简答
          case 6://程序
            this.textarea = answer;
            break;
          case 2://选择
          case 4://判断
            this.radio = answer;
            break;
          case 3://多选
            this.checked = answer;
            break;
        }
      },
      loadData() {
        axios.get("/exam/getPaper", {
          params: {
            id: sessionStorage.getItem("examId")
          }
        })
          .then((res) => {
            console.log(res.data.data);
            let respData = res.data.data;
            this.questionList = respData.questionRspList;
            this.startTime = respData.startTime;
            this.endTime = respData.stopTime;
            axios.get('/exam/getCache',{params:{examId:sessionStorage.getItem("examId"), userId:sessionStorage.getItem("userId")}}).then((result) => {
              console.log(result.data.data);
              this.questionList = JSON.parse(result.data.data) ;
              this.radio = this.questionList[this.questionId - 1].answer;
              this.textarea = this.questionList[this.questionId - 1].answer;
              console.log("=================")
              console.log(this.questionList)
            });
            this.initExam();
          });
      }
    },

  }
</script>

<style lang="css">
  [v-cloak] {
    display: none;
  }
  .card-header {
    padding: 10px;
    font-size: 20px;
    margin-top: 30px
  }
  .answer-card {
    cursor: pointer;
  }
  .time,.answer-card{
    margin-top: 10px;
  }
  .answer-item {
    padding: 10px;
  }
  .question {
    padding: 10px 0;
  }
  .card-content {
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
  }

  .card-content .box-card {
    min-height: 500px;
  }

  .el-button.stu-answer-item {
    margin: 10px;
    width: 60px;
    height: 60px
  }
</style>
