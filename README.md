
# use-timers-react

  

`use-timers-react` is a drop-in replacement for traditional JavaScript timing APIs, tailored for React. This library introduces hooks that enhance the implementation of timers, intervals, and timeouts in your React components, ensuring seamless integration and reliability. With automatic cleanup on component unmount, it eliminates the need for manual timing management, making your code cleaner and more efficient.

  

## Uses

  

### Setting timers

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {
	const {setTimeout} =  useTimeout();
	const {setInterval} =  useInterval();

	function  demo(){
		setTimeout(() => {
			console.log('hello react from timeout');
		}, 1000);

		setInterval(() => {
			console.log('hello react from interval');
		}, 1000);
	}

	return  <JSX/>
	}
```

  

### Clearing timers

  

Though automatic timer cleanup on component unmount is handled for you, still if you need to cancel timers conditionally, the following methods are available:

  

#### 1. Using `.clear()` method ***(recommended)***

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {

	const {setTimeout, clearAllTimeouts} =  useTimeout();

	function  demo(){
		const  logTime  = () =>  console.log('hello react: ', Date.now());
		let  myTimer  =  setTimeout(logDate, 100);
		myTimer.clear();
	}

	return  <>
		<JSX/>
		<button  onClick={()=>clearAllTimeouts()}>clear all timeouts</button>
	    </>
	}
```

  

#### 2. Using `clearTimeout` or `clearInterval`

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {
	const {setTimeout, clearTimeout} =  useTimeout();

	function  demo(){
		let  timeout  =  setTimeout(() => {
		console.log('hello react from timeout');
		}, 1000);

		clearTimeout(timeout);
	}

	return  <JSX/>
}
```

  

#### 3. Using `clearAllTimeouts` or `clearAllIntervals`

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {
	const {setTimeout, clearAllTimeouts} =  useTimeout();

	function  set2Timers(){
	const  logTime  = () =>  console.log('hello react: ', Date.now());

	setTimeout(logTime, 1000);
	setTimeout(logTime, 2000);
	}

	return  <>
		<JSX/>
		<button onClick={()=>clearAllTimeouts()}>clear all timeouts</button>
	</>
}
```

  

#### 4. Using `key`

Keys can be specified in two ways:

- as string to the last argument

- object to the last argument

  

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {
	const {setTimeout, clearTimeout} =  useTimeout();

	function  set2Timers(){
		const  logTime  = () =>  console.log('hello react: ', Date.now());

		//passing key as string
		setTimeout(logTime, 2000, 'timer1');
		//passing key using object
		setTimeout(logTime, 2000, {key:  'timer2'});
	}

  

	function  clearTimer(){
		clearTimeout('timer1');
		clearTimeout('timer2');
	}

return  <JSX/>
}
```

  

### Advanced

#### 1. Resetting times: using `.reset`

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

export  default  function  App () {
	const {setTimeout} =  useTimeout();

	function  demo(){
		const  logTime  = () =>  console.log('hello react: ', Date.now());

		let  myTimer  =  setTimeout(logDate, 1000);
		setTimeout(()=>myTimer.reset(), 500)
	}

	return <JSX/>
}
```

  

#### 2. `onClear` and `onReset` callbacks:

```jsx
import {useInterval, useTimeout} from  'use-timers-react'

  

export  default  function  App () {
	const {setTimeout} =  useTimeout();

	function  demo(){
		const  logTime  = () =>  console.log('hello react: ', Date.now());

		let  myTimer  =  setTimeout(logDate, 1000, {
			onClear: () =>  console.log('cleared'),
			onReset: () =>  console.log('reset'),
		});

		setTimeout(()=>myTimer.reset(), 500)
	}

	return <JSX/>
}
```