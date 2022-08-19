<template>
  <v-app>

    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h6">Choose your Pet</span>
        </v-card-title>

        <div class="text-center">
          <v-menu
              open-on-hover
              top
              offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                Chose your Pet
              </v-btn>
            </template>


            <v-list v-for="pet in pets" :key=pet.id v-show='pet.isPublished!==true'>
              <v-list-item>
                <v-list-item-title type="button" @click="filFormPubication(pet)">{{ pet.name }}</v-list-item-title>
              </v-list-item>
            </v-list>

          </v-menu>
        </div>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    label="type"
                    v-model="tipo"
                    disabled
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="attention"
                    v-model="attention"
                    disabled
                    hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                    label="race*"
                    v-model="race"
                    hint="example of persistent helper text"
                    persistent-hint
                    disabled
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="age"
                    v-model="age"
                    disabled
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="urlToImage"
                    v-model="urlToImage"
                    disabled
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="comment"
                    v-model="comment"

                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="Close"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="Save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-responsive>
      <v-container>
        <v-row>
          <v-col cols="9">
            <v-text-field label="Search..."
                          solo
                          prepend-inner-icon="mdi-magnify"
                          v-model="to_find"
            ></v-text-field>
          </v-col>
          <v-col cols="3">

            <v-btn style="width: 100%; min-height: 47px" class="mb-2 white--text red darken-1 "
                   @click.stop="dialog = true"

            >
              <v-icon top>
                mdi-plus
              </v-icon>
              New Publication
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col
              v-for="publication in publications"
              :key="publication.id"
              cols="12"
              sm="6"
              md="4"
          >
            <div v-for="pet in pets" :key="pet.id" v-show='pet.name.includes(to_find) || to_find === "" '>

              <v-card
                  v-show="pet.id===publication.petId"
                  class="mx-auto"
                  max-width="344"
              >


                <v-img
                    :src="pet.urlToImage"
                    class="white--text align-end"
                    height="200"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title v-text="pet.name"></v-card-title>
                </v-img>

                <v-card-subtitle>
                  {{ publication.comment }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                      color="orange lighten-2"
                      text
                      @click="editPublication(pet,publication)"
                  >
                    Edit
                  </v-btn>

                  <v-btn
                      color="orange lighten-2"
                      text
                      @click="DeletePublication(publication.id)"
                  >
                    Delete
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn
                      icon
                      @click=" showInfCard(pet.id)"
                  >
                    <v-icon>
                      {{ showAux == pet.id || (showAux == 1 && pet.id == 0) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="showAux==pet.id || (showAux==1&&pet.id==0)">
                    <v-divider></v-divider>


                    <v-card-text overline style="text-align:left">
                      Name: {{ pet.name }} <br/>
                      Type: {{ pet.type }} <br/>
                      Required Attention: {{ pet.attention }} <br/>
                      Race: {{ pet.race }} <br/>
                      Age: {{ pet.age }} <br/>

                    </v-card-text>

                  </div>
                </v-expand-transition>
              </v-card>

            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-responsive>

  </v-app>

</template>

<script>
import PublicationsService from "../core/services/publications.service.js"
import PetsService from "../core/services/pets.service"


export default {
  name: "ViewMyPublications",
  data: () => ({
    to_find: "",
    show: -1,
    showAux: -1,
    editActivate: false,
    publications: [],
    currentPetId: -1,
    currentPublicationId: -1,
    tipo: '',
    name: '',
    attention: '',
    race: '',
    age: '',
    urlToImage: '',
    isAdopted: '',
    isPublished: '',
    userId: '',
    comment: '',
    datetime: '00/00/00',
    publicationId: 0,
    pets: [],
    truevalue: true,
    _id: 0,
    dialog: false,
  }),
  publicationId: null,
  methods: {
    defaultForm() {
      this.currentPetId = -1;
      this.currentPublicationId = -1;
      this.tipo = '';
      this.name = '';
      this.attention = '';
      this.race = '';
      this.age = '';
      this.urlToImage = '';
      this.isAdopted = '';
      this.userId = '';
      this.comment = '';
    },
    async getPets() {
      await PetsService.getPets(localStorage.getItem("user")).then(
          async response => {
            this.pets = await response.data;
          }
      )
    },
    getDisplayPublications(publication) {
      return {
        id: publication.id,
        comment: publication.comment
      }
    },
    async retrievePublications() {
      await PublicationsService.getUserPublications(localStorage.getItem("user"))
          .then(async response => {
            this.publications = await response.data;
          })
    },
    showInfCard(id) {

      if (id != 0) {
        this.showAux = -id * this.show;
      } else {
        this.showAux = -this.show;
      }
      this.show = -this.show;

    },
    editPublication(Pet, Publication) {
      this.dialog = true;
      this.editActivate = true;
      this.tipo = Pet.type;
      this.name = Pet.name;
      this.attention = Pet.attention;
      this.race = Pet.race;
      this.age = Pet.age;
      this.urlToImage = Pet.urlToImage;
      this.isAdopted = Pet.isAdopted;
      this.isPublished = Pet.isPublished;
      this.userId = Pet.userId;
      this.comment = Publication.comment;
      this.datetime = "12/12/12";
      this.currentPetId = Pet.id;
      this.currentPublicationId = Publication.id;
    },
    async Save() {
      if (this.editActivate) {
        await PublicationsService.putPublication(this.currentPublicationId, {
          Comment: this.comment,
          PetId: this.currentPetId,
          DateTime: this.datetime,
          UserId: this.userId
        }).then(
            this.getPets,
            this.dialog = false,
            this.editActivate = false,
            this.defaultForm,
        );
      } else {
        await PublicationsService.postNewPublication({
          comment: this.comment,
          petId: this.currentPetId,
          datetime: this.datetime,
          userId: this.userId
        }).then(
            async response => {
              this.publicationId= await response.data.id;
            }
        )

        await PetsService.putPet(this.currentPetId, {
          type: this.tipo,
          name: this.name,
          attention: this.attention,
          age: this.age,
          race: this.race,
          isAdopted: this.isAdopted,
          userId: this.userId,
          publicationId: this.publicationId,
          isPublished: true,
          gender: 'none',
          urlToImage: this.urlToImage
        }).then(
            this.getPets,
        )
        this.dialog = false
        this.editActivate = false
        this.defaultForm()
      }
      await this.retrievePublications()

    },
    Close() {
      this.dialog = false;
      this.editActivate = false;
      this.defaultForm();
    },
    async DeletePublication(id) {
      await PublicationsService.DeletePublication(id).then(
          async response=>{
            await PetsService.getPetById(await response.data.petId).then(
                async res=>{
                  await PetsService.putPet(await response.data.petId, {
                    type: await res.data.type,
                    name: await res.data.name,
                    attention: await res.data.attention,
                    age: await res.data.age,
                    race: await res.data.race,
                    isAdopted: await res.data.isAdopted,
                    userId: await res.data.userId,
                    publicationId: await res.data.publicationId,
                    isPublished: false,
                    gender: 'none',
                    urlToImage: await res.data.urlToImage
                  })
                }

            )
          }
      );
      await this.retrievePublications()
      await this.getPets()
    },
    filFormPubication(Pet) {
      this.tipo = Pet.type;
      this.name = Pet.name;
      this.attention = Pet.attention;
      this.race = Pet.race;
      this.age = Pet.age;
      this.urlToImage = Pet.urlToImage;
      this.isAdopted = Pet.isAdopted;
      this.userId = Pet.userId;
      this.isPublished = true;
      this.datetime = '00/00/00';
      this.currentPetId = Pet.id;
      this.retrievePublications();
      this.getPets();
    }

  },
  mounted() {
    this.retrievePublications();
    this.getPets();
  },
}
</script>

<style scoped>

</style>
