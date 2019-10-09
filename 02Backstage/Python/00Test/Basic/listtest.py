from CommonUtils import modulePerform
import sys

def listBasic():
    list1 = [1,3,5,7,100]
    print(list1)

    # * 表示元素重复                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    list2 = ['hello']*3
    print(list2)

    print("Test About Circle Get Value:")
    for value in list1:
        print(value)
    for index in range(len(list1)):
        print(index)
    for index,element in enumerate(list1):
        print(f"list1[{index}]={element}")
    
    print("Test Operation")
    list1.append(101)
    list1.insert(0,2)
    print(list1)

    list1 += list2
    print(list1)

    # 删除..
    print("\nDelete element, remove(ele)")
    if 1 in list1:
        list1.remove(1)
        print(list1)
    
    print("\nDelete the value pointed: pop(position)")
    list1.pop(1)
    print(list1)

def generateList():
    print("\nTest generate expression")
    f = [x for x in range(1,20)]
    print(f'f:{f} size:{sys.getsizeof(f)}')

    print("\nTest generate object")
    f = (x for x in range(1,20))
    print(f'f:{f} size:{sys.getsizeof(f)}')
    for x in f:
        print(x,",", end="")
    print()

def tupleBasic():
    print("\nTest About Tuple")
    t = ("HHG","male")
    print(t)
    temp = list(t)
    # t[0] = '22' # TypeError
    temp[0] = "22"
    t = tuple(temp)
    print(t)

def setBasic():
    print("\nTest About set")
    set1 = {1,3,3,3,2,2}
    print(f"\\{1,3,3,3,2,2}.length={len(set1)}")
    set2 = set(range(4))
    print(set2)
    set2.update([12,32])
    print(set2)

def dictionaryTest():
    dic1 = {"name":"hhg","sex":"male","job":"IT"}
    print(dic1)
    for ele in dic1:
        print(f"dic1[{ele}] = {dic1[ele]}",end="  ")
    print()
    

def performModule():
    listBasic()
    generateList()
    tupleBasic()
    setBasic()
    dictionaryTest();


modulePerform(performModule,__name__)