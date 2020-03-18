export const logMiddleware = store => next => action => {
    console.group(action.type)
    console.info('dispatching...', action)
    let result = next(action)
    console.log('next state...', store.getState())
    console.groupEnd(action.type)
    return result;
}
export const timeoutScheduler = store => next => action => {
    console.log("fake timeoutScheduler...");
    return next(action);
}