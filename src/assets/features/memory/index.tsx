import React, { createContext, useContext, useReducer } from "react";
import { fbAuth, fbDb } from "../firebase";
import memoryReducer from "./reducer";

const initialState: any = {};

const MemoryContext = createContext(initialState);

export const MemoryProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(memoryReducer, initialState);
	const values = { fbAuth, fbDb };
	return <MemoryContext.Provider value={values}>{children}</MemoryContext.Provider>;
};

const useMemory = () => useContext(MemoryContext);

export default useMemory;
