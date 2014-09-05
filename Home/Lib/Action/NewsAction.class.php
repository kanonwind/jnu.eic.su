<?php
//News类主要负责后台的新闻公告活动等的编辑与上传
class NewsAction extends Action{
	//主界面,展示所有新闻
	public function index()
	{
		
		
		$this->display();
	}
	//编辑页面
	public function create()
	{
			$this->display();
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
/* 			case "image/png" :
				$pic_type=".png";break;
			case "image/bmp" :
				$pic_type=".bmp";break; */
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
			$destFileName=md5($time.$name).$pic_type;
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
			echo "upload failed";
		}		
	}

	//新闻与文档	执行添加
	public function createNews()
	{
		//拒绝访问:未登录，没post，用户类型（暂时没有）
		if(empty($_POST['article_title']))
		{
			$this->error("无法访问......");
		}
		$create_time=time();
		$title=$_POST['article_title'];
		$author=$_POST['article_author'];
		$keyword=$_POST['artcle_key_word'];
		$type=$_POST['article_type'];
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
		if($startPosition=strpos($text,"<img src="))
		{
			//截取整个<img/>
			$endPosition=strpos($text,"/>",$startPosition);
			$target=substr($text,$startPosition,$endPosition-$startPosition);
			var_dump($target);
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
		var_dump($data);
		if(false==$news_model->data($data)->add())
		{
			$this->error("添加出错，正在返回......");
		}
		else
		{
			$this->Success("添加成功，正在返回......",__APP__."/News/create");
		} 
		
	}
	//公告	执行添加
	public function createAnnouncement()
	{
		//拒绝访问:未登录，没post，用户类型（暂时没有）
		if(empty($_POST['gonggao']))
		{
			$this->error("无法访问......");
		}
		$create_time=time();
		$text=$_POST['gonggao'];
		$announcement_model=new Model("Announcement");
		$data['create_time']=$create_time;
		$data['update_time']=$create_time;
		$data['text']=$text;
		if(false==$announcement_model->data($data)->add())
		{
			$this->error("添加出错，正在返回......");
		}
		else
		{
			$this->Success("添加成功，正在返回......",__APP__."/News/create");
		}
	}
	//即将举办的活动	执行添加
	public function createActivity()
	{
		//拒绝访问:未登录，没post，用户类型（暂时没有）
		if(empty($_POST['act_name']))
		{
			$this->error("无法访问......");
		}
		$create_time=time();
		$data['create_time']=$create_time;
		$data['update_time']=$create_time;
		$data['act_name']=$_POST['act_name'];
		$data['act_time']=$_POST['act_time'];
		$data['act_address']=$_POST['act_address'];
		$data['act_apartment']=$_POST['act_apartment'];
		$data['act_slogan']=$_POST['act_slogan'];
		$data['act_bigposter']=$_POST['act_bigposter'];
		$data['act_smallposter']=$_POST['act_smallposter'];
		$activity_model=new Model("Activity");
		if(false==$activity_model->data($data)->add())
		{
			$this->error("添加出错，正在返回......");
		}
		else
		{
			$this->Success("添加成功，正在返回......",__APP__."/News/create");
		}
	}
	//新闻编辑，编辑界面在Index/show，修改操作在News/update
	public function update()
	{
		$person_model=new Model("Person");
		//非编辑部门拒绝访问
		if(!empty($_GET['id']) && !empty($_SESSION['account']))
		{
			$account=$_SESSION['account'];
			$person_info=$person_model->where("account=$account")->find();
			if($person_info['apartment']!=4)
			{
				$this->redirect("Index/index");
			}
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
		$data['update_time']=time();
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
			$this->Success("修改成功，正在返回......",__APP__."/Index/show?id=".$id);

		}
	}
}
?>