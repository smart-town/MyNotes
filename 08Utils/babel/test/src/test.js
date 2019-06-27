let a = 12;
let sf = (value)=>{
    console.log("ES6");
    console.log(value);
}
sf(a);
function* gen() {
    yield "cherry";
    yield "love";
    return "ok";
}

let g = gen();
console.log(g.next());