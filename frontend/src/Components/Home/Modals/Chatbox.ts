export interface activeChatDetails {
  chatTitle: string;
  room: string;
}

export interface messages {
  username: string;
  message: string;
}

export interface socketIoMessage {
    username: string;
    room: string;
    message: string;
}



export type messagesArray = Array<messages>;