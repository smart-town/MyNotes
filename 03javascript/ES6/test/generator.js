console.log("/////Test GENERATOR\\\\\\\\\\");
function* myGene(){
    yield 2;
    yield 5;
    yield 8;
}
let gene = myGene() ;
for(let x of gene){
    console.log(x);
}