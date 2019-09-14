<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
        <p class="font-weight-black">Search patient ID ↓ or add a new patient→</p>
        <v-btn color="warning" @click="pageNew">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-card-title>
    <v-row justify="center">
        <v-col cols="6">
            <v-text-field
                label="ID"
                v-model="ID"
                class="text-center"
            ></v-text-field>
    </v-col>
    </v-row>

    <v-card-actions class="justify-center">
      <v-btn color="primary" @click="pageSearch" >Send</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    data () {
        return {
            ID:''
        }
    },
    methods: {
        pageSearch:function(){
            this.$store.dispatch('setOrderPage',{page:2,ID:this.ID})
        },
        pageNew:function(){
            this.$store.dispatch('setOrderPage',{page:1})
        }
    }
}
</script>