import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

/**
 * IteratorPattern
 */
public class IteratorPattern {

    public static void main(String[] args) {
        System.out.println("Iterator Pattern");
        ArrayListThings althings = new ArrayListThings() ;
        ArrayThings athings = new ArrayThings() ;
        for(int i = 0; i < 10; i++){
            if(i % 2 == 0) {
                althings.addThings("things" + i);
            } else {
                athings.addThings("thing" + i);
            }
        }

        System.out.println(althings.things);
        System.out.println(Arrays.toString(athings.things));

        Iterator ite = althings.createIterator() ;
        while(ite.hasNext()){
            System.out.println(ite.next());
        }
        ite = athings.createIterator() ;
        while(ite.hasNext()){
            System.out.println(ite.next());
        }

    }
}

class ArrayListThings {
    ArrayList<String> things = new ArrayList<>();

    public void addThings(String things) {
        this.things.add(things);
    }

    public Iterator createIterator() {
        return this.things.iterator();
    }

}

class ArrayThings {
    String[] things = new String[20];

    public void addThings(String thing) {
        int flag = 0;
        for (int i = 0; i < things.length; i++) {
            if (this.things[i] == null) {
                this.things[i] = thing;
                flag = 1;
                return;
            }
        }
        if (flag == 0) {
            System.err.println("Things Array Full!");
        }
    }

    public Iterator createIterator() {
        return new ArrayThingsIterator(this.things);
    }
}

class ArrayThingsIterator implements Iterator {
    private String[] things = null;
    private int i = 0;

    public ArrayThingsIterator(String[] things) {
        this.things = things;
    }

    @Override
    public boolean hasNext() {
        if (i >= things.length || things[i] == null) {
            return false;
        }
        return true;
    }

    @Override
    public Object next() {
        String temp = this.things[i];
        i = i + 1;
        return temp;
    }

    @Override
    public void remove() {
        Iterator.super.remove();
    }

}