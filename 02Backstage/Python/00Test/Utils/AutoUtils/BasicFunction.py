# Function Basic.
import subprocess
import ColorPrint
from Scp import LocalCopy

class NormalExecute(object):
    @staticmethod
    def execute(orders, options=""):
        for order in orders:
            ColorPrint.info(">>>start execute [{}]".format(order))
            result = subprocess.run(order, shell=True)
            if result.returncode != 0:
                ColorPrint.error(">>>execute {} error!".format(result.args))
            else:
                ColorPrint.info(">>>end execute [{}]".format(order))

if __name__ == "__main__":
    NormalExecute.execute(["dir /B .", "dir /B C:\\Users\\luhha\\Desktop\\"], "")
