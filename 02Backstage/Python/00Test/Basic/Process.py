from multiprocessing import Process
from os import getpid
from random import randint
from time import time, sleep


def download_mask(filename):
    print("启动下载进程，进程号:{}".format(getpid()))
    print("开始下载{}".format(filename))
    time_to_download = randint(5, 10)
    sleep(time_to_download)
    print("{}下载完成！耗费了{}秒".format(filename, time_to_download))

"""
这块代码中，通过 Process 类创建了进程对象，通过 target 参数传入了一个函数用来表示进程启动后要执行的代码，后面的 args 是一个元组，它代表了要传给函数的参数。Process 对象的 start 方法用来启动进程，而 join 方法表示等待进程结束。

也可以使用 subprocess 模块中的类和函数来创建和启动子进程，然后通过管道和子进程通信。
"""
def mainProcessTest():
    start = time()
    p1 = Process(target=download_mask, args=('IWantBeAwesome.pdf',))
    p1.start()
    p2 = Process(target=download_mask, args=('MustBeAwesome.txt',))
    p2.start()
    p1.join()
    p2.join()
    end = time()
    print("总共花费了{}秒".format(end - start))

if __name__ == '__main__':
    print("Test About Thread & Process")
    mainProcessTest()

