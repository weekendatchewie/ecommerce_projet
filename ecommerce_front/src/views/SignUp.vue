<template>
  <div class="page-sign-up">
    <div class="columns">

      <div class="column is-6">
        <img src="../assets/authentification.svg" alt="">
      </div>

      <div class="column is-4 is-offset-1 card-login">
        <h1 class="title">
          Inscrivez-vous
        </h1>

        <form @submit.prevent="submitForm">

          <div class="field">
            <label>Nom d'utilisateur</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Mot de passe</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="field">
            <label>Répétez le mot de passe</label>
            <div class="control">
              <input type="password" class="input" v-model="password2">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-link">Valider</button>
            </div>
          </div>

          <hr>

          Ou
          <router-link to="/log-in">cliquez ici</router-link>
          pour vous connecter !

        </form>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import {toast} from 'bulma-toast'

export default {
  name: "SignUp",

  data() {
    return {
      username: '',
      password: '',
      password2: '',
      errors: []
    }
  },

  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push("Il manque le nom d'utilisateur")
      }

      if (this.password === '') {
        this.errors.push("Il manque le mot de passe")
      }

      if (this.password !== this.password2) {
        this.errors.push("Les mots de passe ne correspondent pas")
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        axios
            .post("/api/v1/users/", formData)
            .then(response => {
              toast({
                message: 'Compte créé ! Veuillez vous connecter',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })

              this.$router.push('/log-in')
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }

                console.log(JSON.stringify(error.response.data))
              } else if (error.message) {
                this.errors.push('Une erreur est survenue, veuillez réessayer')

                console.log(JSON.stringify(error))
              }
            })

      }

    }
  }
}
</script>

<style scoped>

.card-login {
  border-radius: 12px;
  box-shadow: 2px 5px 8px 0 #323a46e3;
  padding: 3%;
  background-color: white;
}

</style>