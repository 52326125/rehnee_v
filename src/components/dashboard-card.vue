<template>
  <v-card
    class="mx-auto justify-center"
    @click="goOtherPage('/dashboard')"
    height="200"
    width="200"
  >
    <v-img
        src="../assets/Rehnee.jpg"
        height="100%"
        width="100%"
        >
        <v-card-title class="align-center fill-height">Rehnee system</v-card-title>
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