<template>
  <v-card>
    <v-card-title>
      復健系統
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="搜尋"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getAllPatient"
      :search="search">

      <template v-slot:item.profi="{item}">
        <v-avatar>
            <img :src="item.profi" alt="avatar">
        </v-avatar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          class="mr-2"
          @click="turnPatientPage(item)">
          mdi-arrow-right-bold
        </v-icon>
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      getAllPatient: 'patientList'
    })

  },
  created() {
    this.$store.dispatch('getAllPatient')
  },
  methods: {
    turnPatientPage: function (patient) {
      this.$store.dispatch('turnPatientPage', patient)
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'profi'
        },
        { text: '姓名', value: 'name' },
        { text: '生日', value: 'birth' },
        { text: '上次看診日期', value: 'date' },
        { text: '動作', value: 'action', sortable: false }
      ]
    }
  }
}
</script>
