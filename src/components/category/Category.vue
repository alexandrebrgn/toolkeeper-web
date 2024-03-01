<template>
  <div class="container min-vh-100">
    <div class="container pt-5">
      <h1>Catégories</h1>
      <router-link to="/categoryAdd">
        <button type="button" class="btn btn-primary">
          <p class="button-text"><span class="icon-plus">+ </span>Nouvelle catégorie d'équipement</p>
        </button>
      </router-link>

      <div class="category-container-container" v-for="category in categories">
      <!-- <div class="category-container-container" v-for="category in categories" :key="category.id"> -->
        <div class="category-container">
          <!-- {{ category["index"] = index }}-->
          <!-- {{  console.log(this.index++) }} -->
          <!-- {{ console.log('category[index] : ', category[index], 'index', index) }} 
          {{ console.log(category) }} -->
          <input v-if="edit==true && index == category.id" style="margin: 0; padding: 0;" type="text" name="serialId" id="serialId" v-model="category.name">
          <p v-else > {{ category.name }} </p>
          <div class="category-actions">
            <div>
              <FontAwesomeIcon v-if="edit===false || edit===true && index != category.id" @click="edit=true; index=category.id" class="pencil" icon="pencil"></FontAwesomeIcon>
              <FontAwesomeIcon v-if="edit===true && index===category.id" @click="edit=false; editInputCategory(category.id)" class="check" icon="check"></FontAwesomeIcon>
            </div>
              <FontAwesomeIcon class="trash" icon="trash"></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CategoryService from "../../services/category.service.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Categories",
  data() {
    return {
      categories: "",
      edit: false,
      index: 0,
    };
  },
  beforeMount() {
    CategoryService.getAllCategory().then((response) => {
      this.categories = response.data;
      this.index = 0
      console.log('Category.vue - CategoryService.getAllCategory().then() : ', this.categories);
    }, (error) => {
      this.categories = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    });
  },
  components: { FontAwesomeIcon },
  methods: {
    editInputCategory(id) {
      let newName = '';

      this.categories.forEach((category) => {
        if (category.id == id) {
          console.log('Condition vérifiée, name = ', category.name)
          newName = category.name
        }
      })

      let form = {
        name: newName
      }

      console.log('Form.name', form.name)

      CategoryService.editCategory(form, id)
      this.index=-1
    },

    implementIndex() {
      this.index = this.index + 1;
    }
  }
};
</script>

<style>
* {
  /*box-shadow: 0 0 0 1px red; */
}

.category-actions {
  display: flex;
  gap: .8vw;
  padding-right: 1vw;
  font-size: 1vw;

  .trash {
    color: red;
  }

  .pencil {
    color: blue;
  }
}

.category-actions:hover {
  cursor: pointer;
}

.category-container {
  display: flex;
  justify-content: space-between;
  height: 5vw;
  text-align: center;
  align-items: center;
  padding: 1vw;
  border-radius: 10px;
  margin-top: 1vw;
  border: solid 1px grey;

  h2 {
    letter-spacing: .2vw;
    color: grey;
  }
}

.category-container-container {
  display: flex;
  flex-direction: column;
}
</style>

