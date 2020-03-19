# 保持松散耦合

耦合度表示类与类之间或者子程序与子程序之间关系的紧密程度。耦合度设计的目标是创建出小的、直接的、清晰的类或者子程序，使得它们与其他类或者子程序之间的关系尽可能灵活，这就被称作**松散耦合**。松散耦合这一概念同时适用于类和子程序，所以在下面的讨论中使用“模块”来同时指代类和子程序。

模块之间的好的耦合关系会松散到恰好能够使得一个模块很容易被其他模块使用。火车模型之间通过环钩彼此相连，将两辆列车连起来非常容易——只用把他们勾起来就可以了。设想如果你必须将它们用螺丝拧起来，或者要连接很多的线缆，那么连接工作将会非常复杂。火车模型之间之所以能够相连，就是因为这种连接尽可能的简单。在软件中，也请确保模块之间的连接关系尽可能的简单。

请尽量使你创建的模块不依赖或者很少依赖其他模块，让模块之间的关系像商业合作者一样彼此分离，而不是像连体婴儿那样紧密相连。像`sin()`这样的子程序是松散耦合的，因为它需要知道的东西也就是一个传入的、代表角度的数值。而诸如`InitVar(var1, var2, ..., varN)`这样的子程序则耦合得过于紧密了，因为对于调用端必须传入的各个参数，调用它的模块实际上知道在`InitVars()`的内部会做些什么。如果两个类都依赖于对方对同一个全局变量的使用情况，那么它们之间的耦合关系就更为密切了

## 耦合标准 Coupling Criteria

以下是一些衡量模块之间耦合度时可采用的标准

### 规模

这里的规模指的是模块之间的连接数。对于耦合度来说，小就是美，因为只要做很少的事情，就可以把其他模块与一个有着很小的接口的模块连接起来。只有一个参数的子程序与调用它的子程序之间的耦合关系比有六个参数的子程序与它的调用方之间的耦合关系更为松散。

### 可见性

可见性指的是两个模块之间的连接的显著程度。开发程序与在中央情报局里面工作不一样，你不能通过鬼鬼祟祟获得信任。而是应该像登广告一样，通过将模块之间的连接关系变得广为人知而获取信任。通过参数表传递数据就是一种明显的连接，因而值得提倡。通过修改全局数据而使得另一个模块能够使用该数据则是一种“鬼鬼祟祟”的做法，因此是很不好的设计。如果将全局数据之间的连接写入了文档，那么就会使得这些连接相对明显一些，因而会比上面的做法好一些。

### 灵活性

灵活性指的是模块之间的连接是否容易改动。理想状况下，你会更喜欢计算机上的热插拔 USB 连接器，而不喜欢用电烙铁焊接导线的连接方式。在一定程度上，灵活性是其他几个耦合特性综合作用的结果，但是也的确有所不同。

## 耦合种类 Kinds of Coupling

- **简单数据参数耦合**`simple-data-parameter coupling` 两个模块之间通过参数来传递数据，并且所有的数据都是简单数据类型时，这两个模块之间的耦合关系就是简单数据参数耦合的，这种耦合关系是正常的，可以接受的
- **简单对象耦合**`simple-object coupling` 如果一个模块实例化一个对象，那么它们之间的耦合关系就是简单对象耦合的。这种耦合也不错
- **对象参数耦合**`object-parameter coupling` 如果 `Object1` 要求 `Object2`传给它一个`Object3`，那么这两个模块就是对象参数耦合的。与`Object1`仅要求`Object2`传递给它简单数据类型相比，这种耦合关系要更紧密一些，因为它要求`Object2`了解`Object3`。
- **语义上的耦合** 最难缠的耦合关系是这样发生的：一个模块不仅使用了另一模块的语法元素，而且还使用了有关那个模块内部工作细节的语义知识。 语义上的耦合是非常危险的，因为更改被调用的模块中的代码可能会破坏调用它的模块，破坏的方式是编译器完全无法检查的。类似这样的代码崩溃时，其方式是非常微妙的，看起来与被使用的模块中的代码更改毫无关系，因此会使得调试工作变得无比困难。   
    **松散耦合的关键之处在于，一个有效的模块提供出了一层附加的抽象**——一旦你写好了它，你就可以想当然地去使用它。这样就降低了整体系统的复杂度，使得你可以在同一时间只关注一件事。如果对一个模块的使用要求你同时关注好几件事——其内部工作的细节、对全局数据的修改、不确定的功能点等——那么就失去了抽象的能力，模块所具有的管理复杂度的能力也削弱或完全丧失了

    **类和子程序适用于降低复杂度的首选和最重要的智力工具。如果它们没帮助你简化工作，那么它们就是失职的。**