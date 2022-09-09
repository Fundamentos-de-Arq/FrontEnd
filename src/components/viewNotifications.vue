<template>
  <v-app>
    <!--    <v-data-table :headers="headers" :items="notifications" class="elevation-1">-->
    <!--      <template v-slot:top>-->
    <!--        <v-toolbar flat>-->
    <!--          <v-toolbar-title>MY NOTIFICATIONS</v-toolbar-title>-->
    <!--          <v-divider class="mx-4" inset vertical></v-divider>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-dialog v-model="dialog" max-width="500px">-->

    <!--            <v-card>-->
    <!--              <v-card-title>-->
    <!--                <span class="text-h5">{{ formTitle }}</span>-->
    <!--              </v-card-title>-->

    <!--              <v-card-text>-->
    <!--                <v-container>-->
    <!--                  <v-row>-->
    <!--                    <v-col cols="12" sm="6" md="4">-->
    <!--                      <v-text-field-->
    <!--                          v-model="editedItem.idpublication"-->
    <!--                          label="idpublication"-->
    <!--                      ></v-text-field>-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12" sm="6" md="4">-->
    <!--                      <v-text-field-->
    <!--                          v-model="editedItem.message"-->
    <!--                          label="message"-->
    <!--                      ></v-text-field>-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12" sm="6" md="4">-->
    <!--                      <v-text-field-->
    <!--                          v-model="userIdFrom"-->
    <!--                          label="userIdFrom"-->
    <!--                      ></v-text-field>-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12" sm="6" md="4">-->
    <!--                      <v-text-field-->
    <!--                          v-model="userIdAt"-->
    <!--                          label="userIdAt"-->
    <!--                      ></v-text-field>-->
    <!--                    </v-col>-->
    <!--                    <v-col cols="12" sm="6" md="4">-->
    <!--                      <v-text-field-->
    <!--                          v-model="status"-->
    <!--                          label="status"-->
    <!--                      ></v-text-field>-->
    <!--                    </v-col>-->
    <!--                  </v-row>-->
    <!--                </v-container>-->
    <!--              </v-card-text>-->

    <!--              <v-card-actions>-->
    <!--                <v-spacer></v-spacer>-->
    <!--                <v-btn color="blue darken-1" text @click="close">-->
    <!--                  Cancel-->
    <!--                </v-btn>-->
    <!--                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>-->
    <!--              </v-card-actions>-->
    <!--            </v-card>-->
    <!--          </v-dialog>-->
    <!--          <v-dialog v-model="dialogDelete" max-width="500px">-->
    <!--            <v-card>-->
    <!--              <v-card-title class="text-h5"-->
    <!--              >Are you sure you want to delete this item?</v-card-title-->
    <!--              >-->
    <!--              <v-card-actions>-->
    <!--                <v-spacer></v-spacer>-->
    <!--                <v-btn color="blue darken-1" text @click="closeDelete"-->
    <!--                >Cancel</v-btn-->
    <!--                >-->
    <!--                <v-btn color="blue darken-1" text @click="deleteItemConfirm"-->
    <!--                >OK</v-btn-->
    <!--                >-->
    <!--                <v-spacer></v-spacer>-->
    <!--              </v-card-actions>-->
    <!--            </v-card>-->
    <!--          </v-dialog>-->
    <!--        </v-toolbar>-->
    <!--      </template>-->
    <!--      <template v-slot:item.actions="{ item }" >-->
    <!--        <v-btn rissed color="primary" v-if='item.userIdFrom!==currentUser && item.status==="pending"' @click="acceptRequest(item)">Accept</v-btn>-->
    <!--        <v-btn rissed color="error" v-if='item.userIdFrom!==currentUser && item.status==="pending"' @click="deniedRequest(item)">Denied</v-btn>-->
    <!--        <v-btn rissed color="warning" v-if="item.userIdFrom!== currentUser" @click="seeProfile(item)">Profile</v-btn>-->
    <!--      </template>-->
    <!--      <template v-slot:no-data>-->
    <!--        <v-btn color="primary" @click="initialize"> Reset </v-btn>-->
    <!--      </template>-->
    <!--    </v-data-table>-->

    <v-container>
      <v-row>
        <v-col>
          <v-list v-for="notify in array_notifications_interface" :key="notify.notification_id">

            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 2 : 0"
                      :class="{ 'on-hover': hover }"
                      class="transparent"
                      outlined
                      @click="showFullNotification(notify.publication_id, notify.user_from_id, notify.notification_message, notify.notification_id)"
              >

              <v-list-item >
                <v-list-item-avatar>
                  <v-img :src="notify.user_image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ notify.user_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ notify.notification_message }}
                  </v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
              </v-card>

            </v-hover>
          </v-list>

        </v-col>

        <v-col v-show="show_card_full_notification_interface && notifications.length!==0">
          <v-card class="transparent">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    From: {{card_full_notification_interface.user_name}}
                  </v-list-item-subtitle>
                  <v-list-item-title>
                    {{card_full_notification_interface.notification_message}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-img :src="card_full_notification_interface.pet_image">
            </v-img>

            <v-card-actions>
              <v-btn class="white--text red darken-1 " @click="goToUserProfile(card_full_notification_interface.user_from_id)">
                Profile
              </v-btn>
              <v-btn class="white--text red darken-1 " @click="acceptRequest(card_full_notification_interface.user_from_id, card_full_notification_interface.notification_id, card_full_notification_interface.publication_id, card_full_notification_interface.pet_id)">
                Accept
              </v-btn>
              <v-btn class="white--text red darken-1 " @click="declineRequest(card_full_notification_interface.notification_id)">
                Decline
              </v-btn>
            </v-card-actions>



          </v-card>

        </v-col>
      </v-row>
    </v-container>


  </v-app>
</template>

<script>
import NotificationService from '../core/services/notifications.service';
import UsersService from "@/core/services/users.service"
import PublicationsService from "@/core/services/publications.service";
import PetsService from "@/core/services/pets.service";
export default {
  name: "viewNotifications",
  data: () => ({
    dialog: false,
    currentUser: UsersService.getCurrentUser(),
    users: [],
    show_card_full_notification_interface: false,
    notification_interface: {
      publication_id: 0,
      notification_id: '',
      user_name: '',
      notification_message: '',
      notification_status: '',
      user_at_id: 0,
      user_from_id: 0,
      user_image: '',
    },
    pet: {},
    card_full_notification_interface:{
      user_from_id: 0,
      notification_id: '',
      publication_id: 0,
      user_image: '',
      pet_id: '',
      pet_image: '',
      user_name: '',
      notification_message: '',
      notification_status: '',
      pet: {}
    },
    array_notifications_interface: [],
    dialogDelete: false,
    editedIndex: -1,
    headers: [
      /*{
        text: "id",
        align: "start",
        sortable: false,
        value: "id",
      },*/
      {text: "publicationId", value: "publicationId"},
      {text: "message", value: "message"},
      {text: "userIdFrom", value: "userIdFrom"},
      {text: "userIdAt", value: "userIdAt"},
      {text: "status", value: "status"},
      {text: "Actions", value: "actions", sortable: false},
    ],
    notifications: [],
    editedItem: {
      id: "",
      idpublication: "",
      message: "",
      userIdFrom: "",
      userIdAt: "",
      status: "",
    },
    defaultItem: {
      id: "",
      idpublication: "",
      message: "",
      userIdFrom: "",
      userIdAt: "",
      status: "",
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
    async retrieveNotifications() {
      this.users=[];
      this.array_notifications_interface= [];
      this.notifications= [];

      await NotificationService.getAllUserAtNotifications(localStorage.getItem("user")).then(
          async response => {
            this.notifications = await response.data;
          });
      // await NotificationService.getAllUserFromNotifications().then(
      //     async response => {
      //       this.notifications = this.notifications.concat(await response.data)
      //     });
      await UsersService.getAllUsers().then(
          async response => {
            this.users = await response.data;
          });


      for (let i = 0; i < this.notifications.length; i++) {
        for (let j = 0; j < this.users.length; j++) {

          if (this.notifications.at(i).userIdFrom === this.users.at(j).id) {

            this.notification_interface.notification_id = this.notifications[i].id;
            this.notification_interface.publication_id = this.notifications[i].publicationId;
            this.notification_interface.notification_message = this.notifications[i].message;
            this.notification_interface.notification_status = this.notifications[i].status;
            this.notification_interface.user_at_id = this.notifications[i].userIdAt;
            this.notification_interface.user_from_id = this.notifications[i].userIdFrom;
            this.notification_interface.user_image = this.users[j].urlToImageProfile;
            this.notification_interface.user_name = this.users[j].name;
            this.array_notifications_interface.push(this.notification_interface)
          }
        }
      }
    },
    async showFullNotification(publication_id, user_from_id, notification_message, notification_id){
      this.card_full_notification_interface.user_from_id = user_from_id;
      this.card_full_notification_interface.notification_message = notification_message;
      this.card_full_notification_interface.notification_id = notification_id;
      this.card_full_notification_interface.publication_id = publication_id;

      await PublicationsService.getPublicationById(publication_id).then(
          async response=>{
            this.card_full_notification_interface.pet_id = await response.data.petId;
          }
      );

      await PetsService.getPetById(this.card_full_notification_interface.pet_id).then(
          async response=>{
            this.card_full_notification_interface.pet_image = await response.data.urlToImage
          }
      )

      await UsersService.getUsersById(user_from_id).then(
          async response=>{
            this.card_full_notification_interface.user_name = await response.data.name
          }
      )
      this.show_card_full_notification_interface = true;
    },
    goToUserProfile(id){
      this.$router.push("/profile/"+id)
    },
    async acceptRequest(user_from_id, notification_id, publication_id, pet_id){

      await NotificationService.deleteNotification(notification_id);

      await this.retrieveNotifications()

      await PublicationsService.DeletePublication(publication_id)

      await PetsService.getPetById(pet_id).then(
          async response=>{
            this.pet = await response.data;
          }
      )
      await PetsService.putPet(this.pet.id, {
        type: this.pet.type,
        name: this.pet.name,
        attention: this.pet.attention,
        age: this.pet.age,
        race: this.pet.race,
        isAdopted: true,
        userId: user_from_id,
        isPublished: this.pet.isPublished,
        gender: "string",
        urlToImage: this.pet.urlToImage,
      })
    },

    async declineRequest(notification_id){
      await NotificationService.deleteNotification(notification_id);
      await this.retrieveNotifications()
    },

    editItem(item) {
      this.editedIndex = this.notifications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.notifications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.editedItem.id)
      NotificationService.deleteNotification(this.editedItem.id);
      this.notifications.splice(this.editedIndex, 1);
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
        Object.assign(this.notifications[this.editedIndex], this.editedItem);

      } else {
        this.notifications.push(this.editedItem);
        this.addData(this.editedItem)
      }
      this.close();
    },
  },
  mounted() {
    this.retrieveNotifications();
  }
}
</script>

<style scoped>

</style>
