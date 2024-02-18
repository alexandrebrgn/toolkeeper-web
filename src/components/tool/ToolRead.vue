<template>
  <div class="main-container container min-vh-100">
    <router-link to="/tool"><font-awesome-icon icon="arrow-left"/> Retour aux équipements</router-link>
    <h1>{{tool.category.name}} : {{tool.name}}</h1>
    <div class="divs-container">

      <div class="left-container shadow">
        <img class="image-container" src="https://picsum.photos/1920/1080" alt="equipement">
        <p>{{tool.category.name}} : {{tool.name}}</p>
      </div>
      <div class="right-container">

        <div class="container top-right-container shadow">
          <h2 class="container-title">Informations de l'équipement</h2>
          <div style="width: 95%; border-bottom: grey 1px solid; margin: 0 auto 0;"></div>

          <div v-if="edit===true" class="tool-info">

            <div class="tool-info-element">
              <label for="serialId"> ID de série : &nbsp;</label>
              <input type="text" name="serialId" id="serialId" v-model="tool.serialId">
            </div>

            <div class="tool-info-element">
              <label for="serialId"> Localisation : &nbsp;</label>
              <input type="text" name="localisation" id="localisation" v-model="tool.localisation">
            </div>

            <div class="tool-info-element">
              <label for="serialId"> Catégorie : &nbsp;</label>
              <input type="text" name="category" id="category" v-model="tool.category.name">
            </div>

          </div>

          <div v-else-if="edit===false" class="tool-info">
            <p> ID de série : {{ tool.serialId }}</p>
            <p> Localisation : {{ tool.localisation }}</p>
            <p> Catégorie : {{ tool.category.name }}</p>
          </div>


          <button class="tool-info-button" v-if="edit===false" @click="edit=true;">Modifier</button>
          <button class="tool-info-button" v-if="edit===true" @click="edit=false; editTool()">Valider</button>

        </div>

        <div class="container bottom-right-container shadow">
          <h2 class="container-title">Maintenances à venir</h2>
          <div style="border-bottom: grey 1px solid;"></div>
          <div v-for="operation in tool.operations">
            <div v-if="operation.date == null" class="operation-container" style="padding: 10px 0 10px 10px;">
              <p>Opération prévue pour : </p>
              <p><font-awesome-icon icon="calendar" ></font-awesome-icon> {{ CustomFunctions.convertDate(operation.toDoDate, '\\', 'fr')}}</p>
              <router-link :to="{name:'operation', params: {id: operation.id,}}">
                <font-awesome-icon icon="arrow-right" />
              </router-link>
            </div>
          </div>
          <div class="container m-5"></div>

          <h2 class="container-title">Maitenances effectuées</h2>
          <div style="border-bottom: grey 1px solid;"></div>
          <div v-for="operation in tool.operations" style="padding-top:10px">
              <div v-if="operation.date" class="operation-container" style="padding: 10px 0 10px 10px;">
                <p>Opération n° {{ operation.id }}</p>
                <p><font-awesome-icon icon="calendar"></font-awesome-icon> {{ CustomFunctions.convertDate(operation.date, '\\', 'fr')}}</p>
                <router-link :to="{name:'operation', params: {id: operation.id,}}">
                  <font-awesome-icon icon="arrow-right" />
                </router-link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

* {
  /* box-shadow: inset 0 0 0 1px red; */
  p {
    margin: 0;
    padding: 0;
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

.divs-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.left-container {
  width: 40%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10%;
}

.image-container {
  height: 15vw;
}

.right-container {
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  margin-bottom: 30px;
}

.tool-info {
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  padding: 0;

  input {
    width: auto;
    border: none;
    font-style: italic;
    background: transparent;
  }
}

.tool-info-element > *{
  margin : 0;
  padding: 0;
}

.tool-info-button {
  margin: 0 auto 0;
}

.container-title {
  font-weight: bold;
}

.operation-container {
  display: grid;
  grid-template-columns: 40% 55% 5%;
  border-bottom: 1px solid #c5c5c5;
}

.operation-container > * {
 /*  box-shadow: 0 0 0 1px black inset; */
  color: grey;
}

.bottom-right-container {
  padding: 30px;
}

.top-right-container {
  padding: 30px;
}
</style>


<script setup>
import CustomFunctions from "@/assets/functions/convertDate.js"
</script>

<script>
import ToolService from "../../services/tool.service.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tools",
  data() {
    return {
      edit: false,
      tool: [],
    };
  },
  beforeMount() {
    ToolService.readTool(this.$route.params.id).then(
        (response) => {
          this.tool = response.data;
          // console.log('ToolRead.vue - ToolService.getAllTool().then() : ', this.tool);
        },
        (error) => {
          this.tool = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
    );
  },
  methods : {
    editTool(){
      let form = {
        serialId: this.tool.serialId,
        localisation: this.tool.localisation,
        category_id: this.tool.category_id
      }
      ToolService.editTool(form, this.tool.id)
    }
  }
};
//https://boutique.orange.fr/mobile/details/samsung-galaxy-s24-ultra-noir-256go?intention=acquisition
</script>