# 有关设计和实现的问题

给类定义一个合理的接口，对于创建高质量程序起到了关键的作用。然而，类内部的设计和实现也同样重要。这里讨论关于包含、继承、成员函数和数据成员、类之间的耦合性、构造函数、值对象与引用对象等问题

##  1. Containment("has a" Relationships)

包含（“有一个”的关系）

包含是一个非常简单的概念，它表示一个类含有一个基本数据元素或者对象。与包含相比，关于继承的论述要多得多，这是因为继承需要更多的技巧，而且更容易出错，而不是因为继承要比包含更好。**包含才是面向对象编程中的主力技术**

**通过包含实现“有一个”的关系** 可以将包含想象为“有一个”关系，如一名雇员“有一个”姓名、“有一个”电话号码等。

**在万不得已时通过 private 继承来实现“有一个”关系** 在某些情况下，你会发现根本无法把一个对象当做另一个对象的成员来实现包含关系。一些专家建议此时可以采用`private`继承自所要包含的对象的办法。这么做的主要原因是要让外层的包含类能够访问内层被包含类的`protected`成员函数和数据成员。然而在实践中，这种做法会在派生类和基类之间形成一种过于紧密的关系，从而破坏了封装性。

**警惕有超过约 7 个数据成员的类** 研究表明，人们在做其他事情时能够记住的离散项目的个数是 7±2，如果一个类包含超过约 7 个数据成员，请考虑要不要将它们分解为几个更小的类。如果数据成员都是整型或者字符串这种简单数据类型，可以按照 7±2 上限考虑；反之，如果数据成员都是复杂对象的话，就应该以下限来考虑了。

## 2. Inheritance("is a" Relationships)

继承（“是一个”的关系）

继承的概念是说一个类是另一个类的特化。继承的目的在于，通过“定义能为两个或者更多派生类提供共有元素的基类”的方式写出更精简的代码。其中的共有元素可以是子程序接口、内部实现、数据成员或者数据类型等。继承能够把这些共有的元素集中在一个基类中，从而有助于避免在多处出现重复的代码和数据。

当决定要使用继承时，你必须要做出如下几项决策：
- 对于每一个成员函数而言，他应该对派生类可见吗？它应该有默认的实现吗？这一默认的实现能够被覆盖吗？
- 对于每一个数据成员而言（变量、具名常量等），他应该对派生类可见吗？

**用 public 继承来实现 “是一个......”的关系** 当程序员决定通过继承一个现有类的方式创建一个新类时，他是在表明这个新的类是现有类的一个更为特殊的版本。基类既对派生类将会做什么设定了预期，也对派生类能够怎么运作提出了限制。  如果派生类不准备完全遵循由基类定义的同一接口契约，继承就不是正确的实现技术了。请考虑用包含的方式，或者对继承体系的上层进行修改。

**要么使用继承并进行详细说明，要么就不要用它** 继承给程序增加了复杂度，因此它是一种危险的技术。“要么使用继承进行详细说明，要么要不用它”，如果一个类并未设计为可被继承，那么就应该把它的成员定义为`non-virtual(C++)`、`final(Java)`，这样你就无法继承它了。

**遵循 Liskov 替换原则** 除非派生类真的是一个更特殊的基类，否则不应该从基类继承。*派生类必须能够通过基类的接口而被使用，且使用者无需了解两者之间的差异。* 换句话说，对于基类中定义的所有子程序，用在它的任何一个派生类中时的含义都应该是相同的。  
如果你有一个 `Account` 基类以及`CheckingAccount`、`SavingsAccount`、`AutoLoanAccount` 三个派生类，那么程序员应该能够调用这三个派生类中从`Account`继承而来的任何一个子程序，而无须关心到底用的是哪个派生类对象。  
如果能够遵循`Liskov`替换原则，继承就能够成为降低复杂度的一个强大工具，因为它能让程序员关注于对象的一般特性而不必担心细节。如果程序员要不断地思考派生类的实现在语义上的差异，继承就只会增加复杂度了。假如说程序员必须要记得：如果我调用的是`CheckingAccount`或`SavingAcount`中的`InterestRate()`方法的话，它返回的是银行应该付给消费者的利息；但是如果调用的是`AutoLoanAccount`中的`InterestRate()`方法的话，它返回的是银行应付给消费者的利息；但是如果我调用的是`AutoLoanAccount`中的`InterestReate()`方法就必须记得变号，因为它返回的是消费者要向银行支付的利息。根据 LSP ，这个例子中`AutoLoanAccount`就不应该从`Account`继承而来，因为它的`InterestRate()`方法的语义同基类中`InterestRate()`方法的语义是不同的。

**确保只继承需要继承的部分** 派生类可以继承成员函数的接口或实现  
  &nbsp; | 可覆盖的 | 不可覆盖的  
----- | ---- | -----
提供默认实现 | 可覆盖的子程序 | 不可覆盖的子程序
未提供默认实现 | 抽象且可覆盖的子程序 | 不会用到（一个未经定义但是又不让覆盖的子程序是没有意义的）

