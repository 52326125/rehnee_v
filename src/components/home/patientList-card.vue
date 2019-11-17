<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="patientsRewrite"
      :items-per-page="5"
      class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon @click="openOrder(item)">mdi-arrow-right-bold-hexagon-outline</v-icon>
      </template>
    </v-data-table>
    <v-overlay :value="overlay" :dark="isDark">
      <order/>
    </v-overlay>
  </v-card>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import order from '../order/order'
export default {
  // fake registered system.
  components: {
    order
  },
  data () {
    return {
      headers: [
        {
          text: '號碼',
          align: 'center',
          value: 'index'
        },
        { text: '身份證字號', value: 'idRewrite', align: 'center' },
        { text: '姓名', value: 'name', align: 'center' },
        { text: '性別', value: 'sexRewrite', align: 'center' },
        { text: '備註', value: 'remark', sortable: false, align: 'center' },
        { text: '看診', value: 'action', sortable: false, align: 'center' }
      ]
    }
  },
  computed: {
    ...mapState([
      'isDark',
      'overlay',
      'patients'
    ]),
    patientsRewrite(){
      let temp = this.patients.filter( item => {
        item.sexRewrite = (item.sex == 'Male') ? '男' : '女'
        item.idRewrite = item.id.replace(item.id.substring(3, 7), '****')
        return item
      })
      return temp
    }
  },
  methods: {
    ...mapActions([
      'setOrderPage'
    ]),
    openOrder: function (patient) {
      this.setOrderPage(patient)
    }
  }
}
</script>
