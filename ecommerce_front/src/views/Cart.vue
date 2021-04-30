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
import axios from "axios";
import CartItem from "@/components/CartItem";

export default {
  name: "Cart",
  components: {CartItem},
  data() {
    return {
      cart: {
        items: []
      }
    }
  },

  mounted() {
    this.cart = this.$store.state.cart
  },

  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>