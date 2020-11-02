import Module from './module';

export default class ModuleCollection {
  constructor(rawRootModule) {
    this.register([],rawRootModule );   // 注册各模块
  }
  register(path, rawModule) {
    const newModule = new Module(rawModule);
    if(path.length === 0) {
      this.root = newModule;            
    }else {
      // 获取父模块
      const parent = this.get(path.slice(0,-1));
      // 获取当前模块的名字
      const moduleName = path[path.length-1];
      parent._children[moduleName] = newModule;      
    }
    
    if(rawModule.modules) {
      const modules = rawModule.modules;
      Object.keys(modules).forEach(
        (moduleName) => {
          const rawChildModule = modules[moduleName];
          this.register(path.concat(moduleName), rawChildModule);
        }
      )      
    }
  }
  get(path) {
    /**
     * @desc 通过路径获取对应模块
     * @param { Array } path 路径
     */
    return path.reduce((module, key) => {
      // 向父模块添加子模块
      return module.getChild(key);
    },this.root)
  }
}