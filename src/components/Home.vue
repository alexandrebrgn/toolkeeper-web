<template>
  <div class="container min-vh-100">
    <div class="container pt-5">
      <div class="home-title-container d-flex justify-content-center align-items-center text-white ">
        <h2>Bienvenue {{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
      </div>
      <div class="d-flex justify-content-between">
        <div class="main-grid pb-5">
          <div class="first-text">
            <p>
              Bienvenue sur l'application de gestion de maintenance du Lycée Notre Dame du Roc !
              Notre plateforme offre une solution complète pour la gestion efficace des opérations
              de maintenance des équipements de votre établissement. Voici un aperçu de ce que notre
              application vous permet de faire : <span>Création d'équipements</span> : Ajoutez facilement et
              rapidement les équipements présents dans votre enceinte en spécifiant leurs détails et
              caractéristiques. <span>Planification des opérations de maintenanc</span>e : Organisez les
              opérations de maintenance à effectuer sur chaque équipement, en définissant les
              tâches, les dates et les intervenants. <span>Suivi en temps réel</span> : Restez informé de
              l'avancement des opérations grâce à des mises à jour en temps réel et des
              notifications.
            </p>
          </div>
          <div class="first-pic">
            <img style="height: 250px"
              src="https://www.lycee-ndduroc.com/wp-content/uploads/2021/10/logo-lycee-campus-notre-dame-du-roc-la-roche-sur-yon-couleur.png"
              alt=""
            />
          </div>
          <div class="second-text">
            <img style="height: 300px"
            src="https://static.actu.fr/uploads/2022/01/be3b6553dae16b24b6553dae1a64b6v-960x640.jpg" 
            alt="" />
          </div>
          <div class="second-pic">
            <p>
              <span>Application mobile dédiée</span> : Profitez de notre application mobile pour une expérience
              encore plus pratique, permettant aux intervenants sur le terrain d'accéder facilement
              aux informations et de mettre à jour le statut des opérations en temps réel.
              <span>Intégration avec une API personnalisée</span> : Notre application est parfaitement intégrée à
              une API personnalisée, assurant une synchronisation fluide des données et une
              compatibilité avec d'autres systèmes. Que vous soyez un gestionnaire d'installations,
              un technicien de maintenance ou tout simplement soucieux d'assurer le bon
              fonctionnement des équipements de votre établissement, notre application vous offre
              les outils nécessaires pour simplifier et optimiser la gestion de la maintenance.
              Découvrez dès maintenant comment notre solution peut vous aider à maintenir un
              environnement sûr, fonctionnel et efficient au sein du Lycée Notre Dame du Roc !
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

* {
  /* box-shadow: inset 0 0 0 1px red; */ 
}

.home-title-container {
  background-image: url('https://static.actu.fr/uploads/2022/01/69db8e668ae16cddb8e668ae1f1eb8v-960x640.jpg');
  background-position: center;
  background-size: cover;
  height : 300px;
  margin: 0;
  padding: 0;
}

.home-title-container > * {
  text-shadow: 1px 1px 20px black;
  font-size: 3vw;
  font-weight: bold;
  color: rgb(230, 230, 230)
}

.main-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 0;
  margin: 0;
}

.main-grid > *{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;

  span {
    text-decoration: underline;
  }
}

</style>

<script>
import ToolService from '../services/tool.service.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    ToolService.getAllTool().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
      }
    )
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user.success
    }
  }
}
</script>
