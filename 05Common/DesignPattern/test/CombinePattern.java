import java.util.ArrayList;
import java.util.Iterator;

/**
 * CombinePattern
 */
public class CombinePattern {

    public static void main(String[] args) {
        System.out.println("组合模式");
        CombinePattern cm = new CombinePattern() ;
        ArrayThings a1 = cm.getOneArray(2) ;

        Iterator<MenuComponent> ite = a1.createIterator() ;
        while(ite.hasNext()){
            ite.next().print();
        }
    }
    public ArrayThings getOneArray(int i){
        ArrayThings alt = new ArrayThings() ;
        for(int t = 0; t < 4; t++){
            alt.addThings(new MenuItem());
        }
        Menu menu = new Menu("menu-NAME"+i, "MENU-DESCRIPTION"+i) ;
        menu.add(new MenuItem());
        alt.addThings(menu);
        return alt;
    }
}

abstract class MenuComponent {
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }

    public String getName() {
        throw new UnsupportedOperationException();
    }

    public String getDescription() {
        throw new UnsupportedOperationException();
    }

    public double getPrice() {
        throw new UnsupportedOperationException();
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}

class MenuItem extends MenuComponent {
    String name;
    String description;
    double price;

    public MenuItem() {
        double random = Math.random() * 100;
        this.price = random;
        this.name = random + "-name";
        this.description = "The description of" + random;
    }

    @Override
    public String getDescription() {
        return this.description;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public double getPrice() {
        return this.price;
    }

    @Override
    public void print() {
        System.out.println("-----MenuItem-----");
        System.out.println("|name:" + this.name + "|");
        System.out.println("|description:" + this.description + "|");
        System.out.println("|description:" + this.price + "|");
        System.out.println("------------------");
    }
}

class Menu extends MenuComponent {
    private String name;
    private String description;
    private ArrayList<MenuComponent> children = new ArrayList<>();

    public Menu(String name, String description){
        this.name = name ;
        this.description = description ;
    }

    @Override
    public void add(MenuComponent menuComponent) {
        if (menuComponent != null) {
            this.children.add(menuComponent);
        }
    }

    @Override
    public MenuComponent getChild(int i) {
        if (i <= this.children.size())
            return this.children.get(i);
        else
            return null;
    }

    @Override
    public String getDescription() {
        return super.getDescription();
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void print() {
        System.out.println("-----MENU GROUP-----");
        System.out.println("|name:"+this.name+"|") ;
        System.out.println("|description:"+this.description+"|") ;
        System.out.println("---------------------") ;
        Iterator<MenuComponent> menus = this.children.iterator() ;
        while(menus.hasNext()){
            menus.next().print();
        }
    }

    @Override
    public void remove(MenuComponent menuComponent) {
        this.children.remove(menuComponent);
    }
}

class ArrayThings {
    private ArrayList<MenuComponent> things = new ArrayList<>() ;
    public void addThings(MenuComponent com){
        if(com != null){
            this.things.add(com) ;
        }
    }
    public Iterator<MenuComponent> createIterator() {
        return things.iterator() ;
    }
}