/**
 * TestEnum
 */
public class TestEnum {

    public static void main(String[] args) {
        System.out.println("MyEnum.BABY:" + MyEnum.BABY);
        System.out.println("BABY.name:" + MyEnum.BABY.getName());
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
}
