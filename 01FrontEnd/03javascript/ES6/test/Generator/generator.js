console.log("/////Test GENERATOR\\\\\\\\\\");
function* myGene(){
    try {
        yield 2;
        yield 5;
        yield 8;
    } catch(e){
        console.log(`INNER ERROR:${e}`);
    }
    yield 9;
    yield 10;
    yield 11;
}
let gene = myGene() ;
console.log(gene.next());
console.log(gene.throw("nothing"));
console.log(gene.next());
for(let x of gene){
    console.log(x);
}

console.log("测试 generator 传参\n") ;
function* gen2(){
    let a = yield 1;
    console.log("第一次"+a);
    let b = yield 2;
    console.log("第二次"+b);
}
let g2 = gen2() ;
let g21 = g2.next();
let g22 = g2.next("Cherry") ;
let g23 = g2.next("OkkJune");
console.log(g21,g22,g23);