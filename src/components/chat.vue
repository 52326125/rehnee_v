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
      <v-row>
        <v-col cols="5">
          <v-tabs 
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
          </v-tabs>
        </v-col>
        <v-divider vertical/>
        <v-col cols="6">
          <v-row class="test">
            <div class="chat">
            <div v-for="(item1,index1) in chatHistory" :key="index1">

              <v-avatar>
                <img :src="patient.profi" alt="avatar" v-if="item1.sender==2"/>
              </v-avatar>

              <div class="content" v-if="item1.sender==2">
                  <pre>{{item1.content}}</pre>
              </div>

              <div class="content rightR" v-else>
                  <pre>{{item1.content}}</pre>
              </div>

            </div>
          </div>
          </v-row>
        </v-col>
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
  height: 100%;
}
.showXY{
  position: fixed;
  bottom: 5%;
  right:5%;
}
.chat {
  height: 90%;
  width: 100%;
  overflow: auto;
  border: black 1px solid;
}
</style>