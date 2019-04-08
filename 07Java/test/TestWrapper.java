import jdk.nashorn.internal.runtime.regexp.joni.encoding.IntHolder;

public class TestWrapper {
	public static void main(String[] args){
		Integer i = 1 ;
		System.out.println(i+","+i.hashCode());
		TestWrapper t = new TestWrapper() ;
		t.testWrapperChange(a);
		System.out.println(i+","+i.hashCode());

		IntHolder i2 = 2 ;
		t.testWrapperChange(i2);
		System.out.println(i2+","+i2.hashCode());
	}

	public void testWrapperChange(Integer a){
		a = 12 ;
	}

	public void testWrapperChange(IntHolder a){
		a = 12 ;
	}
}
