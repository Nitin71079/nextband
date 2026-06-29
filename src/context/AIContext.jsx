import {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { routeRequest } from "../agents/router";

const AIContext = createContext();

const initialState = {
  messages: [],
  loading: false,
  streaming: false,
  currentIntent: null,
  error: null,
};

function aiReducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_STREAMING":
      return {
        ...state,
        streaming: action.payload,
      };

    case "SET_INTENT":
      return {
        ...state,
        currentIntent: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
}

export function AIProvider({ children }) {
  const [state, dispatch] = useReducer(
    aiReducer,
    initialState
  );

  const sendMessage = useCallback(
    async ({ message, payload = {} }) => {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      dispatch({
        type: "SET_ERROR",
        payload: null,
      });

      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          role: "user",
          content: message,
          createdAt: Date.now(),
        },
      });

      try {
        const response = await routeRequest({
          message,
          payload,
        });

        dispatch({
          type: "SET_INTENT",
          payload: response.intent,
        });

        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            role: "assistant",
            content: response.result,
            createdAt: Date.now(),
          },
        });

        return response;
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message,
        });

        throw error;
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    },
    []
  );

  const clearChat = () => {
    dispatch({
      type: "CLEAR_CHAT",
    });
  };

  return (
    <AIContext.Provider
      value={{
        ...state,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAIContext must be used inside AIProvider"
    );
  }

  return context;
}