
<template>
  <v-data-table :headers="headers" :items="patients" :items-per-page="5" class="elevation-1">

    <template v-slot:item.action="{ item }">
      <v-icon @click="overlay=!overlay">mdi-arrow-right-bold-hexagon-outline</v-icon>

        <v-overlay :value="overlay">
        <!--插入order-->
        </v-overlay>

    </template>
    
  </v-data-table>
</template>
<script>
export default {
  //fake registered system.
  data() {
    return {
      headers: [
        {
          text: "Number",
          align: "left",
          value: "index"
        },
        { text: "ID", value: "id" },
        { text: "Name", value: "name", align: "center" },
        { text: "Sex", value: "sex" },
        { text: "Remark", value: "remark", sortable: false },
        { text: "Order", value: "action", sortable: false }
      ],
      patients: [
        {
          index: 1,
          id: "A987654321",
          name: "kyle Simpson",
          sex: "Male",
          remark: ""
        },
        {
          index: 2,
          id: "A987654322",
          name: "John Armstrong",
          sex: "Male",
          remark: ""
        },
        {
          index: 3,
          id: "A987654323",
          name: "Alex Solis",
          sex: "Male",
          remark: ""
        },
        {
          index: 4,
          id: "A987654324",
          name: "monica cill",
          sex: "Female",
          remark: ""
        },
        {
          index: 5,
          id: "A987654325",
          name: "Jessica Jung",
          sex: "Female",
          remark: "will be ten minutes late!"
        }
      ]
    };
  }
};
</script>