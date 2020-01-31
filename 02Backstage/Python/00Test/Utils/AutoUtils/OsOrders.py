import sys
import os
isWin = sys.platform == 'win32'
def doCopy(src, dst, type):
    if (isWin):
        return "copy %s %s" % (src, dst)
    else:
        return "cp %s %s" % (src, dst)

def doScp(remote, src, dst):
    options = ""
    if os.path.isdir(src):
        options = "-r" 
    return "scp %s %s %s:%s" % (options, src, remote, dst)


if __name__ == "__main__":
    print("doCopy:", doCopy("D:", "S:"))
    print("doScp:", doScp("root@127.0.0.1", "C:/Users/luhha/Desktop/test.cmd", "/home/smalltown/Desktop"))