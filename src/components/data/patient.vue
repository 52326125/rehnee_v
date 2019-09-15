<template>
  <v-card
    class="mx-auto"
    flat
  >
    <v-card-title class="justify-center">
        <v-avatar height="200" width="200">
            <img :src="patient.profi" alt="avatar" height="300" width="300">
        </v-avatar>
    </v-card-title>

    <v-card-text class="text-center display-3">
        <p>{{patient.name}}</p>
        <p>{{patient.birth}}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
    computed: {
        patient (){
            return this.$store.getters.getPatient
        }
    }
}
</script>