import sys
isWin = sys.platform == 'win32'
def transformTuple(param):
    return [str(i) for i in param]
def surroundBeginEnd(*args):
    if isWin:
        return "\033[{}\033[0m".format("".join(args))
    else:
        return "\033[{}\033[0m".format("".join(args))
def setColor(color, message):
    return surroundBeginEnd(color, "".join(message))

def yellow(args):
    return(setColor("33m", args))
def green(args):
    return(setColor("32m", args))
def red(args):
    return(setColor("31m", args))
    
def info(*args):
    print(yellow(transformTuple(args)))
def success(*args):
    print(green(transformTuple(args)))
def error(*args):
    print(red(transformTuple(args)))

if __name__ == '__main__':
    info("test", "june", "cherry")
    success("ok")
    error("error", "info....", 0)
    print("\033[31mRED\033[0m")