<template>
  <div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container w-auto shadow-lg p-5 rounded">
      <Form @submit="handleToolPost" :validation-schema="schema">
        <h2>Créer un nouvel équipement</h2>
        <div class="form-group">
          <label>Catégorie de l'équipement :</label>
          <select class="custom-select" v-model="form.category_id">
            <option disabled value="" class="disabled-option">---</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Nom de l'équipement <span style="color:red">*</span> :</label>
          <Field name="name" id="name" class="form-control" type="text" v-model="form.name"/>
          <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
          <label>Numéro de série de l'équipement <span style="color:red">*</span> :</label>
          <Field name="serialId" id="serialId" class="form-control" type="text" v-model="form.serialId"/>
          <ErrorMessage name="serialId" class="error-feedback" />
        </div>

        <div class="form-group">
          <label>Localisation de l'équipement <span style="color:red">*</span> :</label>
          <Field name="localisation" id="localisation" class="form-control" type="text" v-model="form.localisation"/>
          <ErrorMessage name="localisation" class="error-feedback" />
        </div>

        <div class="form-group">
          <label>Date de la prochaine opération <span style="color:red">*</span> :</label>
          <Field name="dateNextOperation" id="dateNextOperation" class="form-control" type="date" v-model="form.dateNextOperation"/>
          <ErrorMessage name="dateNextOperation" class="error-feedback" />
        </div>

        <div class="form-group">
          <button @click="submit">
            Envoyer
          </button>
        </div>

      </Form>
    </div>
  </div>
</template>

<style>
.disabled-option {
  font-style: italic;
}
</style>

<script>
import ToolService from "../../services/tool.service.js";
import CategoryService from "../../services/category.service.js";
import * as yup from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Operation",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Renseigner le nom de l'équipement"),
      serialId: yup.string().required("Renseigner son numéro de série"),
      localisation: yup.string().required("Renseignez sa position"),
      dateNextOperation: yup.string().required("Définissez la 1ère date de maintenance"),
    });
    return {
      categories: "",
      form: {
        name: "",
        serialId: "",
        localisation: "",
        dateNextOperation: "",
        category_id: "",
      },
      schema,
    };
  },
  methods: {
    submit() {
      ToolService.addTool(this.form.name, this.form.serialId, this.form.localisation, this.form.dateNextOperation, this.form.category_id).then(
          (response) => {
            console.log("AddVueTool - ", this.form.name, this.form.serialId, this.form.localisation, this.form.dateNextOperation, this.form.category_id)
            console.log('ToolAdd.vue - ToolService.getAllTool().then() : ', response);
            this.$router.push('/tool')
          },
          (error) => {
            this.tool = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
      );
      console.log('ToolAdd.vue - OperationService.addOperation()')
    },
    categoriesData() {
      CategoryService.getAllCategory().then(
          (response) => {
            this.categories = response.data;
            console.log('ToolAdd.vue - CategoryService.getAllCategory().then() : ', this.categories);
          },
          (error) => {
            this.categories = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
      );
    },
    handleToolPost(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          console.log('LoginVue - HandleLogin - error')
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  mounted() { // Exécutés à l'initialisation
    this.categoriesData();
  },
};
</script>