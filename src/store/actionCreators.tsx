import axios from "../axios";
import {
    AUTHORIZATION,
    LOGIN, 
  } from "./actions";
import history from "../history";
import { Dispatch } from "react";

export function loginAxios (username: String, password: String, setInvalidLogin: React.Dispatch<React.SetStateAction<boolean>>){
    return async function (dispatch : Dispatch<any>){
        try{
            const response : any = await axios({
                url: axios.defaults.baseURL +  "/login",
                method: "post",
                data: {
                    email: username,
                    password: password,
                    },
                }) 
            localStorage.setItem(AUTHORIZATION, response.data.token);
            axios.defaults.headers.common["Authorization"] = response.data.token;
            dispatch({ type: LOGIN, payload: response.data });
            history.push("/home");
        }
        catch (e){
            setInvalidLogin(true)
        }
    }
}