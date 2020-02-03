# -*- coding:utf-8 -*-
from GatherInput import *
import Scp
import ColorPrint
import BasicFunction
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

    def showTips(self, config):
        for i in range(len(config["tasks"])):
            task = config["tasks"][i]
            ColorPrint.info("{:^3}{}".format(i+1, task["des"]))

    def getChoose(self, config):
        choose = int(input(ColorPrint.green("Please Choose Num: ")))
        tasksLen = len(config["tasks"])
        ColorPrint.success("You choosed {}".format(choose))
        if choose > 0 & choose <= tasksLen:
            return choose - 1
        else:
            raise ValueError("the number you typed is not valid.")

    def doOperation(self, choose, configInfo):
        task = configInfo["tasks"][choose];
        ColorPrint.info(">>> BEGIN: {}".format(task["des"]))
        schemes = task["schemes"]
        for scheme in schemes:
            if "order" in list(scheme):
                BasicFunction.NormalExecute.execute((scheme["order"],))
            else:
                print("modules:", dir(BasicFunction))
        ColorPrint.info(">>> END: {}".format(task["des"]))

    def dealThings(self):
        try:
            initParam = {"path": "E:/MyNotes/02Backstage/Python/00Test/Utils/AutoUtils/config.json"}
            configInfo = GatherFileInput(initParam).gatherInputContent()
            self.showTips(configInfo)
            choose = self.getChoose(configInfo)
            self.doOperation(choose, configInfo)
        except ValueError as e:
            ColorPrint.error("[ValueError] ", e)
        except Exception as ex:
            print(ColorPrint.red("[exception]"), ex)

if __name__ == "__main__":
    initParam = {"functions": ["scp"]}
    CoreDeal(initParam).dealThings()
    # getattr(Scp, "LocalCopy")("S", "D").doCopy()