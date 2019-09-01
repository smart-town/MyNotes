export const actions = {
    TITLE: "TITLE",
    RENAME: "RENAME",
}

export function setHeader(title){
    return {type:actions.RENAME, title: title}
}
export function setTitle(title){
    return {type:actions.TITLE, title: title}
}