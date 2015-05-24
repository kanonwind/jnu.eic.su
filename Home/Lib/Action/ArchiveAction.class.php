<?php
//News类主要负责后台的新闻公告活动等的编辑与上传
class ArchiveAction extends Action{
    //展示活动文档
    public function index()
    {
   session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
        $this->redirect("Index/index");
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
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
	}
    $deleteFlag=1;
	//是否提供删除按钮
	if(!empty($_SESSION['account']))
	{
		$account=$_SESSION['account'];
		$person_info=$person_model->where("account=$account")->find();
        //设置文档删除权限:只有秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
            $deleteFlag=0;
        if($apartment!=1 && $apartment!=12)
            $deleteFlag=0;  
	}
    
	$type="(9)";
	$data=$this->getData($type);
	$this->assign('moreArr',$data['moreArr']);
	$this->assign('page',$data['page']);
	$this->assign('pageNum',$data['pageNum']);
	$this->assign('prePage',$data['prePage']);
	$this->assign('nexPage',$data['nexPage']);
	$this->assign('deleteFlag',$deleteFlag);
	$this->display();
    }
	//添加活动文档
	public function create()
	{
        
		//拒绝未登录访问
		session_name('LOGIN');
        session_start();
        if(!$this->judgelog())
            $this->redirect('Index/index');
		else{
			//个人信息
			$account=$_SESSION['account'];
			$person_model=new Model("Person");
            $person_info=$person_model->where("account=$account")->find();
            //设置发布中心访问权限:只有\秘书部长\主席团才有资格进入
            $type=$person_info['type'];
            $apartment=$person_info['apartment'];
            if($type==1||$type==2)
                $this->redirect('Index/index');
            if($apartment!=1 && $apartment!=12)
                $this->redirect('Index/index');
			$name=$person_info['name'];
			$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>&nbsp;";
			$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>&nbsp;";
			$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
			$this->assign('link',$link);
			$this->display();
		}
	}
    //活动存档 执行添加
    public function addarchive()
    {
 		//拒绝访问:未登录，没post，用户类型（暂时没有）
		if(empty($_POST['article_title']))
		{
			$this->error("无法访问......");
		}
		//$create_time=time();
		$title=$_POST['article_title'];
		$author=$_POST['article_author'];
		$keyword=" ";
		$type=9;
        //将前端发过来的时间字符串转化成时间戳
        $create_time=$_POST['article_datetime'];
        $format = 'Y-m-d H:i:s';
        $date = DateTime::createFromFormat($format, $create_time);
        $create_time = $date->getTimestamp();
		//$text=$_POST['article_text'];
		//判断正文哪种形式，直接编辑或者是文件上传
		$sto=new SaeStorage();
		$domain="news";
		if(isset($_FILES['uploaded_file']['name'])&&!empty($_FILES['uploaded_file']['name']))
		{
			$tmp_name=$_FILES['uploaded_file']['tmp_name'];
			//通过文件上传,先存到storage，再读取文件内容
			if($sto->upload($domain,"temp.txt",$tmp_name))
			{
				$text=$sto->read($domain,"temp.txt");
			}
		}
		else
		{
			//直接在线编辑的
			$text=$_POST['article_text'];
		}
		//获取正文$text中的第一个图片链接的SRC，即url值,并且抽取出图片文件名，与路径无关
		if($startPosition=stripos($text,"<img src="))
		{
			//截取整个<img/>
			$endPosition=stripos($text,"/>",$startPosition);
			$target=substr($text,$startPosition,$endPosition-$startPosition);
			//var_dump($target);
			//截取src属性
			$startPosition=stripos($target,"src=\"");
			$endPosition=strripos($target,"alt=\"");	
			$target=substr($target,$startPosition,$endPosition-$startPosition);
			//var_dump($target);
			//截取图片文件名
			$startPosition=strripos($target,"/");
			$endPosition=strripos($target,"\"");
			//var_dump($startPosition);
			//var_dump($endPosition);
			$url=substr($target,$startPosition+1,$endPosition-$startPosition-1);
		}
		else
		{
			$url="#";
		}
		//进行数据库操作
		$news_model=new Model("News");
		$data['create_time']=$create_time;
		$data['update_time']=$create_time;
		$data['title']=$title;
		$data['author']=$author;
		$data['keyword']=$keyword;
		$data['type']=$type;
		$data['url']=$url;
		$data['text']=$text;
		if(false==$news_model->add($data))
		{
			$this->error("添加出错，正在返回......");
		}
		else
		{
			$latest_model=new Model("Latest");
			$news_info=$news_model->query("select id, create_time from tbl_news where type=$type order by create_time DESC limit 8");
			//先删除tbl_latest中type为1的数据
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
			$this->Success("添加成功，正在返回......",__APP__."/News/index");
		}        
    }

	//上传图片
	public function uploadpic()
	{
		$flag=1;
		$type=$_FILES['myfile']['type'];
		$size=$_FILES['myfile']['size'];
		$name=$_FILES['myfile']['name'];
		$tmp_name=$_FILES['myfile']['tmp_name'];
		
		//验证图片类型
		switch($type)
		{
			case "image/jpeg":
				$pic_type=".jpg";break;
 			case "image/png" :
				$pic_type=".png";break;
			case "image/bmp" :
				$pic_type=".bmp";break; 
			default:
				$flag=0;
		}
/* 		//验证大小
		if($size<1 || $size>100000)
		{
			$flag=0;
		} */
		//通过验证
		$time=time();
		if($flag==1)
		{
			//获取临时文件
			$destFileName=md5_file($tmp_name).$pic_type;
			//将文件搬运到storage存储
			$sto=new SaeStorage();
			$domain="news";
			//$storage->upload($domain,$destFileName, $srcFileName, -1, $attr, true);
			if($sto->upload($domain,$destFileName,$tmp_name,-1))
			{
				$imgURL=$sto->getUrl($domain,$destFileName);
				if(!IS_SAE)
				{
					$imgURL="/".$imgURL;
				}
			}
			else
			{$flag=0;}
		}
		//输出结果
		if($flag==1)
		{
			echo "upload successfully";
			echo "</br>the URL of the picture ".$name." is : ".$imgURL;
		}
		else
		{
			echo "upload failed!(only support for jpg/png/bmp)";
		}		
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
      //设置文档删除权限:只有秘书部长\主席团才有资格删除
        $type=$person_info['type'];
        $apartment=$person_info['apartment'];
        if($type==1||$type==2)
        {
            $this->error("无法访问......");
            return;
        }
        if($apartment!=1 && $apartment!=12)
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
            $this->Success("删除成功，正在返回......",__APP__."/Archive/index");
        }
		
	
  }
  //单挑文档
  public function show()
  {

    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
    {
        $this->redirect('Index/index');
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
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">&nbsp;个人中心</a>";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">&nbsp;注销</a>";
		$this->assign('link',$link);
	}
	//拒绝访问：没有$_GET['id']值，不是整数
	if(empty($_GET['id']))
		$this->redirect("Index/index");
	if(!is_numeric($_GET['id']))
		$this->redirect("Index/index");
	$id=$_GET['id'];
	$news_model=new Model("News");
	$news_info=$news_model->where("id=$id")->find();
	if(false==$news_info)
	{
		$this->redirect("Index/index");
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
	$mainType="活动存档";$mainTypeEn="Archive";
	$newsArr=Array(
		'id'=>$news_info['id'],
		'title'=>$news_info['title'],
        'type'=>$news_info['type'],
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
	//活动存档编辑保存
	public function update()
	{
		$person_model=new Model("Person");
		//非编辑部门拒绝访问
		if(!empty($_GET['id']) && !empty($_SESSION['account']))
		{
			$account=$_SESSION['account'];
			$person_info=$person_model->where("account=$account")->find();
            //设置文档编辑权限:只有信编部部长\秘书部长\主席团才有资格
            $type=$person_info['type'];
            $apartment=$person_info['apartment'];
            if($type==1||$type==2)
                $this->redirect('Index/index');
            if($apartment!=1 && $apartment!=12)
                $this->redirect('Index/index');
		}
		else{
			$this->redirect("Index/index");
		}
		$text=$_POST['article_text'];
		//获取正文$text中的第一个图片链接的SRC，即url值,并且抽取出图片文件名，与路径无关
		if($startPosition=strpos($text,"<img src="))
		{
			//截取整个<img/>
			$endPosition=strpos($text,"/>",$startPosition);
			$target=substr($text,$startPosition,$endPosition-$startPosition);
			//var_dump($target);
			//截取src属性
			$startPosition=strpos($target,"src=\"");
			$endPosition=strripos($target,"alt=\"");	
			$target=substr($target,$startPosition,$endPosition-$startPosition);
			//var_dump($target);
			//截取图片文件名
			$startPosition=strripos($target,"/");
			$endPosition=strripos($target,"\"");
			//var_dump($startPosition);
			//var_dump($endPosition);
			$url=substr($target,$startPosition+1,$endPosition-$startPosition-1);
		}
		else
		{
			$url="#";
		}
		unset($data);
		$id=$_GET['id'];
		$data['id']=$_GET['id'];
		$data['title']=$_POST['article_title'];
		$data['author']=$_POST['article_author'];
		$data['keyword']=$_POST['artcle_key_word'];
        //将前端发过来的时间字符串转化成时间戳
        $create_time=$_POST['article_datetime'];
        $format = 'Y-m-d H:i:s';
        $date = DateTime::createFromFormat($format, $create_time);
        $create_time = $date->getTimestamp();
        $data['create_time']=$create_time;
		$data['update_time']=$create_time;
		$data['type']=$_POST['article_type'];
		$data['url']=$url;
		$data['text']=$_POST['article_text'];
		$news_model=new Model("News");
		$news_info=$news_model->where("id=$id")->save($data);
		if(false==$news_info)
		{
			$this->error("修改出错，正在返回......");
		}
		else
		{
			//echo "修改成功";
			//var_dump($data);
			$this->Success("修改成功，正在返回......",__APP__."/Archive/show?id=".$id);

		}
	}
 	private function getData($type)
	{
		$news_model=new Model("News");
		$news_info=$news_model->query("select id, title, create_time from tbl_news where type IN $type order by create_time DESC");
		foreach($news_info as $v)
		{
            //获取新闻剩余的新闻
				$moreArr[]=Array(
					'id'=>$v['id'],
					'title'=>$v['title'],
					'create_time'=>$v['create_time'],
				);	
			
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