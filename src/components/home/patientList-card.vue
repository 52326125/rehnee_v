
<template>
  <v-col cols="9">
  <v-data-table :headers="headers" :items="patients" :items-per-page="5" class="elevation-1">

    <template v-slot:item.action="{ item }">
      <v-icon @click="openOrder(item)">mdi-arrow-right-bold-hexagon-outline</v-icon>

    </template>

  </v-data-table>
      <v-overlay :value="overlay" :dark="isDark">
        <order/>
      </v-overlay>
  </v-col>
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
          text: 'Number',
          align: 'center',
          value: 'index'
        },
        { text: 'ID', value: 'id', align: 'center'},
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Sex', value: 'sex', align: 'center' },
        { text: 'Remark', value: 'remark', sortable: false, align: 'center' },
        { text: 'Order', value: 'action', sortable: false, align: 'center' }
      ],
      patients: [
        {
          index: 1,
          id: 'A123456001',
          name: '測試員001',
          sex: 'Male',
          remark: ''
        },
        {
          index: 2,
          id: 'A123456002',
          name: '測試員002',
          sex: 'Male',
          remark: ''
        },
        {
          index: 3,
          id: 'A123456003',
          name: '測試員003',
          sex: 'Male',
          remark: ''
        },
        {
          index: 4,
          id: 'A123456004',
          name: '測試員004',
          sex: 'Female',
          remark: ''
        },
        {
          index: 5,
          id: 'A123456005',
          name: '測試員005',
          sex: 'Female',
          remark: 'will be ten minutes late!'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'isDark',
      'overlay'
    ])
  },
  methods: {
    ...mapActions([
      'setOrderPage'
    ]),
    openOrder: function (patient) {
      this.setOrderPage(patient)
      this.patients.shift()
    }
  }
}
</script>
