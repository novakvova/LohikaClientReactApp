import { FleshMessagesActionsTypes, IMessage, FleshMessagesAction } from './types';
import { Dispatch } from "react";



export const addFlashMessage =
  (message: IMessage):any => async (dispatch: Dispatch<FleshMessagesAction>) => {
   dispatch({
      type: FleshMessagesActionsTypes.ADD_FLASH_MESSAGE,
      payload: message,
    });
  };

export const deleteFlashMessage =
  () => (dispatch: Dispatch<FleshMessagesAction>) => {
    dispatch({
      type: FleshMessagesActionsTypes.DELETE_FLASH_MESSAGE,
    });
  };
