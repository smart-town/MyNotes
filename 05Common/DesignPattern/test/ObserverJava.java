import java.util.* ;

public class ObserverJava extends Observable {
    public static void main(String[] args) throws Exception{
        ObserverJava o = new ObserverJava() ;
        MineDisplay m = new MineDisplay(o) ;
        for(int i = 0; i < 5; i++){
            Thread.sleep(1000) ;
            System.out.println("The "+i+" th inform");
            o.setChanged() ;
            o.notifyObservers(Math.round(Math.random()*100)+"") ;
            if(i == 3) {
                m.o.deleteObserver(m);
            }
        }
    }
}

class MineDisplay implements java.util.Observer {
    public Observable o;
    public MineDisplay(Observable o){
        this.o = o ;
        this.o.addObserver(this);
    }
    @Override
    public void update(Observable subject, Object args){
        System.out.println("\n-------MineDisplay Get Update--------") ;
        System.out.println("------get:"+subject.getClass().getName());
        this.display(args) ;
    }
    public void display(Object obj){
        System.out.println("========GetObj:"+obj.toString()) ;
    }
}