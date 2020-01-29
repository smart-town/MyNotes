from random import randint
from threading import Thread
from time import time, sleep

def download(filename):
    print(f'开始下载{filename}')
    time_to_download = randint(5,10)
    sleep(time_to_download)
    print(f'{filename} download over.cost {time_to_download}s.')

def threadTest():
    start = time()
    t1 = Thread(target=download, args=('File1.pdf',))
    t1.start()
    t2 = Thread(target=download, args=('File2.pdf',))
    t2.start()
    t1.join()
    t2.join()
    end = time()
    print(f'total const {start-end}s')

class DownloadTask(Thread):
    def __init__(self, filename):
        super().__init__()
        self._filename = filename
    
    def run(self):
        print("Begin Download ", self._filename)
        time_to_download = randint(1,5)
        sleep(time_to_download)
        print(f'{self._filename} download over! cost {time_to_download}s')

if __name__ == '__main__':
    print("-----Test About Thread-----")
    # threadTest()
    DownloadTask("'testInherit Thread.pdf'").start()