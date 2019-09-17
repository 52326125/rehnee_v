<template>
  <v-card
    class="mx-auto justify-center"
    @click="goOtherPage('/dashboard')"
    hover
    height="200"
    width="200"
  >
    <v-img
        src="../../assets/Rehnee.png"
        height="100%"
        width="100%"
        >
        </v-img>
        <v-card-title class="align-center justify-center">Rehnee system</v-card-title>
  </v-card>
</template>
<script>
export default {
    methods: {
        goOtherPage(path){
            this.$store.dispatch('getAllPatient')
            this.$router.push(path);
        }
    }
}
</script>