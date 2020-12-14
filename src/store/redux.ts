import {
	createSlice,
	PayloadAction,
	configureStore,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";
import Data from "./Data";
// import logger from "redux-logger";
import { shoeData } from "../types";

const cartItems: any[] | null = [];

const todosSlice = createSlice({
	name: "todos",
	initialState: cartItems,
	reducers: {
		create: (state, { payload }: PayloadAction<{ id: number }>) => {
			const index = state.findIndex(
				(item: any) => item.id === Number(payload.id)
			);
			if (index === -1) {
				let shoeItem = Data.find((x) => x.id === payload.id);
				if (shoeItem) {
					shoeItem.count = 1;
				}
				state.push(shoeItem);
				console.log(payload);
			} else {
				state[index].count++;
			}
		},
		remove: (state, { payload }: PayloadAction<{ id: number }>) => {
			const index = state.findIndex((item: any) => item.id === payload.id);
			if (index !== -1) {
				state[index].count -= 1;
			}
		},
		emptyCart: (state) => {
			while (state.length) {
				state.pop();
			}
		},
		removeObj: (state, { payload }: PayloadAction<{ id: number }>) => {
			const index = state.findIndex((item: any) => item.id === payload.id);
			if (index !== -1) {
				let tCart = [...state];
				tCart.splice(index, 1);
				return tCart;
			}
		},
	},
});

const counterSlice = createSlice({
	name: "counter",
	initialState: 0,
	reducers: {},
	extraReducers: {
		[todosSlice.actions.create.type]: (state) => state + 1,
		[todosSlice.actions.remove.type]: (state) => state - 1,
		[todosSlice.actions.emptyCart.type]: (state) => 0,
	},
});

export const {
	create: CreateToDoActionCreator,
	remove: DeleteToDoActionCreator,
	emptyCart: EmptyCartActionCreator,
	removeObj: RemoveObjectActionCreator,
} = todosSlice.actions;

const reducer = {
	cart: todosSlice.reducer,
	counter: counterSlice.reducer,
};

// const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
	reducer,
});
