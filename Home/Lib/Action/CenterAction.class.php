<?php
/*
*CenterAction个人中心控制器，完成个人中心模块的各种功能
*/
class CenterAction extends Action
{
	
	//index为首页，只负责渲染首页，
	public function index()
	{   
		//拒绝未登录访问
	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
    session_name('LOGIN');
    session_start();
	
	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
	else{
		$account=$_SESSION['account'];	
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$this->assign('account',$account);
		$this->assign('name',$name);
		$this->display();
		}

	}
	//index的js脚本请求个人信息，message找到数据整理后返回json数据
	public function message()
	{

		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		
		//查找数据
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		//$this->ajaxReturn("$person_info","查找成功",1);
		if(($person_info['major'])=='')
			$person_info['major']=-1;
		if(($person_info['birthtype'])=='')
			$person_info['birthtype']=-1;
		if(($person_info['birthmonth'])=='')
			$person_info['birthmonth']=-1;
		if(($person_info['birthday'])=='')
			$person_info['birthday']=-1;
		if(($person_info['grade'])=='')
			$person_info['grade']=-1;
        $arr=Array(
			//账户信息
			'account'=>$person_info['account'],
		    'name'=>$person_info['name'],
		    'type'=>$person_info['type'],
			'apartment'=>$person_info['apartment'],
			'position'=>$person_info['position'],
			//个人信息     
		    'sex'=>$person_info['sex'],
		    'grade'=>$person_info['grade'],
		    'major'=>$person_info['major'],
			'birthtype'=>$person_info['birthtype'],
			'birthmonth'=>$person_info['birthmonth'],
			'birthday'=>$person_info['birthday'],
			//联系方式
			'phone'=>$person_info['phone'],
			'short'=>$person_info['short'],
			'qq'=>$person_info['qq'],
			'dorm'=>$person_info['dorm'],
			'mail'=>$person_info['mail'],
		);
		echo $this->_encode($arr);
		//第二个参数JSON_UNESCAPED_UNICODE只适用于php版本5.4以上的，这个版本刚好合适
       // echo json_encode($arr,JSON_UNESCAPED_UNICODE);

	}
	//index的js脚本请求通讯录信息，address找到数据整理后返回json数据
	public function address()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		$person_model=new Model("Person");

