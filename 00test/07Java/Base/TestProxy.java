import java.lang.reflect.* ;

interface Subject{
    void rent() ;
    void hello(String str) ;
}
class RealSubject implements Subject{
    @Override
    public void rent(){
        System.out.println("I want to rent my house") ;
    }

    @Override
    public void hello(String str){
        System.out.println("Hello,"+str) ;
    }
}

class DynamicProxy implements InvocationHandler {
    //要代理的真实对象
    private Object subject ;
    
    public DynamicProxy(Object subject){
        this.subject = subject ;
    }

    @Override
    public Object invoke(Object object, Method method, Object[] args) throws Throwable{
        System.out.println("before....") ;
        System.out.println("Method..." + method.getName()) ;

        method.invoke(subject, args) ;

        System.out.println("after...") ;
        return null;
    }
}

public class TestProxy {
    public static void main(String[] args){
        Subject subj = new RealSubject() ;
        InvocationHandler handler = new DynamicProxy(subj) ;
        Subject subject = (Subject)Proxy.newProxyInstance(handler.getClass().getClassLoader(), subj.getClass().getInterfaces(), handler) ;
        System.out.println(subject.getClass().getName()) ;
        subject.rent() ;
        subject.hello("hhgg") ;
    }
}