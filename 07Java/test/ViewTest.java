import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * ViewTest
 */
public class ViewTest {
    String name="Ok";

    public static void main(String[] args) {
        testArraysAsList() ;
        testSubrange() ;
        unmodifiableTest();
    }
    public static void testArraysAsList(){
        System.out.println("Test Arrays.asList");
        ViewTest[] vts = new ViewTest[6];
        for(int i = 0 ; i < 6; i++){
            vts[i] = new ViewTest() ;
        }
        List<ViewTest> lvt = Arrays.asList(vts) ;
        System.out.println(lvt);
    }
    public static void testSubrange(){
        System.out.println("\nTest Subrange");
        List<String> a = new ArrayList<>() ;
        a.add("1") ;
        a.add("2") ;
        a.add("3") ;
        System.out.println();
        List<String> suba = a.subList(0, 2);
        System.out.println(suba);
        suba.remove(0) ;
        System.out.println(a);
        suba.clear();
        System.out.println(a);
    }
    public static void unmodifiableTest(){
        System.out.println("test view which can not be change");
        List<String> a = new ArrayList<>() ;
        a.add("1") ;
        a.add("2") ;
        List<String> am = Collections.unmodifiableList(a) ;
        System.out.println(am);
        am.add("3") ;
    }
}