<?php
/*
*这是登录管理模块，实现登录验证
*/
class LoginAction extends Action
{
	//index为登录界面
	public function index()
	{
		$this->display();
	}
	//check为登录验证界面
	public function check()
	{
		$account=$_POST['user_login_name'];
		$pw=$_POST['user_login_pw'];

		//进行数据库查询之前，flag=1为正常，flag=0为异常
		$flag=1;
		//检查是否为空
		if(empty($account)||empty($pw))
			$flag=0;
		//检查是否含有危险字符
		//if()
		//  $flag=0;
		//没通过检查，返回登录页
		if($flag==0)
			$this->redirect("index");
		//在tbl_person中查找是否有此人
		$person_model=new Model("Person");
		$person_info=$person_model->select();
		$is_exit=0;
		foreach($person_info as $v)
		{
			if($v['account']==$account && $v['password']==$pw)
				$is_exit=1;
		}
		if($is_exit==1)//登录成功
		{
			//设置session
			 session_name('LOGIN');
             session_start();
             $_SESSION['account']=$account;
			 //到达个人中心首页
			 $this->redirect("Center/index");
		}		
		else//登录失败
			$this->redirect("index");
	}
}
?>