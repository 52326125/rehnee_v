<template>
  <v-card
    class="mx-auto"
    @click="goOtherPage('/order')"
    height="200"
    width="210"
    hover
  >
  <v-img
        src="../../assets/hospital.png"
        height="200"
        width="210"
        >
        </v-img>
        <v-card-title class="font-weight-black align-end justify-center">medical system</v-card-title>
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