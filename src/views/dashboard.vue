<template>
  <v-card>
    <v-card-title>
      Nutrition
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getAllPatient"
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
              return this.$store.getters.getAllPatient
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
            value: 'profi',
          },
          { text: 'Name', value: 'name' },
          { text: 'Birth', value: 'date' },
          { text: 'last Order', value: 'date' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
      }
    },
  }
</script>