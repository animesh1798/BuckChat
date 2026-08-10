import { type Request } from "express";

export interface NewUser {
    name?: string,
    email: string,
}

export interface Message {
    senderId: string,
    receiverId: string,
    data: string,
    time: string
}