		$person_info=$person_model->select();
			foreach($person_info as $value)
			{
				$arr[]=$this->getAddress($value['account']);
			}
			

		
		echo $this->_encode($arr);
		
	}
	private function getAddress($account)
	{	
		$apartArr=Array("秘书处","人力资源部","宣传部","信息编辑部",
			"学术部","体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
		$postArr=Array("干事","人力干事","部长级","主席团");
		$person_model=new Model("Person");
		$v=$person_model->where("account=$account")->find();
		if(($v['position'])=='')
			$v['position']=" ";
		if(($v['qq'])=='')
			$v['qq']=" ";
		if(($v['phone'])=='')
			$v['phone']=" ";
		if(($v['short'])=='')
			$v['short']=" ";
		if(($v['dorm'])=='')
			$v['dorm']=" ";
		if(($v['birthtype'])=='')
			$v['birthtype']=-1;
		if(($v['birthmonth'])=='')
			$v['birthmonth']=-1;
		if(($v['birthday'])=='')
			$v['birthday']=-1;
		if(($v['grade'])=='')
			$v['grade']=-1;
		if(($v['major'])=='')
			$v['major']=-1;
		unset($data);
		$data['depart']=$v['apartment'];
		$data['post']=$v['position'];
		$data['name']=$v['name'];
		$data['QQNum']=$v['qq'];
		$data['longPhoneNum']=$v['phone'];
		$data['shortPhoneNum']=$v['short'];		
		$data['dormNO']=$v['dorm'];
		$data['birType']=$v['birthtype'];
		$data['month']=$v['birthmonth'];
		$data['day']=$v['birthday'];
		$data['grade']=$v['grade'];
		$data['major']=$v['major'];
		return $data;
	}
	//index的js脚本请求空课表信息，table找到数据整理后返回json数据
	public function table()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');	
		//查找数据
		$account=$_SESSION['account'];
/* 		$arr=array_fill(0,13,0);
		unset($str);
		for($i=0;$i<count($arr);$i++)
		{
			$str.=$arr[$i];
		}
		//echo $str; */
		$timetable_model=new Model("Timetable");
		$timetable_info=$timetable_model->where("account=$account")->find();		
		$mon=$timetable_info['mon'];
		$tue=$timetable_info['tue'];
		$wed=$timetable_info['wed'];
		$thu=$timetable_info['thu'];
		$fri=$timetable_info['fri'];
		$sat=$timetable_info['sat'];
		$sun=$timetable_info['sun'];
		$tableData[]=str_split($sun);
		$tableData[]=str_split($mon);
		$tableData[]=str_split($tue);
		$tableData[]=str_split($wed);
		$tableData[]=str_split($thu);
		$tableData[]=str_split($fri);
		$tableData[]=str_split($sat);
		
		//返回json数据
		echo $this->_encode($tableData);
		
		
	}
	//接收前端发送的修改后的课表数据
	public function gettable()
	{
	/* 有课，单周有课，双周有课，没课赋值3 2 1 0 */

		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');	
		//查找数据
		$account=$_SESSION['account'];
		$sun=$this->changeClass($_POST['sun']);
		$mon=$this->changeClass($_POST['mon']);
		$tue=$this->changeClass($_POST['tue']);
		$wed=$this->changeClass($_POST['wed']);
		$thu=$this->changeClass($_POST['thu']);
		$fri=$this->changeClass($_POST['fri']);
		$sat=$this->changeClass($_POST['sat']);
		$data['sun']=$sun;
		$data['mon']=$mon;
		$data['tue']=$tue;
		$data['wed']=$wed;
		$data['thu']=$thu;
		$data['fri']=$fri;
		$data['sat']=$sat;
		$timetable_model=new Model("Timetable");
		$timetable_info=$timetable_model->where("account=$account")->save($data);
		$back=1;
		if(false==$timetable_info)
		{
			$back=0;
		}
		$arr=Array(
			'back'=>$back,
		);
		echo $this->_encode($arr);
	}
	//函数：修改课表
	private function changeClass($day)
	{	
		$arr=Array(
			"有课"=>3,
			"单周有课"=>2,
			"双周有课"=>1,
			"没课"=>0,
		);
		for($i=0;$i<13;$i++)
		{
			$day[$i]=$arr[$day[$i]];
		}
		for($i=0;$i<13;$i++)
		{
			$str.=$day[$i];
		}
		return $str;
	}
	//modify为修改个人信息的数据库操作
	public function modify()
	{
		
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		/*
		//不是js请求拒绝访问
		if(empty($_POST['account']))
			$this->redirect('Center/index');
*/
		//接收index脚本传过来的json数据,并将数据存入数据库中
		$account=$_SESSION['account'];
		
		$data=Array(
			//账户信息
		
			'account'=>$_SESSION['account'],
		    'name'=>$_POST['name'],
		    'type'=>$_POST['type'],
			'apartment'=>$_POST['apartment'],
			'position'=>$_POST['position'],
			//个人信息     
		    'sex'=>$_POST['sex'],
		    'grade'=>$_POST['grade'],
		    'major'=>$_POST['major'],
			
			'birthtype'=>$_POST['birthtype'],
			'birthmonth'=>$_POST['birthmonth'],
			'birthday'=>$_POST['birthday'],
			//联系方式
			
			'phone'=>$_POST['phone'],
			'short'=>$_POST['short'],
			'qq'=>$_POST['qq'],
			'dorm'=>$_POST['dorm'],
			'mail'=>$_POST['mail'],
			
		);
		
		//$data['birthmonth']="三月";
		$person_model=M('Person');
		if($person_model->where("account=$account")->save($data))
			$flag=1;
		else
			$flag=0;
		//var_dump($_POST['data']);
		//flag为1表示正常
		//$data=$_POST['name'];
		$arr=Array('name'=>$_POST['name'],'account'=>$account,'status'=>$flag);
		//$arr=Array('status'=>$flag.$_POST['birthmonth']);
		echo $this->_encode($arr);
		//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	}
	//check 为帮助判断传过来的密码是否为正确的
	public function check()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		//接收index脚本传过来的json数据,并将数据存入数据库中
		$account=$_SESSION['account'];
		$person_model=M('Person');
		$person_info=$person_model->where("account=$account")->find();
		$password_base=$person_info['password'];
		//判断是否密码==学号
		if($password_base==$account)
			$password_base=md5($password_base);		
		if($password_base==$_POST['password'])
			$flag=1;
		else
			$flag=0;
		//flag为1表示正常
		$status="JS传过来的是：".$_POST['password']."数据库里的是".$password_base;
		$arr=Array('flag'=>$flag,"status"=>$status,);
		echo $this->_encode($arr);
	}
	//修改密码
	public function change()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Login/index');
		$account=$_SESSION['account'];
		$data['password']=$_POST['password'];//"2012052308";
		$person_model=M('Person');
		$person_info=$person_model->where("account=$account")->save($data);
		$person_info2=$person_model->where("account=$account")->find();
		$password_base=$person_info2['password'];
		$status="JS传过来的是：".$_POST['password']."数据库里的是".$password_base;
		if(false==$person_info)
			$flag=1;
		else
			$flag=0;
		$arr=Array('status'=>$status,'flag'=>$flag);
		echo $this->_encode($arr);

	}
	//发送课表情况
	public function getarrKkb()
	{
		$person_model=new Model("Person");
		$timetable_model=new Model("Timetable");
		$person_info=$person_model->where("type=1 or type=2")->select();
		foreach($person_info as $v)
		{
			$gs_account=$v['account'];
			$timetable_info=$timetable_model->where("account=$gs_account")->find();
			$arrKkb[]=Array(
				"account"=>$gs_account,
				"name"=>$v['name'],
				"apart"=>$v['apartment'],
				"major"=>$v['major'],
				"arrKkb"=>Array(
					Array('str'=>$timetable_info['mon']),
					Array('str'=>$timetable_info['tue']),
					Array('str'=>$timetable_info['wed']),
					Array('str'=>$timetable_info['thu']),
					Array('str'=>$timetable_info['fri']),
					Array('str'=>$timetable_info['sat']),
					Array('str'=>$timetable_info['sun']),
					)
			);
		}
		echo $this->_encode($arrKkb);
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

}
?>