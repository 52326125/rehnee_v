<template>
  <v-card
    class="mx-auto"
    min-width="400"
  >
    
    <v-card-title>
        <v-btn color="warning" @click="back">
        <v-icon>mdi-keyboard-backspace</v-icon>
    </v-btn>
        New patient
        </v-card-title>

    <v-card-text>
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="patient.name"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="patient.ID"
      label="ID"
      required
    ></v-text-field>

    <p class="text-center font-weight-bold">Pick patient birthday</p>
    <v-row justify="center">
        <v-date-picker v-model="patient.birth"></v-date-picker>
    </v-row>

  </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
          <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="validate"
    >
      Send
    </v-btn>

    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      patient:{
          name:'',
          ID:'',
          birth: new Date().toISOString().substr(0, 10),
          code: '',
          date: ''
      }
    }),

    methods: {
        back:function(){
            this.$store.dispatch('setOrderPage',{page:0})
        },
      validate () {
        this.patient.code=btoa(this.patient.ID)
        this.$store.dispatch('newPatient',this.patient)
        this.$store.dispatch('setOrderPage',{page:2})
      },
    }
  }
</script>