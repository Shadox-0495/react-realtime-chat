import React from "react";
import useMemory from "../../features/memory";

export default function ChatMessage(props: any) {
	const { currentUser } = useMemory();
	const { text, userId } = props.message;
	return <p className={`chatMessage ${currentUser.multiFactor.user.uid === userId ? "user" : ""}`}>{text}</p>;
}
