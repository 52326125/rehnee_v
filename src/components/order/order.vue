<template>
  <v-card class="mx-auto" max-width="500">

    <v-card-title>
      <v-btn color="warning" @click="back">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>Medical-order system

    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" >
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field disabled v-model="patient.name" label="Name" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field disabled v-model="patient.date" label="Last order date" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field v-on="on" label="Next order date" required v-model="patient.time" :rules="rule"></v-text-field>
              </template>
              <v-date-picker v-model="patient.time"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="patient.medicalOrder"
              :items="diseaseName"
              filled
              chips
              :rules="rule"
              label="Syptom"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  color="primary"
                  v-bind="data.name"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <!--<p>symptom</p>
            <v-textarea no-resize solo v-model="patient.medicalOrder"></v-textarea>-->
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <p>Medical order</p>
          </v-col>
          <v-col cols="12">
            <v-chip v-for="(item,index) in orders" :key="index">
              {{item}}
            </v-chip>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="4">
            <!--<v-select v-model="patient.content" :items="items" label="order" required></v-select>-->
          <v-text-field label="Action" v-model="order[0]"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Angle" v-model="order[1]"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field label="Times"
              v-model="order[2]"
              @keyup.native.enter="addOrder"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn fab @click="addOrder">
               <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="patient.remark" label="remark" required></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    valid: true,
    orders: [],
    order: [],
    rule: [v => !!v || 'Cannot be null']
  }),
  created () {
    this.getDiseaseName()
  },
  computed: {
    ...mapState([
      'patient',
      'diseaseName'
    ]),
    overlay: {
      get: function () {
        return this.$store.state.overlay
      },
      set: function (newVal) {
        this.setOverlay(newVal)
      }
    }
  },
  destroyed: function () {
    this.resetPatient()
  },
  methods: {
    ...mapActions([
      'setOverlay',
      'resetPatient',
      'getDiseaseName'
    ]),
    addOrder () {
      let temp = this.order.join(',')
      this.orders.push(temp)
      this.order = []
    },
    validate () {
      if (this.$refs.form.validate()) {
        // this.patient.code=btoa(this.patient.ID)
        var temp = new Date()
        this.patient.date =
          temp.getFullYear() +
          '-' +
          (temp.getMonth() + 1) +
          '-' +
          temp.getDate()
        this.patient.content = this.orders.join('-')
        console.log(this.patient)
        this.$store.dispatch('order', this.patient) // error是因為db中沒有P_code
        back()
      }
    },
    back () {
      this.overlay = !this.overlay
    },
    remove (item) {
      const index = this.patient.medicalOrder.indexOf(item.name)
      if (index >= 0) this.patient.medicalOrder.splice(index, 1)
    }
  }
}
</script>
