// import javax.swing.JFrame;
// import java.awt.Dimention;
import java.awt.* ;
import java.awt.event.* ;
import javax.swing.* ;

/**
 * TestInner
 */
public class TestInner {

    public static void main(String[] args) {
        JFrame frame = new JFrame() ;
        Dimension dimension = new Dimension(400,400) ;
        Container buttonContainer = getContentPane() ;

        frame.setSize(dimension);
        // frame.setContentPane(container);
        frame.add(buttonContainer,BorderLayout.SOUTH);

        addButton(buttonContainer, "test", event->{System.out.println("click!");});
        addButton(buttonContainer, "exit", event->{System.exit(0);});

        frame.setLocation(new Point(50,50));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true) ;
    }

    public static void addButton(Container c, String title, ActionListener listener) {
        JButton button = new JButton(title) ;
        c.add(button) ;
        button.addActionListener(listener) ;
    }
    public static Container getContentPane(){
        Container container = new JPanel() ;
        return container ;
    }
}

class BallComponent extends JPanel {
    private static final long serialVersionUID = 1L;
    private static final int DEFAULT_WIDTH = 450;
    private static final int DEFAULT_HEIGHT = 350;

    private java.util.List<Ball> balls = new ArrayList<>() ;
}

class Ball {
    
}