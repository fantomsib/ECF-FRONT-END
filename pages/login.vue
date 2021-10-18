<template>
  <v-card elevation="3" class="block-login" :loading="$store.state.loading">
    <div class="pa-7">
      <h3 class="text-center">Login</h3>
      <form>
        <v-text-field
          v-model="username"
          label="Email"
          :rules="emailRules"
          required

        />
        <v-text-field
          v-model="password"
          :append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordType ? 'text' : 'password'"
          label="Password"
          @click:append="passwordType = !passwordType"
          required
        />


        <div class="mt-5 ">
          <div class="float-left red--text">
            {{ passwordDescription }}
          </div>
          <div class="d-flex justify-end">
            <v-btn depressed color="simple" @click="actionSignUp">Sign up</v-btn> &nbsp;
            <v-btn depressed color="primary" @click="actionLogin">Enter</v-btn>
          </div>

        </div>

      </form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "login",
  layout: 'login',
  data: () => ({
    username: '',
    password: '',
    passwordType: false,
    passwordDescription: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    actionLogin() {
      this.passwordDescription = "";
      this.$store.commit('loading', true);
      this.$axios.post('users/login', {
        username: this.username,
        password: this.password
      }).then(({data}) => {

        if(data.data.id_role === "1"){
          this.passwordDescription = "Your account is not confirmed";
          this.$store.commit('loading', false);
          return 0;
        }
        this.$store.commit('loading', false);
        this.$store.commit('isAuth', data.status);
        this.$store.commit('me', data.data);
        this.$store.commit('token', data.data.token);

        this.passwordDescription = "";
        if(data.status){
          this.$router.push('/');
        }
      }).catch(() => {
        this.$store.commit('loading', false);
        this.passwordDescription = "Wrong email or password";
      })
    },
    actionSignUp(){
      this.$router.push('/user/register');
    }
  }
}
</script>

<style scoped>
.block-login {
  max-width: 500px;
  width: 85%;
  margin: auto;

}
</style>
