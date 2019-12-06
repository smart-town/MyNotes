let mineGlobal = {
    des: "mine global test",
    name: "hhg",
    des2: "cherry",
}

if (window.$fcglobalV) { // 如果全局的global存在则优先使用全局globalV
    mineGlobal = Object.assign({}, mineGlobal, window.$fcglobalV);
}

window.$fcglobalV = mineGlobal;
export default mineGlobal;