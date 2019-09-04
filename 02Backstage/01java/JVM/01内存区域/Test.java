/**
 * 通过代码验证 JVM 规范中描述的运行区域存储内容
 */


/**
 * VM Arg: -Xms20m-Xmx20m-XX:+HeapDumpOnOutOfMemoryError
 * 限制堆大小为20MB，不可扩展。(设置堆最小值-Xms和最大值-Xmx一样即可)，第二个参数让虚拟机出现堆内存溢出异常时Dump出当前内存堆转存快照以便分析
 */
import java.util.*;
class HeapTest {
    public static void main(String[] args){
        List<HeapTest> list = new ArrayList<>();
        while(true){
            list.add(new HeapTest());
        }
    }
}

//VM Arg: -Xss128k
class StackTest {
    private int stackLength=1;
    public void stackLeak(){
        stackLength++;
        stackLeak();
    }
    public static void main(String[] args){
        StackTest t = new StackTest();
        try {
            t.stackLeak();
        } catch(Throwable e){
            System.out.println("LENGTH:"+t.stackLength); 
            throw e;
        }
    }
}

//-XX:PermSize=10M-XX:MaxPermSize=10M
//jdk8 似乎废弃了永久代的概念然后这个设置好像木有用。
class RuntimeConstantTest {
    public static void main(String[] args){
        List<String> list= new ArrayList<String>();
        int i = 0 ;
        while(true){
            list.add(String.valueOf(i++).intern());
        }
    }
}