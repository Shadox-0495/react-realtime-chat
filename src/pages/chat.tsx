import React, { useEffect, useState } from "react";
import Login from "../assets/components/login";
import useMemory from "../assets/features/memory";
import { TextField, Button, Avatar } from "@mui/material";
import ChatMessage from "../assets/components/chatMessage";

export default function Chat() {
	const { currentUser, fbDb } = useMemory();
	const [messages, setMessages] = useState([]);
	const user = currentUser.multiFactor.user;
	fbDb.collection("messages")
		.orderBy("createdAt")
		.limit(25)
		.onSnapshot((snapshot: any) => {
			setMessages(snapshot.docs.map((doc: any) => ({ ...doc.data() })));
		});

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
				<div className="chat__body">{messages && messages.map((msg, msgIndex) => <ChatMessage key={`message-${msgIndex}`} message={msg} />)}</div>
				<div className="chat__footer">
					<form>
						<TextField />
						<Button> asd1 </Button>
					</form>
				</div>
			</div>
		</>
	);
}
