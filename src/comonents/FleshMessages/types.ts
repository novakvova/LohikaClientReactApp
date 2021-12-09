export enum FleshMessagesActionsTypes {
	ADD_FLASH_MESSAGE = "ADD_FLASH_MESSAGE",
	DELETE_FLASH_MESSAGE = "DELETE_FLASH_MESSAGE"
}

export interface AddFleshMessage {
	type: FleshMessagesActionsTypes.ADD_FLASH_MESSAGE
	payload: IMessage
}
export interface DeleteFleshMessage {
  type: FleshMessagesActionsTypes.DELETE_FLASH_MESSAGE;
}

export interface IMessage {
  type: "success" | "error" | "";
  message: string;
}

export interface IFleshMessageState {
	messages: IMessage[]
}

export type FleshMessagesAction = AddFleshMessage | DeleteFleshMessage;