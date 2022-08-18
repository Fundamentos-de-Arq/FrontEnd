<template>
  <div>

    <v-list-item class="px-2 mb-4"  style="color: white" >

      <v-list-item-title >ADOPTME YA!</v-list-item-title>

    </v-list-item >

  <!----Mi perfil de usuario----->
    <v-list dense >
      <v-list-item @click="seeMyUserProfile" style="color: white">
        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >USER PROFILE</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!----Fin de mi perfil de usuario----->

    <v-list dense >
      <v-list-item @click="goToMyPublications" style="color: white">
        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >MY PUBLICATIONS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item @click="goToAllPublications" style="color: white">
        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>ALL PUBLICATIONS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item @click="goToPets" style="color: white">

        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>MY PETS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
    <!---Inicio de menu crear Anuncio ----->
    <v-list dense>
      <v-list-item @click="goToCreateAd" style="color: white">

        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>ALL ADDS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item @click="seeDiscountedAdds" style="color: white">

        <v-list-item-icon>
          <v-icon style="color: white">mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>DISCOUNTED ADDS</v-list-item-title>

        </v-list-item-content>
      </v-list-item>

    </v-list>

    <v-list dense>
      <v-list-item @click="seeMyAds" style="color: white">
        <v-list-item-icon>
          <v-icon style="color: white"> mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>MY ADS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense>
      <v-list-item @click="seeMyNotifications" style="color: white">
        <v-list-item-icon>
          <v-icon style="color: white"> mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>MY NOTIFICATIONS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!---Fin de menu crear Anuncio ----->
  </div>
</template>

<script>
import UsersService from "../core/services/users.service"

export default {
  name: "app-navigation",
  data () {
    return {
      drawer: true,
      items: [
        { title: 'MY PUBLICATIONS', icon: 'mdi-view-dashboard' },
        { title: 'ALL PUBLICATIONS', icon: 'mdi-view-dashboard' },
      ],

    }
  },
  methods: {
    goToMyPublications(){
      this.$router.push('/myPublications');
    },
    goToAllPublications(){
      this.$router.push('/allPublications');
    },
    goToPets(){
      this.$router.push('/myPets');
    },
    seeMyUserProfile(){
      UsersService.currentUser = 0;
      this.$router.push('/myUserProfile');
    },
    goToCreateAd(){
      this.$router.push('/createAD')
    },
    seeDiscountedAdds(){
      this.$router.push('/discountedAdds')

    },
    seeMyAds(){
      this.$router.push('/myAds')
    },
    seeMyNotifications(){
      this.$router.push('/myNotifications')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
