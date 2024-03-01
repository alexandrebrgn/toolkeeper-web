<template>
  <div class="container min-vh-100">
    <div class="pt-5 w-75">
      <div v-if="operation.date">
        <h1 class="operation-title mb-4">Opération de maintenance n°{{ operation.id }}</h1>
        <h4><font-awesome-icon icon="calendar"></font-awesome-icon> Effectuée le {{ CustomFunctions.convertDate(operation.date, '\\', 'fr') }}</h4>
        <h4><font-awesome-icon icon="user"></font-awesome-icon> Effectuée par : {{ operation.user.firstName }} {{ operation.user.lastName }}</h4>
        <h5><font-awesome-icon icon="sheet-plastic"></font-awesome-icon> Rapport d'opération de maintenance</h5>
        <textarea class="form-control" v-if="operation.date">{{operation.report}}</textarea>
        <router-link :to="{name:'tool', params: {id: operation.tool.id,}}">Voir l'équipement lié</router-link>
      </div>

      <div v-else>
        <h1 class="operation-title">Opération de maintenance n°{{ operation.id }}</h1>
        <h4><font-awesome-icon icon="calendar"></font-awesome-icon> À éffectuer le : {{ operation.toDoDate }}</h4>
        <h4><font-awesome-icon icon="user"></font-awesome-icon> Opérateur attitré : {{ operation.user.firstName }} {{ operation.user.lastName }}</h4>
        <router-link :to="{name:'tool', params: {id: operation.tool.id,}}">Voir l'équipement lié</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomFunctions from "@/assets/functions/convertDate.js"
</script>

<script>
import OperationService from '../../services/operation.service.js'

export default { 
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tools',
  data() {
    return {
      operation: ''
    }
  },
  beforeMount() {
    OperationService.readOperation(this.$route.params.id).then(
      (response) => {
        this.operation = response.data
        console.log('OperationRead.vue - OperationService.readOperation().then() : ', this.operation)
      },
      (error) => {
        this.tool = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      }
    )
  }
}
</script>