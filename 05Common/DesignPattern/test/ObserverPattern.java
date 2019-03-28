import java.util.* ;

public class ObserverPattern implements Subject{
    public static void main(String[] args){
        System.out.println("观察者模式");
        ObserverPattern sub = new ObserverPattern() ;
        ConsoleDisplay d1 = new ConsoleDisplay(sub) ;
        
        sub.getData() ;
        sub.notifyObserver() ;

        sub.getData() ;
        sub.notifyObserver() ;

        d1.cancelObserver() ;
        sub.getData() ;
        sub.notifyObserver() ;
    }
    
    private List<Observer> observers = new ArrayList<>() ;
    private Map<String,Object> data = new HashMap<>() ;

    private Map<String,Object> getData(){
        Map<String,Object> data = new HashMap<String,Object>() ;
        data.put("temperature",Math.random()*100) ;
        data.put("weather",Math.random()*10) ;
        this.data = data;
        return data;
    }


    @Override
    public void registerObserver(Observer o){
        observers.add(o) ;
    }
    @Override
    public void removeObserver(Observer o){
        int i = observers.indexOf(o) ;
        if(i >= 0){
            observers.remove(i) ;
        }
        System.out.println("\n!!!Observer "+o+" has been removed!!!");
    }
    @Override
    public void notifyObserver(){
        System.out.println(">>>>>>Subject Notify Observers Begin....");
        for(Observer o : observers){
            o.update(this.data);
        }
        System.out.println("<<<<<<Subject Notify Observers END....");
    }
}

interface Subject {
    void registerObserver(Observer o) ;
    void removeObserver(Observer o) ;
    default void notifyObserver() {
        System.out.println("notify observers...") ;
    }
}
interface Observer {
    void update(Map<String,Object> data) ;
}
interface DisplayElement {
    void display() ;
}

class ConsoleDisplay implements DisplayElement, Observer{
    private Map<String,Object> data = new HashMap<String,Object>() ;
    private Subject subject = null ;

    public ConsoleDisplay(Subject subject){
        this.subject = subject;
        this.subject.registerObserver(this);
    }
    public void cancelObserver(){
        this.subject.removeObserver(this);
    }

    @Override
    public void display(){
        System.out.println("=====CONSOLE DISPLAYELEMENT=====");
        System.out.println("Weather:"+String.valueOf(data.get("weather")));
        System.out.println("Temperature:"+String.valueOf(data.get("temperature")));
    }

    @Override
    public void update(Map<String,Object> data){
        this.data = data;
        this.display();
    }
}
