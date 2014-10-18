#!/usr/bin/env python  
#-*- coding: utf-8 -*-
import json
import urllib2

def init_std_kkb():
    ret=[]
    for i in range(7):
        ret.append([])
        for j in range(13):
            ret[i].append({"0":0,"1":0})
    return ret

def get_std_kkb(major):
    std_kkb=init_std_kkb()
   
    for mem in major:
    #遍历专业数组的每一个人
       
        for index in range(0,len(mem['arrKkb'])):
        #遍历空课表,得到每一天
            for i in range(0,len(mem['arrKkb'][index])):
            #b遍历每一天的课表

                flag=mem['arrKkb'][index][i]
                if flag=='0':
                    std_kkb[index][i]['0']+=1
                else:
                    std_kkb[index][i]['1']+=1
   
    ret=[]
    for item in std_kkb:
        str_kkb=""
        for index in range(0,len(item)):
            if item[index]['0']>item[index]['1'] :
                str_kkb+='0'
            else:
                str_kkb+='1'
        ret.append(str_kkb)
    print(ret)
    return ret

#简化空课表
def tran_to_std_kkb_format(user_kkb):
    ret=""
    for char in user_kkb:
        if char!='0':
            ret+='1'
        else:
            ret+='0'

    return ret

#计算不同课表的比例
def get_diff_kkb_percent(std_kkb,user_kkb):
    count=0;
    try:
        if len(std_kkb)!=len(user_kkb):
            
            raise Exception
        index=0
        for index in range(0,len(std_kkb)):
            if std_kkb[index]!=tran_to_std_kkb_format(user_kkb[index]):
                count+=1
        return float(count)/float(len(std_kkb))
    except:
        return 1

def get_kkb_lst(json_kkb_lst):
    ret=[]
    for item in json_kkb_lst:
        ret.append(item['str'])
    return ret

arrDepartName=["秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","JDC","组织部","文娱部","公关部","心理服务部","主席团"]

arrMajorName=["包装工程","软件工程","电气工程及其自动化","自动化","电子信息科学与技术","信息安全","物联网工程"]

response=urllib2.urlopen("http://jnu.eicsu.com/index.php/Center/getarrKkb")
str_json=response.read()
str_json=str_json.decode('UTF-8')


"""[
        {
            "account":"2012052308",
            "apart":"1",
            "major":"1",
            "name":"kanon",
            "arrKkb":[
                {"str":"00012000120"},
                {"str":"12345678"},
                {"str":"2374692348"}
            ]
        },
        {
            "account":"2012052308",
            "apart":"1",
            "major":"1",
            "name":"kanon",
            "arrKkb":[
                {"str":"00012000120"},
                {"str":"12345678"},
                {"str":"2374692348"}
            ]
        }
]"""


arr_json_obj=json.loads(str_json)
dict_major={}

#按专业划分
for item in arr_json_obj:

    mem={"arrKkb":get_kkb_lst(item['arrKkb'])}
    try:
        dict_major[item['major']].append(mem)
    except:
        dict_major[item['major']]=[]
        dict_major[item['major']].append(mem)

#统计专业标准课表
dict_std_kkb={}
for key in dict_major:
#遍历专业划分字典
    dict_std_kkb[key]=get_std_kkb(dict_major[key])

#先打印专业人数
for item in dict_major:
    try:
        print("major:%s,numbers:%d"%(arrMajorName[int(item)].decode('utf-8'),len(dict_major[item])))
    except:
        pass
print("\n\n")

#然后打印不对劲的名单
count=0;
for item in arr_json_obj:
    percent=get_diff_kkb_percent(dict_std_kkb[item['major']],get_kkb_lst(item['arrKkb']))
    if percent>0.3:
        count+=1
        try:
            #raise Exception
            print(
                "account:%s,name:%s,depart:%s,major:%s" % (
                    item['account'],
                    item['name'].decode(),
                    arrDepartName[int(item['apart'])-1].decode('utf-8'),
                    arrMajorName[int(item['major'])].decode('utf-8')
                    )
                )
        except:
            pass
print(count)