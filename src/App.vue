<template>
  <v-app >

      <app-bar v-show="$route.path!=='/'"></app-bar>

    <v-main >
      <v-container fluid >

      <router-view/>

      </v-container>
    </v-main>

  </v-app>
</template>

<!--<style lang="scss">-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->


<!--</style>-->
<script>
import router from "@/router";
import appBar from "@/components/app-bar";
export default {
  data () {
    return {
      drawNavigation: true,
      router: router
    }
  },
  components: {appBar},
  methods:{

  }
}
</script>
