export type shoeData = {
	id: number;
	img: any;
	name: string;
	price: number;
	cols: number;
	description: string;
	count?: number = 0;
};

export interface cartItemsType {
	cartCount: number;
	item: shoeData;
}

export interface State {
	cart: shoeData[];
	counter: number;
}
