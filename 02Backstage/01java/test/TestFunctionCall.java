/**
 * 测试方法调用
 * @author smalltown
 */
public class TestFunctionCall {
    public static void main(String[] args){
        System.out.println("测试方法调用") ;
        System.out.println("x.f(),首先查找 x 所有 f 方法及 x 父类中所有的 public f 方法") ;
        System.out.println("x.f(),得到一个 f 方法列表后，对比调用参数类型。由于存在类型转换所以可能比较复杂") ;

        Parent p1 = new Parent() ;
        Son s1 = new Son() ;
        s1.test(p1) ;
    }
}

class Parent {
    public void test(Parent p){
        System.out.println("Parent test") ;
    }
}
class Son extends Parent {
    public void test(Son s){
        System.out.println("Son test") ;
    }
}