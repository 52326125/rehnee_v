<template>
  <v-card class="mx-auto">
    <v-card-title>
      <v-btn color="warning" @click="back">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>Medical-order system
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
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
                <v-text-field v-on="on" label="Next order date" required v-model="patient.time"></v-text-field>
              </template>
              <v-date-picker v-model="patient.time"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <p>symptom</p>
            <v-textarea no-resize solo v-model="patient.medicalOrder"></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-select v-model="patient.content" :items="items" label="order" required></v-select>
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
export default {
  data: () => ({
    valid: true,
    items: ['1,20,5','3,20,5']
  }),

    computed:{
        patient (){
            return this.$store.getters.getPatient//new轉過來時名字沒有更新
        }
    },
  destroyed:function(){
    this.$store.dispatch('resetPatient')
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.patient.code=btoa(this.patient.ID)
        var temp=new Date()
        this.patient.date=temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate()
        console.log(this.patient)
        this.$store.dispatch('order',this.patient)//error是因為db中沒有P_code
        this.$store.dispatch('setOrderPage',{page:0})
      }
    },
    back() {
        //alert(this.patient.time)
      this.$store.dispatch('setOrderPage',{page:0})
    },
  }
};
</script>