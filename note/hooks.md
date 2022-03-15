# 1. useState使用

useState：接受一个参数作为返回数组元素的第一个状态变量的默认值。

当返回值的第二个参数setCounter被调用时，useState所在的函数TestHook会被重新调用，并且重新渲染，但是state仍然保持最后更新的值，而不是初始化的值

```js
// 基本使用
import React, {useState} from 'react'

export default funtion TestHook(){
  // useState的参数是返回的数组的第一个元素的默认值
  const [counter, setCounter] = useState(0)
  const [friends, setFriends] = useState(["张三", "李四"])
  
  // 可以在这里打印log查看渲染时TestHook被调用的次数
  
  return (
    <div>
      <span>{counter}<span>
      <button onClick={e => setCounter(counter+1)}>+1</button>
      <ul>
        {
          friends.map((item, index) => <li key={index}>{item}</li>)
        }
      <ul>
      <button onClick={e => setFriends([...friends, "王五"])}>添加朋友</button>
    </div>
  )
}

```



```js
// 复杂操作
import React, {useState} from 'react'

export default funtion TestHook(){
  const [students, setStudents] = useState([
    {name: 张三', age: 18},
    {name: 李四', age: 20},
  ])
  
  function increamentStudentsByIndex(index){
    const newStudents = [...students]
    newStudents[index].age +=1
    setStudents(newStudents)
  }
  
  
  return (
    <div>
      <span>{counter}<span>
      <button onClick={e => setCounter(counter+1)}>+1</button>
      <ul>
        {
          students.map((item, index) => return (
            <li key={index}>姓名：{item.name}  年龄：{item.age}</li>
            <button onClick={e => increamentStudentsByIndex(index)}>年龄+1</button>
            )
          )
        }
      <ul>
      
    </div>
  )
}

```


```js
// 基本使用
import React, {useState} from 'react'

export default funtion TestHook(){
  const [counter, setCounter] = useState(() => 10)
  return (
    <div>
      <span>{counter}<span>
      <button onClick={e => setCounter((preCounter) => preCounter+1)}>+1</button>
    </div>
  )
}
```



```js
// 基本使用
import React, {useState} from 'react'

export default funtion TestHook(){
  const [counter, setCounter] = useState(() => 10)
  
  // 这种方式会合并最终只加一次  结果是20
  function handleClick(){
    setCounter(counter+10)
    setCounter(counter+10)
    setCounter(counter+10)
  }
  
  // 每次获取之前的值，并在其基础上再操作，结果是40
  function handleClickCallBackWay(){
    setCounter((preCounter) => preCounter+10)
    setCounter((preCounter) => preCounter+10)
    setCounter((preCounter) => preCounter+10)
  }
  return (
    <div>
      <span>{counter}<span>
      <button onClick={handleClick}>点击</button>
    </div>
  )
}

```


# 2. useEffect使用

> 用于模拟类组件的生命周期

useEffect：可以定义多个；执行顺序是按照定义书写的顺序。





```js
import React, {useState} from 'react'

export default funtion TestHook(){
  const [counter, setCounter] = useState(0)
  
  // 修改tab显示当前计数
  // useEffect回调触发时机：每次render后执行，相当于类组件的componentDidMount和componentDidUpdate的综合
  useEffect(() => {
    document.title = counter
    //这里可以返回一个函数A，A触发的条件TestHook卸载时，相当于类生命周期的卸载函数componentWillUnmount
  })
  
  return (
    <div>
      <span>当前计数：{counter}<span>
      <button onClick={e => setCounter(counter+1)}>+1</button>
    </div>
  )
}
```


```js
import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('订阅事件');
    return () => {
      console.log('取消订阅事件');
    };
  });

  console.log('1111');
  return (
    <div>
      <h1>EffectHooks</h1>
      <h1>{counter}</h1>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
    </div>
  );
}

```

----

useEffect性能优化

```js
import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [counter, setCounter] = useState(0);

  // useEffect的第二个参数接受一个只读数组，数组中数据表示useEffect的第一个参数回调函数的依赖，只有数组的数据变化时，回调才会执行
  // 修改DOM：依赖的counter，初始化时执行一次，后面是counter变化时才会执行
  useEffect(() => {
    console.log('修改DOM', counter);
  }, [counter]);

  // 传入空数组，说明不依赖任何变化，所以只会执行一次，后面不会再执行
  // 由于网络请求什么的，我们只希望它初始化执行一次
  useEffect(() => {
    console.log('网络请求');
  }, []);

  return (
    <div>
      <h1>EffectHooks</h1>
      <h1>{counter}</h1>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
    </div>
  );
}

```



