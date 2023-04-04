import React from "react";
import useMemory from "../../features/memory";
import { Avatar } from "@mui/material";

export default function ChatMessage(props: any) {
	const { currentUser } = useMemory();
	const { text, userId, userPhoto } = props.message;
	console.log(userPhoto);
	return (
		<div className={`chatMessage ${currentUser.multiFactor.user.uid === userId ? "user" : ""}`}>
			<Avatar className="chatMessage__img" alt="" src={userPhoto} />
			<span className="chatMessage__text">{text}</span>
		</div>
	);
}
