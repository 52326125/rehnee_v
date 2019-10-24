<template>
  <v-card class="mx-auto" max-width="90%" width="1400">

    <v-card-title>
      <v-btn color="warning" @click="back">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-row justify="center">
        <p>Medical Order system</p>
      </v-row>

    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="6">
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
                  <v-date-picker v-model="patient.time" :dark="isDark"></v-date-picker>
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
                <v-chip
                  v-for="(item,index) in ordersE"
                  :key="index"
                  close
                  @click:close="removeOrder(item)"
                  color="primary"
                  style="margin-bottom:20px !important;">
                  {{item}}
                </v-chip>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row>
              <v-col cols="4">
                <!--<v-select v-model="patient.content" :items="items" label="order" required></v-select>-->
              <!--<v-text-field label="Action" v-model="order[0]"></v-text-field>-->
                <v-select
                  :items="actions"
                  item-text="name"
                  item-value="value"
                  v-model="order[0]"
                  label="Action">
                </v-select>
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
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="5">
          <v-row justify="center" align="center">
              <v-btn @click="changeRecord('pre')">
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <v-alert
                outlined
              >
                {{patient.medicalRecord[recordIndex].date}}
              </v-alert>
              <v-btn @click="changeRecord('next')">
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>

            <v-col cols="12">
              <p>Syptom</p>
            </v-col>
            <v-col cols="12">
              <v-chip
                v-for="(item,index) in record[recordIndex].syptom "
                :key="index"
                color="primary"
                style="margin-bottom:20px !important;">
                {{item}}
              </v-chip>
            </v-col>
            
            <v-col cols="12">
            <v-divider/>
              <p>Medical Order</p>
            </v-col>
            <v-col cols="12" class="ma-2">
              <v-chip
                v-for="(item,index) in record[recordIndex].medical_order "
                :key="index"
                color="primary">
                {{item}}
              </v-chip>
            </v-col>
            <v-col cols="12">
              <v-divider/>
              <p>Remark</p>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="remark"
                v-model="record[recordIndex].remark"
                disabled
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
    ordersE: [],
    order: [],
    rule: [v => !!v || 'Cannot be null'],
    //ruleA: [v=> v.length>0 || 'Cannot be null'],
    recordIndex:-1,
    actions: [
      {name: '屈膝抬腿', value: 1},
      {name: '直膝抬腿', value: 2},
      {name: '靠牆半蹲', value: 3}
    ]
  }),
  created () {
    this.getDiseaseName()
    this.recordIndex=this.patient.medicalRecord.length-1
    console.log(this.recordIndex)
  },
  computed: {
    ...mapState([
      'patient',
      'diseaseName',
      'patients',
      'isDark'
    ]),
    ...mapState({
      record : state => state.patient.medicalRecord
    }),
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
      this.orders.push(this.order.join(','))
      this.ordersE.push('Aciton:' + this.actions[this.order[0]].name + ', ' + this.order[1] + ' times per day, each time ' + this.order[2] + ' degrees')
      this.order = []
    },
    validate () {
      if (this.$refs.form.validate()) {
        // this.patient.code=btoa(this.patient.ID)
        if(this.patient.remark==null) this.patient.remark=''
        if(this.orders.length==0) return alert('not order yet')
        let temp = new Date()
        this.patient.date =
          temp.getFullYear() +
          '-' +
          (temp.getMonth() + 1) +
          '-' +
          temp.getDate()
        this.patient.content = this.orders.join('-')
        console.log(this.patient)
        this.$store.dispatch('order', this.patient) // error是因為db中沒有P_code
        let currentPatient=this.patients.filter(item => item.code==this.patient.code)
        console.log(currentPatient)
        this.patients.splice(this.patients.indexOf(currentPatient[0]),1)
        this.back()
      }
    },
    back () {
      this.overlay = !this.overlay
    },
    remove (item) {
      const index = this.patient.medicalOrder.indexOf(item.name)
      if (index >= 0) this.patient.medicalOrder.splice(index, 1)
    },
    removeOrder (item) {
      this.orders.splice(this.orders.indexOf(item),1)
      this.ordersE.splice(this.ordersE.indexOf(item),1)
    },
    changeRecord (command) {
      if (command === 'pre'){
        if (this.recordIndex > 0) this.recordIndex--
      } else {
        if (this.recordIndex < this.record.length-1)  this.recordIndex++
      }
      console.log(this.recordIndex)
    }
  }
}
</script>
