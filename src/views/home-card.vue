<template>
    <dashboard  v-if="loadSystem"/>
    <patientList v-else/>
</template>
<script>
import patientList from '../components/home/patientList-card'
import dashboard from './dashboard'
import { mapState } from 'vuex'

export default {
  components: {
    patientList,
    dashboard
  },
  computed: {
    ...mapState([
      'loadSystem'
    ])
  }
}
</script>
