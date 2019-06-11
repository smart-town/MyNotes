//-XX:+PrintGC 打印 gc 日志
class ReferenceGC {
    public Object instance = null;
    private static final int _1MB=1024*1024;
    public static String test = "Cherry";
    private byte[] bigSize=new byte[2*_1MB];
    public static void testGC(){
        ReferenceGC t = new ReferenceGC();
        t=null;

        System.gc();
        System.out.println("======");
        ReferenceGC t1 = new ReferenceGC();
        ReferenceGC t2 = new ReferenceGC();
        t1.instance = t2;
        t2.instance = t1;
        System.gc();
    }
    public static void main(String[] args){
        ReferenceGC.testGC();
    }
}

// 2019-06-06 14:33 
// 通过 finalize 拯救自己
class ResumeSelf {
    public static ResumeSelf save = null;
    @Override
    protected void finalize() throws Throwable {
        super.finalize(); 

        System.out.println("finalize ... execute ...");
        ResumeSelf.save = this;
    }
    private void isAlive(){
        System.out.println(this.hashCode()+" alive!");
    }
    public static void main(String[] args) throws Throwable{
        save = new ResumeSelf();
        save.isAlive();
        save = null;
        System.out.println("\n第一次准备复活..");
        System.gc() ;
        Thread.sleep(1000);
        if(save!=null){
            save.isAlive();
        }else {
            System.out.println("QaQ..Died");
        }

        save = null ;
        System.out.println("\n第二次准备复活");
        System.gc();
        Thread.sleep(1000);
        if(save!=null){
            save.isAlive();
        }else {
            System.out.println("QaQ..Died");
        }
    }
}