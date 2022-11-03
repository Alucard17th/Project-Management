<template>
  <div>
    <h4>I m  not</h4>
    <h3 v-if="currentDocument">{{currentDocument.name}}</h3>
    <div>
      <v-btn depressed color="primary" @click="newContent"> New </v-btn>
      <v-btn depressed color="primary" @click="saveContent"> Save </v-btn>
    </div>
    <div>
      <v-text-field
        v-model="docName"
        label="Outlined"
        outlined
        clearable
      ></v-text-field>
    </div>

    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify v-model="content" :extensions="extensions">
    </tiptap-vuetify>
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  props: ["id"],
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    // content: `
    //   <h1>Yay Headlines!</h1>
    //   <p>All these <strong>cool tags</strong> are working now.</p>
    // `,
    content: '',
    docName: "",
  }),
  methods: {
    newContent() {
      this.content = "";
    },
    saveContent() {
      const formData = new FormData();
      formData.append("name", this.docName);
      formData.append("document", this.content);

      this.$store
        .dispatch("addDocument", formData)
        .then(() => {
          // this.$store.dispatch("getProjects"),
          console.log("added doc yes");

          // this.newSubTask = '';
          // this.snackbar = true
          // this.snackbartext = 'Task Added'
        })
        .catch((error) => {
          // this.snackbar = true
          // this.snackbartext = 'Task Not Added'
          console.log("added doc NOOO");
        });
    },
  },
  mounted() {
    console.log("CHOPPER");
    console.log(this.id);
  },
  computed: {
    currentDocument: function () {
      this.$store.dispatch("setCurrentDocument", this.id);
      this.docName = this.$store.getters.getCurrentDocument.name
      this.content = this.$store.getters.getCurrentDocument.content
      return this.$store.getters.getCurrentDocument;
    },
  },
};
</script>