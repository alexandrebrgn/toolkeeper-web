<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Accueil</h3>
    </header>
  </div>
</template>

<script>
import ToolService from "../services/tool.service.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    ToolService.getAllTool().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
};
</script>