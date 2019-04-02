import java.util.Scanner;

/**
 * TestSynchronized
 */
public class TestSynchronized {
    private static User user = new User() ;
    public static void main(String[] args) {
        Runnable r1 = ()->{
            
            TestSynchronized.user.setName("HHG") ;
            System.out.println("Thread-r1over");
        };
        Runnable r2 = ()->{
            // User user = TestSynchronized.user;
            // user.setName(null);
            System.out.println(TestSynchronized.user.toString());
        };
        new Thread(r1).start() ;
        new Thread(r2).start() ;
        System.out.println("MAIN_THREAD");

        Runnable r3 = ()->{
            
            // TestSynchronized.user.test1();
            User.test1() ;
            System.out.println("Thread-r3over");
        };
        Runnable r4 = ()->{
            // User user = TestSynchronized.user;
            User.test2() ;
            // user.setName(null);
            // TestSynchronized.user.test2();
            //System.out.println(TestSynchronized.user.toString());
        };
        // new Thread(r3).start() ;
        // new Thread(r4).start() ;
    }
    
}
class User {
    private String name;

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    public static synchronized void test1(){
        try {
            System.out.println("Thread-"+Thread.currentThread()+" will sleep 3000ms");
            Thread.sleep(3000);
        } catch(Exception e){}
        System.out.println("static test1");
    }
    public static synchronized void test2(){
        System.out.println("static test2");
    }

    /**
     * @param name the name to set
     */
    public synchronized void setName(String name) {
        if(name != null){
            // Scanner in = new Scanner(System.in) ;
            // this.name = in.nextLine() ;
            // in.close();
            try {
                System.out.println("Thread-"+Thread.currentThread()+" will sleep 3000ms");
                Thread.sleep(3000);
                this.name = name;
            } catch(Exception e){}
        } else  {
            this.name = name;
        }
    }
    
    @Override
    public synchronized String toString(){
        return "User-"+this.hashCode()+"[name="+this.name+"]";
    }

}