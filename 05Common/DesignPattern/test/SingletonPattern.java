/**
 * SingletonPattern
 */
public class SingletonPattern {
    
    public static void main(String[] args) {
        System.out.println("This is singleton pattern") ;
        System.out.println("MySingleton:" + MySingleton.getInstance()) ;
        System.out.println("MySingleton:" + MySingleton.getInstance()) ;
    }
}
class MySingleton {
    private volatile static MySingleton mySingleton ;

    private MySingleton(){}

    public static MySingleton getInstance(){
        if(mySingleton == null){
            synchronized(MySingleton.class){
                if(mySingleton == null){
                    mySingleton = new MySingleton() ;
                }
            }
        }
        return mySingleton ;
    }
}