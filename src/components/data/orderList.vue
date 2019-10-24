<template>
  <v-card>
    <v-card-title><span>Order list</span></v-card-title>
      <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="filter"
        :items-per-page="5"
        class="elevation-1">
      
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
          text: 'order date',
          align: 'left',
          value: 'date'
        },
        { text: 'symptom', sortable: false, value: 'm_order' },
        { text: 'medical-order', sortable: false, value: 'trans' },
        { text: 'remark', sortable: false, value: 'remark' }
      ],
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
        item.trans=orders.map((item) => {
          let order=item.split(',')
          console.log(order[0])
          return 'Aciton:' + this.actions[order[0]-1] + ', ' + order[1] + ' times per day, each time ' + order[2] + ' degrees'
        })
        console.log(item)
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
