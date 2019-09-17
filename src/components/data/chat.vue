<template>
  <div class="right inline">
    <div class="right_content">
      <div id="chat">
        <div v-for="(item,index) in chatHistory" :key="index" class='chat'>

            <v-avatar>
              <img :src="patient.profi" alt="avatar" v-if="item.sender==2"/>
            </v-avatar>

            <div class="content" v-if="item.sender==2">
                <pre>{{item.content}}</pre>
            </div>

            <div class="content rightR" v-else>
                <pre>{{item.content}}</pre>
            </div>

        </div>
        <footer style="display: none" id="bottom">111</footer>
      </div>
      <div class="inputbox">
        <form onsubmit="return false;">
          <!--<input type="" id="input">--->
          <textarea id="input" v-model="message"></textarea>
          <button type="button" @click="chatCommit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //should use real-time database
  methods: {
    chatCommit: function() {
      console.log(this.message)
      this.$store.dispatch('chatCommit',{id:this.patient.id,content:this.message})
      this.message=''
    }
  },
  data() {
    return {
      message:''
    };
  },
  created() {
    console.log(this.$store.getters.getPatientID);
    this.$store.dispatch("getChat", {code:this.$store.getters.getPatientID,lastChat:0});
  },
  computed: {
    chatHistory() {
      return this.$store.getters.getChatHistory;
    },
    patient () {
        return this.$store.getters.getPatient
    },
    drPic () {
        return this.$store.getters.getPic
    },
    lastChat () {
      return this.$store.getters.getLastChat
    }
  },
  watch:{
      lastChat:{
        handler(newVal,oldVal){
          this.$nextTick(() => {
            var container = this.$el.querySelector('#chat')
            container.scrollTop = container.scrollHeight
          })

        }
      }
    }
};
</script>
<style scoped>
.rightR{
  float: right;

}
.body {
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 0 0 0;
}
.inline {
  display: inline-block;
  width: 50%;
  height: 100%;
}
.left {
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
}
.right_content {
  padding-left: 5%;
  height: 100%;
  width: 90%;
}
.drawer {
  border-radius: 15px;
  border: 1px solid silver;
  box-shadow: 4px 4px 3px rgba(20%, 20%, 40%, 0.2);
  width: 100%;
  height: auto;
  margin: 10px 0 0 0;
  text-align: right;
  padding-bottom: 5px;
}
.drawer p {
  float: left;
  font: normal normal bold 25px "Microsoft JhengHei UI";
}
.drawer_btn {
  padding: 10px;
  max-height: 50px;
}
.profile img {
  max-width: 25%;
  max-height: 25%;
  border: 2px solid silver;
  border-radius: 300px;
}
.profile span {
  font: normal normal bold 25px "Microsoft JhengHei UI";
}
.drawer_content {
  margin: 0 0 0 0;
  display: none;
}
.drawer td {
  width: 25%;
  border: 1px solid red;
  text-align: center;
}
.title {
  background-color: rgba(65, 105, 225, 0.6);
}
.drawer table {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.hr {
  margin-top: 2px;
  clear: both;
  border: 0;
  left: 0px;
  border-top: 2px solid rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#chat {
  height: 90%;
  width: 100%;
  overflow: auto;
  border: black 1px solid;
}
.chat {
  width: 100%;
  height: auto;
  margin: 10px 0;
  position: relative;
  clear: both;
}
.chat img {
  height: 50px;
  width: 50px;
  border: 2px solid silver;
  border-radius: 300px;
}
.chat > div {
  display: inline-block;
}
.content {
  position: relative;
  word-break: break-all;
  max-width: 80%;
  background-color: #7d7d7d;
  border-radius: 10px;
  padding: 5px;
  margin:5px
}
.content pre {
  margin: 0 0 0 0;
  width: 100%;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
#chat::-webkit-scrollbar {
  border-radius: 10px;
  width: 7px;
  background-color: rgba(192, 192, 192, 0.2);
}
#chat::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.pic {
  float: left;
}
.inputbox {
  position: relative;
  margin: 0 0 0 0;
  width: 100%;
  height: 9%;
}
.inputbox form {
  width: 100%;
  height: 100%;
}
.inputbox textarea {
  margin: 0 0 0 0;
  width: calc(90% - 6px);
  height: 90%;
  resize: none;
  border: 1px black solid
}
.inputbox button {
  float: right;
  margin: 0 0 0 0;
  width: 10%;
  height: 100%;
  
}
</style>