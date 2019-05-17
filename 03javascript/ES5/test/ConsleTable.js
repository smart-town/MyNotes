//用来生成一个便于查看的console.table结果
//默认为 包含描述和值两列
function generateAdd(obj, desc, value) {
    if(!Array.isArray(obj) || !desc || !value) {
        throw new Error("param invalid")
    }
    if((typeof value) === 'object'){
        value=JSON.stringify(value);
    }
    obj.push({
        description: desc,
        value: value
    })
    return obj;
}
module.exports = {
    defaultAdd: generateAdd
}