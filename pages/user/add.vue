<template>
  <v-card elevation="2" class="pa-7 ma-5" :loading="$store.state.loading">
    <h2>Add new user</h2>
    <br/>
    <v-text-field
      v-model="email_user"
      label="Email"
      type="email"
      :rules="emailRules"
      required
    />
    <v-text-field
      v-model="name_user"
      label="Name"
      type="text"
      required
    />
    <v-text-field
      v-model="surname_user"
      label="Surname"
      type="text"
      required
    />
    <v-menu
      ref="data_of_birthMenu"
      v-model="data_of_birthMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="data_of_birth"
          label="Birthday date"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="data_of_birth"
        :active-picker.sync="data_of_birthActive"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="data_of_birthMenuSave"
      />
    </v-menu>
    <v-text-field
      v-model="password"
      :append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
      :type="passwordType ? 'text' : 'password'"
      label="Пароль"
      @click:append="passwordType = !passwordType"
      required
    />
    <v-text-field
      v-model="code_postale_user"
      label="Post code"
      type="text"
      required
    />
    <v-select
      v-model="id_role"
      :items="roles"
      label="Roles"
    />
    <v-btn color="simple" @click="back()">Back</v-btn>
    <v-btn color="success" @click="save()" :disabled="isDisable" :loading="$store.state.loading">Save</v-btn>
  </v-card>


</template>

<script>
import {genOptions} from '../../store/lib';
export default {
  name: "userAdd",
  data: () => ({
    email_user: '',
    name_user: '',
    surname_user: '',
    data_of_birth: '',
    data_of_birthActive: null,
    data_of_birthMenu: false,
    password: '',
    passwordType: false,
    code_postale_user: '',
    id_role: 1,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  watch: {
    data_of_birthMenu(val) {
      val && setTimeout(() => (this.data_of_birthActive = 'YEAR'))
    },
  },
  methods: {
    data_of_birthMenuSave(date) {
      this.$refs.data_of_birthMenu.save(date)
    },
    back(){
      this.$router.back();
    },
    save() {
      this.$axios.post('/users/register', {
        email_user: this.email_user,
        name_user: this.name_user,
        surname_user: this.surname_user,
        data_of_birth: this.data_of_birth,
        password: this.password,
        id_role: this.id_role,
        code_postale_user: this.code_postale_user,
      }, this.headerAxios).then(({data}) => {
         if(data.status){
           this.$store.commit('alerts', {
             type: 'success',
             content: 'User '+this.name_user+' is created'
           });
           this.email_user = '';
           this.name_user = '';
           this.surname_user = '';
           this.data_of_birth = '';
           this.password = '';
           this.id_role = '';
           this.code_postale_user = '';

           this.$router.push('/')
         }else{
           this.$store.commit('alerts', {
             type: 'error',
             content: 'User '+this.name_user+' is not created.'
           });
         }

      })
    }
  },
  computed: {
    isDisable(){
      for(const key of ['email_user', 'name_user', 'surname_user', 'data_of_birth', 'password','code_postale_user']){
        if(!this[key].length)
          return true;
      }
      return false;
    },
    roles(){
      const res = {2: 'member'};
      if(+this.$store.state.me.id_role >= 3){
        res[3] = 'worker';
      }
      if(+this.$store.state.me.id_role >= 4){
        res[4] = 'admin';
      }
      return genOptions(res);
    },
    headerAxios() {
      return {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
