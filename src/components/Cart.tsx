import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { EmptyCart } from "./EmptyCart";
import { GridTableData } from "./GridTableData";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types";
import {
	CreateToDoActionCreator,
	DeleteToDoActionCreator,
	EmptyCartActionCreator,
} from "../store/redux";

const useStyless = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export const Cart = () => {
	const classes = useStyles();
	const classs = useStyless();
	const dispatch = useDispatch();
	const cart = useSelector((state: State) => state.cart);
	const cartCount = useSelector((state: State) => state.counter);
	const total = cart
		.reduce((total, current) => total + current.price * current.count!, 0)
		.toFixed(2);
	const { enqueueSnackbar } = useSnackbar();

	const removeItemsfomCart = () => {
		enqueueSnackbar("Cart Checkout Success", {
			variant: "success",
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right",
			},
		});
		dispatch(EmptyCartActionCreator());
	};
	// function fun(item){
	//     if(item.count === 0){
	//         removeItems(item);
	//     }
	// }
	// cartItems.forEach(fun);
	// useEffect(cartItems.forEach(fun), [cartCount])
	// console.log(cartItems)
	return (
		<div className={classes.root}>
			{cartCount === 0 ? (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<EmptyCart />
						</Paper>
					</Grid>
				</Grid>
			) : (
				<div>
					<GridTableData gridTableData={cart} />

					<div className={classs.root}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								removeItemsfomCart();
								console.log("called");
							}}
						>
							Buy ($ {total})
						</Button>
						<Link to="/items" style={{ textDecoration: "none" }}>
							<Button variant="contained" color="secondary">
								Cancel
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
