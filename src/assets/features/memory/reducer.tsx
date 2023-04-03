import React from "react";

const memoryReducer = (state: any, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case "ADD_PRODUCT":
			return { ...state, cart: payload.cart };
		case "REMOVE_PRODUCT":
			return { ...state, cart: payload.cart };
		case "CLEAR_CART":
			return { ...state, cart: payload.cart };
		case "SHOW_LOGIN":
			return { ...state, showLoginDropdown: payload.show };
		default:
			throw new Error(`No case for type: ${type} in reducer`);
	}
};

export default memoryReducer;
