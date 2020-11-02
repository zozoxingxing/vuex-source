export default class Module{
  constructor(rawModule) {        
    this.state = rawModule.state || {},
    this._rawModule = rawModule || {},
    this._children = rawModule.modules || {}
  }
  getChild(key) {
    // 通过key值得到模块的子模块
    return this._children[key];
  }
  forEachChild(fn) {
    Object.keys(this._children).forEach((childName) => {
      fn(this._children[childName], childName);
    })
  }
}