<template>
  <v-app>
    <v-app-bar app :color="bg" :elevation="0">
      <v-menu
        v-for="([text, rounded], index) in btns"
        :key="text"
        :rounded="rounded"
        offset-y
      >
        <template v-slot:activator="{ attrs, on }">
          <v-app-bar-nav-icon
            :color="colors[index]"
            class="white--text ma-5"
            v-bind="attrs"
            v-on="on"
          >
          </v-app-bar-nav-icon>
        </template>

        <v-list>
          <v-list-item v-for="item in items" :key="item" link>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-1 hidden-sm-and-down" color="white" plain>
        <div class="hover-underline-animation">Cancel</div>
      </v-btn>
      <v-btn class="ma-1 hidden-sm-and-down" color="white" plain>
        <div class="hover-underline-animation">Cancel</div>
      </v-btn>
      <v-btn class="ma-1 hidden-sm-and-down" color="white" plain>
        <div class="hover-underline-animation">Cancel</div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined color="indigo"> Login </v-btn>
      <v-btn class="ma-2" outlined> Sign up </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="ma-0 pa-0">
      <!-- Provides the application the proper gutter -->

      <section>
        <v-img
          src="https://aeroland.vuedemo.hasthemes.com/img/startup-bg.27e78f9a.jpg"
          height="100%"
        >
          <v-layout column align-center justify-center class="white--text">
            <v-container fluid>
              <v-row align="center">
                <v-col class="" cols="6">
                  <h1
                    class="white--text mb-2 display-1 text-xs-center"
                    style="font-weight: 900; text-shadow: 3px 2px #000000"
                  >
                    The social network for epic content
                  </h1>
                  <div
                    class="white--text subheading mb-3 text-xs-center"
                    style="font-weight: 900; text-shadow: 2px 2px #000000"
                  >
                    Unlesh your creativity without limitations
                  </div>
                  <v-btn
                    class="blue lighten-2 mt-5"
                    dark
                    large
                    href="/pre-made-themes"
                  >
                    Get Started
                  </v-btn>
                </v-col>
                <v-col class="" cols="6">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    height="auto"
                    max-width="100%"
                    src="https://aeroland.vuedemo.hasthemes.com/img/startup-thumb.30e9abaa.png"
                    class="img"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-layout>
          <svg viewBox="0 0 1320 500">
            <path  d="
            M0,192
            C220,100,440,100,660,192
            C880,290,1100,290,1320,192
            L1320 500
            L0 500
            " fill="#ffffff"/>
            <path fill-opacity="0.7" d="
            M0,192
            C220,100,440,100,660,192
            C880,290,1100,290,1320,192
            L1320 500
            L0 500
            " fill="#fff"/>
            <path fill-opacity="0.7" d="
            M0,192
            C220,100,440,100,660,192
            C880,290,1100,290,1320,192
            L1320 500
            L0 500
            " fill="#ee5253"/>
            <path fill-opacity="0.7" d="
            M0,192
            C220,100,440,100,660,192
            C880,290,1100,290,1320,192
            L1320 500
            L0 500
            " fill="#00d2d3"/>
          </svg>
        </v-img>
      
          
       
      </section>

      <v-container fluid class="full-cont">
        <slot></slot>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer dark padless>
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
// import Nav from '../components/Nav'
export default {
  data() {
    return {
      mini: true,
      drawer: true,
      bg: "transparent",
      toggleMenu: false,
      btns: [["Removed", "0"]],
      colors: ["deep-purple accent-4"],
      items: [...Array(4)].map((_, i) => `Item ${i}`),
      nav: [
        {
          icon: "home",
          text: "Home",
          title: "Back to Home page",
          active: true,
        },
        {
          icon: "info",
          text: "About",
          title: "About this demo",
          active: false,
        },
        {
          icon: "assignment_turned_in",
          text: "Todos",
          title: "Some stuff that needs doing",
          active: false,
        },
        {
          icon: "email",
          text: "Contact",
          title: "Our Contact info",
          active: false,
        },
      ],
    };
  },
  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp;
    },
  },
  mounted() {
    window.onscroll = () => {
      this.changeColor();
      console.log(document.body.scrollTop);
      console.log(document.documentElement.scrollTop);
    };
  },
  methods: {
    changeColor() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.bg = "white";
      } else {
        this.bg = "transparent";
      }
    },
  },
};
</script>

<style>
.img {
  bottom: -32px;
  position: relative;
  z-index: 1;
}
.hover-underline-animation {
  display: inline-block;
  /* position: relative; */
  /* color: #0087ca; */
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -8px;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}


svg{
  position:absolute;
  bottom:-23%;
  z-index: 1000;
}

svg path{
	animation:pathAnim 10s; 
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}
svg path:nth-child(2){
	animation-delay: 1s
}
svg path:nth-child(3){
	animation-delay: 3s
}
svg path:nth-child(4){
  animation-delay: 4s;
	/* animation-play-state: paused; */
}

@keyframes pathAnim{
	0%{
		d: path("M0,192	C220,100,440,100,660,192 C880,290,1100,290,1320,192	L1320 500 L0 500");
	}
	25%{
		d: path("M0,100	C220,100,440,292,660,292 C880,292,1100,100,1320,100	L1320 500 L0 500");
	}
	50%{
		d: path("M0,192	C220,290,440,290,660,192 C880,100,1100,100,1320,192	L1320 500 L0 500");
	}
	75%{
		d: path("M0,292	C220,292,440,100,660,100 C880,100,1100,292,1320,292	L1320 500 L0 500");
	}
	100%{
		d: path("M0,192	C220,100,440,100,660,192 C880,290,1100,290,1320,192	L1320 500 L0 500");
	}

}
</style>