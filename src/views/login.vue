<template>
  <v-row align="center">
      <v-card height="500" width="500" max-height="50%" max-width="50%" class="mx-auto" align="center">
        <v-card-title class="title">Rehnee-login</v-card-title>
        <v-card-text>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field autofocus v-model="user.account" type="text" label="Account" required></v-text-field>

            <v-text-field
              v-model="user.password"
              label="Password"
              @keyup.native.enter="set"
              required
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn color="#42A5F5" class="mr-4" @click="set">login</v-btn>
          </v-form>
          
        </v-card-text>
      </v-card>
  </v-row>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        account: '',
        password: ''
      },
      showPassword: false,
      valid: true
    }
  },
  methods: {
    set: function () {
      this.$store.dispatch('login', this.user)
    }
    /* login: function() {
      axios.get("/api/login", {params:this.user})
        .then((res)=> {
          if (res.data.length){
            alert("login success!")
            this.$cookies.set('isLogin','1')
            this.$router.push('/home')
          }else{
            alert('error; worng ID or password')
          }
          console.log(res.data[0].dr_ID)
        })
        .catch((error) =>{
          console.log(error)
        })
    }, */
  }
}
</script>
