# utf-8
import json

class GatherInput(object):
    """
    Basic Gather Info.....
    """
    def __init__(self, config):
        self.config = config
    
    def gatherInputContent(self):
        print("收集信息")

class GatherFileInput(GatherInput):
    def gatherInputContent(self):
        print("根据配置文件内容获取基础信息")
        with open(self.config["path"], encoding="utf-8") as f:
            info = json.load(f)
        return info

if __name__ == '__main__':
    print("This is GatherInput Module")
    initConfig = {'path':"./config.json"}
    gatherTest = GatherFileInput(initConfig)
    info = gatherTest.gatherInputContent()
    print(info)