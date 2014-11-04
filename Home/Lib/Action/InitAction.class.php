<?php
/*
*系统初始化说明：
1、最基本的数据要求包括：人员信息初始化、空课表、人力干事跟进部门、主席主管部门，如果没能达到这是个要求，不能使用绩效考核和外调
2、满足了最基本的数据要求之后，根据时间初始化一次绩效考核
*/
class InitAction extends Action
{
  //管理员登录界面
  public function login()
  {
	$this->display();
  }
  //管理员登录检查
	//check为登录验证界面
	public function check()
	{
	    //先判断session
		session_name('LOGIN');
        session_start();
		$person_model=new Model("Person");
        if($this->judgelog())		
		{
			//如果当前有已经登录，直接跳转到新闻首页，只能通过注销或者关闭浏览器来退出	  
            $this->redirect();		
		}
	    $account=$_POST['user_login_name'];
	    $password=$_POST['user_login_pw'];
		$person_model=new Model("Person");
		$flag=0;//验证不通过即为0
		if($person_info=$person_model->where("account=$account")->find())
		{
			$password_base=$person_info['password'];
			if($password_base==$password || md5($password_base)==$password)
			{
				$flag=1;
			}
		}
		if($flag==1) 
         { 
			$random=rand(0,100);
			$random.=rand(0,100);
			$random.=rand(0,100);
			//用户账号、随机数同时存入数据库和SESSION中
           $_SESSION['account']=$account;
		   $_SESSION['random']=$random;
		   unset($data);
		   $data['account']=$account;
		   $data['random']=$random;
		   $login_model=new Model("Login");
		   if($login_info=$login_model->where("account=$account")->find())
		   {
				//直接覆盖
				$login_model->where("account=$account")->save($data);
		   }
		   else{
				//不存在则增加
				$login_model->data($data)->add();
		   }

			//判断是否保持登录状态
			if($_POST['keep_login']=="keep")
			{
		   		setcookie("account",$account,time()+7*24*3600);//cookie时间设置为7天，一周时间
				setcookie("password",$password,time()+7*24*3600);			
				
			}
			else{	
				setcookie("account","",0);
				setcookie("password","",0);
				
			}
			$this->redirect("Init/index");
	    }
		else
		  $this->redirect("Init/login");
	}
 	//每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
	public function judgelog()
	{
		$judgelog=1;//已登录
		session_name('LOGIN');
		session_start();
		//SESSION为空肯定未登录
		if(empty($_SESSION['account'])||empty($_SESSION['random']))
		{
			$judgelog=0;
		}
		else
		{
			//SESSION不为空，但随机数验证不一致，表示在其他地方登录上次非正常退出，视为未登录
			$account=$_SESSION['account'];
			$random=$_SESSION['random'];
			$login_model=new Model("Login");
			$login_info=$login_model->where("account=$account")->find();
				//var_dump($login_info);
			if($login_info['random']!=$random)
			{
				//随机数不一样，覆盖掉			
				$judgelog=0;		
			}

		}


		return $judgelog;
	}
  //管理界面
  public function index()
  {
    if(!$this->judgelog())
		$this->redirect("Init/login");
	$person_model=new Model("Person");
	$bz_account=$_SESSION['account'];
	$person_info=$person_model->where("account=$bz_account")->find();
	if($person_info['apartment']!=2 || $person_info['type']!=3)
		$this->redirect("Index/index");
	//如果没有满足最基本的人员要求，拒绝访问
	$authority_model=new Model("Authority");
	$authority_info=$authority_model->find();
	if($authority_info['is_init']==1)
		$this->display();
	else
	{
		$this->redirect();
	}
  }
  //向前端发送主席主管部门,人力跟进部门，违规登记负责人信息
  public function getJsonAdmin()
  {
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$rlgj_model=new Model("Rlgj");
	$bmwgfzr_model=new Model("Bmwgfzr");
	//主席团
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
		$account=$v['account'];
		$name=$v['name'];
		$president_info=$president_model->where("account=$account")->find();
		$presidentArr=explode("|",$president_info['apartment']);
		for($i=0;$i<count($presidentArr);$i++)
		{
				$department[]=Array(
					'num'=>$presidentArr[$i],
				);
		}
		$arrZXT[]=Array(
			'account'=>$account,
			'name'=>$name,
			'department'=>$department,
		);
		unset($department);
	}
	//人力干事跟进
	$person_info=$person_model->where("type=2 and apartment=2")->select();
	foreach($person_info as $v)
	{
		$account=$v['account'];
		$name=$v['name'];
		$rlgj_info=$rlgj_model->where("account=$account")->find();
		$department=$rlgj_info['apartment'];
		$arrRLGS[]=Array(
			'account'=>$account,
			'name'=>$name,
			'department'=>$department,
		);
	}
	//指定主席
	$president_info=$president_model->where("is_sub='n'")->find();
	if(empty($president_info['account']))
	{
		$person_info=$person_model->where("type=4")->find();
		$chairmanAccount=$person_info['account'];
		$chairmanName=$person_info['name'];
	}
	else
	{
		$chairmanAccount=$president_info['account'];
		$person_info=$person_model->where("account=$chairmanAccount")->find();
		$chairmanName=$person_info['name'];
	}
	$chairman=Array(
		'account'=>$chairmanAccount,
		'name'=>$chairmanName,
		);

