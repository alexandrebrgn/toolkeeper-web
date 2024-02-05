<template>
  <div class="container">
    <header class="jumbotron">
      <ul v-for="tool in tools" :key="tool.id">
        <li>
          Équipement n°{{tool.number}}
          |
          Id de série : {{tool.serialId}}
          |
          <font-awesome-icon v-if="tool.category.name === 'Extincteurs'" icon="fire-extinguisher"></font-awesome-icon>
          <font-awesome-icon v-if="tool.category.name === 'Climatiseurs'" icon="air-freshener"></font-awesome-icon>
          <font-awesome-icon v-if="tool.category.name === 'Véhicules'" icon="car"></font-awesome-icon>
          {{ tool.category.name }}
          <router-link :to="{
            name:'tool',
            params: {
              id: tool.id,
            }
          }">
            <font-awesome-icon icon="pencil" />
          </router-link>
          |
          <font-awesome-icon icon="eye" /> |
          <font-awesome-icon icon="user-plus" />
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import ToolService from "../../services/tool.service.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tools",
  data() {
    return {
      tools: "",
    };
  },
  mounted() {
    ToolService.getAllTool().then(
        (response) => {
          this.tools = response.data;
          console.log('Tool.vue - ToolService.getAllTool().then() : ', this.tools);
        },
        (error) => {
          this.tools = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
    );
  },
};
</script>