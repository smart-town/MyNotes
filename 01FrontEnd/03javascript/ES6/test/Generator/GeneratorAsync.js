const fetch = require("cross-fetch");
const {error,log,warn} = require("../util/Logger");
let url1="http://localhost:3000/profile1";
let url2="http://localhost:3000/posts/1";

//fetch(url1).then(val=>{return val.json()}).then(console.log).catch(console.error);

let gen = function*(){
    try {
        let profile = yield fetch(url1);
        profile = yield profile.json();
        log(profile);
        let info = yield fetch(url2);
        info = yield info.json();
        log(info);
    }catch(e){
        error("error...",e);
    }
    
}
let perform = function (Generator,value){
    let temp = Generator.next(value);
    if(temp.done){return;} 
    temp.value.then(
        val => {perform(Generator,val);}
    ).catch(
        err => {perform(Generator,err);}
    )
}
perform(gen());