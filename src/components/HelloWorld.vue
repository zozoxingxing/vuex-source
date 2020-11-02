<template>
  <div class="state">
    {{ $store.state.count }}
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick() {
      this.$store.state.count ++;
    }
  }
}
</script>



// this.moudles = {
//   root: {
//     state: { count: 0 },
//     _rawModule: rootModule,
//     _children: {
//       student: {
//         state: { num: 100 },
//         _rawModule: studentModule,
//         _children: {
//           a: {
//             state: { name: 'a'},
//             _rawModule: aModule,
//             _children: {}
//           }
//         }
//       }
//     }
//   }
// }