如上表，继承而来的子程序有三种基本情况：
- 抽象且可覆盖的子程序是指派生类只继承了该子程序接口，但是不继承其实现
- 可覆盖的子程序是指派生类继承了该子程序的接口及其默认实现，并且可以覆盖该默认实现
- 不可覆盖的子程序是指派生类继承了该子程序的接口及其默认实现，但是不能覆盖该默认实现

当你选择通过继承的方式来实现一个新的类的时候，请针对每一个子程序仔细考虑你所希望的继承方式。仅仅是因为要继承接口所以才继承实现，或者仅仅是因为要继承实现才继承接口，这两类情况都值得注意。如果你只是想使用一个类的实现而不是接口，那么就应该采用包含方式而不应该使用继承。

**不要覆盖一个不可覆盖的成员函数** C++ 和 Java 语言都允许程序员“覆盖”那些不可覆盖的成员函数。如果一个成员函数在基类中是私用的，其派生类可以创建一个同名的成员函数。对于阅读派生类代码的程序员来说，这个函数名是令人困惑的，因为它看上去似乎应该是多态的，但事实上却非如此，只是同名而已。换种方法来说，建议就是“派生类中的成员函数不要与基类中不可覆盖的成员函数重名”

**将共用的接口、数据、操作放到继承树中尽可能高的位置** 接口、数据和操作在继承体系中位置越高，派生类使用它们的时候就更容易。多高就算太高了呢？根据抽象性来决定吧。如果你发现将一个子程序移到更高的层次后会破坏该层对象的抽象性，就该停手了。

**只有一个实例的类是值得怀疑的** 只需要一个实例，这可能表明设计中把对象和类混为一谈了。考虑一下能否只创建一个新的对象而不是一个新的类。派生类中的差异能够用数据而不是新的类来表达呢？单件模式则是一个特例。

**只有一个派生类的基类也值得怀疑** 为未来要做的工作着手进行准备的最好方法，并不是去创建几层额外的、“没准以后哪天就能用的上的”基类，而是让眼下的工作尽可能清晰、简单、直截了当。也就是说，不要创建任何并非绝对必要的继承方针。

**派生后覆盖了某个子程序，但是其中并没有任何操作，这也值得怀疑** 这通常表明基类的设计中有错误。举例来说，假设有一个 Cat 类，他有一个`Scratch()`成员函数，可是最终你发现了有些猫的爪子没了，不能抓了，你可能想从`Cat`类派生一个叫`ScratchlessCat`类，然后覆盖`Scratch()`方法让它什么也不做。但是这种做法有几种问题：
- 它修改了`Cat`类接口所表达的语义，因此破坏了`Cat`类所代表的的抽象（接口契约）
- 当你从他进一步派生出其他类时，采用这一做法会迅速失控。如果又有一只猫没有尾巴怎么办？或者不捉老鼠？最终你会派生出一堆类似`ScratchlessTaillessCat`这样的派生类来
- 采用这种做法一段时间之后，代码会逐渐变得混乱而难以维护，因为基类的接口和行为几乎无法让人理解其派生类的行为

修正这一问题的位置不是在派生类，而是在最初的`Cat`类中，应该创建一个`Claw`类并让`Cat`类包含它。问题的根源在于做了所有猫都能抓的假设，因此应该从源头上解决问题，而不是到发现问题的地方进行修补。

**避免让继承体系过深** 面向对象的编程方法提供了大量可以用来管理复杂度的技术，然而每种强大的工具都有其危险之处，甚至有些面向对象技术还有增加——而不是降低——复杂度的趋势。  
建议将继承层次限制在最多 6 层之内，不过依据经验，大多数人能够同时应付超过 2 到 3 层继承时就有麻烦了。用 7 ± 2 来限制一个基类的派生类总数可能更为合适。

人们已经发现，过深的继承层次会显著导致错误率的增长，每个曾经调试过复杂继承关系的人都知道个中原因。过深的继承层次增加了复杂度，而这恰恰与继承所应解决的问题相反。请牢牢记住首要的技术使用。请确保你在用继承来避免代码重复并使得复杂度最小

**尽量使用多台，避免大量的类型检查** 频繁重复出现的 case 语句有时候是在暗示，采用继承可能是更好的设计选择——尽管并不总是如此。

**让所有数据都是 private** 继承会破坏封装，当你从一个对象继承的时候，你就拥有了能够访问该对象中的`protected`子程序和`protected`数据的特权，如果派生类真的需要访问这些数据，应该提供`protected`访问器函数。

### 多重继承

继承是一种非常强大的工具，就像用电锯来取代手锯来伐木一样，当小心使用时，它非常有用，但是在还没能了解应该注意的事项的人手中，它也会变得非常危险。

### 为什么有这么多关于继承的规则

所有这些的规则背后的潜台词都在说，继承往往会让你和程序员的首要技术革命（管理复杂度）背道而驰。从控制复杂度的角度来说所，你应该对继承持有非常歧视的态度。一下总结何时可以使用继承，何时又该使用包含：
- 如果多个类共享数据而非行为，应该创建这些类可以包含的共用对象
- 如果多个类共享行为而非数据，应该让它们从共同的基类继承而来，并在基类中定义共用的子程序
- 如果多个类既共享数据也共享行为，应该让它们从共同的基类继承而来，并在基类里定义共用的数据和子程序
- 当你想由基类控制接口时，使用继承；当你想自己控制接口时，使用包含。
