<template>
  <div>

    <v-form >
      <v-container >

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field label="Regular" v-model="Description" placeholder="Description" ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Name" label="Name" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="IsAttention" label="IsAttention" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Race" label="Race" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="Ubication" label="Ubication" required></v-text-field>
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
            <v-btn id="SendData" color="primary" @click="sendData({Description, Name, IsAttention, Race, Ubication, Commnet, Age})">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script>
import CreatepublicationServices from "../core/services/createpublication.service"
export default {
  name: "createpublication",
  data:()=>({
    Description: "",
    Name: "",
    IsAttention: "",
    Race: "",
    Ubication: "",
    Commnet: "",
    Age: null,
  }),
  methods:{
    sendData(data){
      CreatepublicationServices.postNewPublication(data);
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#SendData{
  background-color:cyan;
  color:white;
}
</style>