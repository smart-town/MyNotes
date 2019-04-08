import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Map;
import java.util.Objects;

/**
 * ProxyPattern
 */
public class ProxyPattern {

    public static void main(String[] args) {
        User user1 = new MyUser() ;
        user1.setName("luhha") ;
        User user2 = new MyUser() ;
        user2.setName("cherry") ;

        User user1Proxy = (User)Proxy.newProxyInstance(user1.getClass().getClassLoader(),user1.getClass().getInterfaces(), new MyUserAdapter(user1));
        System.out.println(user1Proxy.getInfo());
    }
}
interface User {
    String getInfo();

    void setInfo(Map<String, String> param);
    String getName();
    void setName(String name);
}

class MyUser implements User {
    private String name;

    public String getName() {
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setInfo(Map<String,String> param){

    }

    public String getInfo() {
        return "-----name:" + this.name + "-obj:" + this.hashCode();
    }
}

class MyUserAdapter implements InvocationHandler {
    private User myUser;

    public MyUserAdapter(User myUser) {
        this.myUser = myUser;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        try {
            // if(method.getName().contains("get")){
            // if (Objects.equals(args[0].toString(), myUser.getName())) {
            //     return method.invoke(myUser, args);
            // }
            // } else {
    
            // }
            System.out.println("Proxy....");
            return method.invoke(myUser, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}