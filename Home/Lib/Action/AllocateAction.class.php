<?php 
/*
人员外调
*/
class AllocateAction extends Action
{
	//首页
	public function index()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		if(!$this->judgelog())
		{
			//尚未登录
			$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
			$this->assign('link',$link);
		}
		else{
			//个人信息
			$account=$_SESSION['account'];
			$person_model=new Model("Person");
			$person_info=$person_model->where("account=$account")->find();
			$name=$person_info['name'];
			$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>&nbsp;";
			$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>&nbsp;";
			$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
			$this->assign('link',$link);
		}
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$resource_model=new Model("Resource");
		
		$arrDepartName=Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
		$arrTypeName=Array("干事","人力干事","部长级","主席团");
		$person_info=$person_model->where("account=$account")->find();

		$name=$person_info['name'];
		//所属部门
		$apartment=$arrDepartName[$person_info['apartment']-1];
		//用户类型
		$type=$arrTypeName[$person_info['type']-1];
		$resource_info=$resource_model->where("account=$account")->select();
		$timeTotal=count($resource_info);
		//找出最近一次外调
		if($timeTotal==0)
		{
			$allocResent=" ";
		}
		else{
			foreach($resource_info as $v)
			{
				$arrAllocTime[]=Array(
					"create_time"=>$v['create_time'],
				);
			}
			sort($arrAllocTime);
			
			$timeResent=$arrAllocTime[count($arrAllocTime)-1]['create_time'];
			
			
			$resource_info=$resource_model->where("create_time=$timeResent")->find();
			$allocResent=$resource_info['code'];
			
		}
		$monthNow=date("n");
		$yearNow=date("Y");
		$resource_info=$resource_model->where("account=$account and month=$monthNow and year=$yearNow")->select();
		//累计外调次数
		$timeNow=count($resource_info);
		
		
		$this->assign('account',$account);
		$this->assign('name',$name);
		$this->assign('type',$type);
		$this->assign('apartment',$apartment);
		$this->assign('timeNow',$timeNow);
		$this->assign('timeTotal',$timeTotal);
		$this->assign('allocResent',$allocResent);
		$this->display();
	}
	//展示空课表
	public function show()
	{
		$apartment=$_GET['apartment'];
		$arrDepartName=Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
		$arr=$this->getKongKeBiao($apartment);
		$this->assign("arr",$arr);
		$this->assign("apartment",$arrDepartName[$apartment-1]);
		$this->display();
	}
	//返回空课表链接
	public function postKongKeBiao()
	{
		for($i=0;$i<12;$i++)
		{
			$arrDepartName=Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
			$apartment=$i+1;
			$arrKKBLinkList[]=Array(
				"name"=>$arrDepartName[$i]."空课表",
				"link"=>__APP__."/Allocate/show?apartment=".$apartment,
			);	
		}
		$arr=Array("arrKKBLinkList"=>$arrKKBLinkList);
		echo $this->_encode($arr);
	}
	//函数：获取对应部门的空课情况
	private function getKongKeBiao($apartment)
	{
		$arrWeek=Array("sun","mon","tue","wed","thu","fri","sat");
		$arrParity=Array(
			0=>"",
			1=>"双周有课",
			2=>"单周有课",
		);
		$person_model=new Model("Person");
		$timetable_model=new Model("Timetable");
		//第一节到第十三节
		for($j=0;$j<13;$j++)
		{
		//周一到周日
			for($i=0;$i<7;$i++)
			{
			$weekDay=$arrWeek[$i];
			

				unset($strClass);
				$person_info=$person_model->where("apartment=$apartment")->select();
				//循环部门1
				foreach($person_info as $v)
				{
					$name=$v['name'];
					$account=$v['account'];
					$timetable_info=$timetable_model->where("account=$account")->find();
					$strClassStatus=$timetable_info[$weekDay];
					$charClassStatus=$strClassStatus[$j];
					switch($charClassStatus)
					{
						case 3: break;
						case 2: $strClass.=$name."(单周有课) "; break;
						case 1: $strClass.=$name."(双周有课) "; break;
						case 0: $strClass.=$name." "; break;
					}
				}
				$arrWeekDay[$weekDay]=$strClass;
				//$arrClass[]=$strClass;		
				//echo "今天是周".$weekDay."第".$j."节课，没课的人包括：".$strClass."</br>";
			
			
			
			}
			$arr[$j]=$arrWeekDay;
			unset($arrWeekDay);
		}
		//var_dump($arr);
		//echo $this->_encode($arrWeekDay);
		return $arr;
		
	}
	//发送个人信息
	public function postUserData()
	{
		$arrDepartName=Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
		$arrTypeName=Array("干事","人力干事","部长级","主席团");
		session_name('LOGIN');
        session_start();		
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$arr=Array(
			"_userID"=>$account,
			"_userType"=>$person_info['type'],
			"_depart"=>$person_info['apartment'],
		);
		echo $this->_encode($arr);
	}
	//查询可调人员：接收查询条件
	public function getAllocInfo()
	{		
		$timetable_model=new Model("Timetable");
		$person_model=new Model("Person");
		$resource_model=new Model("Resource");
		$arrWeek=Array("sun","mon","tue","wed","thu","fri","sat");
		$arrParity=Array(2,1);//1表示双周有课,如果这周是单周，则参加匹配
		$apartment=$_POST['qDepart'];
		$year=$_POST['qYear'];
		$month=$_POST['qMonth'];
		$day=$_POST['qDay'];
		$beginHour=$_POST['qBeginHour'];
		$beginMin=$_POST['qBeginMin'];
		$endHour=$_POST['qEndHour'];
		$endMin=$_POST['qEndMin'];
		$sex=$_POST['qGender'];
		$arrKK=$_POST['qArrKK'];
		//$arrKK为要查询的空课的具体节数
/* 		$arrKK=Array(
			Array('qKongKe'=>0),
			Array('qKongKe'=>1),
			Array('qKongKe'=>2),
			Array('qKongKe'=>3),
		); */
		//echo $this->_encode($arrKK);
		$beginstamp=mktime($beginHour,$beginMin,0,$month,$day,$year);
		$endstamp=mktime($endHour,$endMin,0,$month,$day,$year);
		$timestamp=mktime(0,0,0,$month,$day,$year);
		//星期几
		$week=$arrWeek[date("w",$timestamp)];
		//根据时间计算是单周还是双周
		$time=date("W",$timestamp);
		//$time="一年中的".$time."周，模2结果：".$time%2;
		if(($time%2)==1)
		{
			$time="单周";
			$parity=1;
		}
		else
		{
			$time="双周";
			$parity=0;
		}
		//echo "这一天是".$parity."周，课表情况为：".$arrParity[$parity]."</br>";
		//判断空课时间是否为空
		if(empty($arrKK))
		{
			$back="空课时间为空";
			$timetable_info=$timetable_model->select();	
			foreach($timetable_info as $v)
			{
				$account=$v['account'];
				$num=1;//记录是否能够外调次数
				$resource_info=$resource_model->where("account=$account and (year=$year and month=$month and day=$day)")->select();
				foreach($resource_info as $v)
				{
					if($v['beginstamp']<$endstamp && $v['endstamp']>$beginstamp)
					{
						$num=0;
						break;
					}
				}
				//对符合度大于0的进行添加
				if($num>0)
				{
					unset($data);
					$person_info=$person_model->where("account=$account")->find();
					//对性别进行筛选，对部门进行筛选
					if(($person_info['sex']==$sex || $sex==0)){
					if($person_info['apartment']!=$apartment)
					{
						//今年本月
						$monthNow=date("n");
						$yearNow=date("Y");
						$recently_alloc_time=$resource_model->where("account=$account and year=$yearNow and month=$monthNow")->select();
						$total_alloc_time=$resource_model->where("account=$account")->select();
						$data['conformity']=$num/count($arrKK);
						$data['userID']=$account;
						$data['userName']=$person_info['name'];
						$data['freeTime']=$num/count($arrKK);
						$data['depart']=$person_info['apartment'];
						$data['userType']=$person_info['type'];
						$data['gender']=$person_info['sex'];
						$data['longPhoneNumber']=empty($person_info['phone'])?" ":$person_info['phone'];
						$data['shortPhoneNumber']=empty($person_info['short'])?" ":$person_info['short'];
						$data['recently_alloc_time']=count($recently_alloc_time);
						$data['total_alloc_time']=count($total_alloc_time);
						//echo $this->_encode($data);
						$arrAnsPerInfo[]=$data;
					}
					}
					
				}
				//echo "今天是".$week.$account."成功匹配了".$num."次</br>";
			}
		}
		else{
			$back="空课时间不为空";
			$timetable_info=$timetable_model->select();	
			foreach($timetable_info as $v)
			{
				$account=$v['account'];

				$str=$v[$week];//找到要求的星期X的序列,长度为13，即一整天的课
				//echo $account."的星期序列是：".$str."参与匹配的单双周是：".$arrParity[$parity]."</br>";
				$num=0;//记录匹配中的次数
				for($i=0;$i<count($arrKK);$i++)
				{
					//echo $account."第".$i."节课的值是：".$str[$arrKK[$i]['qKongKe']]."</br>";
					//匹配是否没课，匹配单双周情况
					if($str[$arrKK[$i]['qKongKe']]==0 || $str[$arrKK[$i]['qKongKe']]==$arrParity[$parity])
					{
						$num++;
					}
				}
				$resource_info=$resource_model->where("account=$account and (year=$year and month=$month and day=$day)")->select();
				foreach($resource_info as $v)
				{
					if($v['beginstamp']<$endstamp && $v['endstamp']>$beginstamp)
					{
						$num=0;
						break;
					}
				}
				//对符合度大于0的进行添加
				if($num>0)
				{
					unset($data);
					$person_info=$person_model->where("account=$account")->find();
					//对性别进行筛选，对部门进行筛选
					if(($person_info['sex']==$sex || $sex==0)){
					if($person_info['apartment']!=$apartment)
					{
						//今年本月
						$monthNow=date("n");
						$yearNow=date("Y");
						$recently_alloc_time=$resource_model->where("account=$account and year=$yearNow and month=$monthNow")->select();
						$total_alloc_time=$resource_model->where("account=$account")->select();
						$data['conformity']=$num/count($arrKK);
						$data['userID']=$account;
						$data['userName']=$person_info['name'];
						$data['freeTime']=$num/count($arrKK);
						$data['depart']=$person_info['apartment'];
						$data['userType']=$person_info['type'];
						$data['gender']=$person_info['sex'];
						$data['longPhoneNumber']=empty($person_info['phone'])?" ":$person_info['phone'];
						$data['shortPhoneNumber']=empty($person_info['short'])?" ":$person_info['short'];
						$data['recently_alloc_time']=count($recently_alloc_time);
						$data['total_alloc_time']=count($total_alloc_time);
						//echo $this->_encode($data);
						$arrAnsPerInfo[]=$data;
					}
					}
				}
				//echo "今天是".$week.$account."成功匹配了".$num."次</br>";
			}
		}
		$arr=Array(
			"arrAnsPerInfo"=>$arrAnsPerInfo,
			"arrAllocRequire"=>Array(
				'worktime'=>$year."-".$month."-".$day." ".$beginHour.":".$beginMin."--".$endHour.":".$endMin,
				'apartment'=>$apartment,
			),
			"arrTime"=>Array(
				"year"=>$year,
				"month"=>$month,
				"day"=>$day,
				"beginstamp"=>$beginstamp,
				"endstamp"=>$endstamp,
			),
		);

		//返回JSON数据
		echo $this->_encode($arr);
		//echo $this->_encode($arr);
		
	}
	//查询可调人员：接收被勾选的学生的学号信息并返回序列号
	public function postAllocCode()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		$waccount=$_SESSION['account'];
		$arrChar=Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		$list=$_POST['jsonITList'];
		$arrTime=$_POST['arrTime'];
		$arrAllocRequire=$_POST['arrAllocRequire'];
		if(!empty($list)&&!empty($arrAllocRequire))
		{
			$year=date("Y");
			$month=date("n");
			for($i=0;$i<4;$i++)
			{
				$rand.=$arrChar[rand(0,25)];
			}
			$code=$year.date("m").date("d")."-".$rand;
			//echo $code;
			$resource_model=new Model("Resource");
			
			for($i=0;$i<count($list);$i++)
			{
				$account=$list[$i]['strID'];
				unset($data);
				$data['year']=$arrTime['year'];
				$data['month']=$arrTime['month'];
				$data['day']=$arrTime['day'];
				$data['account']=$account;
				$data['waccount']=$waccount;
				$data['code']=$code;
				$data['create_time']=time();
				$data['worktime']=$arrAllocRequire['worktime'];
				$data['beginstamp']=$arrTime['beginstamp'];
				$data['endstamp']=$arrTime['endstamp'];
				$data['apartment']=$arrAllocRequire['apartment'];
				$data['assess']=3;
				$resource_model->data($data)->add();
			}
		}
		//返回JSON数据
		$arr=Array(
			"code"=>$code,
		);
		echo $this->_encode($arr);
	}
	//签到签离记录；接收查询的序列号并返回外调人员
	public function getAllocCode()
	{
		$code=$_POST['allocCode'];
		//$code="20140827-FAYE";
		if(!empty($code))
		{
			$resource_model=new Model("Resource");
			$person_model=new Model("Person");
			$condition['code']=$code;
			$resource_info=$resource_model->where($condition)->select();
			for($i=0;$i<count($resource_info);$i++)
			{
				$arrStu[]=Array(
					'account'=>$resource_info[$i]['account'],
					'assess'=>empty($resource_info[$i]['assess'])?3:$resource_info[$i]['assess'],
				);
				
			}
			for($i=0;$i<count($arrStu);$i++)
			{
				unset($data);
				$account=$arrStu[$i]['account'];
				$assess=$arrStu[$i]['assess'];
				//echo $account;
				$person_info=$person_model->where("account=$account")->find();
				$data['ID']=$account;
				$data['name']=$person_info['name'];
				$data['allocResult']=$assess;//暂时默认3
				$arrAllocedList[]=$data;
			}
			$arr=Array(
				"arrAllocedList"=>$arrAllocedList,
			);
		}
		else{
			$arr=Array(
				"arrAllocedList"=>Array(),
			);
		}
		echo $this->_encode($arr);
	}
	//签到签离记录；获取外调表现评价
	public function getAllocPerform()
	{
		$arrAllocedPerf=$_POST['arrAllocedPerf'];
		$AlloCode=$_POST['AllocCode'];
		//$back="不要爆粗口";
		
		
			$resource_model=new Model("Resource");
			//$back.="不想再这么辛苦了";
			for($k=0;$k<count($arrAllocedPerf);$k++)
			{
				
				$data['account']=$arrAllocedPerf[$k]['ID'];
				$data['assess']=$arrAllocedPerf[$k]['BX'];
				
				unset($condition);
				//$back.="最后一战".$AlloCode.$arrAllocedPerf[$k]['ID'].$arrAllocedPerf[$k]['BX'];
				$condition['code']=$AlloCode;
				$condition['account']=$arrAllocedPerf[$k]['ID'];
				$resource_info=$resource_model->where($condition)->data($data)->save();
			}	
		
		$arr=Array(
			"back"=>$_POST['AllocCode'],
		);
		echo $this->_encode($arr);
		
	}
	//取消/修改外调：接收序列号返回取消信息
	public function getAllocCancel()
	{
		$code=$_POST['allocCode'];
		if(!empty($code))
		{
			$resource_model=new Model("Resource");
			$person_model=new Model("Person");
			$condition['code']=$code;
			$resource_info=$resource_model->where($condition)->find();
			//有匹配
			if($resource_info)
			{
				$waccount=$resource_info['waccount'];
				$person_info=$person_model->where("account=$waccount")->find();
				$arr=Array(
					"exist"=>"exist",
					"code"=>$code,
					"applyTime"=>date("Y-m-d h:i:s",$resource_info['create_time']),
					"operator"=>$person_info['name'],
					"applyDepart"=>$resource_info['apartment'],
					"workTime"=>$resource_info['worktime'],
				);
			}
		}
		echo $this->_encode($arr);
	}
	//接收序列号并取消外调
	public function setAllocCancel()
	{
		$code=$_POST['allocCode'];
		if(!empty($code))
		{
			$resource_model=new Model("Resource");
			$condition['code']=$code;
			if($resource_info=$resource_model->where($condition)->delete())
			{
				$back=true;
			}
			else{
				$back=false;
			}
		}
		$arr=Array(
			"back"=>$back,
		);
		echo $this->_encode($arr);
	}

 //每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
  public function judgelog()
  {
		$judgelog=1;
		session_name('LOGIN');
		session_start();
		if(empty($_SESSION['account'])||empty($_SESSION['random']))
		{
			$judgelog=0;
		}
		else
		{
			$account=$_SESSION['account'];
			$random=$_SESSION['random'];
			$login_model=new Model("Login");
			$login_info=$login_model->where("account=$account and random=$random")->find();
			if(!$login_info)
			{
				//随机数不一样，覆盖掉			
				$judgelog=0;		
			}

		}
		return $judgelog;
	}
  //调用—_encode()函数，将数组进行编码转哈
   public  function _encode($arr)
  {
    $na = array();
    foreach ( $arr as $k => $value ) {  
      $na[$this->_urlencode($k)] = $this->_urlencode ($value);  
    }
    //return addcslashes(urldecode(json_encode($na)),"\\r");
	return urldecode(json_encode($na));
  }
   public function _urlencode($elem)
  {
    if(is_array($elem)){
    foreach($elem as $k=>$v){
      $na[$this->_urlencode($k)] = $this->_urlencode($v);
    }
    return $na;
  }
  return urlencode($elem);
  }	
}
?>
