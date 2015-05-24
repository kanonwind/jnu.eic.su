<?php
/*
*新闻主页
*/
class IndexAction extends Action
{
  //数据获取测试
  public function getNews()
  {
	$news_model=new Model("News");
	$type=1;
	$news_info=$news_model->query("select id, title, create_time from tbl_news where type=$type order by create_time DESC limit 8");
	foreach($news_info as $v)
	{
		echo $v['create_time'].$v['title']."</br>";
	}
  }
  //首页
  public function index()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
		$loginFlag=0;
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
		$loginFlag=1;
	}
	//获取最新3篇热点新闻
	$news_model=new Model("News");
	$latest_model=new Model("Latest");
	$latest_info=$latest_model->where("type=1 and rank<7")->select();
	for($i=0;$i<count($latest_info);$i++)
	{
		$rank=$latest_info[$i]['rank'];
		$latest_info2=$latest_model->where("type=1 and rank=$rank")->find();
		$id=$latest_info2['id'];
		$news_info=$news_model->where("id=$id")->find();
		$keyword=explode("|",$news_info['keyword']);
		$hot[]=Array(
			'keyword'=>$keyword[0],
			'id'=>$id,
		);//最新新闻存储完毕
	}
    if($loginFlag==1)
    {
        $rankNum=2;
    }else{
        $rankNum=3;
    }
	//获取最新活动	
	$latest_info=$latest_model->where("type=3 and rank<$rankNum")->select();
	for($i=0;$i<count($latest_info);$i++)
	{
		$id=$latest_info[$i]['id'];
		$news_info=$news_model->where("id=$id")->find();
		$keyword=explode("|",$news_info['keyword']);
		$activity[]=Array(
			'keyword'=>$keyword[0],
			'id'=>$id,
		);
	}
	//获取最新学生工作
	$latest_info=$latest_model->where("type=2 and rank<$rankNum")->select();
	for($i=0;$i<count($latest_info);$i++)
	{
		$id=$latest_info[$i]['id'];
		$news_info=$news_model->where("id=$id")->find();
		$keyword=explode("|",$news_info['keyword']);
		$work[]=Array(
			'keyword'=>$keyword[0],
			'id'=>$id,
		);
	}
	//获取公告
	$announcement_model=new Model("Announcement");
	$latest_info=$latest_model->where("type=5 and rank=1")->find();
	$id=$latest_info['id'];
	$announcement_info=$announcement_model->where("id=$id")->find();
	$announcement=$announcement_info['text'];
	
	//获取即将举办
	$activity_model=new Model("Activity");
	$latest_info=$latest_model->where("type=6 and rank=1")->find();
	$id=$latest_info['id'];
	$activity_info=$activity_model->where("id=$id")->find();
	$activityExpected=Array(
		'act_name'=>$activity_info['act_name'],
		'act_time'=>$activity_info['act_time'],
		'act_address'=>$activity_info['act_address'],
		'act_apartment'=>$activity_info['act_apartment'],
		'act_slogan'=>$activity_info['act_slogan'],
		'act_bigposter'=>$activity_info['act_bigposter'],
		'act_smallposter'=>$activity_info['act_smallposter'],
	);
	
	$this->assign('hot',$hot);
	$this->assign('activity',$activity);
	$this->assign('work',$work);
	$this->assign('announcement',$announcement);
	$this->assign('activityExpected',$activityExpected);
	$this->assign('login',$loginFlag);
	$this->display();
  }
  //AJAX请求新闻数据
  public function newsData()
  {
	//带有图片URL的新闻方可
	$news_model=new Model("News");
	$latest_model=new Model("Latest");
	$latest_info=$latest_model->where("type=1")->select();
	for($i=0;$i<count($latest_info);$i++)
	{
		$id=$latest_info[$i]['id'];
		$news_info=$news_model->where("id=$id and type=1")->find();
		//var_dump($news_info);
		//$abst=mb_substr($news_info['text'], 0, 20, 'utf-8');  
		if($news_info['url']=='#')
			continue;
		$abst=$news_info['title'];
		$title_len=mb_strlen($news_info['title'],'utf-8');
		if($title_len>20){
			$title_len=20;
			$title=mb_substr($news_info['title'],0,$title_len,'utf-8')."....";
		}else{
			$title=$news_info['title'];
		}
		if(empty($news_info['author'])||$news_info['author']==" ")
			$news_info['author']="-";
		$arrNewsInfo[]=Array(
			'title'=>$title,
			'author'=>$news_info['author'],
			'abst'=>$abst,
			'picpath'=>$news_info['url'],
			'newslink'=>__URL__."/show?id=".$news_info['id'],		
		);
	}

	$arr=Array(
		"arrNewsInfo"=>$arrNewsInfo,
	);
	//echo $this->_encode($arr);
	echo $this->JSON($arr);
  }
  
  //新闻中心页面
  public function newscenter()
  {
    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//是否提供删除按钮
	$deleteFlag=1;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
        //设置文档删除权限:只有信编部部长\秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
            $deleteFlag=0;
        if($apartment!=1 && $apartment!=4 && $apartment!=12)
            $deleteFlag=0;
	}
	$type="(1,2,3)";
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('view',"newscenter");
	$this->assign('deleteFlag',$deleteFlag);
	$this->display();
  }
  //学生工作页面
  public function work()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//是否提供删除按钮
	$deleteFlag=0;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
		if($person_info['apartment']==4 && $person_info['type']==3)
		{
			$deleteFlag=1;
		}
	}
	$type="(2)";
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('deleteFlag',$deleteFlag);
	$this->assign('view',"work");
	$this->display();	
  }
  //活动页面
  public function activity()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//是否提供删除按钮
	$deleteFlag=0;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
		if($person_info['apartment']==4 && $person_info['type']==3)
		{
			$deleteFlag=1;
		}
	}
	$type="(3)";
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('deleteFlag',$deleteFlag);
	$this->assign('view',"activity");
	$this->display();
  }
  //通知公示
  public function notice()
  {
    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//是否提供删除按钮
	$deleteFlag=1;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
        //设置文档删除权限:只有信编部部长\秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
            $deleteFlag=0;
        if($apartment!=1 && $apartment!=4 && $apartment!=12)
            $deleteFlag=0;
	}
	$type="(7)";
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('deleteFlag',$deleteFlag);
	$this->assign('view',"files");
	$this->display();      
  }
  //现行制度页面
  public function files()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//是否提供删除按钮
	$deleteFlag=1;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
        //设置文档删除权限:只有信编部部长\秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
            $deleteFlag=0;
        if($apartment!=1 && $apartment!=4 && $apartment!=12)
            $deleteFlag=0;
	}
	$type="(4)";
	$data=$this->getData($type);
	$this->assign('lastArr',$data['lastArr']);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('deleteFlag',$deleteFlag);
	$this->assign('view',"files");
	$this->display(); 
  }
    //团学简介
    public function introduce()
    {
        session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
        {
            //尚未登录
            $link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
            $this->assign('link',$link);
        }
        else{
            //个人信息
            $account=$_SESSION['account'];
            $person_model=new Model("Person");
            $person_info=$person_model->where("account=$account")->find();
            $name=$person_info['name'];
            $link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
            $link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
            $link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
            $this->assign('link',$link);
        }
        //是否提供删除按钮
        $deleteFlag=1;
        if(!empty($_SESSION['account']))
        {
            $account=$_SESSION['account'];
            $person_info=$person_model->where("account=$account")->find();
            //设置文档删除权限:只有信编部部长\秘书部长\主席团才有资格删除
            $type=$person_info['type'];
            $apartment=$person_info['apartment'];
            if($type==1||$type==2)
                $deleteFlag=0;
            if($apartment!=1 && $apartment!=4 && $apartment!=12)
                $deleteFlag=0;
        }
        $type="(8)";
        $data=$this->getData($type);
        $this->assign('lastArr',$data['lastArr']);
        $this->assign('moreArr',$data['moreArr']);
        $this->assign('page',$data['page']);
        $this->assign('pageNum',$data['pageNum']);
        $this->assign('prePage',$data['prePage']);
        $this->assign('nexPage',$data['nexPage']);
        $this->assign('deleteFlag',$deleteFlag);
        $this->assign('view',"files");
        $this->display();          
    }
    //获取新闻、活动、学生工作、现行制度等各种数据,参数$type
	private function getData($type)
	{
		
		$limit=8;
		//获取新闻最新最新的8篇
		$news_model=new Model("News");
		$i=0;
		$news_info=$news_model->query("select id, title, create_time from tbl_news where type IN $type order by create_time DESC");
		foreach($news_info as $v)
		{
			if($i<8)
			{
				$newsArr[]=Array(
					'id'=>$v['id'],
					'title'=>$v['title'],
					'create_time'=>$v['create_time'],
				);
			}else{
			//获取新闻剩余的新闻
				$moreArr[]=Array(
					'id'=>$v['id'],
					'title'=>$v['title'],
					'create_time'=>$v['create_time'],
				);	
			}
			$i++;
		}

		//执行分页任务
		$pageSize=32;
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
  //删除单条新闻
  public function deleteNews()
  {
      session_name('LOGIN');
      session_start();
      if(!$this->judgelog())
      {
		  //尚未登录
		 $this->error("无法访问......");
		 return;
	  }
      $account=$_SESSION['account'];
      $person_model=new Model("Person");
      $person_info=$person_model->where("account=$account")->find();
      //设置文档删除权限:只有信编部部长\秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
        {
            $this->error("无法访问......");
            return;
        }
        if($apartment!=1 && $apartment!=4 && $apartment!=12)
        {
            $this->error("无法访问......");
            return;
        }

        if(!empty($_GET['id']) && !empty($_GET['type']))
        {
            $id=$_GET['id'];
            $type=$_GET['type'];
            $news_model=new Model("News");
            $latest_model=new Model("Latest");
            $news_model->where("type=$type and id=$id")->delete();
            $news_info=$news_model->query("select id, create_time from tbl_news where type=$type order by create_time DESC limit 8");
            $latest_model->where("type=$type")->delete();
            //添加最新记录数据
            unset($data);
            $i=1;
            foreach($news_info as $v)
            {
                $data['id']=$v['id'];
                $data['create_time']=$v['create_time'];
                $data['type']=$type;
                $data['rank']=$i;
                $i++;
                $latest_model->add($data);
            }
            $this->Success("删除成功，正在返回......",__APP__."/Index/newscenter");
        }
		
	
  }
  //新闻中心单条新闻
  public function show()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
		//尚未登录
		$link="<a class=\"user_info\" id=\"login_info_user_log_in\" href=\"".__APP__."/Login/index\">登录</a>";
		$this->assign('link',$link);
	}
	else{
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
	//拒绝访问：没有$_GET['id']值，不是整数
	if(empty($_GET['id']))
		$this->redirect("Index/newscenter");
	if(!is_numeric($_GET['id']))
		$this->redirect("Index/newscenter");
	$id=$_GET['id'];
	$news_model=new Model("News");
	$news_info=$news_model->where("id=$id")->find();
	if(false==$news_info)
	{
		$this->redirect("Index/newscenter");
	}
	//转化时间
	$create_time=date("Y-m-d",$news_info['create_time']);
	//转化关键词
	if(empty($news_info['keyword']))
	{
		$keyword="";
	}
	else
	{
		if(false==strpos($news_info['keyword'],"|"))
		{	
			$keyword=$news_info['keyword'];
		}
		else{
			$keyword=explode("|",$news_info['keyword']);
		}
	}
	//是否提供编辑按钮
	$editFlag=1;
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
        //设置文档编辑权限:只有信编部部长\秘书部长\主席团才有资格编辑
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
            $editFlag=0;
        if($apartment!=1 && $apartment!=4 && $apartment!=12)
            $editFlag=0;
	}
	//判断当前是哪种类型，1（新闻），2（学生工作），3（活动），4（现行制度）,5(首页公告) 6(即将举办的活动) 7(通知公示) 8(团学简介)
 	switch($news_info['type'])
	{
        case 8:
            $mainType="团学简介";$mainTypeEn="About the League";break;
		case 7:
			$mainType="通知公示";$mainTypeEn="Notification";break;
		case 4:
			$mainType="现行制度";$mainTypeEn="Regulations";break;
		default:
			$mainType="新闻中心";$mainTypeEn="News Center";
	} 
	$newsArr=Array(
		'id'=>$news_info['id'],
        'type'=>$news_info['type'],
		'title'=>$news_info['title'],
		'author'=>$news_info['author'],
		'create_time'=>$create_time,
		'keyword'=>$keyword,
		'text'=>$news_info['text'],
		'editFlag'=>$editFlag,
		'mainType'=>$mainType,
		'mainTypeEn'=>$mainTypeEn,
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
  //另一个JSON 中文乱码处理函数
  private function JSON($array) { 
	$this->arrayRecursive($array, 'urlencode', true); 
    $json = json_encode($array); 
    return urldecode($json); 
  } 
  private function arrayRecursive(&$array, $function, $apply_to_keys_also = false){ 
    static $recursive_counter = 0; 
    if (++$recursive_counter > 1000) { 
        die('possible deep recursion attack'); 
    } 
    foreach ($array as $key => $value) { 
        if (is_array($value)) { 
            $this->arrayRecursive($array[$key], $function, $apply_to_keys_also); 
        } else { 
            $array[$key] = $function($value); 
        }                                        
        if ($apply_to_keys_also && is_string($key)) { 
            $new_key = $function($key); 
            if ($new_key != $key) { 
                $array[$new_key] = $array[$key]; 
                unset($array[$key]); 
            } 
        } 
    } 
    $recursive_counter--; 
  }                                                                                      
}
?>