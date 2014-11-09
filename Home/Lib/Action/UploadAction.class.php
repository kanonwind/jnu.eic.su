<?php
class UploadAction extends Action
{
	public function news()
	{	
		$news_model=new Model("News");
	  //判断目录是否存在
	  	$dirhandle=opendir("./pyspider4twxsh/twxsh/newstext");
		while (false !== ($file = readdir($dirhandle))) {
        if ($file != "." && $file != ".."){
            //找到路径
			$newsfilename="./pyspider4twxsh/twxsh/newstext/".$file."/".$file.".txt";
			$srcfilename="./pyspider4twxsh/twxsh/newstext/".$file."/"."src.txt";
			$picfilename="./pyspider4twxsh/twxsh/newstext/".$file."/images/";
			//读取新闻.txt
			echo "</br>正在处理".$newsfilename."</br>";
			$newsfilehandle = fopen($newsfilename, "r");
			$newsContent = fread($newsfilehandle, filesize($newsfilename));
			//获取标题和时间
			$newsTitlehandle=fopen($newsfilename,"r");
			$newsTitle=fgets($newsTitlehandle);
			echo "截取之前是：".$newsTitle."</br>";
			
			$newsTitle=ltrim($newsTitle,"title: ");
			echo "截取出来的标题是：".$newsTitle."</br>";
			$newsTime=fgets($newsTitlehandle);
			$newsTime=ltrim($newsTime,"date: ");
			fclose($newsTitlehandle);
			echo "截取出来的时间是：".$newsTime."</br>";
			//分割时间的年月日，并生成时间戳
			$newsTime=explode("-",$newsTime);
			$year=$newsTime[0];
			$month=$newsTime[1];
			$day=$newsTime[2];
			$create_time=mktime(0,0,0,$month,$day,$year);
			//是否已存在$create_time
			$news_info3=$news_model->where("create_time=$create_time and type=1")->find();
			while(false==empty($news_info3))
			{
				echo $create_time."发生重复</br>";
				$create_time=$news_info3['create_time']+1;
				echo "修改之后".$create_time."</br>";
				$news_info3=$news_model->where("create_time=$create_time and type=1")->find();
			}
			//echo $create_time;
			//读取图片路径src.txt
			$srcfilehandle=fopen($srcfilename,"r");
			$url="#";
			while(!feof($srcfilehandle)){
				$srcContent=fgets($srcfilehandle);
				if(empty($srcContent))
					break;
				//获取图片最简名称
				$trueName=$this->getTrueName($srcContent);
				//将图片转存到目标文件夹，并计算md5值命名
				$picfilehandle=fopen($picfilename.$trueName,"r");
				$picContent=fread($picfilehandle,filesize($picfilename.$trueName));
				$md5Str=md5($picContent);
				copy($picfilename.$trueName,"./temp/".$md5Str.".jpg");
					//echo $picfilename.$trueName."复制失败</br>";
				//获取图片在img标签中的src，作为匹配的pattern
				$originName=$this->getpicName($srcContent);
				//在新闻.txt中查找并替换
				//echo "第".++$i."次新闻替换：".$originName."</br>";
				//echo $newsContent;
				$newsContent=preg_replace($originName,"http://jnueicsu-news.stor.sinaapp.com/".$md5Str.".jpg",$newsContent);
				//echo "SRC是：".$picfilename." 最简名称是：".$trueName." md5值是：".$md5Str."</br>";
				if($url=="#")
					$url=$md5Str.".jpg";
			}
			//echo "</br>新闻替换后:</br>".$newsContent;
			//第一张图片URL是：
			//echo $url."</br>";
			//写入新闻文档中
			$newsfilenamebak="./pyspider4twxsh/twxsh/newstext/".$file."/".$file."bak.txt";
			$newsfilehandlebak = fopen($newsfilenamebak, "w+");
			fwrite($newsfilehandlebak,$newsContent);
			//去掉新闻的前三行
			unset($text);
			$i=0;
			$newsfilehandlebak = fopen($newsfilenamebak, "r");
			while(!feof($newsfilehandlebak)){
				if($i<3){
					$i++;
					fgets($newsfilehandlebak);
					continue;
				}
				else{
					$text.=fgets($newsfilehandlebak);
				}
			}
			//将新闻存入数据库
			$type=1;
			$news_model=new Model("News");
			$data['create_time']=$create_time;
			$data['update_time']=$create_time;
			$data['title']=$newsTitle;
			$data['author']=" ";
			$data['keyword']=" ";
			$data['type']=$type;
			$data['url']=$url;
			$data['text']=$text;
			//var_dump($data);
			if(false==$news_model->data($data)->add())
			{
				echo "添加出错</br>";
			}
			else
			{
				echo "添加成功</br>";
				unset($data);
				//获取将要操作的id
				$news_info=$news_model->where("create_time=$create_time and type=$type")->find();
				//echo "根据创建时间".$create_time."获取id";
				//var_dump($news_info);
				$id=$news_info['id'];
				$create_time=$news_info['create_time'];
				//最新新闻上限是8篇，活动等其他的最新就只有一篇
				if($type==1)
				{
					if($url!='#')
						$this->rankLatest($id,$type,8,$create_time);
				}
				else
				{
					$this->rankLatest($id,$type,1,$create_time);
				}
				
			}		
			}
		}
			//关闭文件流
			fclose($newsfilehandle);
			fclose($srcfilehandle);
			fclose($picfilehandle);
			fclose($newsfilehandlebak);
			
	}
	public function activity()
	{	
		$news_model=new Model("News");
	  //判断目录是否存在
	  	$dirhandle=opendir("./pyspider4twxsh/twxsh/activitiestext");
		while (false !== ($file = readdir($dirhandle))) {
        if ($file != "." && $file != ".."){
            //找到路径
			$newsfilename="./pyspider4twxsh/twxsh/activitiestext/".$file."/".$file.".txt";
			$srcfilename="./pyspider4twxsh/twxsh/activitiestext/".$file."/"."src.txt";
			$picfilename="./pyspider4twxsh/twxsh/activitiestext/".$file."/images/";
			//读取新闻.txt
			echo "</br>正在处理".$newsfilename."</br>";
			$newsfilehandle = fopen($newsfilename, "r");
			$newsContent = fread($newsfilehandle, filesize($newsfilename));
			//获取标题和时间
			$newsTitlehandle=fopen($newsfilename,"r");
			$newsTitle=fgets($newsTitlehandle);
			//echo "截取之前是：".$newsTitle."</br>";
			
			$newsTitle=ltrim($newsTitle,"title:");
			//echo "截取出来的标题是：".$newsTitle."</br>";
			$newsTime=fgets($newsTitlehandle);
			$newsTime=ltrim($newsTime,"date:");
			fclose($newsTitlehandle);
			//分割时间的年月日，并生成时间戳
			$newsTime=explode("-",$newsTime);
			$year=$newsTime[0];
			$month=$newsTime[1];
			$day=$newsTime[2];
			$create_time=mktime(0,0,0,$month,$day,$year);
			//是否已存在$create_time
			$news_info3=$news_model->where("create_time=$create_time and type=3")->find();
			while(false==empty($news_info3))
			{
				echo $create_time."发生重复</br>";
				$create_time=$news_info3['create_time']+1;
				echo "修改之后".$create_time."</br>";
				$news_info3=$news_model->where("create_time=$create_time and type=3")->find();
			}
			//echo $create_time;
			//读取图片路径src.txt
			$srcfilehandle=fopen($srcfilename,"r");
			$url="#";
			while(!feof($srcfilehandle)){
				$srcContent=fgets($srcfilehandle);
				if(empty($srcContent))
					break;
				//获取图片最简名称
				$trueName=$this->getTrueName($srcContent);
				//将图片转存到目标文件夹，并计算md5值命名
				$picfilehandle=fopen($picfilename.$trueName,"r");
				$picContent=fread($picfilehandle,filesize($picfilename.$trueName));
				$md5Str=md5($picContent);
				copy($picfilename.$trueName,"./temp/".$md5Str.".jpg");
					//echo $picfilename.$trueName."复制失败</br>";
				//获取图片在img标签中的src，作为匹配的pattern
				$originName=$this->getpicName($srcContent);
				//在新闻.txt中查找并替换
				//echo "第".++$i."次新闻替换：".$originName."</br>";
				//echo $newsContent;
				$newsContent=preg_replace($originName,"http://jnueicsu-news.stor.sinaapp.com/".$md5Str.".jpg",$newsContent);
				//echo "SRC是：".$picfilename." 最简名称是：".$trueName." md5值是：".$md5Str."</br>";
				if($url=="#")
					$url=$md5Str.".jpg";
			}
			//echo "</br>新闻替换后:</br>".$newsContent;
			//第一张图片URL是：
			//echo $url."</br>";
			//写入新闻文档中
			$newsfilenamebak="./pyspider4twxsh/twxsh/activitiestext/".$file."/".$file."bak.txt";
			$newsfilehandlebak = fopen($newsfilenamebak, "w+");
			fwrite($newsfilehandlebak,$newsContent);
			//去掉新闻的前三行
			unset($text);
			$i=0;
			$newsfilehandlebak = fopen($newsfilenamebak, "r");
			while(!feof($newsfilehandlebak)){
				if($i<3){
					$i++;
					fgets($newsfilehandlebak);
					continue;
				}
				else{
					$text.=fgets($newsfilehandlebak);
				}
			}
			//将新闻存入数据库
			$type=3;
			$news_model=new Model("News");
			$data['create_time']=$create_time;
			$data['update_time']=$create_time;
			$data['title']=$newsTitle;
			$data['author']=" ";
			$data['keyword']=" ";
			$data['type']=$type;
			$data['url']=$url;
			$data['text']=$text;
			//var_dump($data);
			if(false==$news_model->data($data)->add())
			{
				echo "添加出错</br>";
			}
			else
			{
				echo "添加成功</br>";
				unset($data);
				//获取将要操作的id
				$news_info=$news_model->where("create_time=$create_time and type=$type")->find();
				//echo "根据创建时间".$create_time."获取id";
				//var_dump($news_info);
				$id=$news_info['id'];
				$create_time=$news_info['create_time'];
				//最新新闻上限是8篇，活动等其他的最新就只有一篇
				if($type==1)
				{
					if($url!='#')
						$this->rankLatest($id,$type,8,$create_time);
				}
				else
				{
					$this->rankLatest($id,$type,1,$create_time);
				}
				
			}		
			}
		}
			//关闭文件流
			fclose($newsfilehandle);
			fclose($srcfilehandle);
			fclose($picfilehandle);
			fclose($newsfilehandlebak);
			
	}
	public function work()
	{	
		$news_model=new Model("News");
	  //判断目录是否存在
	  	$dirhandle=opendir("./pyspider4twxsh/twxsh/workstext");
		while (false !== ($file = readdir($dirhandle))) {
        if ($file != "." && $file != ".."){
            //找到路径
			$newsfilename="./pyspider4twxsh/twxsh/workstext/".$file."/".$file.".txt";
			$srcfilename="./pyspider4twxsh/twxsh/workstext/".$file."/"."src.txt";
			$picfilename="./pyspider4twxsh/twxsh/workstext/".$file."/images/";
			//读取新闻.txt
			echo "</br>正在处理".$newsfilename."</br>";
			$newsfilehandle = fopen($newsfilename, "r");
			$newsContent = fread($newsfilehandle, filesize($newsfilename));
			//echo "判断是否正常读取".$newsContent."</br>";
			//获取标题和时间
			$newsTitlehandle=fopen($newsfilename,"r");
			$newsTitle=fgets($newsTitlehandle);
			//echo "截取之前是：".$newsTitle."</br>";
			
			$newsTitle=ltrim($newsTitle,"title:");
			//echo "截取出来的标题是：".$newsTitle."</br>";
			$newsTime=fgets($newsTitlehandle);
			$newsTime=ltrim($newsTime,"date:");
			fclose($newsTitlehandle);
			//分割时间的年月日，并生成时间戳
			$newsTime=explode("-",$newsTime);
			$year=$newsTime[0];
			$month=$newsTime[1];
			$day=$newsTime[2];
			$create_time=mktime(0,0,0,$month,$day,$year);
			//是否已存在$create_time
			$news_info3=$news_model->where("create_time=$create_time and type=2")->find();
			while(false==empty($news_info3))
			{
				echo $create_time."发生重复</br>";
				$create_time=$news_info3['create_time']+1;
				echo "修改之后".$create_time."</br>";
				$news_info3=$news_model->where("create_time=$create_time and type=2")->find();
			}
			//echo $create_time;
			//读取图片路径src.txt
			$srcfilehandle=fopen($srcfilename,"r");
			$url="#";
			while(!feof($srcfilehandle)){
				$srcContent=fgets($srcfilehandle);
				if(empty($srcContent))
					break;
				//获取图片最简名称
				$trueName=$this->getTrueName($srcContent);
				//将图片转存到目标文件夹，并计算md5值命名
				$picfilehandle=fopen($picfilename.$trueName,"r");
				$picContent=fread($picfilehandle,filesize($picfilename.$trueName));
				$md5Str=md5($picContent);
				copy($picfilename.$trueName,"./temp/".$md5Str.".jpg");
					//echo $picfilename.$trueName."复制失败</br>";
				//获取图片在img标签中的src，作为匹配的pattern
				$originName=$this->getpicName($srcContent);
				//在新闻.txt中查找并替换
				//echo "第".++$i."次新闻替换：".$originName."</br>";
				//echo $newsContent;
				$newsContent=preg_replace($originName,"http://jnueicsu-news.stor.sinaapp.com/".$md5Str.".jpg",$newsContent);
				//echo "SRC是：".$picfilename." 最简名称是：".$trueName." md5值是：".$md5Str."</br>";
				if($url=="#")
					$url=$md5Str.".jpg";
			}
			echo "</br>新闻替换后:</br>".$newsContent;
			//第一张图片URL是：
			//echo $url."</br>";
			//写入新闻文档中
			$newsfilenamebak="./pyspider4twxsh/twxsh/workstext/".$file."/".$file."bak.txt";
			$newsfilehandlebak = fopen($newsfilenamebak, "w+");
			fwrite($newsfilehandlebak,$newsContent);
			//去掉新闻的前三行
			unset($text);
			$i=0;
			$newsfilehandlebak = fopen($newsfilenamebak, "r");
			while(!feof($newsfilehandlebak)){
				if($i<3){
					$i++;
					fgets($newsfilehandlebak);
					continue;
				}
				else{
					$text.=fgets($newsfilehandlebak);
				}
			}
			//将新闻存入数据库
			$type=2;
			$news_model=new Model("News");
			$data['create_time']=$create_time;
			$data['update_time']=$create_time;
			$data['title']=$newsTitle;
			$data['author']=" ";
			$data['keyword']=" ";
			$data['type']=$type;
			$data['url']=$url;
			$data['text']=$text;
			//var_dump($data);
			if(false==$news_model->data($data)->add())
			{
				echo "添加出错</br>";
				//echo "可能出错原因".$newsContent."</br>";
			}
			else
			{
				echo $newsfilename."添加成功</br>";
				unset($data);
				//获取将要操作的id
				$news_info=$news_model->where("create_time=$create_time and type=$type")->find();
				//echo "根据创建时间".$create_time."获取id";
				//var_dump($news_info);
				$id=$news_info['id'];
				$create_time=$news_info['create_time'];
				//最新新闻上限是8篇，活动等其他的最新就只有一篇
				if($type==1)
				{
					if($url!='#')
						$this->rankLatest($id,$type,8,$create_time);
				}
				else
				{
					$this->rankLatest($id,$type,1,$create_time);
				}
				
			}		
			}
		}
			//关闭文件流
			fclose($newsfilehandle);
			fclose($srcfilehandle);
			fclose($picfilehandle);
			fclose($newsfilehandlebak);
			
	}
	private function rankLatest($id,$type,$numLimited,$create_time)
	{
			$data['id']=$id;
			$data['type']=$type;
			$data['create_time']=$create_time;
			//添加成功，整理到tbl_latest
			$latest_model=new Model("Latest");
			$news_model=new Model("News");
			//最新要求大于一个，比如三个，或者8个
			if($numLimited>1)
			{
				$latest_info=$latest_model->where("type=$type")->select();
				if(count($latest_info)<$numLimited)
				{
					//1~($numLimited-1)篇，则直接添加
					//echo "1~($numLimited-1)篇，则直接添加";
					$latest_model->add($data);
					//再进行排序rank
					$latest_info1=$latest_model->where("type=$type")->select();
					$latest_info2=$latest_model->where("type=$type")->select();
					for($i=0;$i<count($latest_info1);$i++)
					{
						$temp=$latest_info1[$i]['create_time'];
						$table_id=$latest_info1[$i]['table_id'];
						$rank=1;
						for($j=0;$j<count($latest_info2);$j++)
						{
							if($temp<$latest_info2[$j]['create_time'])
							{
								$rank++;
							}
						}
						unset($data);
						$data['rank']=$rank;
						$latest_model->where("table_id=$table_id")->save($data);
					}
					$latest_info3=$latest_model->where("type=$type")->select();
					//var_dump($latest_info3);
				}
				//达到($numLimited-1)篇，跟第八篇比较
				else{
				//echo "达到($numLimited-1)篇，跟第八篇比较";
					if($latest_info[$numLimited-1]['create_time']<$create_time)
					{
						$latest_model->where("type=$type and rank=$numLimited")->delete();
						$latest_model->add($data);
						//再次进行排序
						$latest_info1=$latest_model->where("type=$type")->select();
						$latest_info2=$latest_model->where("type=$type")->select();
						for($i=0;$i<count($latest_info1);$i++)
						{
							$temp=$latest_info1[$i]['create_time'];
							$table_id=$latest_info1[$i]['table_id'];
							$rank=1;
							for($j=0;$j<count($latest_info2);$j++)
							{
								if($temp<$latest_info2[$j]['create_time'])
								{
									$rank++;
								}
							}
							unset($data);
							$data['rank']=$rank;
							$latest_model->where("table_id=$table_id")->save($data);
						}
					}
				}	
			}
			//最新只要求一个，直接删除再添加
			else
			{
				//echo "别的类型，只能有一次，直接删除后添加";
				
				$latest_model->where("rank=1 and type=$type")->delete();
				$data['rank']=1;
				//var_dump($data);
				$latest_model->add($data);
			}
	}
	//替换img标签中的src，要求全部是.jpg格式
	public function changeUrl()
	{
		$content='title: 我院勇夺校史校规竞赛三等奖
date: 2011-09-26
content: 
<p><font size="3">2011年9月25日，由暨南大学学生会举办的2011校史校规比赛在实验楼C213顺利举行。此次比赛共有20个学院参加，5支队伍进入决赛。各学院派出的队伍睿智应答，表现优异。决赛共评出一等奖1名、二等奖2名和三等奖2名。我院由学术部带领的16人小队代表电气信息学院顺利通过初赛，进入决赛，过关斩将，凭借充分的准备和出色的应变能力与心理素质荣获三等奖。</font></p><p align="center"><img border="0" src="/twxsh/upload/2012/4/8.jpg"></p>';
		$pattern="/\/twxsh\/upload\/2012\/4\/8.jpg/";
		$result=preg_replace($pattern,"http://jnueicsu-news.stor.sinaapp.com/"."aaa.jpg",$content);
		echo ($result);
		var_dump($content);	

	}
	public function getTrueName($imgurl)
	{
		//$imgurl='http://eic.jnu.edu.cn/twxsh/upload/2012/4/8.jpg';
		$posbegin=strrpos($imgurl,'/');
		$posend=strrpos($imgurl,".jpg");
		$picname=substr($imgurl,$posbegin+1,$posend-$posbegin+3);
		//echo "目标图片是：</br>";
		//var_dump($imgurl);
		//var_dump($picname);		
		return $picname;
	}
	public function getpicName($imgurl)
	{
		//$imgurl='http://eic.jnu.edu.cn/twxsh/upload/2012/4/8.jpg';
		$posbegin=strrpos($imgurl,'/twxsh');
		$posend=strrpos($imgurl,".jpg");
		$picname=substr($imgurl,$posbegin,$posend-$posbegin+4);
		//带/的前面加上\
		$picname=preg_replace("/\//","\/",$picname);
		//头部和尾部加上/
		$picname="/".$picname."/";
		//echo "目标图片是：</br>";
		//var_dump($imgurl);
		//var_dump($picname);		
		return $picname;
	}
	//读取目录
	public function copy()
	{
		copy("./pyspider4twxsh/twxsh/newstext/121/images/8.jpg",
		".temp/tempname.jpg");
		rename(".temp/tempname.jpg",
		".temp/kanonwind.jpg");
	}
	public function nextline()
	{
		$file = fopen("./pyspider4twxsh/twxsh/newstext/122/src.txt","r");
		while(!feof($file))
		{
			echo fgets($file). "<br />";
		}
		fclose($file);
	}
}
?>