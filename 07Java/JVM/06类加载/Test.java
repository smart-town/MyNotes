import java.io.*;
/**
* @author luhha 2019-06-12
* [描述]:测试JVM加载(有且只有 5 种情况)
*/
public class Test {
    static {
        System.out.println("TestInitialize");
    }
    public static void main(String[] args){
        //System.out.println(Sub.value);

        Super[] t = new Super[10];
    }
}
class Super{
    static {
        System.out.println("Super initialize");
    }
    public static String value="TEST";
}
class Sub extends Super{
    static {
        System.out.println("Sub Initialize");
    }
}
//----END

/**
* @author luhha 2019-06-12
* [描述]:类加载器测试
*/
class ClassLoaderTest{
    public static void main(String[] args) throws Exception{
        ClassLoader myloader = new ClassLoader() {
            @Override
            public Class<?> loadClass(String name) throws ClassNotFoundException {
                try {
                    String fname=name.substring(name.lastIndexOf(".")+1)+".class";
                    InputStream is = getClass().getResourceAsStream(fname);
                    if(is==null){
                        return super.loadClass(name);
                    }
                    byte[] b=new byte[is.available()];
                    is.read(b);
                    return defineClass(name,b,0,b.length);
                } catch(IOException e){
                    throw new ClassNotFoundException(name);
                }
            }
        };

        Object obj = myloader.loadClass("Test").newInstance();
        System.out.println(obj.getClass());
        System.out.println(obj instanceof Test);
         
    }
}