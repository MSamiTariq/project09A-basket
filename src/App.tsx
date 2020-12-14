import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainGrid from "./components/Grid";
import Header from "./components/Header";
import Items from "./components/Items";
import { NotFound } from "./components/NotFound";
import { Cart } from "./components/Cart";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<SnackbarProvider>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<MainGrid />} />
					<Route path="items" element={<Items />} />
					<Route path="cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</SnackbarProvider>
	);
}

export default App;
