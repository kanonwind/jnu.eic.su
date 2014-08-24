<?php
/*
*新闻主页
*/
class IndexAction extends Action
{
  //首页
  public function index()
  {
	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
		$arr=false;
	}
	echo $this->_encode($arr);
  }
  
  //新闻中心页面
  public function newscenter()
  {
	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
	$type=1;
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('view',"newscenter");
	$this->display();
  }
  //学生工作页面
  public function work()
  {
 	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
	$type=2;
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('view',"work");
	$this->display();	
  }
  //活动页面
  public function activity()
  {
 	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
	$type=3;
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('view',"activity");
	$this->display();
  }
  //现行制度页面
  public function files()
  {
 	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
	$type=4;
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('view',"files");
	$this->display(); 
  }
    //获取新闻、活动、学生工作、现行制度等各种数据
	private function getData($type)
	{
		$limit=2;
		//获取新闻最新最新的四篇（当前数据库不足，以后调整）
		$news_model=new Model("News");
		$news_info=$news_model->where("type=$type")->select();
		//将所有创建时间转存到数组中,并进行排序
		foreach($news_info as $v)
		{
			$arr[]=Array(
				'create_time'=>$v['create_time'],
			);
		}
		
		sort($arr);
		
		//找到四篇最新的
		$num=count($arr);
		for($i=0;$i<$limit;$i++)
		{
			
			$create_time=$arr[$num-$i-1]['create_time'];
			$news_info=$news_model->where("create_time=$create_time")->find();
			$newsArr[]=Array(
				'id'=>$news_info['id'],
				'title'=>$news_info['title'],
				'create_time'=>$news_info['create_time'],
			);
		}
		//获取新闻剩余的新闻
		rsort($arr);
		for($i=$limit;$i<$num;$i++)
		{
			
			$create_time=$arr[$i]['create_time'];
			$news_info=$news_model->where("create_time=$create_time")->find();
			$moreArr[]=Array(
				'id'=>$news_info['id'],
				'title'=>$news_info['title'],
				'create_time'=>$news_info['create_time'],
			);
		}
		//执行分页任务
		$pageSize=4;
		//获取页面数量
		$pageNum=count($moreArr)/$pageSize;
		$pageNum=ceil($pageNum);
		//获取当前页数和内容
		if(isset($_GET['page']))
		{
			if($_GET['page']<0||$_GET['page']>$pageNum)
			{
				$page=1;
			}
			else{
				$page=$_GET['page'];
			}
		}
		else
		{
			$page=1;
		}
		$moreArr=array_slice($moreArr,($page-1)*$pageSize,$pageSize);
		//获取上一页和下一页
		if($page==1)
		{
			$prePage=1;
		}
		else{
			$prePage=$page-1;
		}
		if($page==$pageNum)
		{
			$nexPage=$pageNum;
		}
		else{
			$nexPage=$page+1;
		}
		unset($data);
		$data['lastArr']=$newsArr;
		$data['moreArr']=$moreArr;
		$data['page']=$page;
		$data['pageNum']=$pageNum;
		$data['prePage']=$prePage;
		$data['nexPage']=$nexPage;
		return $data;
/* 		$this->assign('newsArr',$newsArr);
		$this->assign('moreArr',$moreArr);
		$this->assign('page',$page);
		$this->assign('pageNum',$pageNum);
		$this->assign('prePage',$prePage);
		$this->assign('nexPage',$nexPage); */
		
	}
  //新闻中心单条新闻
  public function show()
  {
 	if(!$this->judgelog())
	{
		$this->redirect("Login/index");
	}
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
	//拒绝访问：没有$_GET['id']值
	if(empty($_GET['id']))
		$this->redirect("Home/newscenter");
	$id=$_GET['id'];
	$news_model=new Model("News");
	$news_info=$news_model->where("id=$id")->find();
	if(false==$news_info)
	{
		$this->redirect("Home/newscenter");
	}
	//转化时间
	$create_time=date("Y-m-d",$news_info['create_time']);
	$newsArr=Array(
		'title'=>$news_info['title'],
		'author'=>$news_info['author'],
		'create_time'=>$create_time,
		'keyword'=>$news_info['keyword'],
		'text'=>$news_info['text'],
	);
	$this->assign('newsArr',$newsArr);
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