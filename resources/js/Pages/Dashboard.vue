<template>
  <div>
    <!-- <div v-if="currentUser">
      ID: {{ currentUser.id }} <br />
      Name: {{ currentUser.name }} <br />
      Email: {{ currentUser.email }}<br /><br />
      <button @click.prevent="logout">Logout</button>
    </div> -->
    <!-- <h2 class="text-center mb-3" v-if="$page.props.user.name">
      Welcome to your dashboard, {{ $page.props.user.name }}
    </h2> -->
    <v-row>
      
        <v-container fluid>
          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
            <v-btn-toggle v-model="toggle_exclusive" tile group color="#49D9A0">
              <v-btn text>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <v-btn color="#49D9A0" rounded dark> finish sprint </v-btn>
          </v-toolbar>
          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
            <v-toolbar-title>Sprint overview</v-toolbar-title>
            <v-btn color="#49D9A0" text class="ml-5"> last sprint </v-btn>
          </v-toolbar>
          <v-item-group mandatory class="mt-n4">
            <v-container>
              <v-row justify="center" class="space">
                <v-col cols="12" md="2">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? '#49D9A0' : 'white'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle"
                    >
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-list-item three-line class="mt-10">
                            <v-list-item-content>
                              <div class="mb-4">
                                <v-icon
                                  x-large
                                  :color="active ? 'white' : '#49D9A0'"
                                  >fas fa-chart-bar</v-icon
                                >
                              </div>
                              <v-list-item-subtitle
                                :class="active ? 'white--text' : 'black--text'"
                                >Team velocity</v-list-item-subtitle
                              >
                              <v-list-item-title
                                class="headline mb-1"
                                :class="active ? 'white--text' : 'black--text'"
                              >
                                <strong>52</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-item>
                </v-col>
                <v-col cols="12" md="2">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? '#49D9A0' : 'white'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle"
                    >
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-list-item three-line class="mt-10">
                            <v-list-item-content>
                              <div class="mb-4">
                                <v-icon
                                  x-large
                                  :color="active ? 'white' : '#49D9A0'"
                                  >far fa-user</v-icon
                                >
                              </div>
                              <v-list-item-subtitle
                                :class="active ? 'white--text' : 'black--text'"
                                >Team members</v-list-item-subtitle
                              >
                              <v-list-item-title
                                class="headline mb-1"
                                :class="active ? 'white--text' : 'black--text'"
                              >
                                <strong>12</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-item>
                </v-col>
                <v-col cols="12" md="2">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? '#49D9A0' : 'white'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle"
                    >
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-list-item three-line class="mt-10">
                            <v-list-item-content>
                              <div class="mb-4">
                                <v-icon
                                  x-large
                                  :color="active ? 'white' : '#49D9A0'"
                                  >fas fa-suitcase</v-icon
                                >
                              </div>
                              <v-list-item-subtitle
                                :class="active ? 'white--text' : 'black--text'"
                                >Tasks delivered</v-list-item-subtitle
                              >
                              <v-list-item-title
                                class="headline mb-1"
                                :class="active ? 'white--text' : 'black--text'"
                              >
                                <strong>23</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-item>
                </v-col>
                <v-col cols="12" md="2">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? '#49D9A0' : 'white'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle"
                    >
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-list-item three-line class="mt-10">
                            <v-list-item-content>
                              <div class="mb-4">
                                <v-icon
                                  x-large
                                  :color="active ? 'white' : '#49D9A0'"
                                  >fas fa-search</v-icon
                                >
                              </div>
                              <v-list-item-subtitle
                                :class="active ? 'white--text' : 'black--text'"
                                >Spikes delivered</v-list-item-subtitle
                              >
                              <v-list-item-title
                                class="headline mb-1"
                                :class="active ? 'white--text' : 'black--text'"
                              >
                                <strong>23</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-item>
                </v-col>
                <v-col cols="12" md="2">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :color="active ? '#49D9A0' : 'white'"
                      class="d-flex align-center rounded-xl"
                      dark
                      height="200"
                      @click="toggle"
                    >
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-list-item three-line class="mt-10">
                            <v-list-item-content>
                              <div class="mb-4">
                                <v-icon
                                  x-large
                                  :color="active ? 'white' : '#49D9A0'"
                                  >fas fa-globe-africa
                                </v-icon>
                              </div>
                              <v-list-item-subtitle
                                :class="active ? 'white--text' : 'black--text'"
                                >News events</v-list-item-subtitle
                              >
                              <v-list-item-title
                                class="headline mb-1"
                                :class="active ? 'white--text' : 'black--text'"
                              >
                                <strong>15</strong>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
          <v-row class="mt-n6">
            <v-col cols="12" sm="7">
              <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n2">
                <v-toolbar-title>Chartt</v-toolbar-title>
              </v-toolbar>
              <v-chart class="chart mt-2" :option="option" />
            </v-col>
            <v-col cols="12" md="5" sm="12">
              <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n2">
                <v-toolbar-title>Sprint stories</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn rounded small> See All </v-btn>
              </v-toolbar>
              <v-simple-table class="grey lighten-3">
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in orders" :key="item.name">
                      <td>{{ item.id }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.state }}</td>
                      <td>{{ item.count }}</td>
                      <td>
                        <v-icon small>{{ item.icon }}</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n8">
            <v-toolbar-title>Team members</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn rounded small> Add member </v-btn>
          </v-toolbar>
          <v-card class="rounded-lg">
            <v-row>
              <v-col cols="12" sm="3">
                <v-list subheader two-line>
                  <v-list-item>
                    <v-badge
                      bordered
                      bottom
                      color="#49D9A0"
                      dot
                      offset-x="28"
                      offset-y="22"
                    >
                      <v-list-item-avatar>
                        <v-avatar size="40">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                          ></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-badge>
                    <v-list-item-content>
                      <v-list-item-title>AAE Ideapro</v-list-item-title>

                      <v-list-item-subtitle
                        >32 Story point</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="3">
                <v-list subheader two-line>
                  <v-list-item>
                    <v-badge
                      bordered
                      bottom
                      color="#49D9A0"
                      dot
                      offset-x="28"
                      offset-y="22"
                    >
                      <v-list-item-avatar>
                        <v-avatar size="40">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                          ></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-badge>
                    <v-list-item-content>
                      <v-list-item-title>Jhony</v-list-item-title>

                      <v-list-item-subtitle>8 Story point</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="3">
                <v-list subheader two-line>
                  <v-list-item>
                    <v-badge
                      bordered
                      bottom
                      color="#49D9A0"
                      dot
                      offset-x="28"
                      offset-y="22"
                    >
                      <v-list-item-avatar>
                        <v-avatar size="40">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                          ></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-badge>
                    <v-list-item-content>
                      <v-list-item-title>Mimi</v-list-item-title>

                      <v-list-item-subtitle
                        >32 Story point</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="3">
                <v-list subheader two-line>
                  <v-list-item>
                    <v-badge
                      bordered
                      bottom
                      color="#49D9A0"
                      dot
                      offset-x="28"
                      offset-y="22"
                    >
                      <v-list-item-avatar>
                        <v-avatar size="40">
                          <v-img
                            src="https://cdn.vuetifyjs.com/images/lists/4.jpg"
                          ></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-badge>
                    <v-list-item-content>
                      <v-list-item-title>Selia</v-list-item-title>

                      <v-list-item-subtitle
                        >10 Story point</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
    </v-row>
  </div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
export default {
  components: {
    AppLayout,
  },
  data() {
    return {
      user: null,
      orders: [
          {
            id: 'P42',
            title: 'Onboarding',
            state: 'Delivered',
            count: 3,
            icon: 'fas fa-ellipsis-h'
          },
           {
            id: 'P32',
            title: 'User profile',
            state: 'Delivered',
            count: 8,
            icon: 'fas fa-ellipsis-h'
          },
          {
            id: 'P56',
            title: 'Landing page',
            state: 'Approved',
            count: 12,
            icon: 'fas fa-ellipsis-h'
          },
          {
            id: 'P36',
            title: 'Settings',
            state: 'Approved',
            count: 9,
            icon: 'fas fa-ellipsis-h'
          },
         
        ],
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("getCurrentUser");
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.getCurrentUser;
    },
  },
};
</script>
