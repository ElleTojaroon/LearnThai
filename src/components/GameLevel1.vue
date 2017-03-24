<template>
  <div>
    <h5 class="lt-text-center">{{ questionString }}</h5>
    <el-row type="flex" class="row-bg" justify="center">
      <img v-for="choice in choices"
        :src="'../../static/images/game/' + choice.picture"
        @click="selectChoice(choice, choice.isCorrect)"
        class="lt-choices"
        :class="{
          'lt-wrong-choice' : showAllWrongChoices,
          'hvr-push': selectedAnswer==choice && !hasChecked,
          'lt-correct-choice' : showCorrectChoice==choice,
          'lt-picked-wrong-choice' : showPickedWrongChoice==choice
           }">
<!--             :class="{
          'hvr-push lt-correct-choice' : showCorrectChoice,
          'hvr-wobble-horizontal lt-wrong-choice' : showPickedWrongChoice,
          'lt-wrong-pics' : showAllWrongChoices & !choice.isCorrect }"> -->
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <i class="el-icon-check lt-check-symbol"
        v-if="hasChecked & hasAnsweredCorrectly"></i>
      <i class="el-icon-close lt-cross-symbol"
        v-if="hasChecked & !hasAnsweredCorrectly"></i>
      <el-button type="info" v-if="!hasChecked"
        @click="checkAnswer()">Check</el-button>
      <el-button type="warning" v-if="hasChecked"
        @click="nextQuestion()">Next</el-button>
    </el-row>

    <lt-audio-visualizer :audioSrc="audio"></lt-audio-visualizer>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['currGameLevel'],
    data() {
      return {
        questionString: 'question',
        choices: {},
        questions: {},
        questionIdx: -1,
        jsonDirectory: '../../static/json/',
        jsonLevel: "level" + this.currGameLevel,
        jsonLevelTest: "level" + this.currGameLevel + "_test",
        musicDirectory : '../../static/music/',
        musicList : ['level1', 'level2', 'level3'],
        currAudioSource : {},
        showCorrectChoice: {},
        showPickedWrongChoice: {},
        showAllWrongChoices: false,
        selectedAnswer: {},
        correctAnswer: {},
        hasChecked: false,
        hasAnsweredCorrectly: false,
        audio: ""
      }
    },
    methods: {
      readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
      },
      getJSON(url, callback) {
        this.readTextFile(url, function(text){
          console.log('json parse');
          callback(JSON.parse(text));
        })
      },
      resetChoiceAnimation() {
        this.showCorrectChoice = false;
        this.showPickedWrongChoice = false;
        this.showAllWrongChoices = false
      },
      getCorrectAnswer: function(choices) {
        for (var i = choices.length - 1; i >= 0; i--) {
          if (choices[i].isCorrect) {
            this.correctAnswer = choices[i];
          }
        };
      },
      nextQuestion: _.debounce(function() {
        this.resetChoiceAnimation();
        if (this.questionIdx < this.questions.length - 1) {
          this.questionIdx += 1;
          this.questionString = this.questions[this.questionIdx].question;
          this.choices = this.questions[this.questionIdx].choices;
          this.audio = this.musicDirectory + this.musicList[this.currGameLevel-1] + "/" + this.questions[this.questionIdx].audioWord;
          console.log('audio source in gamelevel1', this.audio);
          this.showAllWrongChoices = false;
          this.hasChecked = false;
          this.getCorrectAnswer(this.choices);
        } else {
          // set this to API
          this.$emit('levelAdvanced');
          console.log('go to summary');
          // this.goToSummary();
        }
      }, 0),
      goToSummary: function() {
        this.$router.push('/history');
      },
      selectChoice: function(choice, isCorrect) {
        if (!this.hasChecked) {
          this.selectedAnswer = choice;
        }
      },
      checkAnswer: function() {
        if (!this.hasChecked) {
          if (this.selectedAnswer.isCorrect) {
            this.showCorrectChoice = this.selectedAnswer;
            this.showAllWrongChoices = true;
            this.hasAnsweredCorrectly = true;
          } else {
            this.hasAnsweredCorrectly = false;
            this.showPickedWrongChoice = this.selectedAnswer;
            this.showAllWrongChoices = true;
            this.showCorrectChoice = this.correctAnswer;
          }
          this.hasChecked = true;
        }
      },
      pageLoad(json) {
        console.log('json ', json);
        this.questions = json;
        console.log('this.questions ', this.questions);
        this.nextQuestion();
      },
      newSublevel: function() {
        this.getJSON(this.jsonDirectory + this.jsonLevelTest + '.json', this.pageLoad)
      }
    },
    created() {
      console.log('created');
      this.newSublevel();
    }
  }
</script>

<style>
  .lt-text-center {
    text-align: center;
  }
</style>