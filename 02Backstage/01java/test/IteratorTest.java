import java.util.ArrayList;
import java.util.Iterator;

/**
 * IteratorTest
 */
public class IteratorTest {

    public static void main(String[] args) {
        ArrayList<String> s = new ArrayList<>() ;
        for(int i = 0; i < 10; i++){
            s.add("String-"+i);
        }
        Iterator<String> ite = s.iterator() ;
        ite.forEachRemaining(element->{System.out.print(element+" ");});
        System.out.println();
    }
}