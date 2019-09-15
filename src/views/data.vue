<template>
  <v-container fluid>
    <v-row align="start">
      <v-col cols="6">
        <patient />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
          <orderList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import chat from "../components/data/chat";
import orderList from "../components/data/orderList";
import patient from "../components/data/patient";
import record from "../components/data/record";

export default {
  components: {
    chat,
    orderList,
    patient,
    record
  },
  data() {}
};
</script>