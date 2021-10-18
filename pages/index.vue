<template>
  <div>
    <div class="search-wrap">
      <v-container class="search">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="title_book"
            label="Search"
            required
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="genre"
            :items="genOptions(this.$store.state.genres, 'Select')"
            label="Genre"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="author"
            :items="genOptions(this.$store.state.authors, 'Select')"
            label="Author"
          />
        </v-col>
      </v-row>
        </v-container>
    </div>
    <BooksList :title_book="title_book" :genre="genre" :author="author" />
  </div>
</template>
<script>
import BooksList from "../components/BooksList";
export default {
  components: {BooksList},
  data: () => ({
    title_book: '',
    genre: '',
    author: '',
    authorList: [],
    genreList: []

  }),
  methods:{
    genOptions(items, def){
      const res = [];
      if(def){
        res.push({
            text: def,
            value: null
        })
      }

      for(const value in items){
        res.push({
          text: items[value],
          value
        });
      }
      return res;
    }
  },
  created() {
    this.$store.commit('loading', true);
    this.$axios.get('/books/get_genres', this.headerAxios).then(({status, data}) => {
      this.$store.commit('genres', data.data);
      this.$store.commit('loading', false);
    });
    this.$axios.get('/books/get_authors', this.headerAxios).then(({status, data}) => {
      this.$store.commit('authors', data.data);
      this.$store.commit('loading', false);
    })
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
  .search-wrap{
    width: 100%;
    margin: 30px 0;
    min-height: 300px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    z-index: 0;
    display: flex;
    justify-content: center;
  }
  .search{
    background: #fafafa;
    width: 75%;
    margin: auto;
    border-radius: 10px;
    padding: 30px;

  }
  .search::after{
    background: url('/img/bg.jpg') center/cover;
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    filter: blur(3px);
    z-index: -1;

  }
</style>
