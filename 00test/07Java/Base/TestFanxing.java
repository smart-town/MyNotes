public class TestFanxing {
    public <T> void test(T t){
        System.out.println("参数类型:"+ t.getClass().getName()+"\n") ;
    }
    public static void main(String[] args){
        TestFanxing a = new TestFanxing() ;
        a.test(12) ;
        a.test("Cherry") ;
    }
}