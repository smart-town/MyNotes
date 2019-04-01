/**
 * TemplatePattern
 */
public class TemplatePattern {

    public static void main(String[] args) {
        ExpressLove love = new Hhg() ;
        love.expressLove() ;
    }
}

abstract class ExpressLove {
    public final void expressLove() {
        me() ;
        loveSpeak() ;
        lover() ;
    }

    abstract void me() ;
    abstract void loveSpeak() ;
    abstract void lover() ;
}

class Hhg extends ExpressLove {
    void me(){
        System.out.println("I am SmallTown!");
    }
    void lover(){
        System.out.println("Cherry!") ;
    }
    void loveSpeak(){
        System.out.println("You are my whole world");
    }
}