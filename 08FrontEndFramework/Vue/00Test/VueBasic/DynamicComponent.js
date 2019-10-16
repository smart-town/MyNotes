
const MyHeader = {
    template: `<header>Header</header>`
}
const MyFooter = {
    template: `<div>Footer</div>`
}
const MyMain = {
    template: `<div>Main</div>`
}
const MyContent = {
    template: `<div>{{content}}<br/><input ref="myInput"><button @click="test">set</button></div>`,
    data: function(){
        return {
            content: 'cherry',
        }
    },
    methods: {
        test(){
            this.content = this.$refs.myInput.value;
        }
    }
}

const components = {
    MyHeader,
    MyFooter,
    MyMain,
    MyContent,
}