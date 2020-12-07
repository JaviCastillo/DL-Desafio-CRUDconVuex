<template>
  <div>
    <div class="jumbotron container my-4">
      <h1 class=" display-4 text-center">Bienvenido a tu Home</h1>
      <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam adipisci tempore, atque numquam ratione dolores.</p>
      <hr class="my-4">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam adipisci tempore,</p>
      <router-link class="btn btn-primary btn-lg" href="#" role="button" to="/crud">Maneja tu CRUD</router-link>
      <a class="btn btn-danger btn-lg mx-5" href="#" role="button" @click="salir">Salir</a>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
export default {
  name: 'Home',
  methods: {
    salir(){
      Firebase.auth().signOut()
        .then(resp => {
          console.log(resp);
          this.$router.push('inicio')
        }).catch(error => {
          console.error(error);
        })
    }
  }
}
</script>

<style scoped>

</style>