import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;
import java.util.ArrayDeque;
import java.util.HashSet;

/**
 * LinkedListTest
 */
public class LinkedListTest {

    public static void main(String[] args) {
        List<String> s = new LinkedList<>();
        s.add("Amy");
        s.add("Bob");
        System.out.println(s);
        // ListIterator
        ListIterator<String> ite = s.listIterator();
        ListIterator<String> ite2 = s.listIterator();

        while (ite.hasNext()) {
            System.out.println("---:" + ite.next());
        }
        if (ite.hasPrevious()) {
            System.out.println("previous---:" + ite.previous());
        }

        System.out.println("Cherry".hashCode());
        Set<String> s1 = new HashSet<>() ;
        System.out.println(s1);

        ArrayDeque adque = new ArrayDeque<>() ;
        adque.add("OkkJune");
        adque.add("Cherry");
        adque.addFirst("HHG");
        System.out.println(adque);
    }
}