<template>
  <div class="container">
    <header class="jumbotron">

      <router-link to="/toolAdd">
        <button type="button" class="btn btn-primary">
          <p class="button-text"><span class="icon-plus">+ </span>Nouvel équipement</p>
        </button>
      </router-link>

<!--      <ul v-for="tool in tools" :key="tool.id">-->
<!--        <li>-->
<!--          Équipement n°{{tool.number}}-->
<!--          |-->
<!--          Id de série : {{tool.serialId}}-->
<!--          |-->
<!--          <font-awesome-icon v-if="tool.category.name === 'Extincteurs'" icon="fire-extinguisher"></font-awesome-icon>-->
<!--          <font-awesome-icon v-if="tool.category.name === 'Climatiseurs'" icon="air-freshener"></font-awesome-icon>-->
<!--          <font-awesome-icon v-if="tool.category.name === 'Véhicules'" icon="car"></font-awesome-icon>-->
<!--          {{tool.category.name}}-->

<!--          |-->
<!--          <font-awesome-icon icon="eye" /> |-->
<!--          <font-awesome-icon icon="user-plus" />-->
<!--        </li>-->
<!--      </ul>-->

      <table class="table">
        <thead>
          <tr class="d-flex">
            <th class="col-1">#</th>
            <th class="col-4">Nom</th>
            <th class="col-4">Numéro de série</th>
            <th class="col-2">Catégorie</th>
            <th class="col-1">Voir</th>
          </tr>
        </thead>
        <tbody v-for="tool in tools" :key="tool.id">
          <tr class="d-flex">
            <th scope="row" class="col-1">{{tool.id}}</th>
            <td class="col-4">{{tool.number}}</td>
            <td class="col-4">{{tool.serialId}}</td>
            <td class="col-2">{{tool.category.name}}</td>
            <td class="col-1"><router-link :to="{name:'tool', params: {id: tool.id,}}"><font-awesome-icon icon="eye" /></router-link></td>
          </tr>
        </tbody>
      </table>
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