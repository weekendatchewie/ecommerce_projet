<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-6 img-box">
        <img src="../assets/login.svg" class="img-login" alt="">
      </div>

      <div class="column is-4 is-offset-1 card-login">
        <h1 class="title">
          Connectez-vous
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
          <router-link to="/sign-up">cliquez ici</router-link>
          pour créer votre compte !

        </form>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },

  mounted() {
    document.title = 'Login | Eshop'
  },

  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")

      const formData = {
        username: this.username,
        password: this.password
      }

      await axios
          .post("api/v1/token/login/", formData)
          .then(response => {
            const token = response.data.auth_token

            this.$store.commit('setToken', token)

            axios.defaults.headers.common["Authorization"] = "Token " + token

            localStorage.setItem("token", token)

            const toPath = this.$route.query.to || '/cart'

            this.$router.push(toPath)
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
            } else {
              this.errors.push('Une erreur est survenue, veuillez réessayer')

              console.log(JSON.stringify(error))
            }
          })
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

.is-link {
  width: 100%;
  margin-top: 5%;
}

.img-box {
  text-align: center;
}

.img-login {
  width: 75%;
}

</style>