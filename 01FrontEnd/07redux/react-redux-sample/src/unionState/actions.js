export const actions = {
    TITLE: "TITLE",
    RENAME: "RENAME",
    GETDATA: "GETDATA",

}

export function setHeader(title){
    return {type:actions.RENAME, title: title}
}
export function setTitle(title){
    return {type:actions.TITLE, title: title}
}
export function getData(param){
    return {
        type: actions.GETDATA,
        param: param,
    }
}
