import Vue from 'vue';
import Vuex from './vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    student: {
      modules: {
        a: {
          state: {
            name: 'a'
          }
        }
      },
      state: {
        num: 100
      }
    },
    teacher: {
      state: {
        class: 'number 1'
      }
    }
  },
  state: {
    count: 23
  }
})

// this.state = {
//   state: {
//     count: 23,
//     student: {
//       num: 100,
//       a: {
//         name: 'a'
//       }
//     }
//   }
// }