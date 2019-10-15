let eventComponent1 = {
    data: function () {
        return {
            name: this.lover,
        }
    },
    model: {
        prop: 'lover',
        event: 'my-say',
    },
    props: ['lover'],
    methods: {
        test() {
            this.$emit("my-say", this.name)
        }
    },
    template: `
        <div>
            <header style="font-size:1.5rem;">{{'component1'}}</header>
            <input v-model:value="name"><button @click="test">SAY!</button>NAME:{{name}}
            <br/>This component test about v-model on Self-Component!! & model options.
        </div>
    `
}

let eventComponent2 = {
    inheritAttrs: false,
    props: ['value','title'],
    template: `<div>
            <header style="font-size:1.5rem;">Component2</header>
            <label>{{title}}</label><input v-bind="$attrs" v-bind:value="value" v-on="allListeners"/>VALUE:{{value}}
            <br/>Test .sync:<input v-model="title">
        </div>`,
    computed: {
        allListeners(){
            let vm = this;
            console.log("allListeners", vm.$listeners);
            return Object.assign({},vm.$listeners,{
                input: function(event){
                    vm.$emit("input", event.target.value);
                }
            })
        }
    }
}

let test = {
    template: `<div>@@@JUST A TEST@@@</div>`
}
var components = {
    eventComponent1,
    eventComponent2,
    test,
}
// export default components;