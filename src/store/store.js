import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios: [],
  },
  getters: {
    getUsuarios(state){
      return state.usuarios
    }
  },
  mutations: {
    putUsuarios(state){
      firebase.firestore().collection('usuarios').onSnapshot(resp => {
        let arreglo = [];
        resp.forEach(element => {
          arreglo.push({
            id: element.id,
            edad: element.data().edad,
            name: element.data().name,
            lastname: element.data().lastname,
            email: element.data().email,
          })
        });
        state.usuarios = arreglo;
      })
    },
    addUsuario(state,user){
      firebase.firestore().collection('usuarios').add({
        edad: user.edad,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      })
    },
    updateUsuario(state,user){
      firebase.firestore().collection('usuarios').doc(user.id).update({
        edad: user.edad,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      })
    },
    deleteUsuario(state,userid){
      firebase.firestore().collection('usuarios').doc(userid).delete().then(()=>{
        alert("Eliminado");
      })
    },
  },
  actions: {
    putUsuarios({commit}){
      commit('putUsuarios');
    },
    addUsuario({commit},user){
      commit('addUsuario',user);
    },
    updateUsuario({commit},user){
      commit('updateUsuario',user);
    },
    deleteUsuario({commit},userid){
      commit('deleteUsuario',userid);
    }
  },
})
