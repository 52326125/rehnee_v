<template>
  <v-card>
    <v-card-title><span>Rehabilitation</span></v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="change">{{title}}</v-btn>
          <template v-if="graphicMode">
            <v-row>
              <v-spacer/>
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
              <v-col cols="3">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      label="Start Date"
                      v-model="preDate"
                      readonly
                      prepend-icon="mdi-calendar">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="preDate" :dark="isDark"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      label="End Date"
                      v-model="reDate"
                      readonly
                      prepend-icon="mdi-calendar">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="reDate" :dark="isDark"></v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer/>
            </v-row>
            <div style="position:relative">
              <ve-line :data="filter"
                :colors="color"
                :extend="chartMode">
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
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          }
        }
      },
      chartSettingDark: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        legend: {
          inactiveColor: '#5a5a5a',
          textStyle: {
            color: '#fff'
          }
        }
      },
      actions: [
        { name: '屈膝抬腿', value: 1 },
        { name: '直膝抬腿', value: 2 },
        { name: '靠牆半蹲', value: 3 }
        // {name: '不指定', value: 4}
      ],
      action: null,
      preDate: '2019-09-08',
      reDate: null
    }
  },
  computed: {
    ...mapState({
      list: 'recordList',
      isDark: 'isDark'
    }),
    listTable () {
      let temp = this.list
      temp = temp.map((item) => {
        item.action = this.actions[item.type - 1].name
        return item
      })
      // temp.action=temp.map((item) => this.actions[item.type-1].name)
      console.log(temp)
      return temp
    },
    title () {
      return this.graphicMode ? 'Data table' : 'Graphic table'
    },
    filter () {
      let temp = this.list
      this.re.rows = temp.map((item) => {
        if (this.reDate == null) this.getToday()
        if (this.preDate == null) this.getlastMonth()
        if (item.type == this.action && item.date >= this.preDate && item.date <= this.reDate) {
          let date = item.date + ' ' + item.time
          return { date: date, spend_time: item.spend_time, standard: '120' }
        } else {
          return false
        }
      })
      this.re.rows = this.re.rows.filter((item) => item != false)
      this.re.empty = this.re.rows.length == 0
      return this.re
    },
    chartMode () {
      if (this.isDark) return this.chartSettingDark
      return this.chartSetting
    }
  },
  methods: {
    change: function () {
      console.log(this.filter)
      console.log(this.chartData.rows)
      this.graphicMode = !this.graphicMode
    },
    getToday: function () {
      let temp = new Date()
      this.reDate = temp.getFullYear() +
          '-' +
          (temp.getMonth() + 1) +
          '-' +
          temp.getDate()
    }
  }
}
</script>
