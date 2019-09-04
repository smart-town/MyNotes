import java.util.* ;
/**
 * MapTest
 */
public class MapTest {

    public static void main(String[] args) {
        testBasicOperation();
        testLinkedHashMap() ;
    }
    public static void testBasicOperation(){
        System.out.println("Test About Map Basic Operation");
        Map<String,String> map = new HashMap<>() ;
        map.put("id","value1") ;
        System.out.println(map.getOrDefault("id2","default"));
        System.out.println(map.put("id","value2"));

        Map<Object,String> map2 = new HashMap<>() ;
        map2.put(new MapTest(), "111") ;
        map.put("Cherry","value1") ;
        map.put("Cherry2","Vaule2") ;
        map.put("Cherry3","value3") ;
        System.out.println(map);
        System.out.println(map2);
    }

    public static void testLinkedHashMap(){
        System.out.println("\nTest About LinkedHashMap");
        Map<String,String> map = new LinkedHashMap<>();
        map.put("Cherry","value1") ;
        map.put("Cherry2","Vaule2") ;
        map.put("Cherry3","value3") ;
        System.out.println(map);
    }
}