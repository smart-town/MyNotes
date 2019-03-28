import java.util.Objects;
/**
 * Test about super Object
 * @author smalltown
 */
public class TestObject {
    public static void main(String[] args){
        String a = null ;
        String b = "12" ;
        System.out.println(Objects.equals(a, b)) ;
        System.out.println(Objects.equals("12",b)) ;
    }
}