/**
 * AbstractFactoryPattern
 */
public class AbstractFactoryPattern {

    public static void main(String[] args) {
        System.out.println("\n===Abstract Factory Pattern===\n");
        System.out.println("When i am in local:") ;
        AbstractFactoryPattern.build(new LocalComponentsFactory()) ;
        System.out.println("When i am in foreign:") ;
        AbstractFactoryPattern.build(new ForeignComponentsFactory()) ;
    }
    public static void build(ProductComponentsFactory factory){
        System.out.println("build some thing with components") ;
        System.out.println("I get:" + factory.createComponent1() + "," + factory.createComponent2() + "," + factory.createComponent3());
    }
}

interface ProductComponentsFactory {
    Component1 createComponent1();

    Component2 createComponent2();

    Component3 createComponent3();
}

abstract class Component1 {
    public static final String name = "Component1";
    abstract public void produce() ;
}

abstract class Component2 {
    public static final String name = "Component2";
    abstract public void produce() ;
}

abstract class Component3 {
    public static final String name = "Component3";
    abstract public void produce() ;
}
class LocalComponent1 extends Component1 {
    public void produce(){
        System.out.println("---Local" + Component1.name);
    }
}
class LocalComponent2 extends Component2 {
    public void produce(){
        System.out.println("---Local" + Component2.name);
    }
}
class LocalComponent3 extends Component3 {
    public void produce(){
        System.out.println("---Local" + Component3.name);
    }
}
class ForeignComponent1 extends Component1 {
    public void produce(){
        System.out.println("---Foreign" + Component1.name);
    }
}
class ForeignComponent2 extends Component2 {
    public void produce(){
        System.out.println("---Foreign" + Component2.name);
    }
}
class ForeignComponent3 extends Component3 {
    public void produce(){
        System.out.println("---Foreign" + Component3.name);
    }
}

class LocalComponentsFactory implements ProductComponentsFactory {

    @Override
    public Component1 createComponent1() {
        return new LocalComponent1() ;
    }
    @Override
    public Component2 createComponent2() {
        return new LocalComponent2() ;
    }

    @Override
    public Component3 createComponent3() {
        return new LocalComponent3() ;
    }
    
}
class ForeignComponentsFactory implements ProductComponentsFactory {

    @Override
    public Component1 createComponent1() {
        return new ForeignComponent1() ;
    }
    @Override
    public Component2 createComponent2() {
        return new ForeignComponent2() ;
    }

    @Override
    public Component3 createComponent3() {
        return new ForeignComponent3() ;
    }
    
}