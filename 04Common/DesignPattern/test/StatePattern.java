/**
 * StatePattern
 */
public class StatePattern {

    public static void main(String[] args) {
        System.out.println("State--Pattern");
        Mine mine = new Mine() ;
        mine.speak() ;
        mine.study();
        mine.walk();
        mine.study();
        mine.speak() ;
    }

}

class Mine {
    private State sadly ;
    private State quiet ;
    private State state;

    public Mine(){
        sadly = new SadState(this) ;
        quiet = new QuietState(this) ;
        this.state = sadly ;
    }

    public void walk(){
        this.state.walk() ;
    }
    public void speak(){
        this.state.speak() ;
    }
    public void study(){
        this.state.study();
    }

    public void setState(State now){
        this.state = now ;
    }

    /**
     * @return the sadly
     */
    public State getSadly() {
        return sadly;
    }

    /**
     * @param sadly the sadly to set
     */
    public void setSadly(State sadly) {
        this.sadly = sadly;
    }

    /**
     * @return the quiet
     */
    public State getQuiet() {
        return quiet;
    }

    /**
     * @param quiet the quiet to set
     */
    public void setQuiet(State quiet) {
        this.quiet = quiet;
    }

    /**
     * @return the state
     */
    public State getState() {
        return state;
    }
}
interface State {
    void study() ;
    void walk() ;
    void speak() ;
}

class SadState implements State {
    private Mine mine ;
    public SadState(Mine mine){
        this.mine = mine;
    }
    public void study(){
        System.out.println("Sadly...can't study!");
    }
    public void walk(){
        System.out.println("Sadly...walk lonely...");
        System.out.println("....emmmmm seems better...") ;
        mine.setState(this.mine.getQuiet()) ;
    }
    public void speak(){
        System.out.println("can not speak...");
    }
}
class QuietState implements State {
    private Mine mine ;
    public QuietState(Mine mine){
        this.mine = mine ;
    }
    public void study(){
        System.out.println("Quiet...emmm, I think i can study");
    }
    public void walk(){
        System.out.println("Quiet...walk! Can do others") ;
    }
    public void speak(){
        System.out.println("emmmm...mesamesa");
        this.mine.setState(mine.getSadly()) ;
    }
}