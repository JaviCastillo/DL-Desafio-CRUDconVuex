<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/"><font-awesome-icon :icon="['fab', 'vuejs']" /></router-link>
      <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">{{usuarioActivo}} <font-awesome-icon class="mx-1" v-if="usuarioActivo!='Login'" icon="user" /></router-link> 
          </li>
      </ul>
      <div v-if="usuarioActivo!='Login'">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link> 
            </li>
            <li class="nav-item">
              <router-link class="nav-link mx-3" to="/crud">CRUD</router-link>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link btn btn-danger" @click.prevent="salir"><font-awesome-icon icon="power-off" /> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  data() {
    return {
       usuarioActivo: {}
    }
  },
  methods: {
    salir(){
      Firebase.auth().signOut()
        .then(resp => {
          console.log(resp);
          this.$router.push('inicio')
        }).catch(error => {
          console.error(error);
        })
    },
  },
  beforeMount() {
      let user = Firebase.auth().currentUser
      this.usuarioActivo = user ? user.email : 'Login'
  },
  beforeUpdate() {
      let user = Firebase.auth().currentUser
      this.usuarioActivo = user ? user.email : 'Login'
  },
  created() {
      this.$store.dispatch('putUsuarios')
  },
}
</script>
