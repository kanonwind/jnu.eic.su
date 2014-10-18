#!/usr/bin/env python  
#-*- coding: utf-8 -*-
import json

arrDepartName=["秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","JDC","组织部","文娱部","公关部","心理服务部","主席团"]

arrMajorName=["包装工程","软件工程","电气工程及其自动化","自动化","电子信息科学与技术","信息安全","物联网工程"]

str='[{"account":"2012052308","apart":"1","major":"1","name":"kanon","arrKkb":[{"str":"00012000120"},{"str":"12345678"},{"str":"2374692348"}]},{"account":"2012052308","apart":"1","major":"1","name":"kanon","arrKkb":[{"str":"00012000120"},{"str":"12345678"},{"str":"2374692348"}]}]'
o=json.loads(str)
print(o[1]['account'])
print(o[1]['name'])
print(arrDepartName[int(o[1]['apart'])].decode('UTF-8'))
print(arrMajorName[int(o[1]['major'])].decode('UTF-8'))
for s in o[1]['arrKkb']:
    print(s['str'])