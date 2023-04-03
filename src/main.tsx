import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/sass/index.scss";
import { MemoryProvider } from "./assets/features/memory";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MemoryProvider>
			<App />
		</MemoryProvider>
	</React.StrictMode>
);
