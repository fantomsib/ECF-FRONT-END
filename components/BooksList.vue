<template>
  <v-row
    class="mb-6"
  >
    <v-col cols="3" v-for="book in books" :key="book.id_book">
      <v-card :class="'mx-auto my-12 book-item '+(book.active === '0'?' no-active':'')">
        <v-img height="300" :src="book.image" contain />
        <v-card-title>{{book.title_book}}</v-card-title>
        <v-card-text>
          <div><strong>Genres:</strong> {{book.genres}}</div>
          <div><strong>Authors:</strong> {{book.authors}}</div>
        </v-card-text>

        <v-card-text>{{book.description}}</v-card-text>
        <v-card-actions> <v-btn text @click="actionBooking(book.id_book, title_book)" :disabled="book.active === '0'"> Book </v-btn> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "BooksList",
  props: ['title_book', 'genre', 'author'],
  created() {
    this.loadBooks(this.title_book, this.genre, this.author);
  },
  data: () => ({
    books: []
  }),
  computed:{
    headerAxios() {
      return {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    },
  },
  methods: {
    loadBooks(title_book, genre, author){
      return this.$axios.post('/books/list', {
        title_book, genre, author
      }, this.headerAxios).then(({data}) => {
        this.books = data.data.map(v => {
          v.genres = Object.values(v.genres).join(', ');
          v.authors = Object.values(v.authors).join(', ');
          return v;
        });
      })
    },
    actionBooking(id_book, title_book){
      return this.$axios.post('/rent/reserve', {id_book}, this.headerAxios).then(({data}) => {
        if(data.status) {
          this.$store.commit('alerts', {
            type: 'success',
            content: 'Book "'+title_book+'" - is reserved'
          });
        }else{
          this.$store.commit('alerts', {
            type: 'error',
            content: 'Book "'+title_book+'" - is not reserved'
          });
        }
        this.loadBooks(this.title_book, this.genre, this.author);
      })
    }
  },
  watch: {
    title_book(){
      this.loadBooks(this.title_book, this.genre, this.author);
    },
    genre(){
      this.loadBooks(this.title_book, this.genre, this.author);
    },
    author(){
      this.loadBooks(this.title_book, this.genre, this.author);
    },
  }
}
</script>

<style>
  .book-item.no-active{
    filter: grayscale(100%) opacity(50%);
  }
</style>
