public class OrderPattern2 {
    public static void main(String[] args){
        Command c1 = new LightOnCommand(new Light()) ;
        RemoteControl control = new RemoteControl() ;
        control.setSlot(c1);
        control.buttonPressed() ;
    }
}
interface Command{
    void execute();
}

class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light light){
        this.light = light;
    }
    public void execute(){
        this.light.on();
    }
}
class Light {
    public String status;
    public void on(){
        this.status = "on";
        System.out.println("Light was token on!");
    }
}
class RemoteControl {
    Command slot;
    public void setSlot(Command slot){
        this.slot = slot;
    }
    public void buttonPressed(){
        this.slot.execute();
    }
}