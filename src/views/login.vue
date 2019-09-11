<template>
  <v-row align="center">
    <v-col cols="4">
      <v-img src="../assets/Rehnee.jpg" max-width="100%"></v-img>
    </v-col>
    <v-col cols="8" justify-end>
      <v-card height="500" max-width="50%" class="mx-auto" align="center">
        <v-card-title class="title">Rehnee-login</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field autofocus v-model="user.account" type="text" label="Account" required></v-text-field>

            <v-text-field
              v-model="user.password"
              label="Password"
              required
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn color="#42A5F5" class="mr-4" @click="login">login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      showPassword: false,
      valid: true
    };
  },
  methods: {
    set: function(path) {
      this.$cookies.set("isLogin", "1212");
      this.$router.push(path);
    },
    login: function() {
      axios.get("/api/login", this.user)
        .then(function(res) {
          //commit("LOGIN");
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>