	//违规登记负责人
	$bmwgfzr_info=$bmwgfzr_model->where("type=1")->find();
	$MSWJDJR=$bmwgfzr_info['account'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=2")->find();
	$RLWJDJR=$bmwgfzr_info['account'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=3")->find();
	$XCWJDJR=$bmwgfzr_info['account'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=4")->find();
	$XBWJDJR=$bmwgfzr_info['account'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=5")->find();
	$GGWJDJR=$bmwgfzr_info['account'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=6")->find();
	$SYLYWJDJR=$bmwgfzr_info['account'];
	$person_info=$person_model->where("type!=4")->select();
	foreach($person_info as $v)
	{
		$allStudentName[]=Array(
			'account'=>$v['account'],
			'name'=>$v['name'],
		);
	}
	$arr=Array(
		'arrZXT'=>$arrZXT,
		'arrRLGS'=>$arrRLGS,
		'chairman'=>$chairman,
        "MSWJDJR"=>$MSWJDJR,//秘书处违纪登记人
        "RLWJDJR"=>$RLWJDJR,//人力制度违纪登记人
        "XCWJDJR"=>$XCWJDJR,//宣传部违纪登记人
        "XBWJDJR"=>$XBWJDJR,//信编
        "GGWJDJR"=>$GGWJDJR,//公关
        "SYLYWJDJR"=>$SYLYWJDJR,//司仪礼仪队
        "allStudentName"=>$allStudentName,//把所有成员的账号和姓名给我		
	);
	echo $this->_encode($arr);
  }
  //接收前端信息，整理主席主管部门，人力跟进部门，违规登记负责人。
  public function postJsonAdmin()
  {
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$rlgj_model=new Model("Rlgj");
	$bmwgfzr_model=new Model("Bmwgfzr");
	$flagCrud=1;
	$chairman=$_POST['chairman'];
	$arrZXT=$_POST['arrZXT'];
	$arrRLGS=$_POST['arrRLGS'];
	$jsonWJDJ=$_POST['jsonWJDJ'];
	//主席
	unset($data);
	$data['is_sub']='y';
	$president_info=$president_model->where("account!=0")->save($data);
	unset($data);
	$data['is_sub']='n';
	$president_info=$president_model->where("account=$chairman")->save($data);
	if(false==$president_info)
		$flagCrud=0;
	//主席主管部门
	for($i=0;$i<count($arrZXT);$i++)
	{
		unset($data);
		$zxt_account=$arrZXT[$i]['account'];
		for($k=0;$k<count($arrZXT[$i]['arrZGBM']);$k++)
		{
			$apartmentArr.="|".$arrZXT[$i]['arrZGBM'][$k]['num'];
		}
		$data['apartment']=$apartmentArr;
		$president_info=$president_model->where("account=$zxt_account")->save($data);
		if(false==$president_info)
				$flagCrud=0;
		unset($apartmentArr);
	}
	//人力跟进部门,
	$arrRLGS=$_POST['arrRLGS'];
	for($i=0;$i<count($arrRLGS);$i++)
	{
		unset($data);
		$account=$arrRLGS[$i]['account'];
		$data['apartment']=$arrRLGS[$i]['department'];
		$rlgj_info=$rlgj_model->where("account=$account")->save($data);
		if(false==$president_info)
			$flagCrud=0;
	}
	//违规登记负责人
	$jsonWJDJ=$_POST['jsonWJDJ'];
	$data['account']=$jsonWJDJ['MSWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=1")->save($data);
	$data['account']=$jsonWJDJ['RLWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=2")->save($data);
	$data['account']=$jsonWJDJ['XCWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=3")->save($data);
	$data['account']=$jsonWJDJ['XBWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=4")->save($data);
	$data['account']=$jsonWJDJ['GGWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=5")->save($data);
	$data['account']=$jsonWJDJ['SYLYWJDJR'];
	$bmwgfzr_info=$bmwgfzr_model->where("type=6")->save($data);
	$arr=Array(
		'flagCrud'=>$flagCrud,
		'status'=>$jsonWJDJ,
	);
	echo $this->_encode($arr);
  }  
  //人员信息初始化：一般干事
  public function initPersonSecond()
  {
	$person_model=new Model("Person");
	$authority_model=new Model("Authority");
	$timetable_model=new Model("Timetable");
	echo "一般干事信息初始化开始</br>";
	$flagInitPerson=1;
	$person_info=$person_model->where("apartment!=2 and type=1")->select();
	if(count($person_info)>0)
	{
		$flagInitPerson=2;
		echo "数据库表tbl_person已有数据，成员添加失败</br>";
		return;
	}
	//添加秘书处干事
	$this->initPersonCrud("2014053193","韦长杰",1,1,$flagInitPerson);
	$this->initPersonCrud("2014053073","张春梅",1,1,$flagInitPerson);
	$this->initPersonCrud("2014053089","黄芷然",1,1,$flagInitPerson);	
	//添加宣传部成员
	$this->initPersonCrud("2014053101","陈焕杰",1,3,$flagInitPerson);
	$this->initPersonCrud("2014052974","崔良梁",1,3,$flagInitPerson);
	$this->initPersonCrud("2014053004","郭雪瑶",1,3,$flagInitPerson);
	//添加信息编辑部成员
	$this->initPersonCrud("2014052952","薛梦钰",1,4,$flagInitPerson);
	$this->initPersonCrud("2014053166","李露",1,4,$flagInitPerson);
	$this->initPersonCrud("2014053149","罗婕",1,4,$flagInitPerson);
	//添加学术部成员
	$this->initPersonCrud("2014053167","张丹",1,5,$flagInitPerson);
	$this->initPersonCrud("2014053145","伍书怡",1,5,$flagInitPerson);
	$this->initPersonCrud("2014053202","方力",1,5,$flagInitPerson);
	//添加体育部成员
	$this->initPersonCrud("2014053123","李佳",1,6,$flagInitPerson);
	$this->initPersonCrud("2014053037","陈高敏",1,6,$flagInitPerson);
	$this->initPersonCrud("2014053213","古博珊",1,6,$flagInitPerson);
	//添加KSC联盟
	$this->initPersonCrud("2014052990","蓝梓蓉",1,7,$flagInitPerson);
	$this->initPersonCrud("2014052449","李耀猛",1,7,$flagInitPerson);
	$this->initPersonCrud("2014053220","莫敏华",1,7,$flagInitPerson);
	//添加组织部成员
	$this->initPersonCrud("2014053017","李荣荣",1,8,$flagInitPerson);
	$this->initPersonCrud("2014053228","张锴翰",1,8,$flagInitPerson);
	$this->initPersonCrud("2014053107","王俊淞",1,8,$flagInitPerson);
	//添加文娱部成员
	$this->initPersonCrud("2014053028","吴梦宇",1,9,$flagInitPerson);
	$this->initPersonCrud("2014053110","周开泰",1,9,$flagInitPerson);
	$this->initPersonCrud("2014053232","吴国山",1,9,$flagInitPerson);
	//添加公关部成员
	$this->initPersonCrud("2014053117","李雁婷",1,10,$flagInitPerson);
	$this->initPersonCrud("2014053111","王冕",1,10,$flagInitPerson);
	$this->initPersonCrud("2014053057","李澳",1,10,$flagInitPerson);
	//添加心理服务部成员
	$this->initPersonCrud("2014053174","谢思维",1,11,$flagInitPerson);
	$this->initPersonCrud("2014052297","陈昱栋",1,11,$flagInitPerson);
	$this->initPersonCrud("2014053008","梁茗皓",1,11,$flagInitPerson);
	echo "一般干事信息初始化完成</br>";
	if($flagInitPerson==1)
	{
		echo "本次成员信息初始化成功</br>";
		unset($data);
		$data['is_init']=1;
		$authority_model->where("id>0")->data($data)->save();
		$this->initTable();
	}
	else if($flagInitPerson==0)
	{
		
		$person_info=$person_model->where("type=1 and apartment!=2")->select();
		foreach($person_info as $v)
		{
			$gs_account=$v['account'];
			$timetable_model->where("account=$gs_account")->delete();
			
		}
		$person_model->where("type=1 and apartment!=2")->delete();
		echo "本次一般干事信息初始化失败</br>";
	}
  }
 //人员信息初始化：主席团，部长级，人力干事
  public function initPerson()
  {
    //按照格式添加数据,参数分别为：账号，名字，类型，标志参数
	//类型1代表非人力干事,2代表人力干事,3代表部长级,4代表主席团
	//部门1秘书处	2人力资源部		3宣传部		4信息编辑部
	//5学术部	6体育部		7KSC联盟	8组织部		9文娱部	
	//10公关部	11心理服务部	12主席团
	$person_model=new Model("Person");
	$authority_model=new Model("Authority");
	$timetable_model=new Model("Timetable");
	$rlgj_model=new Model("Rlgj");
	$president_model=new Model("Rlgj");
	$bmwgfzr_model=new Model("Bmwgfzr");
	echo "成员信息初始化开始</br>";
	$flagInitPerson=1;
	$person_info=$person_model->where("account!=0")->select();
	if(count($person_info)>0)
	{
		$flagInitPerson=2;
		echo "数据库表tbl_person已有数据，成员添加失败</br>";
		return;
	}
	//添加主席团成员
	$this->initPersonCrud("2012052195","陈蔚",4,12,$flagInitPerson);
	$this->initPersonCrud("2012052296","苏迪",4,12,$flagInitPerson);
	$this->initPersonCrud("2012052201","陈杰东",4,12,$flagInitPerson);
	$this->initPersonCrud("2012052321","李慈",4,12,$flagInitPerson);
	$this->initPersonCrud("2012052180","卢思翰",4,12,$flagInitPerson);

	//添加秘书处成员
	$this->initPersonCrud("2013053106","张舒婧",3,1,$flagInitPerson);
	$this->initPersonCrud("2013053176","温武佑",3,1,$flagInitPerson);
	$this->initPersonCrud("2013053122","张雨晨",3,1,$flagInitPerson);
	//添加人力资源部部长级
	$this->initPersonCrud("2013053188","陈桂涛",3,2,$flagInitPerson);
	$this->initPersonCrud("2013053015","高琳",3,2,$flagInitPerson);
	$this->initPersonCrud("2013053241","余臻",3,2,$flagInitPerson);
	//添加人力资源部干事
	$this->initPersonCrud("2014052572","邓学星",2,2,$flagInitPerson);
	$this->initPersonCrud("2014052568","黄通",2,2,$flagInitPerson);	
	$this->initPersonCrud("2014053947","付琳智",2,2,$flagInitPerson);
	$this->initPersonCrud("2014052466","钟家伟",2,2,$flagInitPerson);
	$this->initPersonCrud("2014050554","罗嫚",2,2,$flagInitPerson);	
	$this->initPersonCrud("2014052422","汤楚雯",2,2,$flagInitPerson);	
	$this->initPersonCrud("2014052857","朱思禹",2,2,$flagInitPerson);
	$this->initPersonCrud("2014053707","郭要升",2,2,$flagInitPerson);
	$this->initPersonCrud("2014052398","杨海然",2,2,$flagInitPerson);	
	$this->initPersonCrud("2014052854","程小芮",2,2,$flagInitPerson);	
	$this->initPersonCrud("2014057879","司徒小云",2,2,$flagInitPerson);	
	//添加宣传部成员
	$this->initPersonCrud("2013053218","林伟南",3,3,$flagInitPerson);
	$this->initPersonCrud("2013053071","唐睿婕",3,3,$flagInitPerson);
	$this->initPersonCrud("2013052977","何雪",3,3,$flagInitPerson);
	//添加信息编辑部成员
	$this->initPersonCrud("2013053166","李露",3,4,$flagInitPerson);
	$this->initPersonCrud("2013052952","薛梦钰",3,4,$flagInitPerson);
	$this->initPersonCrud("2013053054","高耀源",3,4,$flagInitPerson);
	//添加学术部成员
	$this->initPersonCrud("2013053038","纪杰伦",3,5,$flagInitPerson);
	$this->initPersonCrud("2013053202","方力",3,5,$flagInitPerson);
	$this->initPersonCrud("2013053167","张丹",3,5,$flagInitPerson);
	//添加体育部成员
	$this->initPersonCrud("2013052393","陈泓锡",3,6,$flagInitPerson);
	$this->initPersonCrud("2013053093","邓阳",3,6,$flagInitPerson);
	$this->initPersonCrud("2013053095","邢建坤",3,6,$flagInitPerson);
	$this->initPersonCrud("2013052970","黄帝玲",3,6,$flagInitPerson);
	//添加KSC联盟
	$this->initPersonCrud("2013052992","覃振宇",3,7,$flagInitPerson);
	$this->initPersonCrud("2013053181","邵天木",3,7,$flagInitPerson);
	$this->initPersonCrud("2013053026","孙雯曦",3,7,$flagInitPerson);
	//添加组织部成员
	$this->initPersonCrud("2013053215","陈晓琳",3,8,$flagInitPerson);
	$this->initPersonCrud("2013053062","彭勃",3,8,$flagInitPerson);
	//添加文娱部成员
	$this->initPersonCrud("2013053194","潘怡君",3,9,$flagInitPerson);
	$this->initPersonCrud("2013053232","吴国山",3,9,$flagInitPerson);
	$this->initPersonCrud("2013052993","洛竞潮",3,9,$flagInitPerson);
	//添加公关部成员
	$this->initPersonCrud("2013053025","管必成",3,10,$flagInitPerson);
	$this->initPersonCrud("2013053111","王冕",3,10,$flagInitPerson);
	//添加心理服务部成员
	$this->initPersonCrud("2013053160","石芮",3,11,$flagInitPerson);
	$this->initPersonCrud("2013053165","孙铭谦",3,11,$flagInitPerson);
	$this->initPersonCrud("2013053174","谢思维",3,11,$flagInitPerson);
	echo "成员信息初始化完成</br>";
	if($flagInitPerson==1)
	{
		echo "本次成员信息初始化成功</br>";
		unset($data);
		$data['is_init']=1;
		$authority_model->where("id>0")->data($data)->save();
		$this->initTable();
		$this->initRlgj();
		$this->initZxzg();
		$this->initBmwgfzr();
	}
	else if($flagInitPerson==0)
	{
		$person_model->where("account!=0")->delete();
		$timetable_model->where("account!=0")->delete();
		$rlgj_model->where("account!=0")->delete();
		$president_model->where("account!=0")->delete();
		$bmwgfzr_model->where("account!=0")->delete();
		echo "本次成员信息初始化失败</br>";
	}
  }
  private function initPersonCrud($account,$name,$type,$apartment,&$flagInitPerson)
  {
	unset($data);
	$data['account']=$account;//账号
	$data['name']=$name;//名字
	$data['password']=$account;//初始密码,跟学号一致
	$data['type']=$type;
	$data['apartment']=$apartment;
	$person_model=new Model("Person");
	if($flagInitPerson!=2)
	{
		$person_info=$person_model->data($data)->add();
		if(false==$person_info)
		{
			$flagInitPerson=0;	
			echo "成员添加出错：".$name."</br>"."检查程序并清空数据库表tbl_person</br>";
		
		}
	}
  }
  //根据人员信息，添加空课表
  private function initTable()
  {
	//获取所有人员信息
	$person_model=new Model("Person");
	$timetable_model=new Model("Timetable");
	$person_info=$person_model->select();
	foreach($person_info as $v)
	{
		$add_account=$v['account'];
		unset($data);
		$data['account']=$add_account;
		$timetable_info=$timetable_model->where("account=$add_account")->find();
		if(false==$timetable_info)
			$timetable_model->data($data)->add();
	}
  }
  //人事变动
  public function personCRUD()
  {
	//主要有两种，一种是退出，一种是新增（针对干事）。一种是修改账号（普遍使用）
	//tbl_person,tbl_timetable这两张表示以account为主键的，要小心
	//修改学号
	//$this->personUpdate("2012052308","2012052309");//原来的学号+更新后的学号
	//删除一般干事
	//$this->personDelete("");
  }
 //删除一般干事 
  private function personDelete()
  {
    //判断是否满足删除条件：非人力干事，不是部门违规负责人（如果是，得先去修改部门违规负责人）
	//tbl_person,tbl_timetable,
	$account=" 2014052395";
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	if(false==$person_info)
		return -1;
	if($person_info['type']==2)
		return -1;
	$bmwgfzr_model=new Model();
	$bmwgfzr_info=$bmwgfzr_model->where("account=$account")->find();
	if(!empty($bmwgfzr_info))
		return -1;
	echo "开始删除";
	$person_model->where("account=$account")->delete();
	$timetable_model=new Model("Timetable");
	$timetable_model->where("account=$account")->delete();
	$bzkh_model=new Model("Bzkh");//raccount
	$bzkh_model->where("raccount=$account")->delete();
	$chuqin_model=new Model("Chuqin");//raccount
	$chuqin_model->where("raccount=$account")->delete();
	$diaoyan_model=new Model("Diaoyan");//raccount
	$diaoyan_model->where("raccount=$account")->delete();
	$evaluate_model=new Model("Evaluate");//waccount,raccount
	$evaluate_model->where("account=$account")->delete();
	$evaluate_model->where("raccount=$account")->delete();
    $gsfk_model=new Model("Gsfk");//account
	$gsfk_model->where("account=$account")->delete();
	$gskh_model=new Model("Gskh");//raccount
	$gskh_model->where("raccount=$account")->delete();
	$gszp_model=new Model("Gszp");//account
	$gszp_model->where("account=$account")->delete();
	$interact_model=new Model("Interact");//waccount,raccount
	$interact_model->where("waccount=$account")->delete();
	$interact_model->where("raccount=$account")->delete();
	$login_model=new Model("Login");
	$login_model->where("account=$account")->delete();
	$qt_model=new Model("Qt");
	$qt_model->where("account=$account")->delete();
	$resource_model=new Model("Resource");
	$resource_model->where("account=$account")->delete();
	$tuiyou_model=new Model("Tuiyou");//waccount,raccount
	$tuiyou_model->where("waccount=$account")->delete();
	$tuiyou_model->where("raccount=$account")->delete();
	$wdcs_model=new Model("Wdcs");
	$wdcs_model->where("account=$account")->delete();
	$yxchxz_model=new Model("Yxchxz");
	$yxchxz_model->where("account=$account")->delete();
	return 0;
  }
 //新增一般干事 
 public function personCreate()
  {
	$person_model=new Model("Person");
	$timetable_model=new Model("Timetable");
	echo "新增干事信息初始化开始</br>";
	$flagInitPerson=1;
	//添加非人力干事
	$this->initPersonCrud("2014052858","刘馨月",1,4,$flagInitPerson);
/* 	$this->initPersonCrud("2014050551","聂梦桥",1,9,$flagInitPerson);
	$this->initPersonCrud("2014052590"," 郭锐",1,9,$flagInitPerson);	
	$this->initPersonCrud("2014053006","蒋元青",1,7,$flagInitPerson);
	$this->initPersonCrud("2014050245"," 肖倩倩	",1,7,$flagInitPerson); */
	echo "新增干事信息初始化完成</br>";
	if($flagInitPerson==1)
	{
		echo "本次新增干事成员信息初始化成功</br>";
		$this->initTable();
	}
	else if($flagInitPerson==0)
	{
		echo "本次新增干事信息初始化失败</br>";
	}
  }
 //学号修改
 public function personUpdate()
 {
	$account="2013050549";//原来的学号
	$accountNew="2014050549";//更新后的学号
	$person_model=new Model();
	$data['account']=$accountNew;
	$datar['raccount']=$accountNew;
	$dataw['waccount']=$accountNew;
	$dataHX['HX']=$accountNew;
	$person_info=$person_model->where("account=$account")->save($data);
	$admin_model=new Model("Admin");
	$bmkh_model=new Model("Bmkh");
	$bmwg_model=new Model("Bmwg");
	$bmwgfzr_model=new Model("Bmwgfzr");
	$bzfk_model=new Model("Bzfk");
	$bzkh_model=new Model("Bzkh");
	$bzzp_model=new Model("Bzzp");
	$chuqin_model=new Model("Chuqin");
	$diaoyan_model=new Model("Diaoyan");
	$evaluate_model=new Model("Evaluate");
	$gsfk_model=new Model("Gsfk");
	$gskh_model=new Model("Gskh");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$login_model=new Model("Login");
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$qt_model=new Model("Qt");
	$resource_model=new Model("Resource");
	$rlgj_model=new Model("Rlgj");
	$timetable_model=new Model("Timetable");
	$tuiyou_model=new Model("Tuiyou");
	$wdcs_model=new Model("Wdcs");
	$yxbz_model=new Model("Yxbz");
	$yxbzhx_model=new Model("Yxbzhx");
	$yxchxz_model=new Model("Yxchxz");
	$admin_model->where("account=$account")->save($data);
	$bmkh_model->where("waccount=$account")->save($dataw);
	$bmwg_model->where("account=$account")->save($data);
	$bmwgfzr_model->where("account=$account")->save($data);
	$bzfk_model->where("account=$account")->save($data);
	$bzkh_model->where("waccount=$account")->save($dataw);
	$bzkh_model->where("raccount=$account")->save($datar);
	$bzzp_model->where("waccount=$account")->save($dataw);
	$chuqin_model->where("waccount=$account")->save($dataw);
	$chuqin_model->where("raccount=$account")->save($datar);
	$diaoyan_model->where("waccount=$account")->save($dataw);
	$diaoyan_model->where("raccount=$account")->save($datar);
	$evaluate_model->where("waccount=$account")->save($dataw);
	$evaluate_model->where("raccount=$account")->save($datar);
	$gsfk_model->where("account=$account")->save($data);
	$gskh_model->where("waccount=$account")->save($dataw);
	$gskh_model->where("raccount=$account")->save($datar);
	$gszp_model->where("waccount=$account")->save($dataw);
	$gszp_model->where("raccount=$account")->save($datar);
	$interact_model->where("waccount=$account")->save($dataw);
	$interact_model->where("raccount=$account")->save($datar);
	$login_model->where("account=$account")->save($data);
	$person_model->where("account=$account")->save($data);
	$president_model->where("account=$account")->save($data);
	$qt_model->where("account=$account")->save($data);
	$resource_model->where("account=$account")->save($data);
	$resource_model->where("waccount=$account")->save($dataw);
	$rlgj_model->where("account=$account")->save($data);
	$timetable_model->where("account=$account")->save($data);
	$tuiyou_model->where("waccount=$account")->save($dataw);
	$tuiyou_model->where("raccount=$account")->save($datar);
	$wdcs_model->where("account=$account")->save($data);
	$yxbz_model->where("waccount=$account")->save($dataw);
	$yxbz_model->where("raccount=$account")->save($datar);
	$yxbzhx_model->where("HX=$account")->save($dataHX);
	$yxchxz_model->where("account=$account")->save($data);
	return 0;
 }
 //人力干事跟进部门初始化
  private function initRlgj()
  {
    $rlgj_model=new Model("Rlgj");
	$person_model=new Model("Person");
	$person_info=$person_model->where("apartment=2 and type=2")->select();
	
    //总共11个部门
	for($i=1;$i<=11;$i++)
	{
	  unset($data);
	  $data['account']=$person_info[$i-1]['account'];
	  $data['apartment']=$i;
	  $rlgj_info=$rlgj_model->add($data);
	  if(!$rlgj_info)
	    echo "部门".$i."人力干事跟进部门初始化失败</br>";
	}
  }
  //主席主管部门初始化
  private function initZxzg()
  {
    //找出所有主席团成员
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
	  unset($data);
	  $data['account']=$v['account'];
	  $data['apartment']="|1";
	  $data['is_sub']='y';
	  $president_info=$president_model->add($data);
	  if(!$president_info)
	    "主席团".$data['account']."初始化失败</br>";
	}
  }
  //违规登记负责人初始化
  private function initBmwgfzr()
  {
    
	$bmwgfzr_model=new Model("Bmwgfzr");
	$person_model=new Model("Person");
	$person_info=$person_model->where("type!=4")->select();
	if(count($person_info)>6)
	{
		for($i=0;$i<6;$i++)
		{
			unset($data);
			$data['account']=$person_info[$i]['account'];
			$data['type']=$i+1;
			$bmwgfzr_info=$bmwgfzr_model->add($data);
			if(false==$bmwgfzr_info)
			{
				echo ($i+1)."部门违规登记初始化失败</br>";
			}
		}
	}
  }
   //时间获取函数
  private function funcsettime()
  {
    //$year=2014;//$_POST['year'];
	//$month=9;//$_POST['month'];
	$_POST['year'];
	$_POST['month'];
	$arr=Array(
	  'year'=>$year,
	  'month'=>$month,
	);
	return $arr;
  }
/*  //删除某年某月绩效考核
  public function unsetPerform()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];	
	$control_model=new Model("Control");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$tuiyou_model=new Model("Tuiyou");
	$evaluate_model=new Model("Evaluate");	
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$wdcs_model=new Model("Wdcs");
	$chuqin_model=new Model("Chuqin");
	$diaoyan_model=new Model("Diaoyan");
	$qt_model=new Model("Qt");
	$gsfk_model=new Model("Gsfk");
	$bzfk_model=new Model("Bzfk");
	$bmfk_model=new Model("Bmfk");
	$yxchxz_model=new Model("Yxchxz");
	$bmwg_model=new Model("Bmwg");
	//干事部分
	$gszp_model->where("year=$year and month=$month")->delete();
	$interact_model->where("year=$year and month=$month")->delete();
	$tuiyou_model->where("year=$year and month=$month")->delete();
	$evaluate_model->where("year=$year and month=$month")->delete();
	$control_model->where("year=$year and month=$month")->delete();
	//部长部分
	$bzzp_model->where("year=$year and month=$month")->delete();
	$gskh_model->where("year=$year and month=$month")->delete();
	//主席部分
	$bzkh_model->where("year=$year and month=$month")->delete();
	$bmkh_model->where("year=$year and month=$month")->delete();
	//外调次数
	$wdcs_model->where("year=$year and month=$month")->delete();
	//出勤统计
	$chuqin_model->where("year=$year and month=$month")->delete();
	//调研采纳
	$diaoyan_model->where("year=$year and month=$month")->delete();
	//其他情况
	$qt_model->where("year=$year and month=$month")->delete();
	//反馈
	$gsfk_model->where("year=$year and month=$month")->delete();
	$bzfk_model->where("year=$year and month=$month")->delete();
	$bmfk_model->where("year=$year and month=$month")->delete();
	//优秀称号限制
	$yxchxz_model->where("year=$year and month=$month")->delete();
	//部门违规
	$bmwg_model->where("year=$year and month=$month")->delete();
	echo $year."年".$month."月的绩效考核数据删除完毕，可以重新启动该月份的绩效考核</br>";
  }
  //考核系统初始化阶段一
  public function initPerform($year,$month)
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');	
	$arr=$this->funcsettime();
	if(empty($year)||empty($month))
	{
		echo "卡不开";return;
	}
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	$obj="阿里巴巴";
	var_dump($obj);
	return $obj;
	//根据tbl_authority判断，若时间已经存在拒绝访问
	//干事自评表，部长自评表，干事自评表，部长考核表，部门考核表
	//开始一次绩效考核需要满足下面的条件：基本成员信息要求、该时间未考核过、系统不存在未结束的考核
	$authority_model=new Model("Authority");
	$flagInitPerform=1;
	$authority_info=$authority_model->find();
	if($authority_info['is_init']!=1)
		$flagInitPerform=0;
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if(!empty($control_info['id']))
		$flagInitPerform=0;
	$control_info=$control_model->where("is_over=0||is_yxbz=0")->select();
	if(count($control_info)>0)
		$flagInitPerform=0;
	if($flagInitPerform==0)
	{
		echo "本次考核不满足开启条件</br>";
		return;
	}
	echo "即将进行各项初始化工作，耐心等待</br>";
	unset($data);
	$data['year']=$year;
	$data['month']=$month;
	$control_info=$control_model->add($data);
	$this->funcyjjh();
 	$this->funcinitbmty();
	$this->funcinitwdcs();
	$this->funcinitchuqin();
	$this->funcinitdiaoyan();
	$this->funcinitqtqk();
	$this->funcinitgsfk();
	$this->funcinitbzfk();
	$this->funcinitbmfk();
	$this->funcinityxchxz(); 
	$this->funcinitbmwg();
	echo "完毕</br>";
  } 
  //绩效考核初始化第一阶段，包括：干事自评表，部长自评表，干事考核表，部长考核表，部门考核表
  private function funcyjjh()
  {
    //设置年月
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    //一键激活数据库表，包括：
	$person_model=new Model("Person");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$tuiyou_model=new Model("Tuiyou");
	$evaluate_model=new Model("Evaluate");
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$president_model=new Model("President");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$oneway_model=new Model("Oneway");
	$bmty_model=new Model("Bmty");
	echo "干事初始化开始</br>";
	//找出所有干事
	$person_info=$person_model->where("type=1 or type=2")->select();
	foreach($person_info as $v)
	{
	  $account=$v['account'];
	  //基本信息
	  $apartment=$v['apartment'];
	  unset($data);
	  $data['account']=$account;
	  $data['apartment']=$v['apartment'];
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['zptext']="空";
	  //干事自评表，每个部门的干事都要初始化
	  $gszp_info=$gszp_model->add($data);
	  if(!$gszp_info)
	    echo $account."干事自评表初始化出错</br>";
	  //干事推优干事
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$v['apartment'];
	  $data['wtype']=$v['type'];
	  $data['rapartment']=$v['apartment'];
	  $data['rtype']=$v['type'];
	  $data['text']="空";
	  $tuiyou_info=$tuiyou_model->add($data);
	  if(!$tuiyou_info)
	    echo $account."干事推优干事初始化出错</br>";
	  //对本部门的留言
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$v['apartment'];
	  $data['wtype']=$v['type'];
	  $data['raccount']=$v['apartment'];
	  $data['text']="空";
	  $interact_info=$interact_model->add($data);
	  if(!$interact_info)
	    echo $account."干事对部门留言初始化出错</br>";
	  //干事对部长的评分
	  //找出所有部长
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
        unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$v['apartment'];
	    $data['wtype']=$v['type'];
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$v['apartment'];
	    $data['rtype']=3;
		$data['text']="空";
		$data['nm']=1;
		$evaluate_info=$evaluate_model->add($data);
		//判断是否添加成功
		if(!$evaluate_info)
		  echo $account."干事对部长的评价初始化失败"."</br>";
	  }
	  
	}
	echo "干事初始化完成</br>";
	//干事初始化完成
 	//找出所有部长
	echo "部长初始化开始</br>";
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  //基本信息
	  $apartment=$v['apartment'];
	  $account=$v['account'];
	  //部长自评表
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['zptext']="空";
	  $bzzp_info=$bzzp_model->add($data);
	  if(!$bzzp_info)
	    echo $account."的部长自评初始化失败";
	  //该部长对本部门其他部长的评价
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
	    if($v_bz['account']==$v['account'])
		  continue;
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=3;
		$data['nm']=1;
		$data['text']="空";
		$evaluate_info=$evaluate_model->add($data);
		if(!$evaluate_info)
		  echo $account."部长对本部门其他部长的评价失败";
	  }

	  //该部长对其主管副主席的评价
	  //找出主管副主席
	  $person_info_zg=$president_model->where("apartment1=$apartment or apartment2=$apartment")->find();
	  $zg_account=$person_info_zg['account'];
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zg_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
      $interact_info=$interact_model->add($data);	
	  if(!$interact_info)
	    echo $account."对主管副主席评价初始化失败</br>";
	  //对所有主席团的匿名留言
	  $person_info_zxt=$person_model->where("type=4")->select();
	  foreach($person_info_zxt as $v_zxt)
	  {
	    $zxt_account=$v_zxt['account'];
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zxt_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
	  $data['nm']=1;
	  $interact_info=$interact_model->add($data);	
	  if(!$interact_info)
	    echo $account."主席团成员匿名评价初始化失败</br>";
	  }
      //干事考核表，对部门所有干事的给分
      //找出该部长所有的干事
      $person_info_gs=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
      foreach($person_info_gs as $v_gs)
      {
	    //给干事打分
	    unset($data);
	    $data['year']=$year;
	    $data['month']=$month;	
	    $data['waccount']=$account;	
	    $data['wapartment']=$apartment;
        $data['raccount']=$v_gs['account'];				
		$gskh_info=$gskh_model->add($data);
		if(!$gskh_info)
		  echo $account."对干事考核初始化失败</br>";
		//对干事评价
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_gs['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=$v_gs['type'];
		$data['text']="空";
		$interact_info=$interact_model->add($data);
		if(!$interact_info)
		  echo $account."对干事评价初始化失败</br>";
	  }	  
	}
	echo "部长初始化完成</br>";
	//部长初始化完成 
 	//找出所有主席团成员
	echo "主席团初始化开始</br>";
	$person_info=$person_model->where("type=4")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];
	  $president_info=$president_model->where("account=$account")->find();


	    if($president_info['is_sub']=='y')//一般主管副主席
		{
		  $apartment_zxt_1=$president_info['apartment1'];
		  //根据第一个部门，对部长、部门进行考核
		  if($apartment_zxt_1!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_1 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //对部长进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_1;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长评分初始化失败</br>";
			  //进行对部长进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_1;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长评价初始化失败</br>";
			}
			//对部门1进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_1;
			$data['year']=$year;
			$data['month']=$month;
			$data['text']="空";
			$bmkh_info=$bmkh_model->add($data);
			if(!$bmkh_info)
			  echo $account."对部门考核初始化失败</br>";
		  }
		  $apartment_zxt_2=$president_info['apartment2'];
		  //根据第二个部门，对部长进行考核
		  if($apartment_zxt_2!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_2 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //对部长进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_2;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长评分初始化失败</br>";
			  //进行对部长进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_2;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长评价初始化失败</br>";
			}
			//对部门1进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_2;
			$data['year']=$year;
			$data['month']=$month;
			$data['text']="空";
			$bmkh_info=$bmkh_model->add($data);
			if(!$bmkh_info)
			  echo $account."对部门考核初始化失败</br>";
		  }
		}
		else//主席
		{
		  //对管辖内的部长进行评分评价
		  $apartment_zxt_1=$president_info['apartment1'];
		  //根据第一个部门，对部长、部门进行考核
		  if($apartment_zxt_1!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_1 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_1;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长考核初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_1;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长的评价初始化失败</br>";
			}
		  }
		  $apartment_zxt_2=$president_info['apartment2'];
		  //根据第二个部门，对部长进行考核
		  if($apartment_zxt_2!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_2 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_2;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长考核初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_2;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长的评价初始化失败</br>";
			}
		  }
		  //对11个部门进行考核
		  //echo $account."</br>";
		  for($i=1;$i<=11;$i++)
		  {
			//对部门$i进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$i;
			$data['year']=$year;
			$data['month']=$month;		
			$data['text']="空";
			$bmkh_info=$bmkh_model->add($data);
			if(!$bmkh_info)
			  echo $account."对部门考核初始化失败</br>";
		  }
	  }
	
    }
    echo "主席团初始化完成</br>";   
  } 
  //绩效考核初始化第一阶段，主席团的部门推优
  private function funcinitbmty()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	echo "主席团的部门推优初始化开始</br>";
	//找出所有主席团成员
	$person_model=new Model("Person");
	$tuiyou_model=new Model("Tuiyou");
	$person_info=$person_model->where("type=4")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];
	  //不管是不是主席，都得对非主管部门推优
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=12;
	  $data['wtype']=4;
	  $data['text']="空";
	  $tuiyou_info=$tuiyou_model->add($data);
	  if(!$tuiyou_info)
	    echo $account."对非主管部门推优初始化失败</br>";
	}
	echo "主席团的部门推优初始化完成</br>";
  }
  //绩效考核初始化第一阶段，成该月份的干事反馈表
  private function funcinitgsfk()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
    $gsfk_model=new Model("Gsfk");
    //找到所有的干事
    echo "干事反馈表初始化开始</br>";
    $person_info=$person_model->where("type=1 or type=2")->select();
    foreach($person_info as $v)
    {
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$v['account'];
	  $gsfk_info=$gsfk_model->add($data);
	  if(!$gsfk_info) 
	   echo $v['account']."干事反馈初始化失败</br>";
    }
    echo "干事反馈表初始化结束</br>";
  }
 //绩效考核初始化第一阶段，该月份的部长反馈表
  private function funcinitbzfk()
  {
    echo "部长反馈表初始化开始</br>";
    //找出所有的部长
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	$person_model=new Model("Person");
	$bzfk_model=new Model("Bzfk");
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$bz_account;
	  $bzfk_info=$bzfk_model->add($data);
	  if(!$bzfk_info)
	    echo $data['account']."部长反馈表初始化失败</br>";
	}
	echo "部长反馈表初始化完成</br>";
  }
  //绩效考核初始化第一阶段，该月份的部门反馈表
  private function funcinitbmfk()
  {
	echo "部门反馈表初始化开始";
   $arr=$this->funcsettime();
	$year=$arr['year'];	
	$month=$arr['month'];
   echo "部门反馈表初始化开始</br>";
   $bmfk_model=new Model("Bmfk");
   //找出11个部门
   for($i=1;$i<=11;$i++)
   {
     unset($data);
	 $data['year']=$year;
	 $data['month']=$month;
	 $data['apartment']=$i;
	 $bmfk_info=$bmfk_model->add($data);
	 if(!$bmfk_info)
	   echo $i."部门反馈表初始化失败</br>";
   }
   echo "部门反馈表初始化结束</br>";
  }

  //绩效考核初始化第一阶段，该月的外调次数表
  private function funcinitwdcs()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
   $wdcs_model=new Model("Wdcs");
   $person_model=new Model("Person");
   echo "外调次数初始化开始</br>";
   //每个部门的干事、部长初始化
   for($i=1;$i<=12;$i++)
   {
     $person_info=$person_model->where("apartment=$i")->select();
	 foreach($person_info as $v)
	 {
	   unset($data);
	   $data['year']=$year;
	   $data['month']=$month;
	   $data['account']=$v['account'];
	   $wdcs_info=$wdcs_model->add($data);
	   if(!$wdcs_info)
	     echo $data['account']."外调次数初始化失败</br>";
	 }
   }
   echo "外调次数初始化结束</br>";
  }
  //绩效考核初始化第一阶段，该月的出勤统计
  private function funcinitchuqin()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	$person_model=new Model("Person");
	$chuqin_model=new Model("Chuqin");
	$rlgj_model=new Model("Rlgj");
	echo "出勤统计初始化开始</br>";
	//共11个部门，根据跟进干事记录各部门的出勤情况
    for($i=1;$i<=11;$i++)
	{
	  $rlgj_info=$rlgj_model->where("apartment=$i")->find();
	  $rlgs_account=$rlgj_info['account'];
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$rlgs_account;
		$data['raccount']=$v['account'];
		$data['rapartment']=$i;
		$chuqin_info=$chuqin_model->add($data);
		if(!$chuqin_info)
		  echo "出勤表初始化失败</br>";
	  }
	}
	echo "出勤统计初始化结束</br>";
  }
  //绩效考核初始化第一阶段，该月的调研采纳统计
  private function funcinitdiaoyan()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
	$diaoyan_model=new Model("Diaoyan");
	$rlgj_model=new Model("Rlgj");
	echo "调研采纳初始化开始</br>";
	//找出11个部门的干事和部长
	for($i=1;$i<=11;$i++)
	{
	  //找到跟进的干事
	  $rlgj_info=$rlgj_model->where("apartment=$i")->find();
	  $rlgs_account=$rlgj_info['account'];
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$rlgs_account;
		$data['raccount']=$v['account'];
		$data['rapartment']=$i;
		$diaoyan_info=$diaoyan_model->add($data);
		if(!$diaoyan_info)
		  echo "调研采纳初始化失败</br>";
	  }
	}
	echo "调研采纳初始化结束</br>";
  }
  //绩效考核初始化第一阶段，其他情况加分表
  private function funcinitqtqk()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
	$qt_model=new Model("Qt");
	echo "其他情况加减分初始化开始</br>";
	//找到所有的干事、部长
	$person_info=$person_model->where("(type=1 or type=2) or type=3")->select();
	foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$gs_account;
	  $data['text']="空";
	  $qt_info=$qt_model->add($data);
	  if(!$qt_info)
	    echo "其他情况加分表初始化失败</br>";
	}
	//找到所有部门
	for($i=1;$i<=11;$i++)
	{
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$i;
	  $data['text']="空";
	  $qt_info=$qt_model->add($data);
	  if(!$qt_info)
	    echo "其他情况加分表初始化失败</br>";
	}
	echo "其他情况加减分初始化结束</br>";
  }
  //绩效考核初始化第一阶段，部门违规扣分表
  private function funcinitbmwg()
  {
	echo "部门违规初始化开始</br>";
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	//找到所有人力干事
	$person_model=new Model("Person");
	$bmwg_model=new Model("Bmwg");
	$bmwgfzr_model=new Model("Bmwgfzr");
	for($j=1;$j<7;$j++)
	{
		unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$bmwgfzr_info=$bmwgfzr_model->where("type=$j")->find();
		$data['account']=$bmwgfzr_info['account'];
		$data['type']=$j;
		for($i=1;$i<12;$i++)
		{
			$data['apartment']=$i;
			$data['wgkf']=0;
			$data['text']="空";
			$bmwg_info=$bmwg_model->add($data);
			if(false==$bmwg_info)
				echo "部门违规初始化失败</br>";
		}
	}
	echo "部门违规初始化结束</br>";
  }
  //绩效考核初始化第一阶段，上月的优秀某某限定表
  private function funcinityxchxz()
  {
    //获取上次考核的时间
	$arr=$this->funcgettime();
	if(false==$arr)
	{
		return;
	}
	$lastyear=$arr['year'];
	$lastmonth=$arr['month'];
	$person_model=new Model("Person");
	$gsfk_model=new Model("Gsfk");
	$bzfk_model=new Model("Bzfk");
	$bmfk_model=new Model("Bmfk");
	$yxchxz_model=new Model("Yxchxz");
	echo "限定表初始化开始</br>";
	//先删除
	$yxchxz_model->where("id>0")->delete();
    //获取上次考核的优秀干事
	$gsfk_info=$gsfk_model->where("(year=$lastyear and month=$lastmonth) and yxgs=1")->select();
	foreach($gsfk_info as $v)
	{
	  $gs_account=$v['account'];
	  unset($data);
	  $data['account']=$gs_account;
	  $yxchxz_info=$yxchxz_model->add($data);
	  if(!$yxchxz_info)
	    echo "优秀干事限定初始化失败</br>";
	}
	//获取上次考核的优秀部长
	$bzfk_info=$bzfk_model->where("(year=$lastyear and month=$lastmonth) and yxbz=1")->select();
    foreach($bzfk_info as $v)
	{
	  $bz_account=$v['account'];
	  unset($data);
	  $data['account']=$bz_account;
	  $yxchxz_info=$yxchxz_model->add($data);
	  if(!$yxchxz_info)
	     echo "优秀部长限定初始化失败</br>";
	}
	//获取上次考核的优秀部门
	$bmfk_info=$bmfk_model->where("(year=$lastyear and month=$lastmonth) and yxbm=1")->select();
    foreach($bmfk_info as $v)
	{
	  unset($data);
	  $data['account']=$v['apartment'];
	  $yxchxz_info=$yxchxz_model->add($data);
	  if(!$yxchxz_info)
        echo "优秀部门限定初始化失败</br>";
	}
	echo "优秀部长限定初始化结束</br>";
  }
 
  //函数，获取上月考核月份
  private function funcgettime()
  {
	$control_model=new Model("Control");
	$control_info=$control_model->find();
	if(empty($control_info['month'])||empty($control_info['year']))
	{
		echo "没有任何关于绩效考核的数据</br>";
		return false;
	}
	$month=$control_info['month'];
	$year=$control_info['year'];
	$timeBase=mktime(0,0,0,$month,15,$year);
	$control_info=$control_model->where("year!=$year and month!=$month")->select();
	foreach($control_info as $v)
	{
		$month=$v['month'];
		$year=$v['year'];
		$time=mktime(0,0,0,$month,15,$year);
		if($time>$timeBase)
			$timeBase=$time;
	}
	$date=getdate($timeBase);
	$arr=Array(
		'year'=>$date['year'],
		'month'=>$date['mon'],
	);
	return $arr;
  }
  *///调用—_encode()函数，将数组进行编码转哈
   private  function _encode($arr)
  {
    $na = array();
    foreach ( $arr as $k => $value ) {  
      $na[$this->_urlencode($k)] = $this->_urlencode ($value);  
    }
    //return addcslashes(urldecode(json_encode($na)),"\\r");
	return urldecode(json_encode($na));
  }
   private function _urlencode($elem)
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