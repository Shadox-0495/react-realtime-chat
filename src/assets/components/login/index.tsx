import React from "react";
import useMemory from "../../features/memory";
import { Button, Card, CardContent } from "@mui/material";

export default function Login() {
	const { currentUser, fbLogout, fbLoginProviders, signInWithProvider, toast } = useMemory();

	async function logIntoApp(provider: any) {
		try {
			await signInWithProvider(provider);
			toast.success("🎉Succeful logged in using google account.🎉", { position: "bottom-right", autoClose: 1000 });
		} catch (err) {
			toast.error(`Caught error while trying to logout: ${err}`, { position: "bottom-right" });
		}
	}

	async function logOutOffApp() {
		try {
			await fbLogout();
			toast.success("🎉Succeful logged out of the app.🎉", { position: "bottom-right", autoClose: 1000 });
		} catch (err) {
			toast.error(`Caught error while trying to logout: ${err}`, { position: "bottom-right" });
		}
	}

	return (
		<>
			<Card className="login">
				<CardContent>
					{currentUser ? (
						fbLoginProviders.map((item: any, providerIndex: number) => {
							const { text, icon, provider } = item;
							return (
								<Button key={`login__providerButton-${providerIndex}-${text}`} className="login__providerButton" startIcon={icon} onClick={() => logIntoApp(provider)}>
									Login using {text} account
								</Button>
							);
						})
					) : (
						<Button className="login__providerButton" onClick={logOutOffApp}>
							Logout
						</Button>
					)}
				</CardContent>
			</Card>
		</>
	);
}
