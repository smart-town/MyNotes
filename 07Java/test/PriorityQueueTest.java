import java.util.PriorityQueue;

/**
 * PriorityQueueTest
 */
public class PriorityQueueTest {

    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>();
        pq.add("3") ;
        pq.add("5") ;
        pq.add("1") ;
        System.out.println(pq);
        for(String temp : pq){
            System.out.print(temp+ " ");
        }
        System.out.println();
        while(!pq.isEmpty()){
            System.out.print(pq.remove()+" ");
        }

    }
}