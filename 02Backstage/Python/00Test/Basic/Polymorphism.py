class Person(object):
	def __init__(self, name, sex):
		self.name = name
		self.sex = sex
	def hello(self):
		if self.sex == 'male':
			print(f"!!Hi,I AM {self.name}!")
		else:
			print(f"^_^,I am {self.name}~")

class Police(Person):
	__slots__ = ('name', 'sex')
	def __init__(self, name, sex):
		super().__init__(name, sex)
	def hello(self):
		print(f"Stop! I AM {self.name}")

class Thief(Person):
	def __init__(self, name, sex):
		super().__init__(name, sex)
	def hello(self):
		print(f"emmmmm i am {self.name} QaQ")

def main():
	p1 = Person("HHG", "male")
	p2 = Person("Cherry", "female")
	p1.hello()
	p2.hello()
	
	print("---------Polymorphism---------")
	police = Police("=_=", "male")
	thief = Thief("O.O", "male")
	police.hello()
	thief.hello()

	print("-------test add new attr-----")
	thief.age = "20"
	print(thief.age)	
	police.age = "21"
	print(police.age)

if __name__ == '__main__':
	main()
