export const type = {
    SWITCH_MENU: 'switchMenu'
}

export function switchMenu(menuName){
    return {
        type: type.SWITCH_MENU,
        value: menuName
    }
}