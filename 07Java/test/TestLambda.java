import java.util.Arrays;
import java.util.Comparator;
import java.util.function.BiFunction;

/**
 * TestLambda
 */
public class TestLambda {

    private int id;
    public int getId(){
        return id ;
    }
    public void setId(int id){
        this.id = id ;
    }
    public String toString(){
        return String.format("TestLambda[id=%d]",id) ;
    }

    public static void main(String[] args) {
        // BiFunction<Integer,Integer,Integer> temp = (Integer x,Integer y)->{return x+y;};
        TestLambda.testLambda((Integer x,Integer y)->{
            System.out.println("This is BiFunction Lambda");
            return x*y;});

        TestLambda.testLambda(TestLambda::testFunctionUse);

        TestLambda l1 = new TestLambda() ;
        l1.setId(11) ;
        TestLambda l2 = new TestLambda() ;
        l2.setId(2) ;

        TestLambda[] test = new TestLambda[2];
        test[0] = l1 ;
        test[1] = l2 ;
        System.out.println(Arrays.toString(test)) ;
        
        Arrays.sort(test,Comparator.comparing(TestLambda::getId));
        System.out.println(Arrays.toString(test)) ;
    }
    public static void testLambda(BiFunction<Integer,Integer,Integer> bi){
        System.out.println("Labmda test") ;
        System.out.println(bi.apply(12,13)) ;
    }

    public static Integer testFunctionUse(Integer x, Integer y){
        System.out.println("This is Funciton Reuse");
        return x+y;
    }
}

