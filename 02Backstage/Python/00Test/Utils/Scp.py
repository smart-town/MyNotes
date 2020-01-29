""" copy source files to destination """
import os
import OsOrders


class CopyBasic(object):
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination
    def dealRemote(data):
        if type(data) == dict:
            return "{}@{}".format(data["user"], data["host"])
        else:
            return data
    def doCopy(self):
        pass

class ScpCopy(CopyBasic):
    def __init__(self, source, destination, remote=""):
        super(source, destination)
        self.remote = remote

    def doCopy(self):
        order = OsOrders.doScp(self.remote, self.source, self.destination)
        
        print("do scp: %s" % (order))

class LocalCopy(CopyBasic):
    def doCopy(self):
        print("do local copy %s -> %s" % (self.source, self.destination))

if __name__ == "__main__":
    LocalCopy("C:", "D:").doCopy()
    ScpCopy("C:/Users/luhha/Desktop", "C:/Users/luhha/Desktop/test", "root@127.0.0.1").doCopy()
