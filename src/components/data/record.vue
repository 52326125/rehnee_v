<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header>Rehabilitation list</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-btn @click="change">
                {{title}}
              </v-btn>

              <template v-if="graphicMode">
                <ve-line
                  :data="chartData"
                ></ve-line>
              </template>

              <template v-else>
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
export default {
  data (){
    return {
      chartData: {
        columns: ['date','spend_time'],
        rows: [],
        //(this.list.date+'-'+this.list.time),this.list.spend_time
      },
      graphicMode:false,
      headers:[
        {
          text:'Rehabilitation date',
          align: 'left',
          value: 'date'
        },
        {text: 'Type',value: 'type'},
        {text:'Rehabilitation time',sortable: false,value: 'time'},
        {text: 'Spend time',sortable: false,value: 'spend_time'}
      ]
    }
  },
  computed: {
    list() {
      return this.$store.getters.getRecordList; //建立orderlist
    },
    title(){
      return this.graphicMode ? 'Data table' : 'Graphic table'
    },
  },
  methods:{
    change:function(){
      var i
      this.chartData.rows=[]
      for (i=0;i<this.list.length;i++){
        this.chartData.rows.push({date:(this.list[i].date+'-'+this.list[i].time), spend_time:this.list[i].spend_time})
      }
      //this.chartData.rows=
      console.log(this.chartData.rows)
      this.graphicMode=!this.graphicMode
    }
  }
};
</script>