<template>
  <div class="container">

      <!-- Container for future Operations-->

    <div class="container pt-5">
      <div class="d-flex justify-content-between">
        <h2 class="mb-5">Opérations de maintenance à venir</h2>
        <router-link to="/operationAdd" class="right">
          <button type="button" class="btn btn-primary">
            <p class="button-text"><span class="icon-plus"> + </span>Nouvelle opération de maintenance</p>
          </button>
        </router-link>
      </div>

      <div class="table-responsive">
        <table class="table custom-table border-success">
          <thead>
          <tr >
            <th class="col-md-1 border-top-0 border-bottom text-center" scope="col">#</th>
            <th class="col-md-3 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="fire-extinguisher"></font-awesome-icon> Équipement</th>
            <th class="col-md-4 border-top-0 border-bottom text-center" scope="col"><font-awesome-icon icon="check"></font-awesome-icon> A effectuer le</th>
            <th class="col-md-4 border-top-0 border-bottom text-center" scope="col"><font-awesome-icon icon="user"></font-awesome-icon> Technicien affecté</th>
            <th class="col-md-1 border-top-0 border-bottom" scope="col">...</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="operation in operations" :key="operation.id" >
            <tr v-if="operation.date == null" class="text-muted">
              <td class="border-top-0 border-bottom text-center">
                {{operation.id}}
              </td>
              <td class="border-top-0 border-bottom">
                <router-link class="text-muted" :to="{name:'tool', params: {id: operation.tool.id,}}">{{ operation.tool.category.name }} :{{operation.tool.name}}</router-link>
              </td>
              <td class="border-top-0 border-bottom text-center">
                {{ CustomFunctions.convertDate(operation.toDoDate, '\\', 'fr') }}
              </td>
              <td class="border-top-0 border-bottom text-center">
                {{ operation.user.firstName}} {{operation.user.lastName}}
              </td>
              <td class="border-top-0 border-bottom">
                <router-link :to="{name:'operation', params: {id: operation.id,}}"><font-awesome-icon icon="eye" /></router-link>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>

      <!-- Container for Past Operations -->

      <div class="container mt-5">
        <div class="container d-flex align-items-center mb-3">
          <select v-model="search" class="">
            <option disabled value="" class="disabled-option">Filtrer par équipement</option>
            <option value="null">Tous les équipements</option>
            <option v-for="tool in tools" :key="tool.id" :value="tool.id">
              <template v-if="tool">{{ tool.name }}</template>
            </option>
          </select>
        </div>
        <h2 class="mb-5">Opérations de maintenance effectuées</h2>
        <div class="table-responsive">
          <table class="table custom-table border-success">
            <thead>
            <tr >
              <th class="col-md-1 border-top-0 border-bottom text-center" scope="col">#</th>
              <th class="col-md-2 border-top-0 border-bottom text-center" scope="col"><font-awesome-icon icon="check"></font-awesome-icon> Effectuée le</th>
              <th class="col-md-2 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="fire-extinguisher"></font-awesome-icon> Équipement</th>
              <th class="col-md-4 border-top-0 border-bottom" scope="col"><font-awesome-icon icon="sheet-plastic"></font-awesome-icon> Rapport de maintenance</th>
              <th class="col-md-4 border-top-0 border-bottom text-center" scope="col"><font-awesome-icon icon="user"></font-awesome-icon> Technicien affecté</th>
              <th class="col-md-1 border-top-0 border-bottom text-center" scope="col">...</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="operation in filteredFutureOperations" :key="operation.id" >
              <tr v-if="operation.date" class="text-muted">
                  <td class="border-top-0 border-bottom text-center">
                    {{operation.id}}
                  </td>
                  <td class="border-top-0 border-bottom text-center">
                    {{CustomFunctions.convertDate(operation.date, '-', 'fr')}}
                  </td>
                  <td class="border-top-0 border-bottom">
                    <router-link class="text-muted" :to="{name:'tool', params: {id: operation.tool.id,}}">
                    {{ operation.tool.category.name }} :{{operation.tool.name}}
                    </router-link>
                  </td>
                  <td class="border-top-0 border-bottom" v-if="operation.report.length < 40">
                    {{ operation.report}}
                  </td>
                  <td class="border-top-0 border-bottom position-relative" v-if="operation.report.length >= 40">
                    <div class="text-nowrap overflow-hidden position-absolute">{{ operation.report.substring(0, 40) }}...</div>
                  </td>
                  <td class="border-top-0 text-right text-right">
                    {{ operation.user.firstName}} {{operation.user.lastName}}
                  </td>
                <td class="border-top-0 border-bottom text-center">
                  <router-link :to="{name:'operation', params: {id: operation.id,}}"><font-awesome-icon icon="eye" /></router-link>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>

<style>

* {
  //box-shadow: 0 0 0 1px red inset;
}
.no-report {
  font-style: italic;
  color: grey;
}

.button-text {
  margin: 0;
}

.icon-plus {
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.rl:hover {
  color: black;
  text-decoration: none;
}

</style>

<script setup>
import CustomFunctions from "@/assets/functions/convertDate.js"
</script>

<script>
import OperationService from "@/services/operation.service.js";
import ToolService from '@/services/tool.service.js';

export default {
  name: "Operation",
  data() {
    return {
      areToolsLoaded: false,
      operations: '',
      tools: '',
      search: '',
    };
  },
  mounted() {
    OperationService.getAllOperation().then(
        (response) => {
          this.operations = response.data;
          this.areToolsLoaded = true;
          console.log('Operation.vue - OperationService.getAllOperation().then() : ', this.operations);
        },
        (error) => {
          this.operations = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
    );
    ToolService.getAllTool().then(
      (response) => {
        this.tools = response.data;
        console.log('Operation.vue - OperationService.getAllOperation().then() : ', this.tools);
      },
      (error) => {
        this.tools = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      }
    );
  },
  computed: {
    filteredFutureOperations() {
      console.log(this.search)
      if (!this.areToolsLoaded) {
        return this.operations
      } else if (this.search === 'null') {
        return this.operations
      } else {
        return this.operations.filter(operation => {
          return operation.tool.id.toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) > -1
        })
      }
    }
  }
  // https://codepen.io/imlinus/pen/wvaKyoX
};
</script>