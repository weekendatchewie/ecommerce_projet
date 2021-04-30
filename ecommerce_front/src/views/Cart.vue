<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">
          Panier
        </h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <CartItem
              v-for="item in cart.items"
              v-bind:key="item.product.id"
              v-bind:initialItem="item"
          />
          </tbody>
        </table>

        <p v-else>Vous n'avez aucun produit dans votre produit</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Cart"
}
</script>

<style scoped>

</style>