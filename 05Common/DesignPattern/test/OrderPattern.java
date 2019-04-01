/**
 * OrderPattern
 */
public class OrderPattern {

    public static void main(String[] args) {
        System.out.println("OrderPattern...Pattern");
        SimpleRemoteControl test = new SimpleRemoteControl();
        Light light = new Light() ;
        test.setCommand(0,new LightOnCommand(light),new LightOffCommand(light));
        test.onButtonWasPressed(1);
        test.onButtonWasPressed(0);
        test.offButtonWasPressed(0);
    }
}

interface Command {
    void execute();
}

class LightOnCommand implements Command {
    Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.on();
    }
}
class LightOffCommand implements Command {
    Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    public void execute() {
        light.off();
    }
}

class Light {
    public void on() {
        System.out.println("-----This light was turn on!-----");
    }

    public void off() {
        System.out.println("-----This light was turned off!-----");
    }
}

class SoundBox {
    public void on() {
        System.out.println("-----Sound Box was turned on!-----");
    }

    public void off() {
        System.out.println("-----Sound Box was turned off!-----");
    }
}
class NoCommand implements Command{
    public void execute(){
        System.out.println("[No Command]");
    }
}
class SimpleRemoteControl {
    Command[] commandOn; // 一个插槽持有命令，而这个命令控制着一个装置
    Command[] commandOff;

    public SimpleRemoteControl() {
        commandOn = new Command[7] ;
        commandOff = new Command[7] ;
        Command no = new NoCommand() ;
        for(int i = 0; i < 7; i++){
            commandOn[i] = no ;
            commandOff[i] = no ;
        }
    }

    public void setCommand(int slot,Command commandOn, Command commandOff) { // 该方法用来设置 插槽控制的命令。如果想要更改按钮行为则可以多次调用
        this.commandOn[slot] = commandOn ;
        this.commandOff[slot] = commandOff ;
    }

    public void onButtonWasPressed(int slot) {
        commandOn[slot].execute() ;
    }
    public void offButtonWasPressed(int slot){
        commandOff[slot].execute() ;
    }
}
