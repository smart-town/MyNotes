public class StrategyPattern {
    public static void main(String[] args){
        System.out.println("策略模式") ;
        ModelDuck duck = new ModelDuck() ;
        duck.setFly(new NoFly());
        duck.fly() ;

        duck.setFly(new RocketFly());
        duck.fly() ;

    }
}
class Duck {
    public String color ;
    public String name ;
    public Fly fly ;

    public void setFly(Fly fly){
        this.fly = fly ;
    }
    public void fly() {
        if(fly != null)
            fly.fly();
        else {
            System.out.println("can not fly...(no fly class)");
        }
    }
    @Override
    public String toString(){
        return "I AM:"+name+",color:"+color ;
    }
}
class ModelDuck extends Duck {
    public ModelDuck(){
        this.name = "ModelDuck" ;
        this.color = "red" ;
    }
}

interface Fly {
    default void fly() {
        System.out.println("default use swing fly");
    }
}
class NoFly implements Fly {
    @Override
    public void fly(){
        System.out.println("[Can not Fly]");
    }
}
class RocketFly implements Fly {
    public void fly(){
        System.out.println("[Use Rocket Fly]") ;
    }
}