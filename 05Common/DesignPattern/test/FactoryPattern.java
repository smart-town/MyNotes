/**
 * FactoryPattern
 */
public class FactoryPattern {
    public static void main(String[] args) {
        System.out.println("FactoryPattern ...") ;
        Store store = null ;
        System.out.println("--When I am in Local, I call type 1") ;
        store = new LocalStore() ;
        store.doThings("1");

        System.out.println("--when I am in Foreign, I call type 1") ;
        store = new ForeignStore() ;
        store.doThings("1") ;
    }
}

abstract class Store {
    public void doThings(String type) {
        Pizza pizza = pizzaFactory(type);
        System.out.println("Have created a pizza "+pizza) ;
        pizza.prepare();
        pizza.bake();
    }

    abstract Pizza pizzaFactory(String type);
}

class ForeignStore extends Store {

    Pizza pizzaFactory(String type){
        switch(type){
            case "1": return new ForeignPizza1() ; 
            case "2": return new ForeignPizza2() ;
            default: return new ForeignPizza1() ;
        }
    }
}
class LocalStore extends Store {

    Pizza pizzaFactory(String type){
        switch(type){
            case "1": return new LocalPizza1() ; 
            case "2": return new LocalPizza2() ;
            default: return new LocalPizza1() ;
        }
    }
}

abstract class Pizza {
    String name;
    double price;

    abstract public void prepare();

    abstract public void bake();
}

class LocalPizza1 extends Pizza {
    public LocalPizza1() {
        this.name = "Pizza1-Local";
        this.price = 200;
    }

    public void prepare() {
        System.out.println(this.name + " is prepare..local");
    }

    public void bake() {
        System.out.println(this.name + " is baking..local");
    }
}

class LocalPizza2 extends Pizza {
    public LocalPizza2(){
        this.name = "Pizza2-Local" ;
        this.price = 300;
    }

    public void prepare() {
        System.out.println(this.name + " is prepare..local");
    }

    public void bake() {
        System.out.println(this.name + " is baking..local");
    }
}

class ForeignPizza1 extends Pizza {
    public ForeignPizza1() {
        this.name = "Pizza1-Foreign";
        this.price = 220;
    }

    public void prepare() {
        System.out.println(this.name + " is prepare..foreign");
    }

    public void bake() {
        System.out.println(this.name + " is baking..foreign");
    }
}
class ForeignPizza2 extends Pizza {
    public ForeignPizza2() {
        this.name = "Pizza2-Foreign";
        this.price = 222;
    }

    public void prepare() {
        System.out.println(this.name + " is prepare..foreign");
    }

    public void bake() {
        System.out.println(this.name + " is baking..foreign");
    }
}