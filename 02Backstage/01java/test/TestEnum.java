/**
 * TestEnum
 */
public class TestEnum {

    public static void main(String[] args) {
        System.out.println("MyEnum.BABY:" + MyEnum.BABY);
        System.out.println("BABY.name:" + MyEnum.BABY.getName());
		System.out.println("test equas:" + MyEnum.BABY.getName().equals("cherry"));
		System.out.println("values:" + MyEnum.getFromValue("yingchaogege"));
    }
}

enum MyEnum {
    BABY("cherry"), WIFE("yingchaogege");

    private MyEnum(String name){
        this.name = name ;
    }
    private String name;
    public String getName(){
        return name;
    }
	public static MyEnum getFromValue(String value) {
		for (MyEnum temp : MyEnum.values()) {
			if (temp.getName().equals(value)) {
				return temp;
			}
		}
		return null;
	}
}
