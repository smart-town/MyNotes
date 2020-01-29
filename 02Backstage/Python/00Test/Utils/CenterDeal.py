from GatherInput import *
import Scp
# 核心处理部分

class CoreDeal(object):
    def __init__(self, config):
        if self.checkConfig(config):
            self.config = config
        else:
            print("error, param ", config, " is not valid.")
    def checkConfig(self, config):
        if type(config) == dict:
            provideKeys = list(config)
            requireKeys = ['functions']
            for key in requireKeys:
                if key not in provideKeys :
                    return False
            return True
        else:
            return False
    def dealThings(self):
        initParam = {"path": "E:/MyNotes/02Backstage/Python/00Test/Utils/config.json"}
        configInfo = GatherFileInput(initParam).gatherInputContent()
        print("获得基础信息:", configInfo)
        for function in self.config['functions']:
            print("do function 【%s】" % (function))
    
if __name__ == "__main__":
    initParam = {"functions": ["scp"]}
    CoreDeal(initParam).dealThings()
    getattr(Scp, "LocalCopy")("S", "D").doCopy()