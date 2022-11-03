<template>
  <div>
    <v-container class="text-center" fluid>
      <v-toolbar flat>
        <template v-slot:extension>
          <v-tabs v-model="tabs" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#mobile-tabs-5-1" class="primary--text">
              <v-icon>mdi-phone</v-icon>
            </v-tab>

            <v-tab href="#mobile-tabs-5-2" class="primary--text">
              <v-icon>mdi-heart</v-icon>
            </v-tab>

            <v-tab href="#mobile-tabs-5-3" class="primary--text">
              <v-icon>mdi-account-box</v-icon>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="i in 3" :key="i" :value="'mobile-tabs-5-' + i">
          <v-card flat>
            <v-card-text>
              <v-container class="text-center" fluid>
                <v-row no-gutters align="center">
                  <v-col cols="12" sm="6">
                    <v-card class="pa-2" outlined tile>
                      <v-img
                        src="https://aeroland.vuedemo.hasthemes.com/img/aeroland-tab-content-image-04.1d62a970.png"
                      ></v-img>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card class="mx-auto" outlined tile>
                      <v-list dense>
                        <v-subheader
                          >Meeting all of your requirements for SEO &
                          branding</v-subheader
                        >
                        <v-list-item-group
                          v-model="selectedItem"
                          color="primary"
                        >
                          <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-icon>
                              <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.text"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                        <v-btn depressed color="primary"> Primary </v-btn>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    tabs: null,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
};
</script>
<style lang="sass" scoped>
</style>
