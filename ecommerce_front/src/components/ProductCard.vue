<template>
  <div
      class="column is-3"
  >
    <div class="box">
      <figure class="image is-1by1">
        <img v-bind:src="product.get_image" alt="image-produit">
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">{{ product.price }}€</p>

      <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Voir détails</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",

  props: {
    product: Object
  }
}
</script>

<style scoped>
.image {

  height: 15rem;
}

img{
  object-fit: inherit;
  height: inherit;
}
</style>