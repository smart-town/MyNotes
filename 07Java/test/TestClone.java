/**
 * TestClone
 */
public class TestClone implements Cloneable{
    private String name;
    private TestProperty property;

    public static void main(String[] args) throws Exception {
        TestClone clone1 = new TestClone() ;
        TestProperty property = new TestProperty() ;
        property.setProp1("PROP1");
        property.setProp2("PROP2") ;
        clone1.setProperty(property);
        System.out.println(clone1) ;

        System.out.println("Clone...");
        TestClone clone2 = (TestClone)clone1.clone() ;
        clone2.getProperty().setProp1("CLONE2");
        clone2.setName("hhg");
        System.out.println(clone2) ;

        System.out.println("Initial...") ;
        System.out.println(clone1) ;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the property
     */
    public TestProperty getProperty() {
        return property;
    }

    /**
     * @param property the property to set
     */
    public void setProperty(TestProperty property) {
        this.property = property;
    }

    @Override
    public String toString(){
        return String.format("TestClone-%d-[name:%s,property:%s]", this.hashCode(), this.name, this.property.toString()) ;
    }
}

class TestProperty {
    private String prop1;
    private String prop2;

    @Override
    public String toString() {
        return "[TestProperty-]"+this.hashCode()+": prop1:"+prop1 +"prop2"+prop2 ;
    }

    /**
     * @return the prop1
     */
    public String getProp1() {
        return prop1;
    }

    /**
     * @param prop1 the prop1 to set
     */
    public void setProp1(String prop1) {
        this.prop1 = prop1;
    }

    /**
     * @return the prop2
     */
    public String getProp2() {
        return prop2;
    }

    /**
     * @param prop2 the prop2 to set
     */
    public void setProp2(String prop2) {
        this.prop2 = prop2;
    }
    
}