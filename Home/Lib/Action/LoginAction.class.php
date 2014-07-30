<?php
/*
*这是登录管理模块，实现登录验证
*/
class LoginAction extends Action
{

	//index为登录界面
	public function index()
	{
		if(!$this->judgelog())
		{
			$this->display();
		}
		else
		{
			$this->redirect("Home/index");
		}      
	}
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
            $this->redirect("Home/index");		
		}
	    $account=$_POST['user_login_name'];
	    $password=$_POST['user_login_pw'];
		$person_model=new Model("Person");
		if($person_info=$person_model->where("account=$account and password=$password")->find()) 
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
		   $this->redirect("Home/index");
	    }
		else
		  $this->redirect("Login/index");
	}
	//logout为用户注销
	public function logout()
	{
		session_name('LOGIN');
		session_start();
		//检查登录状态
		if($this->judgelog())
		{
			$account=$_SESSION['account'];		
			$login_model=new Model("Login");
			$login_info=$login_model->where("account=$account")->delete();
			session_unset();
		}
		$this->redirect("Home/index");
	}

	//vertication为验证码处理
	public function vertication()
	{

		//定义一个数组，包括数字、小写英文字母、大写英文字母共10+26+26=62个
		$arr_check=Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
				 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
				 0,1,2,3,4,5,6,7,8,9);
		session_start();
		$checked=0;
		//post为空，表示常规请求一张图片
		if(empty($_POST['checknumber']))
		{
			//Ob_end_flush();
			header("Content-type:image/png");
			$image=imagecreate(100,50);
			$bg=imagecolorallocate($image,200,200,200);
			$checknumber='';
			for($i=0;$i<4;$i++)
			{
				$index=rand(0,61);
				$str=$arr_check[$index];
				$checknumber.=$str;
				imagestring($image,5,10+$i*20,20,$str,imagecolorallocate($image,rand(100,125),rand(100,125),0));

			}
			$_SESSION['checknumber']=$checknumber;
			imagepng($image);
			imagedestroy($image);
		}
		//post不为空，表示需要验证
		else
		{
			if($_SESSION['checknumber']==$_POST['checknumber'])
			{
				$checked=1;
			}
			$arr=Array(
				'checked'=>$checked,
			);
			echo json_encode($arr);
		}
	}
	
 	//每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
	public function judgelog()
	{
		$judgelog=1;//已登录
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