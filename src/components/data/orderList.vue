<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header>order list</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <template>
                <v-data-table
                  :headers="headers"
                  :items="list"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </template>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: 'order date',
          align: 'left',
          value: 'date'
        },
        { text: 'symptom', sortable: false, value: 'm_order' },
        { text: 'medical-order', sortable: false, value: 'content' },
        { text: 'remark', sortable: false, value: 'remark' }
      ]
    }
  },
  computed: {
    ...mapState({
      list: 'orderList'
    })
  }
}
</script>
