# hook使用


```js
// 基本使用
import React, {useState} from 'react'

export default funtion TestHook(){
  const [counter, setCounter] = useState(0)
  const [friends, setFriends] = useState(["张三", "李四"])
  
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


# useEffect使用

> 用于模拟类组件的生命周期


```js
import React, {useState} from 'react'

export default funtion TestHook(){
  const [counter, setCounter] = useState(0)
  
  // 修改tab显示当前计数
  // useEffect回调触发时机：每次render后执行，相当于类组件的componentDidMount和componentDidUpdate的综合
  useEffect(() => {
    document.title = counter
  })
  
  return (
    <div>
      <span>当前计数：{counter}<span>
      <button onClick={e => setCounter(counter+1)}>+1</button>
    </div>
  )
}
```





