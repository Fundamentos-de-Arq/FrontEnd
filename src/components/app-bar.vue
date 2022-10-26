<template>
  <v-toolbar
      color="red"
      max-height="70px"
      class="text-white"

  >

    <v-app-bar-title >Adoptme Ya!</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn class="text-white" plain @click="goToAllPublications">Pets</v-btn>
    <v-btn class="text-white" plain @click="goToAds">Ads</v-btn>
    <v-btn class="text-white" plain @click="seeDiscountedAdds">Promotions</v-btn>
    <v-btn class="text-white" plain @click="seeSubscriptions">Subscriptions</v-btn>
    <v-spacer></v-spacer>

    <v-btn class="text-white" icon @click="goToMyAds">
      <v-icon >mdi-advertisements</v-icon>
    </v-btn>
    <v-btn class="text-white" icon @click="goToMyPublications">
      <v-icon >mdi-newspaper-variant</v-icon>
    </v-btn>
    <v-btn class="text-white" icon @click="goToPets">
      <v-icon >mdi-paw</v-icon>
    </v-btn>
    <v-btn class="text-white" icon @click="seeMyNotifications">
      <v-icon >mdi-bell</v-icon>
    </v-btn>
    <v-btn class="text-white" icon @click="seeMyUserProfile">
      <v-icon >mdi-account-circle</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import UsersService from "@/core/services/users.service";

export default {
  name: "app-bar",
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
      this.$router.push('/profile');
    },
    goToCreateAd(){
      this.$router.push('/createAD')
    },
    goToAds(){
      this.$router.push('/createAD')
    },
    seeDiscountedAdds(){
      this.$router.push('/discountedAdds')
    },
    seeSubscriptions(){
      this.$router.push('/subscriptions')
    },
    seeMyNotifications(){
      this.$router.push('/myNotifications')
    },
    goToMyAds(){
      this.$router.push('/myAds')
    }

  },

}
</script>

<style scoped>

</style>
