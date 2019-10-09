def modulePerform(callback,name):
    if name == '__main__':
        callback()

def test():
    print('test')

if __name__ == '__main__':
    print("CommonUtils")
else:
    print("CommonUtils has been loaded!")
