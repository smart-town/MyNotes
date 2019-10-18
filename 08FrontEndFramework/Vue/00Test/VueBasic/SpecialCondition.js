const UseRoot = {
    inject: ['getRootInfo'],
    template: `
        <div>
            <input v-model="data">
            <select v-model="which">
                <option v-for="value in testArr" :value="value">{{value}}</option>
            </select>
            <button @click="test">SetRoot</button>
        </div>
    `,
    data: function(){
        return {
            data: "UseRootComponent",
            which: "$root",
            testArr: ['$root', '$parent'],
        }
    },
    methods: {
        test(){
            console.log("测试使用 $root 变量")
            this[this.which].title = this.data;
            this.getRootInfo();
        }
    }
}

const TempContainer = {
    data: function(){
        return {
            title: "TempContainer",
        }
    },
    template: `
        <div>
            title:<strong>{{title}}</strong>
            <br/><slot></slot>
        </div>
    `
}
const components = {
    UseRoot,
    TempContainer,
}