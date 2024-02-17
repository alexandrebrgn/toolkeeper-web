<template>
  <div class="container min-vh-100">
    <h1 class="operation-title">Opération de maintenance n°{{ operation.id }}</h1>
    <h3 v-if="operation.date">Effectuée le {{ operation.date }}</h3>
    <h3 v-else>À éffectuer le : {{ operation.toDoDate }}</h3>
    <h2>Rapport d'opération de maintenance</h2>
    <textarea v-if="operation.date">{{operation.report}}</textarea>
    <router-link :to="{name:'tool', params: {id: operation.tool.id,}}">Voir l'équipement lié</router-link>
  </div>
</template>

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