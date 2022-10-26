<template>
  <div>
    <template>
      <v-carousel>
        <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </template>
    <template>
      <div class="row">
        <div class="col">
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                height="250"
                src="https://www.melopienso.com/wp-content/uploads/2019/10/la-felicidad-que-trae-un-perro.jpg"
            ></v-img>

            <v-card-title>Cliente</v-card-title>

            <v-card-text>
              <v-row
                  align="center"
                  class="mx-0"
              >
                <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-4 text-subtitle-1">
                $ • En promoción
              </div>

              <div>Se parte de nosotros y ten la posibilidad de realizar publicaciones de adopción</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Planes</v-card-title>

            <v-card-text>
              <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
              >
                <v-chip>FREE</v-chip>

                <v-chip>BASIC</v-chip>

                <v-chip>REGULAR</v-chip>

                <v-chip>VIP</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="subscribeUser"
              >
                Subscribir
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                height="250"
                src="https://i0.wp.com/revista.weepec.com/wp-content/uploads/2021/02/vet-and-pet-EESKSLX.jpg?fit=1200%2C800&ssl=1"
            ></v-img>

            <v-card-title>Veterinario</v-card-title>

            <v-card-text>
              <v-row
                  align="center"
                  class="mx-0"
              >
                <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-4 text-subtitle-1">
                $ • En promoción
              </div>

              <div>Se parte de nosotros y ten la posibilidad de realizar anuncios</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Planes</v-card-title>

            <v-card-text>
              <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
              >
                <v-chip>FREE</v-chip>

                <v-chip>BASIC</v-chip>

                <v-chip>REGULAR</v-chip>

                <v-chip>VIP</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="subscribeUser"
              >
                Subscribir
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col">
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                height="250"
                src="https://zenat.com.co/wp-content/uploads/2021/04/mejores-10-refugios-para-animales-en-Cali-1.jpg"
            ></v-img>

            <v-card-title>Albergue</v-card-title>

            <v-card-text>
              <v-row
                  align="center"
                  class="mx-0"
              >
                <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-4 text-subtitle-1">
                $ • En promoción
              </div>

              <div>Se parte de nosotros y ten la posibilidad de realizar publicaciones de adopción</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Planes</v-card-title>

            <v-card-text>
              <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
              >
                <v-chip>FREE</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="subscribeUser"
              >
                Subscribir
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import SubscriptionService from "@/core/services/subscription.service";

export default {
  name: "Subscription",
  data () {
    return {
      items: [
        {
          src: 'https://img.freepik.com/fotos-premium/hermosos-jovenes-veterinarios-estan-examinando-lindo-gato_85574-7703.jpg?w=2000',
        },
        {
          src: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/17161831/mascotas.jpg',
        },
        {
          src: 'https://images2.alphacoders.com/460/460310.jpg',
        },
        {
          src: 'https://cloudfront-us-east-1.images.arcpublishing.com/gruponacion/IWQXHSGARRD2VOMQXVX7UC72CY.JPG',
        },
      ],
    }
  },
  methods:{
    subscribeUser(){
      SubscriptionService.postAsync({
        numPosts: 10,
        startDate: "2022-09-27T02:11:35.310Z",
        endDate: "2022-09-27T02:11:35.310Z",
        expired: false,
        userId: localStorage.getItem("user")
      });
      SubscriptionService.getAllAsync().then(
          response =>{
            console.log(response.data)
          }
      )
    }


  }
}
</script>

<style scoped>

</style>