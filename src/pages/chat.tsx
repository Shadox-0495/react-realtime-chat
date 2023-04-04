import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/compat/app";
import Login from "../assets/components/login";
import useMemory from "../assets/features/memory";
import { TextField, Button, Avatar } from "@mui/material";
import { Send } from "@mui/icons-material";
import ChatMessage from "../assets/components/chatMessage";

export default function Chat() {
	const { currentUser, fbDb, toast } = useMemory();
	const [messages, setMessages] = useState([]);
	const txtMessageRef = useRef<HTMLInputElement | null>();
	const user = currentUser.multiFactor.user;

	async function postNewMessage(Event: React.FormEvent) {
		Event.preventDefault();
		if (txtMessageRef.current!.value == "") return;
		const { uid, photoURL } = user;
		try {
			await fbDb.collection("messages").add({
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				text: txtMessageRef.current!.value,
				userId: uid,
				userPhoto: photoURL,
			});
			txtMessageRef.current!.value = "";
			document.querySelectorAll(".chat__body-last")[0].scrollIntoView({ behavior: "smooth" });
		} catch (err) {
			console.log(err);
			toast.error(`Caught error while trying to post new message: ${err}`, { position: "bottom-right" });
		}
	}

	useEffect(() => {
		fbDb.collection("messages")
			.orderBy("createdAt")
			.limit(25)
			.onSnapshot((snapshot: any) => {
				setMessages(snapshot.docs.map((doc: any) => ({ ...doc.data() })));
			});
	}, []);

	return (
		<>
			<div className="chat" data-page="chat">
				<div className="chat__header">
					<span>
						Welcome to the chat room: <span>{user.displayName}</span>
					</span>
					<span>
						<Login />
					</span>
				</div>
				<div className="chat__body">
					{messages && messages.map((msg, msgIndex) => <ChatMessage key={`message-${msgIndex}`} message={msg} />)}
					<div className="chat__body-last"></div>
				</div>
				<div className="chat__footer">
					<form className="messageForm" onSubmit={postNewMessage}>
						<TextField inputRef={txtMessageRef} />
						<Button type="submit">
							<Send />
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
