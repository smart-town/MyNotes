print("FLOW Control")

print("-----IF---ELIF---ELSE-----")
x = int(input("please enter an integer:"))
if x < 0:
	print(f'Negative {x} >>> 0')
	x = 0
elif x == 0:
	print("Zero!")
elif x == 1:
	print("Single")
else:
	print('More')

print("-----for-in-----")
for n in range(2,5):
	print(f"for...{n}")
	if x > 1:
		print(f"when you input {x}>0, so break for-in, and else statement will not be processed!")
		break
else:
	print(f"for in & else")

print("----pass----")
print("pass means do nothing,help you think on a hight level")
def initlog(*args):
	pass
initlog()
