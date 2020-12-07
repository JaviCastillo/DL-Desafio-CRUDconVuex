<template>
  <div>
    <div class="jumbotron container my-4 py-3">
      <h1 class="display-4 text-center">CRUD</h1>
      <p class="lead text-center">Maneja una lista de usuarios. Crea, Visualiza, Actualiza y Elimina a tu gusto</p>
      <hr class="my-4">
      <p>En este formulario puedes crear o actualizar usuarios</p>
      <form class="form-inline">
        <div class="form-group mb-2">
          <input type="text" class="form-control" placeholder="Nombre" v-model="form.name">
        </div>
        <div class="form-group mb-2 mx-2">
          <input type="text" class="form-control" placeholder="Apellido" v-model="form.lastname">
        </div>
        <div class="form-group mb-2 mx-2">
          <input type="number" class="form-control" placeholder="Edad" v-model="form.edad">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <input type="email" class="form-control" placeholder="Correo Electrónico" v-model="form.email">
        </div>
        <button class="btn btn-primary mb-2" @click.prevent="addUsuario" v-if="!edit">Agregar</button>
        <button class="btn btn-warning mb-2" v-if="edit" @click.prevent="updateUsuario()">Actualizar</button>
      </form>
    </div>
    <hr>
    <table class="table container my-5 text-center">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Email</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Usuarios" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.lastname}}</td>
          <td>{{item.edad}}</td>
          <td>{{item.email}}</td>
          <td>
            <button class="btn btn-warning mx-3" @click.prevent="updateActive(item)" v-if="!edit">Editar</button>
            <button class="btn btn-danger" @click.prevent="deleteUsuario(item.id)" v-if="!edit">Borrar</button>
            <button class="btn btn-warning mx-3" disabled v-if="edit">Editar</button>
            <button class="btn btn-danger" disabled v-if="edit">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name: 'CRUD',
    data() {
      return {
        form: {
          name: '',
          lastname: '',
          edad: '',
          email:''
        },
        edit: false,
        userEdit: {}
      }
    },
    computed: {
      Usuarios(){
        return this.$store.getters.getUsuarios;
      }
    },
    methods: {
      addUsuario(){
        if (this.form.name && this.form.lastname && this.form.email && this.form.edad > 0) {
          this.form.edad = parseInt(this.form.edad)
          this.$store.dispatch('addUsuario',this.form);
          this.form.name = ''
          this.form.lastname = ''
          this.form.edad = ''
          this.form.email = ''
        } else {
          alert('Ingresa los datos correctamente');
        }
      },
      updateActive(user){
        this.form.name = user.name
        this.form.lastname = user.lastname
        this.form.edad = user.edad
        this.form.email = user.email
        this.userEdit = user
        this.edit = true
      },
      updateUsuario(){
        let upa = confirm('Actualizar?')
        if (upa && this.form.name && this.form.lastname && this.form.email && this.form.edad > 0) {
          this.form.edad = parseInt(this.form.edad)
          this.userEdit.name = this.form.name
          this.userEdit.lastname = this.form.lastname
          this.userEdit.edad = this.form.edad
          this.userEdit.email = this.form.email

          this.$store.dispatch('updateUsuario',this.userEdit);

          this.form.name = ''
          this.form.lastname = ''
          this.form.edad = ''
          this.form.email = ''
          this.userEdit = {}
          this.edit = false
        }
        
      },
      deleteUsuario(userid){
        let x = confirm('Borrar?')
        if (x) {
          this.$store.dispatch('deleteUsuario',userid);
        }
      }
    },

}
</script>
