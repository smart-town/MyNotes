public class DecoratePattern {
    public static void main(String[] args) {
        System.out.println("Decorate Pattern");
        Beverage beverage = new Espresso() ;
        System.out.println(beverage.getDescription()+"$:"+beverage.cost()) ;
        beverage = new Mocha(beverage) ;
        System.out.println(beverage.getDescription()+"$:"+beverage.cost()) ;
        beverage = new Mocha(beverage) ;
        System.out.println(beverage.getDescription()+"$:"+beverage.cost()) ;
    }
}

abstract class Beverage {
    protected String description;

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    public abstract double cost();
}

abstract class Condiment extends Beverage {
    public abstract String getDescription();
}

class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }

    @Override
    public double cost() {
        return 1.99;
    }

}

class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }

    public double cost() {
        return 0.89;
    }
}

class Mocha extends Condiment {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return this.beverage.getDescription() + ",Mocha";
    }

    @Override
    public double cost() {
        return .20 + this.beverage.cost();
    }
}

