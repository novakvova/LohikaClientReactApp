import { FleshMessagesActionsTypes, FleshMessagesAction, IFleshMessageState } from "./types";

const initState: IFleshMessageState = {
  messages: [],
};

export const fleshMessagesReducer = (state = initState, action: FleshMessagesAction) => {
  switch (action.type) {

    case FleshMessagesActionsTypes.ADD_FLASH_MESSAGE:

      return { messages: [...state.messages, action.payload] };

    case FleshMessagesActionsTypes.DELETE_FLASH_MESSAGE:
      // const index = state.messages.findIndex(({id}) => id === action.payload );
      // if (index >= 0) {
      //   return { messages:[...state.messages.slice(0, index), ...state.messages.slice(index + 1)]};
      // }
      return {...state, messages:[]};

    default:
      return state;
  }
};
