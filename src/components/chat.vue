<template>
  <div class="showXY">
    <v-btn
      v-if="close"
      fab
      transition="slide-x-transition"
      :dark="isDark"
      color="primary"
      @click="close=!close">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-card
      :dark="isDark"
      width="600"
      height="500"
      max-height="50vh"
      max-width="40vw"
      v-else
      transition="slide-x-transition">
      <v-app-bar color="primary" @click="close=!close" style="cursor:pointer;">
        <v-toolbar-title style="font-size:24px !important;">Chat</v-toolbar-title>
        <v-spacer/>
        <v-btn
          text
          fab
          small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-list style="overflow:atuo;">
              <v-subheader style="font-size:16px !important;">Recently Chat</v-subheader>
              <v-list-item-group>
                <v-list-item
                  v-for="(item,index) in chatList"
                  :key="index"
                  @click="showChat(item)">
                  <v-list-item-avatar>
                    <v-img :src="item.profi"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" style="font-size:20px !important;"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.content" style="font-size:16px !important;"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="1">
            <v-divider vertical/>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <div class="chat"  style="border: black 1px solid;">
                  <div v-for="(item,index) in chatHistory" :key="index">
                    <v-avatar>
                      <img :src="profi" alt="avatar" v-if="item.sender==2"/>
                    </v-avatar>
                    <div v-if="item.sender==2" class="d-inline">
                        <v-chip style="font-size:14px !important; height:40px !important;">
                          {{item.content}}
                        </v-chip>
                    </div>
                    <div class="right" v-else>
                        <v-chip style="font-size:14px !important; height:40px !important;"  color="primary">
                          {{item.content}}
                        </v-chip>
                    </div>
                  </div>
                </div>
                <v-text-field
                  outlined
                  v-model="msg"
                  append-icon="mdi-send"
                  @keydown.native.enter="commitChat()"
                  @click:append="commitChat()">
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      close: true,
      profi: null,
      id: null,
      msg: null
    }
  },
  computed: {
    ...mapState({
      chatList: state => state.chatList,
      chatHistory: state => state.chatHistory,
      patient: state => state.patient,
      lastChat: state => state.lastChat,
      isDark: state => state.isDark
    }),
    chatList1 () {
      let array = ['小美', '阿華', '國豪', '偉健', '嘉盛']
      let temp = this.chatList.filter((item, index) => {
        item.name = array[index]
        return item
      })
      return temp
    }
  },
  methods: {
    ...mapActions([
      'getChat',
      'chatCommit'
    ]),
    showChat (item) {
      this.profi = item.profi
      this.id = item.id
      this.msg = null
      this.getChat({ code: item.id, lastChat: 0 })
    },
    commitChat () {
      if (this.msg == null || this.msg == '' || this.id == null) return
      this.chatCommit({ id: this.id, content: this.msg })
      this.msg = ''
    }
  },
  watch: {
    lastChat: {
      handler (newVal, oldVal) {
        this.$nextTick(() => {
          let container = this.$el.querySelector('.chat')
          console.log(container)
          container.scrollTop = container.scrollHeight
        })
      }
    },
    close: {
      handler (newVal, oldVal) {
        this.$nextTick(() => {
          if (!newVal) {
            let container = this.$el.querySelector('.chat')
            console.log(container)
            container.scrollTop = container.scrollHeight1
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.test{
  height: calc(100% - 57px);
}
.showXY{
  position: fixed;
  bottom: 5%;
  right:5%;
  z-index: 2147483647;
}
.chat {
  height: 300px;
  max-height: calc(50vh - 200px);
  width: 100%;
  overflow: auto;
}
.chat::-webkit-scrollbar {
  border-radius: 10px;
  width: 7px;
  background-color: rgba(192, 192, 192, 0.2);
}
.chat::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
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
  /*width: 100%;*/
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.right{
  float: right;
}
</style>
