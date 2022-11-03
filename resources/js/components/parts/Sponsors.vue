<template>
  <div>
    <v-container class="text-center" fluid>
       <h2>We’ve created enticing designs for startups and new businesses</h2>
    <v-btn link text>watch our videos</v-btn>

      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              max-width="350"
            >
              <v-img
                :src="card.src"
                class="white--text align-end"
                height="200px"
                :elevation="hover ? 12 : 2"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
  }),
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
    background-color: rgba(#FFF, 0.8)
>.v-card__text
    color: #000
</style>