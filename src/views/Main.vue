<template>
  <div>
    <view-my-publications ></view-my-publications>

  </div>
</template>

<script>
import ViewMyPublications from "@/components/ViewMyPublications";

export default {
  name: "Main",
  data: () => ({
    getStringToView: String,
  }),
  components: { ViewMyPublications, },
  methods: {
    getShow(dataRecieved){
      this.getStringToView = dataRecieved.dato;
    }
  }
}
</script>

<style scoped>

</style>
