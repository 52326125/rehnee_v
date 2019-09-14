<template>
  <v-card>
    <v-card-title>
      Nutrition
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
     <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
  
</template>

<script>
  export default {
      computed:{
          getAllPatient (){
              return this.$store.getters. 
          }
      },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Profile picture',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Name', value: 'calories' },
          { text: 'Birth', value: 'carbs' },
          { text: 'last Order', value: 'protein' },
          { text: 'last MSG', value: 'iron' },
        ],
      }
    },
  }
</script>