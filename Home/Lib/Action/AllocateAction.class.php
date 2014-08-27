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

		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		//非人力部门拒绝访问

		$person_info=$person_model->where("account=$account")->find();
		if($person_info['apartment']!=2)
			$this->redirect('Index/index');
		$name=$person_info['name'];
		$this->assign('account',$account);
		$this->assign('name',$name);
		$this->display();
	}
	//展示空课表
	private function show()
	{
		$this->getKongKeBiao(1);
		$this->display();
	}
	//函数：获取对应部门的空课情况
	private function getKongKeBiao()
	{
		$arrWeek=Array("sun","mon","tue","wed","thu","fri","sat");
		$arrParity=Array(
			0=>"",
			1=>"双周有课",
			2=>"单周有课",
		);
		$person_model=new Model("Person");
		$timetable_model=new Model("Timetable");
		//周一到周日
		for($i=0;$i<7;$i++)
		{
			$weekDay=$arrWeek[$i];
			//第一节到第十三节
			for($j=0;$j<13;$j++)
			{
				unset($strClass);
				$person_info=$person_model->where("apartment=1")->select();
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
				$arrClass[]=$strClass;		
				//echo "今天是周".$weekDay."第".$j."节课，没课的人包括：".$strClass."</br>";
			}
			$arrWeekDay[$weekDay]=$arrClass;
			unset($arrClass);
		}
		//var_dump($arrWeekDay);
		echo $this->_encode($arrWeekDay);
		
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
			"_userType"=>$arrTypeName[$person_info['type']-1],
			"_depart"=>$arrDepartName[$person_info['apartment']-1],
		);
		echo $this->_encode($arr);
	}
	//接收查询条件
	public function getAllocInfo()
	{
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
		}
		else{
			$back="空课时间不为空";
			$timetable_model=new Model("Timetable");
			$person_model=new Model("Person");
			$resource_model=new Model("Resource");
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
				//对符合度大于0的进行添加
				if($num>0)
				{
					unset($data);
					$person_info=$person_model->where("account=$account")->find();
					//对性别进行筛选，对部门进行筛选
					if($person_info['sex']==$sex && $person_info['apartment']!=$apartment)
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
				//echo "今天是".$week.$account."成功匹配了".$num."次</br>";
			}
		}
		$arr=Array(
			"arrAnsPerInfo"=>$arrAnsPerInfo,
			"arrAllocRequire"=>Array(
				'worktime'=>$year."-".$month."-".$day." ".$beginHour.":".$beginMin."--".$endHour.":".$endMin,
				'apartment'=>$apartment,
			),
		);

		//返回JSON数据
		echo $this->_encode($arr);
		//echo $this->_encode($arr);
		
	}
	//接收被勾选的学生的学号信息并返回序列号
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
				$data['year']=$year;
				$data['month']=$month;
				$data['account']=$account;
				$data['waccount']=$waccount;
				$data['code']=$code;
				$data['create_time']=time();
				$data['worktime']=$arrAllocRequire['worktime'];
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
	//接收查询的序列号并返回外调人员
	public function getAllocCode()
	{
		$code=$_POST['allocCode'];
		if(!empty($code))
		{
			$resource_model=new Model("Resource");
			$person_model=new Model("Person");
			$resource_info=$resource_model->select();
			for($i=0;$i<count($resource_info);$i++)
			{
				if($resource_info[$i]['code']==$code)
				{
					$arrStu[]=Array(
						'account'=>$resource_info[$i]['account'],
					);
				}
			}
			for($i=0;$i<count($arrStu);$i++)
			{
				unset($data);
				$account=$arrStu[$i]['account'];
				//echo $account;
				$person_info=$person_model->where("account=$account")->find();
				$data['ID']=$account;
				$data['name']=$person_info['name'];
				$data['allocResult']=3;//暂时默认3
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
	//接收序列号返回取消信息
	public function getAllocCancel()
	{
		$code="20140827-IWZR";//$_POST['allocCode'];
		if(!empty($code))
		{
			$resource_model=new Model("Resource");
			$person_model=new Model("Person");
			$condition['code']=$code;
			$resource_info=$resource_model->where($condition)->find();
			//有匹配
			if($resource_info)
			{
				$arr=Array(
					"exist"=>"exist",
					"code"=>$code,
					"applyTime"=>date("Y-m-d h:i:s",$resource_info['create_time']),
					"operator"=>"邓作恒",
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
