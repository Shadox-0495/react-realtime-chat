import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import { fbAuth, fbDb, fbLoginProviders } from "../firebase";
import { toast } from "react-toastify";
import memoryReducer from "./reducer";

const initialState: any = {};

const MemoryContext = createContext(initialState);

export const MemoryProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(memoryReducer, initialState);
	const [currentUser, setCurrentUser] = useState();
	const [appLoading, setAppLoading] = useState(true);

	function signInWithProvider(provider: any) {
		return fbAuth.signInWithPopup(provider);
	}

	useEffect(() => {
		const unsubscribe = fbAuth.onAuthStateChanged((user: any) => {
			setCurrentUser(user);
			setAppLoading(false);
		});
		return unsubscribe;
	}, []);

	const values = { appLoading, currentUser, fbAuth, fbDb, fbLoginProviders, signInWithProvider, toast };
	return <MemoryContext.Provider value={values}>{!appLoading && children}</MemoryContext.Provider>;
};

const useMemory = () => useContext(MemoryContext);

export default useMemory;
