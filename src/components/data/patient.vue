<template>
  <v-card
    class="mx-auto">
    <v-card-title class="justify-center">
        <v-avatar height="150" width="150">
            <img :src="patient.profi" alt="avatar" height="300" width="300" ondragstart="return false">
        </v-avatar>
    </v-card-title>

    <v-card-text class="text-center display-2">
        <p>姓名 : {{patient.name}}</p>
        <p>生日 : {{patient.birth}}</p>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'patient'
    ])
  }
}
</script>
