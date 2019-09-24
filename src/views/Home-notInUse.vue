<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="2">
        <v-img src="../assets/Rehnee.jpg" max-height="100" max-width="100"></v-img>
      </v-col>
      <v-col cols="10">
        <template>
          <v-sheet height="50%">
            <v-calendar type="month" :now="getDate" :value="getDate" :events="events"></v-calendar>
          </v-sheet>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goOtherPage('/order')">medical-order system</v-btn>
        <v-btn @click="goOtherPage('/dashboard')">dashboard</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      events:[]
    };
  },
  computed:{
    getDate () {
      return '2019-09-12'//偷懶 記得改回取正確時間//目前無用
    }
  },
  methods: {
    goOtherPage:function(path){
      this.$router.push(path)
      if(path=='/dashboard'){
        this.$store.dispatch('getAllPatient')
      }
    }
  }
};
</script>
