import { useState } from "react";
import useMemory from "./assets/features/memory";
import Login from "./assets/components/login";
import Chat from "./pages/chat";
import { ToastContainer } from "react-toastify";

function App() {
	const { currentUser } = useMemory();
	return (
		<>
			<ToastContainer limit={3} />
			{!currentUser ? <Login /> : <Chat />}
		</>
	);
}

export default App;
