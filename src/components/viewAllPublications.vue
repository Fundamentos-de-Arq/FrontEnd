<template>
  <v-app>

    <v-row>
      <v-col v-for="publication in publications" :key="publication.id"
             cols="12"
             sm="6"
             md="4">
        <div v-for="pet in pets" :key="pet.id">
          <div v-for="user in listUsers" :key="user.id"
               v-show="
                        pet.id === publication.petId &&
                        user.id === publication.userId
                      "
          >
            <v-hover v-slot="{ hover }">

              <v-card
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
              >

                <v-img
                    :src="pet.urlToImage"
                    class="white--text align-end"
                    @click="showPetInfo(user, publication, pet)"
                    max-height="250"
                >
                  <v-card-title style="font-size: 2rem" v-text="pet.name"></v-card-title>
                </v-img>

                <v-card-actions>
                  <v-btn
                      @click="FormtoAdopt(pet.userId, publication.id)"
                      v-show='publication.userId.toString()!== currentUser.toString()'
                      class="white--text red darken-1 "
                  >
                    Adopt
                  </v-btn>

                  <v-btn
                      @click="goToUserProfile(publication.userId)"
                      class="white--text red darken-1 "
                  >
                    Profile
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-hover>

          </div>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="400px">
          <v-card>
            <v-card-title>
            <span class="text-h5"
            >Send to: {{ this.nameOfOwner }}
            </span>
            </v-card-title>

            <v-card-text>
                    <v-textarea
                        label="message"
                        v-model="message"
                        required
                    ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="Close"> Close</v-btn>
              <v-btn color="blue darken-1" text @click="sendAdoption(message)"> Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

        <v-dialog v-model="dialog_inf" max-width="1000">

          <v-card >

            <v-row no-gutters >
              <v-col cols="12"
                     sm="6"
                     md="6">
                <v-img :src="card_pet_info.pet_image" style="height: 100%; width: 100%">

                </v-img>
              </v-col>
              <v-col cols="12"
                     sm="6"
                     md="6">
                <v-card class="rounded-0" height="100%">
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-list>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-counter
                              </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.pet_age }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-paw
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.pet_type }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-dog
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.pet_race }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                        </v-list>

                      </v-col>

                      <v-col>
                        <v-list>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-phone
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.user_phone }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-update
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.publication_datetime }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon large color="black">
                                mdi-domain
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>{{ card_pet_info.user_id }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                        </v-list>

                      </v-col>

                    </v-row>

                    <v-row>
                      <v-card-title>
                        Comment:
                      </v-card-title>
                      <v-card-subtitle>
                        {{card_pet_info.publication_comment}}
                      </v-card-subtitle>
                    </v-row>

                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

        </v-dialog>

    </div>

    <!--Final Formulario de publicacion-->
  </v-app>
</template>

<script>
import CreatepublicationServices from "../core/services/createpublication.service.js";
import PublicationsService from "../core/services/publications.service.js";
import PetsService from "@/core/services/pets.service";
import UsersService from "../core/services/users.service";
import districtService from "../core/services/district.service";
import NotificationService from "../core/services/notifications.service"

export default {
  name: "viewAllPublications",
  data: () => ({

    show_btn: true,
    publications: [],
    card_pet_info: {
      user_id: 0,
      user_phone: '',
      publication_id: 0,
      pet_id: 0,
      pet_name: '',
      pet_race: '',
      pet_type: '',
      pet_image: '',
      pet_age: '',
      pet_gender: '',
      publication_datetime: '',
      publication_comment: ''
    },
    listUsers: [],
    listdistricts: [],
    pets: [],
    truevalue: true,
    _id: 0,
    dialog: false,
    dialog_inf: false,
    message: "",
    userId_publication: -1,
    nameOfOwner: "",
    lastnameOfOwner: "",
    urlPerPublication: "",
    currentUser: localStorage.getItem("user"),
    currentPublication: -1
  }),
  methods: {
    async sendAdoption(message) {
      await NotificationService.postNotification({
        message: message,
        status: "pending",
        userIdFrom: localStorage.getItem("user"),
        userIdAt: this.userId_publication,
        publicationId: this.currentPublication
      })
      this.dialog= false;
    },
    getDisplayPublications(publication) {
      return {
        id: publication.id,
        comment: publication.comment,
      };
    },
    async FormtoAdopt(userId, publicationId) {
      this.currentPublication = publicationId;
      this.userId_publication = userId;
      await UsersService.getUsersById(userId).then(async response => {
        this.nameOfOwner = await response.data.name;
        this.lastnameOfOwner = await response.data.lastName;
      });
      this.dialog = true;
    },
    Close() {
      this.dialog = false;
      this.editActivate = false;
      this.defaultForm();
    },
    async getAllPets() {
      await PetsService.getAllpets().then(async response => {
        this.pets = await response.data;
      });
    },
    async getFullNameOfOwner() {
      await UsersService.getUsersById(this.userId_publication).then(async response => {
        this.nameOfOwner = await response.data.name;
        this.lastnameOfOwner = await response.data.lastName;
      });
    },
    goToUserProfile(id) {
      UsersService.storageUser = id;
      this.$router.push("/profile/"+id);
    },
    retrievePublications() {
      PublicationsService.getAllPublications()
          .then((response) => {
            this.publications = response.data;
          })
    },
    DeletePublication(id) {
      CreatepublicationServices.DeletePublication(id).then(
          this.retrievePublications
      );
    },
    showPetInfo(user, publication, pet) {
      this.dialog_inf = true

      this.card_pet_info.user_id = user.id;

      this.card_pet_info.user_phone = user.phone;
      this.card_pet_info.publication_id = publication.id;
      this.card_pet_info.pet_id = pet.id;
      this.card_pet_info.pet_name = pet.name;
      this.card_pet_info.pet_race = pet.race;
      this.card_pet_info.pet_type = pet.type;
      this.card_pet_info.pet_image = pet.urlToImage;
      this.card_pet_info.pet_age = pet.age;
      this.card_pet_info.pet_gender = pet.gender;
      this.card_pet_info.publication_datetime = publication.dateTime;
      this.card_pet_info.publication_comment = publication.comment;

    },
    getallUser() {
      UsersService.getAllUsers().then((response) => {
        this.listUsers = response.data;
        districtService.getAllDistricts().then((response) => {
          this.listdistricts = response.data;
        });
      });
    },
  },
  mounted() {
    this.currentUser = localStorage.getItem("user")
    this.retrievePublications();
    this.getAllPets();
    this.getallUser();
  },
  components: {}
};
</script>

<style scoped>


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
