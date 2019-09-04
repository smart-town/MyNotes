/**
* @author luhha 2019-06-13
* [描述]:测试局部变量表和gc
* -XX:+PrintGC
*/
public class TestVarTable {
    public static void main(String[] args){ 
        {
            byte[] placeholder = new byte[64*1024*1024];
        }
        int a=0 ;
        System.gc();

        TestVarTable.test();
    }

    static void test(){
        System.out.println(Test.class.getClassLoader());
    }
}