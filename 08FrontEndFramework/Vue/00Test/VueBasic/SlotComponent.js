const SlotComponent1 = {
    template: `
        <div>
            <header>SlotCom1</header>
            <slot></slot>
        </div>
    `
}

const SlotComponent2 = {
    props: ['name'],
    template: `
        <div>
        Test Slot Scope.It can use the same vm attributes, <strong>can not</strong> use sub component attributes.
        <br/>slot:<slot></slot>
        </div>
    `
}

const SlotComponent3 = {
    template: `
        <div><slot>This is Component3, If you see this words, it indicates you don't use a slot~, This component use default slot value</slot></div>
    `
}

const SlotComponent4 = {
    template:`
    <div>
        <header><slot name="header">This is Header</slot></header>
        <article><slot>Main Content</slot></article>
        <footer><slot name="footer">@smalltown</slot></footer>
    </div>
    `
}

const SlotComponent5 = {
    data: function(){
        return {
            random: Math.round(Math.random()*100),
        }
    },
    template: `
    <div>
        <slot v-bind:random="random">{{random}}</slot>
    </div>
    `
}
const BasicComponent = {
    props: ['name'],
    template: `
        <div><strong>{{name}}</strong><slot></slot></div>
    `
}

const components = {
    SlotComponent1,
    SlotComponent2,
    SlotComponent3,
    SlotComponent4,
    SlotComponent5,
    BasicComponent,
}