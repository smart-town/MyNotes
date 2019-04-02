public class SimpleFactoryPattern {
    public static void main(String[] args) {
        PizzaFactory f = new PizzaFactory();
        System.out.println(f.getPizza("1"));
        System.out.println(f.getPizza("2"));
    }
}

class PizzaFactory {
    public Pizza getPizza(String type) {
        Pizza pizza = null;
        switch (type) {
        case "1":
            pizza = new Pizza1();
            break;
        case "2":
            pizza = new Pizza2();
            break;
        default:
            pizza = new Pizza();
        }
        ;
        return pizza;
    }
}

class Pizza {
    String name;
    double price;

    @Override
    public String toString() {
        return this.getClass().getName() + "[name:" + this.name + ",price:" + this.price + "]" ;
    }
}

class Pizza1 extends Pizza {
    public Pizza1(){
        name = "Pizza1" ;
        price = 200 ;
    }
}
class Pizza2 extends Pizza {
    public Pizza2(){
        name = "Pizza2" ;
        price = 300 ;
    }
}