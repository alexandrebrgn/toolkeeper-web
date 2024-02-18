<template>
  <div class="container min-vh-100 w-100">
    <div class="container pt-5">
      <div class="d-flex justify-content-between">
        <h2 class="mb-5">Équipements disponibles</h2>
        <router-link to="/toolAdd" class="right">
          <button type="button" class="btn btn-primary">
            <p class="button-text"><span class="icon-plus"> + </span>Nouvel équipement</p>
          </button>
        </router-link>
      </div>

      <div class="container d-flex align-items-center">
        <select v-model="search" class="">
          <option disabled value="" class="disabled-option">Filtrer par catégorie</option>
          <option value="null">Tous les équipements</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="table custom-table border-success">
          <thead>
          <tr >
            <th class="col-md-1 border-top-0 border-bottom" scope="col">#</th>
            <th class="col-md-3 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="check"></font-awesome-icon> Nom</th>
            <th class="col-md-4 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="map-marker"></font-awesome-icon> Localisation</th>
            <th class="col-md-4 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="calendar"></font-awesome-icon> Date de la prochaine opération</th>
            <th class="col-md-1 border-top-0 border-bottom" scope="col">...</th>
          </tr>
          </thead>

          <tbody>
            <tr  v-for="tool in filteredItems" :key="tool.id" class="text-muted">
              <td class="border-top-0 border-bottom">
                {{tool.id}}
              </td>
              <td class="border-top-0 border-bottom">
                {{tool.name}}
              </td>
              <td class="border-top-0 border-bottom">
                {{ tool.localisation}}
              </td>
              <td class="border-top-0 border-bottom">
                {{ CustomFunctions.convertDate(tool.dateNextOperation, '\\', 'fr')}}
              </td>
              <td class="border-top-0 border-bottom">
                <router-link :to="{name:'tool', params: {id: tool.id,}}"><font-awesome-icon icon="eye"/></router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomFunctions from "@/assets/functions/convertDate.js"
</script>

<script>
import ToolService from "../../services/tool.service.js";
import CategoryService from '@/services/category.service.js';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tools",

  data() {
    return {
      areToolsLoaded: false,
      tools: "",
      categories: "",
      search: ""
    };
  },
  mounted() {
    ToolService.getAllTool().then(
      (response) => {
        this.areToolsLoaded = true;
        this.tools = response.data;
      },
      (error) => {
        this.tools = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      }
    );
    CategoryService.getAllCategory().then(
      (response) => {
        this.categories = response.data;
      },
      (error) => {
        this.categories = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      }
    );
  },
  computed: {
    filteredItems() {
      if (!this.areToolsLoaded) {
        return this.tools
      } else if (this.search === 'null') {
        return this.tools
      } else {
        return this.tools.filter(tool => {
          return tool.category.id.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) > -1
        })
      }
    }
  }
}
</script>