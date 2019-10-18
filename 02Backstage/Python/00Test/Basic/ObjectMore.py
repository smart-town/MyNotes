class Person(object):
    def __init__(self,name,age):
        self._name = name
        self._age = age
    
    @property
    def name(self):
        return self._name
    @property
    def age(self):
        print("You will get age ")
        return self._age
    
    @age.setter
    def age(self,age):
        print("You have set age %s" % age)
        self._age =age
    def play(self):
        if self._age <= 16:
            print(f"Play fly {self._name}")
        else:
            print(f"Play Cards {self._name}")
def main():
    print("test About @property & @property.setter")
    person = Person('HHG',15)
    person.play()
    person.age = 22
    person.play()
    print(person.age)

main()