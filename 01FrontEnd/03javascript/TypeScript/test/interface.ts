interface user {
    name:string,
    age: number,
}
function printUser(user:user){
    console.log(user);
}
printUser({name:'hhg','age':20});