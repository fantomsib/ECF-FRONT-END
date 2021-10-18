<template>
  <v-card elevation="2" class="pa-7 ma-5">
    <h2>Rent list</h2>
    <br/>
    <v-data-table
      :headers="headers"
      :items="books"
      :loading="$store.state.loading"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn v-if="!item.date_rent" color="success" @click="actionRent(item.id_rent)">
          Rent
        </v-btn>
        <v-btn v-if="!item.date_return" color="success" @click="actionReturn(item.id_rent)">
          Return
        </v-btn>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img width="65" :src="item.image" />
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
    books: [],
    headers: [
      { text: 'Image', value: 'image' },
      { text: 'Name', value: 'title_book' },
      { text: 'Date reservation', value: 'reservation_date' },
      { text: 'Date rent', value: 'date_rent' },
      { text: 'Date return', value: 'date_return' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  methods:{
    actionLoad(){
      this.$axios.post('/rent/list_worker', {}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.books = data.data;

        }else{
          this.$store.commit('alerts', {
            type: 'error',
            content: data.error
          });
        }

      });
    },
    actionReturn(id_rent){
      this.$axios.post('/rent/return', {id_rent}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.$store.commit('alerts', {
            type: 'success',
            content: 'Record #'+id_rent+' is returned'
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
    actionRent(id_rent){
      this.$axios.post('/rent/rent', {id_rent}, this.headerAxios).then(({data})=>{
        if(data.status){
          this.$store.commit('alerts', {
            type: 'success',
            content: 'Record #'+id_rent+' is rented'
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
