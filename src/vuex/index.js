import applyMixin from './mixin';
import ModuleCollection from './ModuleCollection';
let Vue
function install(_Vue) { 
  /**
 * @desc 安装函数，在Vue.use(Vuex)时调用
 * @param _Vue Vue实例对象
 */
  Vue = _Vue;
  applyMixin(Vue);
}

class Store{
  constructor(options) {
    this._vm = new Vue({
      data: {
        state: options.state || {}
      }
    })
    this.state = this._vm.state;
    // 收集模块
    this._moudles = new ModuleCollection(options);
    // 为安装模块获取所需的跟状态
    const state = this._moudles.root.state;
    // 安装模块
    installModule(this, state, [], this._moudles.root);
  }
}
function getNestedState(rootState, path) {
  return path.reduce((state, key) => {    
    return state[key];
  }, rootState)
}
function installModule(store, rootState, path, module) {
  const isRoot = path.length === 0;
  if(!isRoot) {
    // 获取到父模块的state
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length-1];    
    // 向父模块的state上挂载当前子模块的state    
    parentState[moduleName] = module.state;
  }
  module.forEachChild(function(childModule, childName) {
    installModule(store, rootState, path.concat(childName), childModule)
  })
}

export default {
  install,
  Store
};