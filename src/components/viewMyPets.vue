<template>
  <v-app>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">New Pet</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.type"
                    label="type"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.name"
                    label="name"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.attention"
                    label="attention"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.age"
                    label="age"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.race"
                    label="race"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.urlToImage"
                    label="urlToImage"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.isAdopted"
                    label="isAdopted"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>


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
                 @click.stop="dialog = true">
            <v-icon top>
              mdi-plus
            </v-icon>
            New Pet
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col
            v-for="pet in pets"
            :key="pet.id"
            cols="12"
            sm="6"
            md="4"
            v-show='pet.name.includes(to_find) || to_find === ""'
        >

          <v-card
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


            <v-card-actions>
              <v-btn
                  color="orange lighten-2"
                  text
                  @click="editItem(pet)"
              >
                Edit
              </v-btn>

              <v-btn
                  color="orange lighten-2"
                  text
                  @click="deleteItem(pet)"
              >
                Delete
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                  icon
                  @click=" showInfCard(pet.id)"
              >
                <v-icon>{{
                    showAux == pet.id || (showAux == 1 && pet.id == 0) ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}
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
                  Is Adopted?: {{ pet.isAdopted }}
                </v-card-text>

              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>

</template>


<script>
import PetsService from "@/core/services/pets.service";


export default {
  name: "viewMyPets",
  data: () => ({
    dialog: false,
    show: -1,
    showAux: -1,
    to_find: "",
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'type', value: 'type'},
      {text: 'name', value: 'name'},
      {text: 'attention', value: 'attention'},
      {text: 'race', value: 'race'},
      {text: 'age', value: 'age', sortable: false},
      {text: 'urlToImage', value: 'urlToImage', sortable: false},
      {text: 'isAdopted', value: 'isAdopted', sortable: false},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    pets: [],
    auxPets: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      type: '',
      name: '',
      attention: '',
      race: '',
      age: '',
      gender: '',
      urlToImage: '',
      isAdopted: '',
      isPublished: false,
      userId: localStorage.getItem("user")
    },
    defaultItem: {
      id: '',
      type: '',
      name: '',
      attention: '',
      race: '',
      age: '',
      gender: '',
      urlToImage: '',
      isAdopted: '',
      isPublished: false,
      userId: localStorage.getItem("user")
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getPets()
  },

  methods: {
    async getPets() {
      await PetsService.getPets(localStorage.getItem('user')).then(
          async response => {
            this.pets = await response.data;
          }
      )
    },

    editItem(item) {
      this.editedIndex = this.pets.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pets.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      PetsService.deletePet(this.pets[this.editedIndex].id)
      this.pets.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pets[this.editedIndex], this.editedItem)
        console.log(this.editedItem);

        PetsService.putPet(this.editedItem.id, {
          id: this.editedItem.id,
          type: this.editedItem.type,
          name: this.editedItem.name,
          attention: this.editedItem.attention,
          race: this.editedItem.race,
          age: this.editedItem.age,
          urlToImage: this.editedItem.urlToImage,
          isAdopted: false,
          isPublished: this.editedItem.isPublished,
          userId: localStorage.getItem("user")
        })
      } else {
        console.log(this.editedItem)
        PetsService.postPet({
          type: this.editedItem.type,
          name: this.editedItem.name,
          attention: this.editedItem.attention,
          age: this.editedItem.age,
          race: this.editedItem.race,
          isAdopted: false,
          urlToImage: this.editedItem.urlToImage,
          userId: localStorage.getItem("user")
        }).then(
            this.getPets
        );

      }

      this.close()
    },
    showInfCard(id) {

      if (id !== 0) {
        this.showAux = -id * this.show;
      } else {
        this.showAux = -this.show;
      }
      console.log(this.showAux)
      this.show = -this.show;

    }

  },

}
</script>

<style scoped>

</style>

