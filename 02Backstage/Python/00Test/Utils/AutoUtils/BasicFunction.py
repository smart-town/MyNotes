# Function Basic.
from sys import stdin
from subprocess import Popen, PIPE

myIn = open("testInput", "r")
stdin = myIn
# myIn.write("cherry\n")
# p = Popen("ssh root@192.168.81.132", shell=True)
p = Popen("ls", shell=True)
# p.stdin.write(bytes('root\n'))
# p.stdin.write(bytes('ls\n'))
# p.stdin.write(bytes('exit\n'))

stdin.readline()
# stdin.write(bytes("ssh root@192.168.81.132", encoding="utf-8"))
p.wait()
print("p stdout:", p.stdout, "p stdin:", p.stdin)