<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          {{ category.name }}
        </h2>
      </div>
      <ProductCard
          v-for="product in category.products"
          v-bind:key="product.id"
          v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from 'bulma-toast'
import ProductCard from "@/components/ProductCard";

export default {
  name: "Category",
  components: {ProductCard},
  data() {
    return {
      category: {
        products: []
      }
    }
  },

  mounted() {
    this.getCategory()
  },

  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug

      this.$store.commit('setIsLoading', true)

      await axios
          .get(`/api/v1/products/${categorySlug}/`)
          .then(response => {
            this.category = response.data

            document.title = this.category.name + ' | Eshop'
          })
          .catch(error => {
            console.log(error)

            toast({
              message: "Une erreur s'est produite, veuillez réessayer",
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 200,
              position: "bottom-right",
            })
          })

      this.$store.commit('setIsLoading', false)
    }
  }

}
</script>

<style scoped>

</style>