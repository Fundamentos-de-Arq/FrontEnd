<template>
  <v-app>

    <!--      <div style="display:flex; justify-content:center; margin-bottom: 20px">-->
    <!--        <v-card class="filters" max-width="800">-->
    <!--          <filtercomponent/>-->
    <!--          <v-card-actions class="justify-center">-->
    <!--            <v-btn style="color:white; background-color: #FFC107" elevation="2" @click="getdata">Filter</v-btn>-->
    <!--          </v-card-actions>-->
    <!--        </v-card>-->
    <!--      </div>-->
    <v-container>
      <v-row>

        <v-col v-for="publication in publications" :key="publication.id" cols="4">
          <div v-for="pet in pets" :key="pet.id">
            <div v-for="user in listUsers" :key="user.id"
                   v-show="
                        pet.id === publication.petId &&
                        user.id === publication.userId
                      "
            >
              <v-card

                  class="example-card">

                <v-img
                    src="../assets/demo.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title style="font-size: 2rem" v-text="pet.name"></v-card-title>
                </v-img>

                <v-card-actions >
                  <v-btn
                      @click="FormtoAdopt(pet.userId, publication.id)"
                      v-if="publication.userId!==currentUser"
                      class="mb-2 white--text red darken-1 "
                  >
                    Adopt
                  </v-btn>

                  <v-btn
                      @click="goToUserProfile(publication.userId)"
                      class="mb-2 white--text red darken-1 "
                  >
                    Profile
                  </v-btn>
                </v-card-actions>

              </v-card>

            </div>
          </div>
        </v-col>
      </v-row>

    </v-container>

    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
            <span class="text-h5"
            >To: {{ this.nameOfOwner }} {{ this.lastnameOfOwner }}
            </span>
            </v-card-title>

            <div class="text-center">
              <v-menu open-on-hover top offset-y></v-menu>
            </div>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        label="message"
                        v-model="message"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="Close"> Close</v-btn>
              <v-btn color="blue darken-1" text @click="sendAdoption(message, )"> Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <!--Final Formulario de publicacion-->
  </v-app>
</template>

<script>
import CreatepublicationServices from "../core/services/createpublication.service.js";
import PublicationsService from "../core/services/publications.service.js";
import PetsService from "@/core/services/pets.service";
import UsersService from "../core/services/users.service";
// import filtergeneral from "../components/filter.vue";
import districtService from "../core/services/district.service";
import NotificationService from "../core/services/notifications.service"

export default {
  name: "viewAllPublications",
  data: () => ({

    publications: [],
    listUsers: [],
    listdistricts: [],
    pets: [],
    truevalue: true,
    _id: 0,
    dialog: false,
    message: "",
    userId_publication: -1,
    nameOfOwner: "",
    lastnameOfOwner: "",
    urlPerPublication: "",
    currentUser: -1,
    currentPublication: -1
  }),
  methods: {
    sendAdoption(message) {
      NotificationService.postNotification({
        message: message,
        status: "pending",
        userIdFrom: UsersService.getCurrentUser(),
        userIdAt: this.userId_publication,
        publicationId: this.currentPublication
      })
    },
    getDisplayPublications(publication) {
      return {
        /*
          "comment": "is lovely",
      "petId": 9,
      "datetime": "00/00/00",
      "userId": 0,
      "id": 6
         */
        id: publication.id,
        comment: publication.comment,
      };
    },
    FormtoAdopt(userId, publicationId) {
      this.currentPublication = publicationId;
      this.userId_publication = userId;
      this.getFullNameOfOwner();
      this.dialog = true;
    },
    getUserIdbyPublication() {
      return this.userId_publication;
    },
    Close() {
      this.dialog = false;
      this.editActivate = false;
      this.defaultForm();
    },
    getAllPets() {
      PetsService.getAllpets().then((response) => {
        this.pets = response.data;
        console.log(this.pets);
      });
    },
    showImageUser(id) {
      UsersService.getUsersById(id).then((res) => {
        this.urlPerPublication = res.data.urlToImageProfile;
      });
      return this.urlPerPublication;
    },
    getFullNameOfOwner() {
      UsersService.getUsersById(this.userId_publication).then((response) => {
        this.nameOfOwner = response.data.name;
        this.lastnameOfOwner = response.data.lastName;
        console.log(this.nameOfOwner);
      });
    },
    goToUserProfile(id) {
      UsersService.storageUser = id;
      console.log(UsersService.currentUser)
      this.$router.push("/myUserProfile");
    },
    retrievePublications() {
      PublicationsService.getAllPublications()
          .then((response) => {
            this.publications = response.data;
            console.log(this.publications[0].comment);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    fillFormAdoptionRequest() {
      this.$router.push("/editPublication");
    },
    DeletePublication(id) {
      CreatepublicationServices.DeletePublication(id).then(
          this.retrievePublications
      );
    },
    getdata() {
      this.pets = PetsService.getdatafilter();
      this.listdistricts = districtService.getdistrictfilter();
    },
    getallUser() {
      UsersService.getAllUsers().then((response) => {
        this.listUsers = response.data;
        console.log("this.listUsers")
        console.log(this.listUsers)
        districtService.getAllDistricts().then((response) => {
          this.listdistricts = response.data;
          console.log(this.listdistricts)
        });
      });
    },
  },
  mounted() {
    this.currentUser = UsersService.getCurrentUser()
    this.retrievePublications();
    this.getAllPets();
    this.getallUser();
  },
  components: {}
};
</script>

<style>


.container {
}

.cards {
  text-align: center;
}

.example-card {
  margin-bottom: 20px;
}

@media (max-width: 768px) {

  .example-card {
    width: 520px;
  }
}


@media (max-width: 520px) {

  .example-card {
    width: 420px;
  }
}

/*.filters v-btn {*/
/*  background-color: #FFC107;*/
/*  color: white;*/
/*}*/

/*.publ_action v-btn{*/
/*  background-color: #FFC107;*/
/*  color: white;*/
/*}*/

/*.cards{*/
/*  display: grid;*/
/*  grid-template-columns: 50% 50%;*/
/*  grid-template-rows: auto;*/
/*  float:right;*/
/*  gap:10px;*/

/*}*/


/*.information{*/
/*  display:flex;*/
/*  flex-direction: row;*/
/*  justify-content: flex-start;*/
/*  gap: 40px;*/
/*}*/

/*.information div{*/
/*  flex-direction: column;*/
/*  color: #212121;*/
/*}*/
</style>
