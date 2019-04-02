/**
 * TestThread
 */
public class TestThread {

    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(2000);
                System.out.println("This is Main Thread-" + Thread.currentThread());
            } catch(Exception e){
                System.out.println(e.getMessage());
            }
            String a = null ;
            System.out.println(a.hashCode());
        });
        System.out.println("This is Main Thread-" + Thread.currentThread());
        System.err.println("Error?");
        // t.setDaemon(true);
        t.setUncaughtExceptionHandler((Thread thread,Throwable e)->{
            System.out.println("This is error... of " + thread.toString());
            System.out.println("error:"+e.getMessage());
        });
        t.start();
    }
}