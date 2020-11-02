export default function applyMixin(Vue) {
  Vue.mixin({       // 
    beforeCreate: vuexInit
  })
}

/**
 * @desc 将根组件的store对象挂载到每个Vue实例的$store属性上
 */
function vuexInit() {
  const options = this.$options;      
  if(options.store) {
    this.$store = options.store
  }else {
    this.$store = options.parent && options.parent.$store;
  }  
}