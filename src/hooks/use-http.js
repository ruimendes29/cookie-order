import { useReducer, useCallback } from "react";

const LOADING = "LOADING";
const ERROR = "ERROR";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return { error: state.error, isLoading: !state.isLoading };
    }
    case ERROR: {
      return { error: action.error, isLoading: false };
    }
    default: {
      return state;
    }
  }
};

const useHttp = () => {
  const [reqInfo, dispatch] = useReducer(reducer, {
    error: null,
    isLoading: false,
  });

  const sendHttpRequest = useCallback(async (requestConfig) => {
    dispatch({ type: LOADING });
    try {
      await new Promise(r => setTimeout(r, 2000));
      const rawResponse = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!rawResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const content = await rawResponse.json();
      dispatch({ type: LOADING });
      return content;
    } catch (error) {
      dispatch({ type: ERROR, error });
    }
  }, []);

  return [reqInfo, sendHttpRequest];
};

export default useHttp;
