import { UserReducerType, UserReducerTypeII } from "../Interfaces";

export const userReducer = (state: UserReducerType, action: {type: string, payload: any}) => {
  const {type, payload} = action
  switch (type) {
    case "NULL":
      console.log("case NULL");
      const nullObject = { 
          userEmail: "",
          userId: "",
          accessToken: "",
          isLoggedin: false,
          userStatus: "member",
          loginType: ""
      }
      return nullObject;
    case "SET_VALUES":
      return payload;
    case "SET_VALUES_II":
      const valueII = {
          userEmail: state.userEmail,
          userId: state.userId,
          accessToken: payload.accessToken,
          isLoggedin: state.isLoggedin,
          userStatus: payload.userStatus,
          loginType: payload.loginType,
      }
      return valueII;
    case "SET_VALUES_III":
      const valueIII = {
          userEmail: payload.userEmail,
          userId: payload.userId,
          accessToken: state.accessToken,
          isLoggedin: payload.isLoggedin,
          userStatus: state.userStatus,
          loginType: state.loginType,
      }
      return valueIII;
    case "SET_VALUES_IV":
      const valueIV = {
          ...state, loginType: payload.loginType,
      }
      return valueIV;
    default:
      return state
  }
}
export const userReducerII = (state: UserReducerTypeII
, action: {type: string, payload: any}) => {
      const {type, payload} = action
      switch(type) {
        case "SET_VALUES":
          const values = {
            passwordLogin: payload.passwordLogin, 
            googleLogin: payload.googleLogin, 
            createdAt: payload.createdAt
          }
          return values
        default: 
          return state
      }
}