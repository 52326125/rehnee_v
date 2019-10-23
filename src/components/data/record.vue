<template>
  <v-card>
    <v-card-title><span>Rehabilitation</span></v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="change">{{title}}</v-btn>
          <template v-if="graphicMode">
            <v-row>
              <v-col cols="4">
                <v-select
                  v-model="action"
                  :items="actions"
                  item-text="name"
                  item-value="value"
                  outlined
                  label="Action">
                </v-select>
              </v-col>
              <v-spacer/>
              <v-col cols="4">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field v-on="on" label="Date range" v-model="dateRange" readonly prepend-icon="mdi-calendar"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <div style="position:relative">
              <ve-line :data="filter"
                :colors="color"
                :extend="chartSetting">
              </ve-line>

              <v-overlay
                :value="re.empty"
                absolute
                opacity="1">
                <span>No data result</span>
              </v-overlay>
            </div>
          </template>
          <template v-else>
            <v-data-table
              :headers="headers"
              :items="listTable"
              :items-per-page="5"
              class="elevation-1">
            </v-data-table>
          </template>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      color: ['#66DD00', '#FF0000'],
      chartData: {
        columns: ['date', 'spend_time', 'standard'],
        rows: []
        // (this.list.date+'-'+this.list.time),this.list.spend_time
      },
      graphicMode: true,
      headers: [
        {
          text: 'Rehabilitation date',
          align: 'left',
          value: 'date'
        },
        { text: 'Type', value: 'action' },
        { text: 'Rehabilitation time', sortable: false, value: 'time' },
        { text: 'Spend time', sortable: false, value: 'spend_time' }
      ],
      re: {
        columns: ['date', 'spend_time', 'standard'],
        rows: [],
        empty: true
      },
      chartSetting: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      actions: [
        {name: '屈膝抬腿', value: 1},
        {name: '直膝抬腿', value: 2},
        {name: '靠牆半蹲', value: 3},
        //{name: '不指定', value: 4}
      ],
      action: null,
      dateRange: null
    }
  },
  computed: {
    ...mapState({
      list: 'recordList'
    }),
    listTable(){
      let temp = this.list
      temp=temp.map((item)=>{
        item.action=this.actions[item.type-1].name
        return item
      })
      //temp.action=temp.map((item) => this.actions[item.type-1].name)
      console.log(temp)
      return temp
    },
    /* list() {
      return this.$store.getters.getRecordList; //建立orderlist
    }, */
    title () {
      return this.graphicMode ? 'Data table' : 'Graphic table'
    },
    filter(){
      let temp = this.list
      this.re.rows = temp.map((item) => {
        if (item.type == this.action ) {
          let date=item.date + ' ' + item.time
          return {date: date, spend_time: item.spend_time, standard: '120'}
        } else {
          return false
        }
      })
      this.re.rows=this.re.rows.filter((item) => item!=false)
      this.re.empty=this.re.rows.length==0
      return this.re
    }
  },
  methods: {
    change: function () {
      console.log(this.filter)
      // this.chartData.rows=
      console.log(this.chartData.rows)
      this.graphicMode = !this.graphicMode
    }
  }
}
</script>
