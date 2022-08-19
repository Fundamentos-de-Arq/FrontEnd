<template >
  <div >

    <v-container >
      <v-row >
        <v-col v-for="add in listAdds"
               :key="add.id"
               cols="12"
               md="6">
          <v-card>
            <v-card-title class="font-weight-bold">
              {{add.title}}
            </v-card-title>
            <v-img :src=add.urlToImage>
            </v-img>
            <v-card-text >
              <v-chip class="ma-2"
                      color="green"
                      label
                      text-color="white">
                {{ add.description }}
                <v-avatar right>
                  <v-icon >mdi-bullhorn</v-icon>
                </v-avatar>
              </v-chip>
              <br/>

              <v-chip class="ma-2"
                      color="orange"
                      label
                      text-color="white"
                      v-if="add.promoted===true">
                Discount: {{ add.discount }}%
                <v-icon right>
                  mdi-star
                </v-icon>
              </v-chip>

              <v-chip class="ma-2"
                      color="red"
                      label
                      text-color="white"
                      v-else>
                Discount: {{ add.discount }}%
                <v-icon right>
                  mdi-close-circle
                </v-icon>
              </v-chip>
              <br/>
              <v-chip class="ma-2"
                      color="orange"
                      label
                      text-color="white"
                      v-if="add.promoted===true">
                Any promotion?: {{ add.promoted }}
                <v-avatar right>
                  <v-icon >mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
              </v-chip>

              <v-chip class="ma-2"
                      color="red"
                      label
                      text-color="white"
                      v-else>
                Any promotion?: {{ add.promoted }}
                <v-avatar right>
                  <v-icon >mdi-close-circle</v-icon>
                </v-avatar>
              </v-chip>
            </v-card-text>
            <v-card-actions fluid class="btns">

              <v-btn class="green white--text ma-2" color="green"
                     button
                     text-color="white" href="https://api.whatsapp.com/send?phone= +51 921285233"   target="blank">

                <v-icon left>
                  mdi-whatsapp
                </v-icon>
                Contact
              </v-btn>

            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>


import UsersService from "@/core/services/users.service";
import AddServices from "@/core/services/ad.service"

export default {
  name: "discountedAdd",
  data: ()=>({
    userId:UsersService.currentUser,
    listAdds:[],

    dateTime:'',
    title:'',
    description:'',
    discount: 0,
    urlToImage: '',
    promoted:false,
    phoneNumber:0

  }),
  components: { },
  methods: {

   async retrieveDiscountedAdds(){
     await UsersService.getUsersById(localStorage.getItem("user")).then(async response=>{
       this.phoneNumber= await response.data.phone;
     });
     await AddServices.getDiscountedAdds().then(async response =>{
       this.listAdds= await response.data;
     })
   }
  },
  mounted () {
    this.retrieveDiscountedAdds()
  }
}
</script>

<style scoped>


</style>
