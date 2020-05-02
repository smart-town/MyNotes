import java.util.concurrent.locks.ReentrantLock;

/**
 * TestThread2
 */
public class TestSyn {
    public static Account account = new Account();
    private static ReentrantLock mylock = new ReentrantLock() ;

    public static void main(String[] args) throws Exception {
        System.out.println("Just test javap");

        Runnable r1 = () -> {
            Account account = TestSyn.account ;
            System.out.println(Thread.currentThread() + "Begin Add...");
            try {
                TestSyn.mylock.lock();
                account.setTotal(account.getTotal() + 1000);
				System.out.printf("Thead %s Account Total: %d \n", Thread.currentThread().getName(), account.getTotal());
            } finally {
                TestSyn.mylock.unlock();
            }
            try {
                Thread.sleep((int)Math.random()*1000) ;
            } catch(Exception e){
            }
            System.out.println(Thread.currentThread() + ":" + account);
        };
        Runnable r2 = () -> {
            Account account = TestSyn.account ;
            System.out.println(Thread.currentThread() + "Begin subtract...");
            try {
                TestSyn.mylock.lock();
				System.out.printf("Thead %s Account Total: %d \n", Thread.currentThread().getName(), account.getTotal());
                account.setTotal(account.getTotal() - 1000);
            } finally {
                TestSyn.mylock.unlock();
            }
            try {
                Thread.sleep((int)Math.random()*1000) ;
            } catch(Exception e){

            }
            System.out.println(Thread.currentThread() + ":" + account);
        };

        for (int i = 0; i < 600; i++) {
            if (i % 2 == 0) {
                new Thread(r1).start();
            } else {
                new Thread(r2).start();
            }
        }
    }
}

class Account {
    private int total = 10000;
    

    public void setTotal(int total) {
        System.out.println("Begin ... change total...") ;
        this.total = total;
    }

    public int getTotal() {
        return total;
    }

    public String toString() {
        return "Account: " + total;
    }
}