import { type } from "../actions/index";

let defaultState = {
    menuName: '首页'
}

export default (state=defaultState, action)=>{
    if (action.type == type.SWITCH_MENU){
        return {
            ...state,
            menuName: action.value
        }
    }
    return state;
}