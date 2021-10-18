<template>
  <v-app>
    <div style="position: fixed; z-index: 99; left:0; width: 100%;">
      <v-alert
        v-for="(alert, index) in $store.state.alerts"
        :key="index"
        elevation="1"
        :type="alert.type"
        width="100%"
        dismissible
        v-html=""
      ><span v-html="alert.content"/>
      </v-alert>

    </div>
    <v-app-bar
      fixed
      app
    >
      <nuxt-link to="/" class="no-link">
      <v-icon>mdi-book</v-icon>&nbsp;<v-toolbar-title v-text="title"/>
      </nuxt-link>
      <v-spacer/>
      <v-btn icon v-if="$store.state.me.id_role >= 3">
      <nuxt-link to="/book/rent" no-prefetch >
        <v-icon>mdi-account-tie</v-icon>
      </nuxt-link>
    </v-btn>
      <v-btn icon v-if="$store.state.me.id_role >= 2">
        <nuxt-link to="/book/my" no-prefetch >
          <v-icon>mdi-book</v-icon>
        </nuxt-link>
      </v-btn>
      <v-btn icon v-if="$store.state.me.id_role >= 3">
        <nuxt-link to="/user/check" no-prefetch >
          <v-icon>mdi-account-check</v-icon>
        </nuxt-link>
      </v-btn>
      <v-btn icon color="secondary" v-if="$store.state.me.id_role >= 3">
        <nuxt-link to="/user/add" no-prefetch >
          <v-icon>mdi-account-plus</v-icon>
        </nuxt-link>
      </v-btn>
      {{$store.state.me.email_user}}
      <v-btn icon color="secondary" v-if="$store.state.isAuth" @click="actionLogout">
          <v-icon>mdi-logout</v-icon>
      </v-btn>


    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      title: 'BOOKS.FR',
      miniVariant: false,
    }
  },
  methods: {
    actionLogout(){
      this.$store.commit('logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
  .no-link[class]{
    display: flex;
    text-decoration: none;
    color: inherit;
  }
</style>
