import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from "./components/App";



const counter = ( state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const Counter = ({ 
	value,
	onIncrement,
	onDecrement
}) => (
	<div>
		<h1>{value}</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>

);

const store = createStore(counter);


const MyRender = () => {
	render(
		<Counter value={store.getState()}
			onIncrement={ () => store.dispatch({ type: 'INCREMENT'}) }
			onDecrement={ () => store.dispatch({ type: 'DECREMENT'}) }
  />,
  document.getElementById('container')

);


};
  


store.subscribe(MyRender);
MyRender();



/* ======================================================================== */ 
const addCounter = (list) => {
	//return list.concat([0]);
	return [...list, 0];

};

const removeCounter = (list, index) => {
	return list
		.slice(0, index)
		.concat(list.slice(index + 1));
};

const incrementCounter = (list, index) => {
	return list
		.slice(0, index)
		.concat([list[index] + 1])
		.concat(list.slice(index + 1));
};

const toggleTodo = (todo) => {
	return Object.assign({}, todo, {
		completed: !todo.completed
	});
};

const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore);

	expect(
		addCounter(listBefore)
	).toEqual(listAfter);
};

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreeze(listBefore);

	expect(
		removeCounter(listBefore, 1)
		).toEqual(listAfter)

};

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

	deepFreeze(listBefore);

	expect(
		incrementCounter(listBefore, 1)
	).toEqual(listAfter);
};


const testToggleTodo = () => {
	const todoBefore = {
		id: 0,
		text: 'Learn Redux',
		completed: false
	};
	const todoAfter = {
		id: 0,
		text: 'Learn Redux',
		completed: true
	};

	deepFreeze(todoBefore);

	expect(
		toggleTodo(todoBefore)
		).toEqual(todoAfter);
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false

				}	
			];
		default:
			return state;
	}
};

const testAddTodo = () => {

	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'	
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);
	expect(
		todos(stateBefore, action)
		).toEqual(stateAfter);
};

testAddTodo();
testAddCounter();
testRemoveCounter();
testIncrementCounter();
testToggleTodo();
console.log('All tests passed.');


