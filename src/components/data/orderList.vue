<template>
  <v-card>
    <v-card-title><span>Order list</span></v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="filter"
        :items-per-page="5"
        single-expand
        :expanded.sync="expanded"
        item-key="date"
        show-expand
        class="elevation-1">

        <template v-slot:expanded-item="{ item }">
          <div class="ml-2">
            <v-row>
              <v-col cols="12">
                <span>症狀 : </span>
                <v-chip
                  v-for="(item, index) in item.m_order.split(',')" 
                  :key="index"
                  class="ma-1"
                  color="primary">
                  {{item}}
                </v-chip>
              </v-col>
            </v-row>
            <v-divider/>

            <v-row>
              <v-col cols="12">
              <span>醫囑:</span>
                <v-chip
                  v-for="(item, index) in item.trans" 
                  :key="index"
                  class="ma-1"
                  color="primary">
                  {{item}}
                </v-chip>
              </v-col>
            </v-row>
            <v-divider/>

            <v-row>
              <v-col cols="12">
                <span>備註 : {{item.remark }}</span>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-slot:item.order="{item}">
          <v-tooltip 
            top
            v-for="(item, index) in item.order"
            :key="index">
            <template v-slot:activator="{ on }">
              <!--<v-chip>action:{{index}}</v-chip>-->
              <v-btn  small v-on="on" @click="test(item)">{{item.substring(0,5)}}..</v-btn>
            </template>
            <span>{{item}}</span>
          </v-tooltip>

        </template>
        <template v-slot:item.trans="{item}">

          <v-tooltip 
            right
            v-for="(item, index) in item.trans"
            :key="index">
            <template v-slot:activator="{ on }">
              <!--<v-chip>action:{{index}}</v-chip>-->
              <v-btn  v-on="on" @click="test(item)">{{item[7]}}..</v-btn>
            </template>
            <span>{{item}}</span>
          </v-tooltip>
          
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
  <!--<v-expansion-panels focusable>
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
  </v-expansion-panels>-->
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: '看診日期',
          align: 'left',
          value: 'date'
        },
        { text: '看診醫生', sortable: false, value: 'dr_name' },
        { text: '', value: 'data-table-expand' },
      ],
      expanded: [],
      actions: ['屈膝抬腿', '直膝抬腿', '靠牆半蹲'],
    }
  },
  computed: {
    ...mapState({
      list: 'orderList'
    }),
    filter(){
      let temp=this.list
      temp=temp.map((item)=>{
        let orders=item.content.split('-')
        item.order=item.m_order.split(',')
        item.trans=orders.map((item) => {
          let order=item.split(',')
          return 'Aciton:' + this.actions[order[0]-1] + ', ' + order[1] + ' times per day, each time ' + order[2] + ' degrees'
        })
        return item
      })
      return temp
    }
  },
  methods:{
    test:function(item){
      console.log(item)
    }
  }
}
</script>
