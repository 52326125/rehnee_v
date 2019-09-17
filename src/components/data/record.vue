<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header>Rehabilitation list</v-expansion-panel-header>
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
export default {
  data (){
    return {
      headers:[
        {
          text:'Rehabilitation date',
          align: 'left',
          value: 'date'
        },
        {text:'Rehabilitation time',sortable: false,value: 'time'},
        {text: 'Spend time',sortable: false,value: 'spend_time'},
      ]
    }
  },
  computed: {
    list() {
      return this.$store.getters.getRecordList; //建立orderlist
    }
  }
};
</script>