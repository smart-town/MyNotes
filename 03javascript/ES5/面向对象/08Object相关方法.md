# Object 对象的相关方法

js 在`Object`对象上，提供了很多相关方法，处理面向对象编程的相关操作。

## Object.getPrototypeOf

## Object.setPrototypeOf

## Object.create

接受一个对象为参数，以其为原型，返回一个实例对象。该实例完全继承原型对象的属性。相当于：
```js
if(typeof Object.create !== 'function'){
    Object.create = function(obj){
        function F(){}
        F.prototype = obj;
        return new F();
    }
}
```

除了对象原型，`Object.create`方法还可以接受第二个参数，这个参数是一个属性描述对象。它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

## Object.prototype.isPrototypeOf

## Object.prototype.__proto__
`__proto__`只有浏览器才需要部署。