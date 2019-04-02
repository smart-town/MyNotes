import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * TestCondition
 */
public class TestCondition {
    public static Account a = new Account();

    public static void main(String[] args) {
        Runnable r1 = () -> {
            TestCondition.a.transfer(Thread.currentThread().toString(), -20000);
            System.out.println("Thread-"+Thread.currentThread()+"over!");

        };
        Runnable r2 = () -> {
            try {
                
                Thread.sleep(2000) ;
            } catch (Exception e) {
                //TODO: handle exception
            }
            TestCondition.a.transfer(Thread.currentThread().toString(), 20000);
            System.out.println("Thread-"+Thread.currentThread()+"over!");
        };
        System.out.println("main thread...");
        new Thread(r1).start();
        new Thread(r2).start() ;
    }
}

class Account {
    private int money;
    private ReentrantLock lock;
    private Condition condition;

    public Account() {
        money = 10000;
        lock = new ReentrantLock();
        condition = lock.newCondition();
    }

    public void transfer(String name, int num) {
        lock.lock();
        System.out.println("Thread-" + name + " begin transfer...");
        try {
            if (money + num < 0) {
                condition.await();
            }

            money += num;
            condition.signalAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            lock.unlock();
        }

    }
}