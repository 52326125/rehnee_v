<template>
  <div class="showXY">
    <v-btn
      v-if="close"
      fab
      color="primary"
      @click="close=!close">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-card
      width="600"
      height="500"
      max-height="50vh"
      max-width="40vw"
      v-else>
      <v-banner single-line color="primary">
        <v-chip color="primary">Chat List</v-chip>
        <template v-slot:actions>
          <v-btn
            text
            fab
            small
            @click="close=!close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-banner>
      <v-row class="test">
        <v-col cols="5">
          <!--<v-tabs 
            vertical
            color="black">
            <v-tab 
              v-for="(item, index) in chatList"
              :key="index"
              @click="showChat(item)">
              <v-list-item-avatar>
                <v-img :src="item.profi"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.name" class="font-weight-bold subtitle"></v-list-item-title>
                <pre>{{item.content}}</pre>
              </v-list-item-content>
            </v-tab>
          </v-tabs>-->
          <v-list>
            <v-subheader>Recently Chat</v-subheader>
            <v-list-item-group>
              <v-list-item 
                v-for="(item,index) in chatList" 
                :key="index"
                 @click="showChat(item)">
                <v-list-item-avatar>
                  <v-img :src="item.profi"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.content"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-divider vertical/>
        <v-row>
          <v-col cols="11">
            <div class="chat">
              <div v-for="(item1,index1) in chatHistory" :key="index1">
                <v-avatar>
                  <img :src="patient.profi" alt="avatar" v-if="item1.sender==2"/>
                </v-avatar>
                <div v-if="item1.sender==2" class="d-inline">
                    <v-chip>
                      {{item1.content}}
                    </v-chip>
                </div>
                <div class="right" v-else>
                    <v-chip>
                      {{item1.content}}
                    </v-chip>
                </div>
              </div>
            </div>
            <v-text-field
              append-icon="mdi-send"
              
            ></v-text-field>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
      return {
        close:false
      }
    },
    computed: {
      ...mapState({
        chatList: state =>state.chatList,
        chatHistory: state => state.chatHistory,
        patient: state => state.patient
      })
    },
    methods: {
      showChat(item) {
        
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
}
.chat {
  height: 85%;
  max-height: calc(50vh - 57px);
  width: 100%;
  overflow: auto;
  border: black 1px solid;
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