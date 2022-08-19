<template>
  <v-app>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
        >
          New Add
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">New Add</span>
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
                    v-model="editedItem.title"
                    label="title"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.description"
                    label="description"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.discount"
                    label="discount"
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


    <v-container >
      <v-row >
        <v-col
            v-for="add in adds"
            :key="add.id"
            cols="12"
            sm="6"
            md="4"
        >

          <v-card
              class="mx-auto"
              max-width="344"
          >


            <v-img
                :src="add.urlToImage"
                class="white--text align-end"
                height="200"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title>{{add.title}}</v-card-title>
            </v-img>


            <v-card-actions>
              <v-btn
                  color="orange lighten-2"
                  text
                  @click="editItem(add)"
              >
                Edit
              </v-btn>

              <v-btn
                  color="orange lighten-2"
                  text
                  @click="deleteItem(add)"
              >
                Delete
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                  icon
                  @click=" showInfCard(add.id)"
              >
                <v-icon>{{ showAux==add.id || (showAux==1&&add.id==0) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="showAux==add.id || (showAux==1&&add.id==0)">
                <v-divider></v-divider>


                <v-card-text overline style="text-align:left" >
                  dateTime: {{add.dateTime}} <br/>
                  title: {{add.title}} <br/>
                  description: {{add.description}} <br/>
                  discount: {{add.discount}} <br/>
                  promoted: {{add.promoted}} <br/>
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
import AddServices from "../core/services/ad.service"

export default {
  name: "viewMyAds",
  data: () => ({
    dialog: false,
    show: -1,
    showAux: -1,
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'title', value: 'title' },
      { text: 'description', value: 'description' },
      { text: 'discount', value: 'discount' },
      { text: 'urlToImage', value: 'urlToImage' },
    ],
    adds:[],
    auxAdds:[],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      userId: localStorage.getItem("user"),
      dateTime: '',
      title: '',
      description: '',
      discount: '',
      urlToImage: '',
      promoted: false
    },
    defaultItem: {
      id: '',
      userId: localStorage.getItem("user"),
      dateTime: '',
      title: '',
      description: '',
      discount: '',
      urlToImage: '',
      promoted: false
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    getAdds(){
      AddServices.getAllByUserId(localStorage.getItem("user")).then(
          response =>{
            this.adds=response.data;
          }
      )
    },
    initialize () {
      this.getAdds();
    },

    editItem (item) {
      this.editedIndex = this.adds.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.adds.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      AddServices.DeleteAd(this.adds[this.editedIndex].id)
      this.adds.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.adds[this.editedIndex], this.editedItem)
        console.log(this.editedItem);

        AddServices.UpdateAd(this.editedItem.id,{
          id: this.editedItem.id,
          userId: localStorage.getItem("user"),
          dateTime: this.editedItem.dateTime,
          title: this.editedItem.title,
          description: this.editedItem.description,
          discount: this.editedItem.discount,
          urlToImage: this.editedItem.urlToImage,
          promoted: this.editedItem.promoted,
        })
      } else {

        if(this.editedItem.discount>0){
          this.editedItem.promoted=true;
        }

        this.editedItem.dateTime=`${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}/${(new Date()).getDay()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}` ;
        AddServices.postNewAd(this.editedItem).then(
            this.getAdds
        );

      }

      this.close()
    },
    showInfCard(id){

      if(id!==0){
        this.showAux=-id*this.show;
      }
      else{
        this.showAux= -this.show;
      }
      console.log(this.showAux)
      this.show=-this.show;

    }

  },

}
</script>

<style scoped>

</style>
