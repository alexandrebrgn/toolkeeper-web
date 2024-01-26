<template>
  <div class="container">
    <header class="jumbotron">
      <ul v-for="tools in content" :key="tools.id">
        <li v-for="tool in tools" :key="tool.id">{{ tool }}</li>
      </ul>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getAllTool().then(
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