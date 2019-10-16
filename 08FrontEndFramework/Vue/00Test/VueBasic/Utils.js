const register = function(componentsOptions) {
    if(!Vue) {
        throw new Error("Current Environment Does not have Vue!")
    }
    Object.keys(componentsOptions).forEach((componentName) => {
        Vue.component(componentName, componentsOptions[componentName])
    } )
}
const utils = {
    register,
}