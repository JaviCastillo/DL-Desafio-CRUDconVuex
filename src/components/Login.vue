<template>
  <div class="container my-5">
    <div class="jumbotron">
      <h1 class="display-4 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Correo Electrónico</label>
          <input type="email" class="form-control" v-model="formLabelAlign.user">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" class="form-control" v-model="formLabelAlign.password">
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'Login',
  data() {
        return {
            formLabelAlign: {
                user: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            Firebase.auth()
            .signInWithEmailAndPassword(
                this.formLabelAlign.user, 
                this.formLabelAlign.password
            )
            .then(() =>{
                alert(`Bienvenido ${this.formLabelAlign.user}`);
                this.$router.push('home')
            },
            reject =>{
                alert(reject.message)
            })
        }
    },
}
</script>


<style scoped>

</style>
