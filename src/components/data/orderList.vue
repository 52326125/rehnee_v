<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header>order list</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list >
          <v-list-item
            v-for="i in list"
            :key="i"
          >

          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
    computed: {
        list () {
            return this.$store.getters.getOrderList//建立orderlist
        }
    }
};
</script>