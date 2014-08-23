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
  //AJAX请求新闻数据
  public function newsData()
  {
	//带有图片URL的新闻方可
	$news_model=new Model("News");
	$news_info=$news_model->where("url!='#'")->select();
	//有8条新闻
	if(count($news_info)>7)
	{
		for($i=0;$i<8;$i++)
		{
			$arr[]=Array(
				'title'=>$news_info[$i]['title'],
				'author'=>$news_info[$i]['author'],
				'abst'=>$news_info[$i]['keyword'],
				'picpath'=>$news_info[$i]['url'],
			);
		}
	}
	else{
		//没有8条新闻
	}
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