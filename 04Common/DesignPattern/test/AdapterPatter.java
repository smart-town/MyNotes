/**
 * AdapterPatter
 */
public class AdapterPatter {

    public static void main(String[] args) {
        Human hu = new DogAdapter(new Dog()) ;
        hu.introduceSelf();
    }
}

interface Human {
    void introduceSelf();
}

class Dog {
    public void wangwang() {
        System.out.println("-----嗷呜~------");
    }
}

class DogAdapter implements Human {
    private Dog dog;

    public DogAdapter(Dog dog) {
        this.dog = dog;
    }

    @Override
    public void introduceSelf() {
        this.dog.wangwang();
    }

}