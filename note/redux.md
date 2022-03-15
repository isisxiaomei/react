# 1. redux介绍

redux核心理念是借助action去更改store中的数据；这样针对store的修改就可以被追踪和记录

redux是单独库，可以和react使用，也可以与其他库一起使用

---
***actions:***

action本质就是一个对象，比如:

```js
{type: "ADD", payload: {counter: 2}}
```

---

**reducer:**

reducer连接state和action

reducer是纯函数；不允许修改state；为什么不许修改state？

reducer将传入的state和action结合生成一个新state

---

# 2. redux基本使用

```js

const initState = {
  counter: 0,
};

// subscribe可以订阅到state中值的变化，每当state值更新时就会调subscribe
// 注意subscribe一定要在最前面，否则先dispatch后订阅，那么订阅不到值变化
store.subscribe(() => {
  // store.getState()可以获取当state的值
  console.log('counter:', store.getState());
});

//  reducer(state第一次传入默认值，后续会将上次的进行传入)
// 不能修改state，而是结合老的state直接返回新的state
function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, counter: state.counter + 1 };
    case 'SUB':
      return { ...state, counter: state.counter + action.num };
    default:
      return state;
  }
}

// actions
const action1 = { type: 'ADD' };
const action2 = { type: 'SUB', num: 5 };

// store（创建时需要传递reducer）
const store = redux.createStore(reducer);

// 派发action
store.dispatch(action1);
store.dispatch(action2);

```


