<?php
/*
*新闻主页
*/
class HomeAction extends Action
{
  //首页
  public function index()
  {
	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
	header("Content-Type:UTF-8");
    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index.php\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_id\" href=\"#\">".$account."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	$this->display();
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