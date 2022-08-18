<template>
  <div align="center">
    <div>Editar Publicacion</div>
    <v-form >
      <v-container align="center">

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field  label="Regular" v-model="Description" placeholder="Description" ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Name"  label="Name" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="IsAttention"  label="IsAttention" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Race"  label="Race" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Ubication"  label="Ubication" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Commnet" label="Commnet" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Age" label="Age" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-btn  id="guardarCambios" color="primary" @click="updatePublicationById(1,{Description,Name,IsAttention,Race,Ubication,Commnet,Age})">
              Guardar cambios
            </v-btn>
            <v-btn  id="cancelar" color="error" @click="seeMyPublications">
              Cancelar
            </v-btn>
          </v-col>

        </v-row>

      </v-container>
    </v-form>
  </div>

</template>

<script>
import CreatepublicationServices from "@/core/services/createpublication.service";

export default {
  name: "editPublication",
  data:()=>({
    Description: "",
    Name: "",
    IsAttention: "",
    Race: "",
    Ubication: "",
    Commnet: "",
    IdUser: 1,
    Age: null,
  }),
  publication:[],
  methods:{
    getPublicationbyId(){
      CreatepublicationServices.getPublicationById(1).then(response => {
        this.publication=response.data;
        console.log(response.data);
      })
          .catch(e => {
            console.log(e);
          })
    },
    updatePublicationById(id,data){
      CreatepublicationServices.UpdatePublication(id,data)
    },
    seeMyPublications(){
     this.$router.push('/generalview');
    }
  },
  mounted () {
    this.getPublicationbyId();
  }
}
</script>

<style scoped>
#guardarCambios{
  background-color: blue;
}
#cancelar{
  background-color: red;
}
</style>