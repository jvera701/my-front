import {
    LOGIN, 
    AUTHENTICATED,
    ERROR,
    FINISHED
  } from "./actions";
  
  const reducer = (state : any, action : any) => {
    switch (action.type) {
      case LOGIN:
        const { name, role } =
          action.payload;
        return {
          ...state,
          user: { name, role },
          status: AUTHENTICATED,
        };
      case ERROR:
          return {
            ...state,
            error: action.payload,
            errStatus: FINISHED,
          };
    
      default:
        return state;
    }
  };
  
  export default reducer;
  