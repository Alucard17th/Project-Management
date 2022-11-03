<template>
  <v-row
    dense
    v-bind:class="{ 'justify-center': isSideBar }"
    id="create_space"
    class="justify-end"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn icon v-bind="attrs" v-on="on" class="edit_space_action">
          <v-icon> mdi-dots-vertical </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link>
          <v-list-item-title @click="dialog = true">Edit</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" max-width="700px">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn icon fab small v-bind="attrs" v-on="on">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-hover v-slot="{ hover }">
          <v-btn
            icon
            fab
            small
            @click="delRecord(task.id)"
            :class="{ 'show-btns': hover }"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-hover>
      </template> -->

      <v-stepper v-model="e6" vertical id="create-space-stepper">
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
          @click="e6 = 1"
          color="#49d9a0"
        >
          Edit Team
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="lighten-1">
            <!-- TEAM NAME -->
            <v-text-field
              v-model="name"
              label="Your great team name*"
              required
            ></v-text-field>
            <!-- TEAM DESCRIPTION -->
            <v-textarea
              v-model="desc"
              name="input-7-1"
              label="A description about your fantastic team"
              value=""
              hint="Your project description"
            ></v-textarea>

            <!-- TEAM MEMBER INVITES -->
            <v-combobox
              v-model="model"
              :filter="filter"
              :hide-no-data="!search"
              :items="itemsMembers"
              :search-input.sync="search"
              hide-selected
              label="Search for an option"
              multiple
              small-chips
              solo
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editing === item"
                  v-model="editing.text"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="edit(index, item)">
                    <v-icon>{{
                      editing !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-card>

          <v-card color="lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn @click="createSpace" class="white--text theme-btn">
            Create
          </v-btn>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    name: "",
    color: "",
    image: [],
    avatar: "",
    desc: "",
    privacy: "",
    rules: [],
    dialog: false,
    e1: 1,
    items: [
      { name: "Foo", icon: "mdi-home" },
      { name: "Bar", icon: "mdi-domain" },
      { name: "Hoo", icon: "mdi-airballoon-outline" },
      { name: "Coo", icon: "mdi-avatar" },
    ],
    activator: null,
    attach: null,
    colors: ["green"],
    editing: null,
    editingIndex: -1,
    itemsMembers: [
      { header: "Select an option or create one" },
      {
        text: "Foo",
        color: "blue",
      },
      {
        text: "Bar",
        color: "red",
      },
    ],
    nonce: 1,
    menu: false,
    model: [
      {
        text: "Foo",
        color: "blue",
      },
    ],
    x: 0,
    search: null,
    y: 0,
    e6: 1,
  }),
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    },
  },
  methods: {
    handleChange(e) {
      console.log(this.privacy);
    },
    createSpace() {
      this.$store.dispatch("addSpace", {
        name: this.name,
        color: this.color,
        avatar:
          typeof this.avatar.icon === "undefined" ? "empty" : this.avatar.icon,
        desc: this.desc,
        privacy: this.privacy,
        space: this.$route.params.id,
      });
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
};
</script>
<style lang="scss">
@import "../../../sass/_variables.scss";

.avatar-col {
  width: 90%;
  height: 154px;
  border-radius: 4px;
  contain: content;
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
    0 0 0 0 rgba(0, 0, 0, 0.12);
  max-width: 300px;
}

#create_space button,
#create-space-stepper .theme-btn {
  background-color: $lantern;
}
#create_space .edit_space_action {
  background-color: transparent;
}

.subtitle-3 {
  font-size: 13px;
}
</style>