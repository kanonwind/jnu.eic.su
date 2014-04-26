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
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
		$this->display();
	}
	//index的js脚本请求个人信息，message找到数据整理后返回json数据
	public function message()
	{

		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
			/*
		//拒绝非js请求数据
		if(empty($_GET['account']))
			$this->redirect('Center/index');
	*/		
		//查找数据
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		//$this->ajaxReturn("$person_info","查找成功",1);
        switch($person_info['type'])
		{
			case 'a':$type="干事";break;
			case 'b':$type="部长级";break;
			case 'c':$type="主席团";break;
		}
		switch($person_info['apartment'])
		{
			case '1':$apartment="秘书处";break;
			case '2':$apartment="人力资源部";break;
			case '3':$apartment="宣传部";break;
			case '4':$apartment="信编部";break;
			case '5':$apartment="学术部";break;
			case '6':$apartment="体育部";break;
			case '7':$apartment="KSC联盟";break;
			case '8':$apartment="组织部";break;
			case '9':$apartment="文娱部";break;
			case '10':$apartment="公关部";break;
			case '11':$apartment="心理服务部";break;
			case '12':$apartment="主席团";break;
		}
        $arr=Array(
			//账户信息
			'account'=>$person_info['account'],
		    'name'=>$person_info['name'],
		    'type'=>$type,
			'apartment'=>$apartment,
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
		//第二个参数JSON_UNESCAPED_UNICODE只适用于php版本5.4以上的，这个版本刚好合适
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);

	}
	//index的js脚本请求通讯录信息，address找到数据整理后返回json数据
	public function address()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
		//不是js请求拒绝访问
		if(empty($_GET['account']))
			$this->redirect('Center/index');
		
	}
	//index的js脚本请求空课表信息，table找到数据整理后返回json数据
	public function table()
	{
	}
	//modify为修改个人信息的数据库操作
	public function modify()
	{
		
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
		/*
		//不是js请求拒绝访问
		if(empty($_GET['account']))
			$this->redirect('Center/index');
*/
		//接收index脚本传过来的json数据,并将数据存入数据库中
		$account=$_SESSION['account'];
		
		$data=Array(
			//账户信息
		
			'account'=>$_SESSION['account'],
		    'name'=>$_GET['name'],
		    'type'=>$_GET['type'],
			'apartment'=>$_GET['apartment'],
			'position'=>$_GET['position'],
			//个人信息     
		    'sex'=>$_GET['sex'],
		    'grade'=>$_GET['grade'],
		    'major'=>$_GET['major'],
			
			'birthtype'=>$_GET['birthtype'],
			'birthmonth'=>$_GET['birthmonth'],
			'birthday'=>$_GET['birthday'],
			//联系方式
			
			'phone'=>$_GET['phone'],
			'short'=>$_GET['short'],
			'qq'=>$_GET['qq'],
			'dorm'=>$_GET['dorm'],
			'mail'=>$_GET['mail'],
			
		);
		
		//$data['birthmonth']="三月";
		$person_model=M('Person');
		if($person_model->where("account=$account")->save($data))
			$flag=1;
		else
			$flag=0;
		//var_dump($_POST['data']);
		//flag为1表示正常
		//$data=$_GET['name'];
		$arr=Array('name'=>$_GET['name'],'account'=>$account,'status'=>$flag);
		//$arr=Array('status'=>$flag.$_GET['birthmonth']);
		echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	}
	//check 为帮助判断传过来的密码是否为正确的
	public function check()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
		/*
		//不是js请求拒绝访问
		if(empty($_GET['account']))
			$this->redirect('Center/index');
*/
		//接收index脚本传过来的json数据,并将数据存入数据库中
		$account=$_SESSION['account'];
		/*
		$date=Array
		(
			"account"=>$account,
			"password"=>$_GET['password'],
		);
		*/
		$person_model=M('Person');
		$person_info=$person_model->where("account=$account")->find();
		if($person_info['password']==$_GET['password'])
			$flag=1;
		else
			$flag=0;
		//var_dump($_POST['data']);
		//flag为1表示正常
		//$data=$_GET['name'];
		$arr=Array('status'=>$flag,'password'=>$_GET['password'],'account'=>$_SESSION['account']);
		//$arr=Array('status'=>$flag.$_GET['birthmonth']);
		echo json_encode($arr,JSON_UNESCAPED_UNICODE);

	}
	public function change()
	{
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(empty($_SESSION['account']))
            $this->redirect('Login/index');
		/*
		//不是js请求拒绝访问
		if(empty($_GET['account']))
			$this->redirect('Center/index');
*/
		//接收index脚本传过来的json数据,并将数据存入数据库中
		$account=$_SESSION['account'];
		$data['account']=$account;
		$data['password']=$_GET['password'];//"2012052308";
		$person_model=M('Person');
		if($person_model->save($data))
			$flag=1;
		else
			$flag=0;
		$arr=Array('account'=>$account,'status'=>$flag);
		//$arr=Array('status'=>$flag.$_GET['birthmonth']);
		echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	}

	//revise为修改空课表的数据库操作
	public function revise()
	{
	}


}
?>