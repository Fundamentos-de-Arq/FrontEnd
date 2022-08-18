<template>
  <v-app>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>MY NOTIFICATIONS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="editedItem.idpublication"
                          label="idpublication"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="editedItem.message"
                          label="message"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="userIdFrom"
                          label="userIdFrom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="userIdAt"
                          label="userIdAt"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="status"
                          label="status"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }" >
        <v-btn rissed color="primary" v-if='item.userIdFrom!==currentUser && item.status==="pending"' @click="acceptRequest(item)">Accept</v-btn>
        <v-btn rissed color="error" v-if='item.userIdFrom!==currentUser && item.status==="pending"' @click="deniedRequest(item)">Denied</v-btn>
        <v-btn rissed color="warning" v-if="item.userIdFrom!== currentUser" @click="seeProfile(item)">Profile</v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import NotificationService from '../core/services/notifications.service';
import UsersService from "@/core/services/users.service";

export default {
  name: "viewNotifications",
  data: () => ({
    dialog: false,
    currentUser: UsersService.getCurrentUser(),
    dialogDelete: false,
    editedIndex: -1,
    headers: [
      /*{
        text: "id",
        align: "start",
        sortable: false,
        value: "id",
      },*/
      { text: "publicationId", value: "publicationId" },
      { text: "message", value: "message" },
      { text: "userIdFrom", value: "userIdFrom" },
      { text: "userIdAt", value: "userIdAt" },
      { text: "status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedItem: {
      id:"",
      idpublication: "",
      message: "",
      userIdFrom: "",
      userIdAt: "",
      status:"",
    },
    defaultItem: {
      id:"",
      idpublication: "",
      message: "",
      userIdFrom: "",
      userIdAt: "",
      status:"",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    obtenerdatos() {
      NotificationService.getAllUserAtNotifications(UsersService.getCurrentUser()).then((response) => {
        this.desserts = response.data;
      });
      NotificationService.getAllUserFromNotifications().then(response => {
        //console.log(response.data);
          this.desserts=this.desserts.concat(response.data)
        //console.log(this.desserts);

      })
    },
    addData(datos)
    {
      NotificationService.create(datos)
          .then(response=>
          {
            console.log(response)

          }).catch(e=>
      {
        console.log(e)
      })
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    acceptRequest(item){
      console.log(item)
      NotificationService.updateNotification(item.id,{
        publicationId: item.publicationId,
        message: item.message,
        userIdFrom: item.userIdFrom,
        userIdAt: item.userIdAt,
        status: "accept"
      }).then(
          this.obtenerdatos
      );
    },
    deniedRequest(item){
      NotificationService.updateNotification(item.id,{
        publicationId: item.publicationId,
        message: item.message,
        userIdFrom: item.userIdFrom,
        userIdAt: item.userIdAt,
        status: "denied"
      }).then(
          this.obtenerdatos
      );
    },
    seeProfile(item){
      UsersService.storageUser = item.userIdFrom;
      this.$router.push("/myUserProfile");
    },

    deleteItem(item) {

      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.editedItem.id)
      NotificationService.deleteNotification(this.editedItem.id);
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);

      } else {
        this.desserts.push(this.editedItem);
        this.addData(this.editedItem)
      }
      this.close();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.obtenerdatos();
  }
}
</script>

<style scoped>

</style>
