<template>
  <div >



<!--    <v-toolbar dark color="#162130" style="height:10vh; width:100%; position: fixed; z-index:200" >-->

<!--      <v-toolbar-items v-if="false">-->
<!--        <v-btn class="icon" color="#162130" @click.stop="drawer = !drawer">-->
<!--          <v-icon  >mdi-menu</v-icon>-->
<!--        </v-btn>-->
<!--      </v-toolbar-items>-->
<!--    </v-toolbar>-->


    <v-card style="height: 100%; width:100%; z-index:100">
      <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
          style="position: fixed; padding-top: 12vh "
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn
              icon
              @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense >
          <v-list-item @click="goToMyPublications">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>MY PUBLICATIONS</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list dense>
          <v-list-item @click="goToAllPublications">

          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ALL PUBLICATIONS</v-list-item-title>
          </v-list-item-content>
          </v-list-item>

        </v-list>

      </v-navigation-drawer>
    </v-card>

  </div>
</template>
<script>


export default {
  name: "nav-bar",
  data () {
    return {
      drawer: true,
      items: [
        { title: 'MY PUBLICATIONS', icon: 'mdi-view-dashboard' },
        { title: 'ALL PUBLICATIONS', icon: 'mdi-view-dashboard' },
      ],

    }
  },
  components: { },
  methods: {
    goToMyPublications(){
      this.$router.push('/myPublications');
    },
    goToAllPublications(){
      this.$router.push('/allPublications');
    },
    goToMyPets(){
      this.$router.push('/myPets');
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
#nav {
  position: absolute;
  z-index: 3;
}

</style>
