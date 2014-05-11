<?php
/*
*这是登录管理模块，实现登录验证
*/
class LoginAction extends Action
{
	//index为登录界面

	public function index()
	{

	    //先判断session
		   session_name('LOGIN');
           session_start();
        if(empty($_SESSION['account']))	
		  $this->display();
		else
		  $this->redirect("Perform/index");

	  // echo "暂时无法登录";
	}
	//check为登录验证界面
	public function check()
	{
	    //先判断session
		   session_name('LOGIN');
           session_start();
        if(!empty($_SESSION['account']))		
            $this->redirect("Perform/index");		
	    $account=$_POST['user_login_name'];
	    $password=$_POST['user_login_pw'];
		$person_model=new Model("Person");
		if($person_info=$person_model->where("account=$account and password=$password")->find()) 
         { 
		   //如果当前有已经登录，直接跳转到绩效考核，只能通过注销或者关闭来退出	   

           $_SESSION['account']=$account;
		   $this->redirect("Perform/index");
	    }
		else
		  $this->redirect("Login/index");
	}
	/*
	public function test()
	{
	  $admin_model=new Model("Admin");
	  var_dump($admin_model);
	  echo "adf;lkj";
	  $this->display();
	  
	}
	*/
}
?>