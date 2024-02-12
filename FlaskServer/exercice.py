import random 

# generate global list 
globalList = []
for k in range (6):
    addedList = []
    for k in range (5):
        addedList.append(random.randint(1,8))
    globalList.append(addedList)

def determineMaxWay(list):
    returnedList = []
    for k in range (len(list)):
        if k == 0 :
            returnedList.append(list[k])
            pass
        cloneList = []
        for i in range (len(list[k])):
            if(i+list[k-1][i] > max) : max = i+list[k-1][i] 
