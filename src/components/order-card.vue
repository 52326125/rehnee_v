<template>
  <v-card
    class="mx-auto"
    @click="goOtherPage('/order')"
    height="200"
    width="250"
  >
  <v-img
        src="../assets/hospital.png"
        height="200"
        width="250"
        >
        <v-card-title class="font-weight-black align-center fill-height">medical system</v-card-title>
        </v-img>
  </v-card>
</template>
<script>
export default {
    methods: {
        goOtherPage(path){
            this.$router.push(path);
        }
    }
}
</script>