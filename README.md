## state源码部分
### 不考虑modules

- install函数：
  执行Vue.use(Vuex)时，会安装Vuex插件，自动调用插件的install方法，install方法的第一个参数是Vue。
- applyMixin函数：
  通过Vue.mixin函数在每个组件调用beforeCreate钩子函数时混入$store属性，该属性来源于根组件上配置的store。
- Store._vm:
  通过将options.state赋值给Vue实例中的data，实现State的响应式变化
---
### 考虑modules
- 目标是将store中配置的含有state的数据结构(左下)转换为(右下)的结构存入store.state中
```
 1）moudles: {                              2）store.state: {
    student: {                                 state: {
      moudles: {                                  count: 23,
        a: {                                      student: {
          state: {            结构变为                num:100,
            name: 'a'      --------------->          a:{
          }                                             name: 'a'
        }                                              }
      },                                           }   
      state: {                                  }
        num: 100                              }
      }
    }
  },
  state: {
    count: 23
  }
```
- ModuleCollection.js中是先通过ModuleCollection类将1）的数据结构转换为3）的结构,主要通过register函数对每个模块进行递归注册
```
 3) this.moudles = {
      root: {
        state: { count: 0 },      //当前模块的属性
        _rawModule: rootModule,   // rawModule当前模块
        _children: {              // 当前模块的子模块
          student: {
            state: { num: 100 },
            _rawModule: studentModule,
            _children: {
              a: {
                state: { name: 'a'},
                _rawModule: aModule,
                _children: {}
              }
            }
          }
        }
      }
    }
```

- register(path, rawRootModule)通过 路径 和 当前模块 进行注册，已将1）的结构变成3)

- installModule.js负责安装模块，将3）的结构变为2）的结构