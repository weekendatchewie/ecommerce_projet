<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          BIENVENUE
        </p>
        <p class="subtitle">
          La marque au design unique
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Les derniers produits
        </h2>
      </div>
      <ProductCard
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product"
      />
    </div>

  </div>
</template>

<script>
import axios from "axios"
import ProductCard from "@/components/ProductCard";

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductCard
  },
  mounted() {
    this.getLatestProducts()

    document.title = 'Home | Eshop'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v1/latest-product/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
