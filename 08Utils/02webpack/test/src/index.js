// import "./index.css";
// import imgVar from './img/utils1.jpg';
import func from './test/test01.js';
import react from 'react';
let rootEle = document.getElementById("rootEle") ;
if(!rootEle){
    rootEle = document.createElement("div");
    rootEle.id = "rootEle";
    document.body.append(rootEle);
}

function initial(){
    rootEle.append("😊");
    let img = document.createElement("img") ;
    img.setAttribute("src",imgVar);
    img.style.width = img.style.height = "2rem";
    rootEle.append(img);
    rootEle.append(button());
}
function button(content = '🆗') {
    let b = document.createElement("button");
    b.innerText = content;
    b.onclick=func;
    return b;
}
initial();

class One extends react.Component {
    constructor(props){
        super(props);
    }
}