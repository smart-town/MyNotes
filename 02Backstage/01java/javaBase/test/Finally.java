import java.util.*;
public class Finally
{
	public static void main(String[] args){
		//Scanner in = new Scanner(System.in);
		//int b = in.nextInt();
		System.out.println("test Return:" + Finally.testReturn());
		System.out.println("test ReturnObj:" + Finally.testReturnObj()[0]);
	}
	public static int testReturn() {
		int b = 10;
		int a = 0;
		try
		{
			//int a = b/0; 
			a = b/2;
			System.out.println("test Return try");
			return a;
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally {
			a += 100;
			System.out.println("execute test return & finally over...");
			return b;
		}
	}
	public static int[] testReturnObj() {
		int b = 10;
		int[] a = {1};
		int[] temp = {2};
		try
		{
			//int a = b/0; 
			a[0] = b/2;
			System.out.println("test Return try");
			return a;
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally {
			a[0] += 100;
			System.out.println("execute test return & finally over...");
			return a;
		}
	}
}