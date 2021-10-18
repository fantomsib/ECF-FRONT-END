<template>
  <v-card elevation="2" class="pa-7 ma-5">
    <h2>List users without confirm </h2>
    <br/>
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="$store.state.loading"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn color="error" @click="actionRefuse(item.id_user)">
          Refuse
        </v-btn>
        <v-btn color="success" @click="actionConfirm(item.id_user)">
          Confirm
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "userConfirm",
  created() {
    this.actionLoad()
  },
  data: () => ({
    users: [],
    headers: [
      { text: 'ID', value: 'id_user' },
      { text: 'Email', value: 'email_user' },
      { text: 'Name', value: 'name_user' },
      { text: 'Surname', value: 'surname_user' },
      { text: 'Birthday', value: 'data_of_birth' },
      { text: 'Postcode', value: 'code_postale_user' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  methods:{
    actionLoad(){
      this.$axios.post('/users/get_list_not_confirm', {}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.users = data.data;

        }else{
          this.$store.commit('alerts', {
            type: 'error',
            content: data.error
          });
        }

      });
    },
    actionConfirm(id_user){
      this.$axios.post('/users/confirm', {id_user}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.$store.commit('alerts', {
            type: 'success',
            content: 'User #'+id_user+' is confirmed'
          });
          this.actionLoad();
        }else{
          this.$store.commit('alerts', {
            type: 'error',
            content: data.error
          });
        }

      });
    },
    actionRefuse(id_user){
      this.$axios.post('/users/refuse', {id_user}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.$store.commit('alerts', {
            type: 'success',
            content: 'User #'+id_user+' is refused'
          });
          this.actionLoad();
        }else{
          this.$store.commit('alerts', {
            type: 'error',
            content: data.error
          });
        }

      });
    }
  },
  computed: {
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
