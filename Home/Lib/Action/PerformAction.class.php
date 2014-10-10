<?php
//绩效考核控制器
class PerformAction extends Action
{
 	//每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
	private function judgelog()
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
  //绩效考核首页
  public function index()
  {
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
		//个人信息
		$account=$_SESSION['account'];
		$person_model=new Model("Person");
		$person_info=$person_model->where("account=$account")->find();
		$name=$person_info['name'];
		$link="<a class=\"user_info\" id=\"login_info_user_name\" href=\"#\">".$name."</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_user_center\" href=\"".__APP__."/Center/index\">个人中心</a>&nbsp;";
		$link.="<a class=\"user_info\" id=\"login_info_log_out\" href=\"".__APP__."/Login/logout\">注销</a>";
		$this->assign('link',$link);
  $arr1=Array("秘书处","人力资源部","宣传部","信息编辑部","学术部","体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
  $arr2=Array("干事","人力干事","部长级","主席团");
	//账号，时间
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	$name=$person_info['name'];
	$apartment=$person_info['apartment'];
	$type=$person_info['type'];
	$position=$person_info['position'];
	//获取系统阶段
	$control_model=new Model("Control");
	$control_info=$control_model->where("is_over=0")->find();
	if(empty($control_info))
	{
		$stage="系统阶段：暂无考核";
	}
	else{
		$stage="系统阶段：".$control_info['month']."月考核进行中";
	}
	$this->assign('account',$account);
	$this->assign('name',$name);
	$this->assign('apartment',$arr1[$apartment-1]);
	$this->assign('type',$arr2[$type-1]);
	$this->assign('position',$position);
	$this->assign('stage',$stage);
    $this->display();
  }
  
  public function funcqqlx()
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	$bmwgfzr_model=new Model("Bmwgfzr");
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	if($type==3 && $person_info['apartment']==2)
	{
	  $typejson="RLBZ";
	}
	else
	{
	  $arr=Array("YBGS","RLGS","BZJ","ZXT");
	  $typejson=$arr[$type-1];
	}
	//是否负责违纪登记
	$bmwgfzr_info=$bmwgfzr_model->where("account=$account")->select();
	if(count($bmwgfzr_info)!=0)
	{
		foreach($bmwgfzr_info as $v)
		{
			$weiji[]=Array(
					'table'=>$v['type']-1,
				);
		}
	}
	$data=Array(
	  'account'=>$account,
	  'type'=>$typejson,
	  'weiji'=>$weiji,
	);
    echo $this->_encode($data);
  }
  /*测试编码转化
  public function changejson()
  {
    $data = array ('game' => 
	Array(
	  'ceshi'=>"我啊打开那就发啥",
	  'pj'=>Array(
	    'name'=>"你我的杰哥",
		'account'=>"忘记了",
	  ),
	),
    'name' => '刺之灵', 'country' => '冰霜国', 'level' => 45 ); 
	echo $this->_encode();
  }
  */
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
  //获取前端发送的时间
  private function getTime()
  {
	$year=$_POST['year'];
	$month=$_POST['month'];
/* 	$year=2014;
	$month=10; */
	$arr=Array(
		'month'=>$month,
	    'year'=>$year,
	);
	return $arr;
  }
	//获取上月考核时间
  public  function getLastTime()
  {
	//获取最后一次考核的时间
	$control_model=new Model("Control");
	$control_info=$control_model->where("is_over=1")->select();
	$tempyear=$control_info[0]['year'];
	$tempmonth=$control_info[0]['month'];
	$tempstamp=mktime(1, 1, 1, $tempmonth, 1, $tempyear);
	//echo "asdf".$tempmonth;
	for($i=0;$i<count($control_info);$i++)
	{
		if($tempstamp>mktime(1, 1, 1, $control_info[$i]['month'],1,$control_info[$i]['year']))
			continue;
		else
		{
			$tempyear=$control_info[$i]['year'];
			$tempmonth=$control_info[$i]['month'];
			$tempstamp=mktime(1, 1, 1, $tempmonth, 1, $tempyear);
		}
	}
	$arrLastTime=Array(
		'year'=>$tempyear,
		'month'=>$tempmonth,
	);
	return $arrLastTime;
  }
  //向前端发送时间
  public function sendTime()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	//已经考核过的
	$control_model=new Model("Control");
	$control_info=$control_model->where()->select();
	//自评
	for($i=0;$i<count($control_info);$i++)
	{	
		$evaluation[]=Array(
			'year'=>$control_info[$i]['year'],
			'month'=>$control_info[$i]['month'],
		);
	}

	//反馈：所有跑过优秀部长的记录
	$control_info=$control_model->where("is_over=1")->select();
	for($i=0;$i<count($control_info);$i++)
	{	
		$feedback[]=Array(
			'year'=>$control_info[$i]['year'],
			'month'=>$control_info[$i]['month'],
		);
	}
	//控制：已经考核过的+可能的下一个考核
	
	$control_info=$control_model->select();
	for($i=0;$i<count($control_info);$i++)
	{	
		$control[]=Array(
			'year'=>$control_info[$i]['year'],
			'month'=>$control_info[$i]['month'],
		);
	}
	
	if(count($control_info)==0)
	{
		$month=date("n");
		$year=date("Y");
		for($k=0;$k<3;$k++)
		{
			$control[]=Array(
				'year'=>$year,
				'month'=>$month,
			);	
			if($month==1)
			{
				$year--;
				$month=12;
			}
			else{
				$month--;
			}	
		
		}
	
	}

	
	else
	{
	//获取最后一次考核的时间
	$control_info=$control_model->select();
	$tempyear=$control_info[0]['year'];
	$tempmonth=$control_info[0]['month'];
	$tempstamp=mktime(1, 1, 1, $tempmonth, 1, $tempyear);
	//echo "asdf".$tempmonth;
	for($i=0;$i<count($control_info);$i++)
	{
		if($tempstamp>mktime(1, 1, 1, $control_info[$i]['month'],1,$control_info[$i]['year']))
			continue;
		else
		{
			$tempyear=$control_info[$i]['year'];
			$tempmonth=$control_info[$i]['month'];
			$tempstamp=mktime(1, 1, 1, $tempmonth, 1, $tempyear);
		}
	}
	$year=$tempyear;
	$month=$tempmonth;
	//echo "asdf".$tempmonth;

	$control_info=$control_model->where("is_over=0")->select();
	  for($k=0;$k<5;$k++)
	 {
		if(count($control_info)!=0)
			break;
		if($month==12)
			{
				$year++;
				$month=1;
			}
			else{
				$month++;
			}
			$control[]=Array(
				'year'=>$year,
				'month'=>$month,
			);
	 }
    }

	//优秀部长：跑过优秀部长的记录
	$control_info=$control_model->where("is_yxbz=1")->select();
	for($i=0;$i<count($control_info);$i++)
	{	
		$excellent[]=Array(
			'year'=>$control_info[$i]['year'],
			'month'=>$control_info[$i]['month'],
		);
	}

	$arr=Array(
		'evaluation'=>$evaluation,
		'feedback'=>$feedback,
		'control'=>$control,
		'excellent'=>$excellent,
	);
	echo $this->_encode($arr);
  }
  //绩效考核第一阶段，各种评价表
  //干事自评表
  public function funcgszp()
  {
    
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status 	  
	$status=$this->getStatus();
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	//获得类型，部门
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];
    //除己之外干事
	$person_info=$person_model->where("apartment=$apartment and type=$type")->select();
	foreach($person_info as $v)
	{
	  if($v['account']!=$account)
	  {
	  $arr_TongShi[]= Array(
	    'name'=>$v['name'],
		'account'=>$v['account'],
	  );	  
	  }
	}
	//获取推优干事账号，名字，推优理由（该年该月，谁对谁）
	$tuiyou_model=new Model('Tuiyou');
	$tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type")->find();
	if(!empty($tuiyou_info['raccount']))
	{
	$tygs_account=$tuiyou_info['raccount'];
	$tygs_tyly=$tuiyou_info['text'];
	$person_info=$person_model->where("account=$tygs_account")->find();
	$tygs_name=$person_info['name'];
	}
	else
	{
	  $person_info=$person_model->where("account!=$account and (type=1 or type=2 ) and apartment=$apartment")->find();
	  $tygs_name=$person_info['name'];
	  $tygs_account=$person_info['account'];
	  $tygs_tyly="空";
	}
	$arr_tygs=Array(
	  'tygs'=>$tygs_name,
	  'account'=>$tygs_account,
	  'tyly'=>$tygs_tyly,
	);	
	//获取部长级的姓名，账号，得分，评价
	$evaluate_model=new Model("Evaluate");
	$person_info=$person_model->where("apartment=$apartment and type!=$type")->select();
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  $bz_name=$v['name'];
	  $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$bz_account)")->find();
	  $bz_pj=$evaluate_info['text'];

	  $bz_df=$evaluate_info['df'];

	  $arr_DBZPJ[]=Array('account'=>$bz_account,'name'=>$bz_name,'fs'=>$bz_df,'pj'=>$bz_pj);
	}
	//按照当前账号找出干事自评表的信息
    $gszp_model=new Model("Gszp");
	$gszp_info=$gszp_model->where("(year=$year and month=$month) and account=$account")->find();
	    //生成得分
	    $arrDF[]=Array('df'=>$gszp_info['DF1'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF2'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF3'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF4'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF5'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF6'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF7'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF8'],);
	    $arrDF[]=Array('df'=>$gszp_info['DF9'],);
		$zongfen=$gszp_info['total'];
		$zwpj=$gszp_info['zptext'];
	//对部门留言
	$interact_model=new Model("Interact");
	$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$apartment)")->find();
	$bumenliuyan=$interact_info['text'];
	//对同事的留言
	$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and rtype=$type)")->select();
	foreach($interact_info as $v)
	{
		$arrTongshiliuyan[]=Array(
			'account'=>$v['raccount'],
			'liuyan'=>$v['text'],
		);
	}
	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'DF'=>$arrDF,
	  'zongfen'=>$zongfen,
	  'zwpj'=>$zwpj,	  
	  'TongShi'=>$arr_TongShi,
	  'TYGS'=>$arr_tygs,
	  'DBZPJ'=>$arr_DBZPJ,  
	  'bumenliuyan'=>$bumenliuyan,
	  'arrTongshiliuyan'=>$arrTongshiliuyan,
	);


    //var_dump($arr);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	

  }

  //干事考核表,暂时忽略部门特色这一节
  public function funcgskh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$waccount=$_SESSION['account'];

	
	//获取请求的时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//判断时间是否合理
	$gskh_model=new Model("Gskh");

	//获取部门，类型
	$person_model=new Model("Person");
	//echo $account;
	$person_info=$person_model->where("account=$waccount")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];
	$person_info=$person_model->where("apartment=$apartment and type!=$type")->select();
	//获取干事得分
	$interact_model=new Model("Interact");
	
	foreach($person_info as $v)
	{
	  $gs_account= $v['account']; 
	  $gs_name= $v['name'];
	  $gskh_info=$gskh_model->where("(year=$year and month=$month) and  waccount=$waccount and raccount=$gs_account")->find();
	  $arrGSDF[]=Array('account'=>$gs_account,'name'=>$gs_name,
	    'df0'=>$gskh_info['DF1'],
		'df1'=>$gskh_info['DF2'],
		'df2'=>$gskh_info['DF3'],
		'df3'=>$gskh_info['DF4'],
		'df4'=>$gskh_info['DF5'],
		'df5'=>$gskh_info['DF6'],
		'df6'=>$gskh_info['DF7'],
		'df7'=>$gskh_info['DF8'],
		'df8'=>$gskh_info['DF9'],
		//忽略部门特色
	  );
	  //var_dump($arrGSDF);
	}
	//echo json_encode($arrGSDF,JSON_UNESCAPED_UNICODE);
	//对干事评价
	$person_info=$person_model->where("apartment=$apartment and type!=$type")->select();
    foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  $gs_name=$v['name'];
	  $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$gs_account")->find();
	  $arrDGSPJ[]=Array('account'=>$gs_account,'name'=>$gs_name,'pj'=>$interact_info['text'],
	  );
	}
	//部门特色
                   $strBMTS="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
					+"<p>评价标准:</p>"
					+"<p>A.每次都很认真完成任务，并细心、有耐心地尽自己的职责，乐于接受任务</p>"          
					+"<p>B.会负责任地完成任务，工作效果良好</p>"
					+"<p>C.欠缺耐心，有时候不想完成任务，属于被动型</p>"
					+"<p>D.觉得团务很麻烦，完全不想完成任务，被催了才会去做</p>"
					+"</div>";
	//是否提交过
	$gskh_info=$gskh_model->where("(year=$year and month=$month) and waccount=$waccount")->find();
	$hadSubmit=$gskh_info['hadSubmit'];
	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'bmts'=>$strBMTS,
	  'hadSubmit'=>$hadSubmit,
	  'arrGSDF'=>$arrGSDF,
	  'arrDGSPJ'=>$arrDGSPJ,
	  'apartment'=>$apartment,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);

  }
  //部长自评表
  public function funcbzzp()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$bzzp_model=new Model("Bzzp");
	$interact_model=new Model("Interact");
	$evaluate_model=new Model("Evaluate");
	$president_model=new Model("President");
	//获取部门，类型
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];  
	//获取总分
	$bzzp_info=$bzzp_model->where("(year=$year and month=$month) and (waccount=$account)")->find();
    $zongfen=$bzzp_info['total'];
	//获取得分数组
	$arrDF[]=Array('df'=>$bzzp_info['DF1'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF2'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF3'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF4'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF5'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF6'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF7'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF8'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF9'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF10'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF11'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF12'],);
	$hadSubmit=$bzzp_info['hadSubmit'];
  //获取自我评价
  $zwpj=$bzzp_info['zptext'];
  //找出本部门其他部长
  $person_info=$person_model->where("(apartment=$apartment and type=$type) and account!=$account")->select();
  foreach($person_info as $v)
  {
    $ts_account=$v['account'];
	$ts_name=$v['name'];
    $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$ts_account)")->find();
    $arrDQTBZPJ[]=Array(
	  'name'=>$ts_name,
	  'account'=>$ts_account,
	  'fs'=>$evaluate_info['df'],
	  'pj'=>$evaluate_info['text'],
	);
 }
 $DQTBZPJ=Array(
   'sum'=>count($person_info),
   'arrBZ'=>$arrDQTBZPJ,
 );


 //找出对主管副主席评价
 
 $president_info=$president_model->select();
 $apartment_tar="|".$apartment;
 for($k=0;$k<count($president_info);$k++)
 {
	if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
		continue;
	else{
		$zg_account=$president_info[$k]['account'];
		break;
	}
 }
 $interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$zg_account) and nm=0")->find();
 $dzgfzxpj=$interact_info['text'];
 //对主席团成员的匿名评价
 $person_info=$person_model->where("type=4")->select();
 foreach($person_info as $v)
 {
   $raccount=$v['account'];
   $rname=$v['name'];
   $position=$v['position'];
   $interact_info=$interact_model->where("nm=1 and (waccount=$account and raccount=$raccount) and (year=$year and month=$month)")->find();
   $pj=$interact_info['text'];
   $arrNMPJ[]=Array(
     'name'=>$rname,
	 'account'=>$raccount,
	 'depart'=>$position,
	 'pj'=>$pj,
   );
 }
 //获取非同部门同事留言
 $person_info=$person_model->where("type=3 and apartment!=$apartment")->select();
 foreach($person_info as $v)
 {
	$TongShi[]=Array(
		'name'=>$v['name'],
		'account'=>$v['account'],
	);
 }
 $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type")->select();
 foreach($interact_info as $v)
 {
	$TongShiliuYan[]=Array(
		'account'=>$v['raccount'],
		'liuyan'=>$v['text'],
	);
 }
 //生成将要返回的json数组
 $arr=Array(
   'zongfen'=>$zongfen,
   'status'=>$status,
   'arrDF'=>$arrDF,
   'zwpj'=>$zwpj,
   'DQTBZPJ'=>$DQTBZPJ,
   'dzgfzxpj'=>$dzgfzxpj,
   'NMPJ'=>$arrNMPJ,
   'TongShi'=>$TongShi,
   'TongShiliuYan'=>$TongShiliuYan,
 );

 echo $this->_encode($arr);

 

  }
  //部长考核表
  public function funcbzkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//获取部门，类型
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];   
	$president_model=new Model("President");
	$interact_model=new Model("Interact");
	$bzkh_model=new Model("Bzkh");
	$president_info=$president_model->where("account=$account")->find();
	$presidentArr=explode("|",$president_info['apartment']);


	
	  for($k=0;$k<count($presidentArr);$k++)
	  {
		if($presidentArr[$k]=='')
			continue;
		else
		{	
			$apartment_tar=$presidentArr[$k];
			$person_info=$person_model->where("apartment=$apartment_tar and type=3")->select();
			$arrBZ=$this->getarrBZ($account,$presidentArr[$k]);
			$arrBM[]=Array(
				'bm'=>$presidentArr[$k],
				'bzrs'=>count($person_info),
				'arrBZ'=>$arrBZ,
			);
		}
		
	  }
	  //记录部门数目
	  $bmsm=count($presidentArr)-1;  
	//跳出判断
	//是否提交过
	$bzkh_info=$bzkh_model->where("(year=$year and month=$month) and waccount=$account")->find();
	$hadSubmit=$bzkh_info['hadSubmit'];
	//生成将要返回的json数组
	$arr=Array(
      'status'=>$status,
	  'hadSubmit'=>$hadSubmit,
	  'BMBZ'=>Array(
	  'bmsm'=>$bmsm,
	  'arrBM'=>$arrBM,
	  ),
	);
	echo $this->_encode($arr);
    //echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	
  }
  //部门考核表
  public function funcbmkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//获取部门，类型
	$person_model=new Model("Person");	//echo $account;
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];   
	//获取该主席所主管的部门信息
	$president_model=new Model("President");
	$bmkh_model=new Model("Bmkh");
	$president_info=$president_model->where("account=$account")->find();
	//如果是副主席，找到两个部门
	
	if($president_info['is_sub']=='y')
	{
	  $apartmentArr=explode("|",$president_info['apartment']);
	  for($k=0;$k<count($apartmentArr);$k++)
	  {
		if(empty($apartmentArr[$k]))
			continue;
		else{
			$arrBM[]=$this->getarrBM($account,$apartmentArr[$k]);
		}
	  }
	  $sum=count($apartmentArr)-1;
	}
	else{
	  $sum=11;
	  for($i=1;$i<=11;$i++)
	  {
	    $arrBM[]=$this->getarrBM($account,$i);
	  }

	}
	//跳出判断
	  //推优部分
    //找出非主管的部门信息
	$president_info=$president_model->where("account=$account")->find();
	for($i=1;$i<=11;$i++)
	{
	  $apartment_tar="|".$i;
	  if(false==strstr($president_info['apartment'],$apartment_tar))
	  {
      $BuMen[]=Array(
	    'name'=>$i,
	  );		
	  }
	}
    //找到推优部门
	  //推优部分
	  $tuiyou_model=new Model("Tuiyou");
	  $tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and waccount=$account")->find();
	  $bm_account=$tuiyou_info['raccount'];
	  if(!empty($bm_account))
	  {
		$TYBM=$bm_account;
	  }
	  else{
         $TYBM=$BuMen[0]['name'];
	  }
	  //是否提交过
	  $bmkh_info=$bmkh_model->where("(year=$year and month=$month) and waccount=$account")->find();
	$hadSubmit=$bmkh_info['hadSubmit'];
	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'hadSubmit'=>$hadSubmit,
	  'BM'=>Array(
	    'sum'=>$sum,
	    'arrBM'=>$arrBM,),
		'BuMen'=>$BuMen,
		'TYBM'=>$TYBM,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	
  }
  //调研意见采纳表
  public function jsdyyjcn()
  {
    //拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	//获取请求的时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//获取状态
	$status=$this->getStatus();
	$rlgj_model=new Model("Rlgj");
	$person_model=new Model("Person");
	$diaoyan_model=new Model("Diaoyan");
	//获取操作的所有部门
    for($i=1;$i<=11;$i++)
	{
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    $x_account=$v['account'];
		$x_name=$v['name'];
		$diaoyan_info=$diaoyan_model->where("(year=$year and month=$month) and raccount=$x_account")->find();
		$caina=$diaoyan_info['caina'];
		$arrCNJF[]=Array(
	    "name"=>$x_name,
		"account"=>$x_account,
		"jiafen"=>$caina,
	     ); 
	  }
	  $arrBM[]=Array(
	  "bmmz"=>$i,
	  "arrCNJF"=>$arrCNJF,
	   );
	   unset($arrCNJF);
	   //echo $this->_encode($arrBM);
	}
	//向前端发送json数据
	$arr=Array(
	  "status"=>$status,
	  "arrBM"=>$arrBM,
	  "str"=>$str,
	);
	echo $this->_encode($arr);
  }
  //跟进部门出勤统计表
  public function  jsgjbmcqtj()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	
	//获取请求的时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	
	$chuqin_model=new Model("Chuqin");

    //获取授权状态 status 	  
	$status=$this->getStatus();
	$person_model=new Model("Person");  
	$rlgj_model=new Model("Rlgj");
	
	$rlgj_info=$rlgj_model->where("account=$account")->find();
	//跟进部门
	$apartment=$rlgj_info['apartment'];
	
	$gjbm=$apartment;
	$person_info=$person_model->where("apartment=$apartment")->select();
	//人数
	$renshu=count($person_info);
	//出勤情况
	foreach($person_info as $v)
	{
	  $raccount=$v['account'];
	  $chuqin_info=$chuqin_model->where("waccount=$account and raccount=$raccount and (year=$year and month=$month)")->find();
      $person_info=$person_model->where("account=$raccount")->find();
      $rname=$person_info['name'];
      $chuqin[]=Array(
	    'account'=>$raccount,
	    'name'=>$rname,
		'qj'=>$chuqin_info['qj'],
		'ct'=>$chuqin_info['ct'],
		'qx'=>$chuqin_info['qx'],
	  );	  
	  
	}
	
	//生成将要返回的json数组
	$arr=Array(
	  'gjbm'=>$apartment,
	  'renshu'=>$renshu,
	  'status'=>$status,
	  'chuqin'=>$chuqin,
	  'str'=>$status,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);


  }
  //优秀称号限定表
  public function funcyxchxz()
  {
    $person_model=new Model("Person");
	$yxchxz_model=new Model("Yxchxz");
	$status=$this->getStatus();
	//找到所有部门,限定干事和部长
	for($i=1;$i<=11;$i++)
	{
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    $x_account=$v['account'];
		$person_info2=$person_model->where("account=$x_account")->find();
		$x_name=$person_info2['name'];
		$yxchxz_info=$yxchxz_model->where("account=$x_account")->find();
		if(!empty($yxchxz_info))
		  $check=1;
		else
		  $check=0;
		$arrPersons[]=Array(
		  'name'=>$x_name,
		  'account'=>$x_account,
		  'check'=>$check,
		);	
	  }
	  $arrDepart[]=Array(
	    'depart'=>$i,
		'arrPersons'=>$arrPersons,
	  );
	  unset($arrPersons);
	}
	//找到所有部门，限制部门
	for($i=1;$i<=11;$i++)
	{
	  $yxchxz_info=$yxchxz_model->where("account=$i")->find();
	  if(!empty($yxchxz_info))
	    $check=1;
	  else
	    $check=0;
	  $arrBMPD[]=Array(
	    'depart'=>$i,
		'check'=>$check,
	  );
	}
	//向前端发送json数据
	$arr=Array(
	  'year'=>0,
	  'month'=>0,
	  'status'=>$status,
	  'arrDepart'=>$arrDepart,
	  'arrBMPD'=>$arrBMPD,
	  'str'=>$status,
	);
	echo $this->_encode($arr);
  }
  //其他情况加减分表
  public function funcqt()
  {
  //拒绝未登录访问
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	$status=$this->getStatus();
    $person_model=new Model("Person");
	$rlgj_model=new Model("Rlgj");
	$qt_model=new Model("Qt");
	//根据当前登录的人力干事账号获取其跟进部门的信息
	$rlgj_info=$rlgj_model->where("account=$account")->find();
	$apartment=$rlgj_info['apartment'];
	//获取人员信息
	$person_info=$person_model->where("apartment=$apartment")->select();
	foreach($person_info as $v)
	{
	  $x_account=$v['account'];
	  $person_info2=$person_model->where("account=$x_account")->find();
	  $x_name=$person_info2['name'];
	  $x_type=$person_info2['type'];
	  $qt_info=$qt_model->where("(year=$year and month=$month) and account=$x_account")->find();
      $qt=$qt_info['qt'];
	  $liyou=$qt_info['text'];
	  $persons[]=Array(
	    'name'=>$x_name,
		'account'=>$x_account,
		'depart'=>$x_type,
		'jiajianfen'=>$qt,
		'liyou'=>$liyou,
		);
	}
	//获取跟进部门信息
	
	  $qt_info=$qt_model->where("account=$apartment")->find();
	  $bmjjf=Array(
	    'name'=>$apartment,
		'jiajianfen'=>$qt_info['qt'],
		'liyou'=>$qt_info['text'],
	  );
	
	//向前端发送json数据
	$arr=Array(
	  'year'=>0,
	  'month'=>0,
	  'status'=>$status,
	  'gjbm'=>$apartment,
	  'persons'=>$persons,
	  'bmjjf'=>$bmjjf,
	);
	echo $this->_encode($arr);
  }
  //违纪登记
  public function funcbmwg()
  {
  //拒绝未登录访问
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	$status=$this->getStatus();
	$type=$_POST['type'];

	$flagCrud=1;
	$bmwg_model=new Model("Bmwg");
	$bmwgfzr_model= new Model("Bmwgfzr");
	$bmwg_info=$bmwg_model->where("(year=$year and month=$month) and type=$type")->select();
	foreach($bmwg_info as $v)
	{
		$arrWJDJB[]=Array(
			'bm'=>$v['apartment'],
			'kf'=>$v['wgkf'],
			'ly'=>$v['text'],
		);
	}

	$arr=Array(
		'status'=>$status,
		'arrWJDJB'=>$arrWJDJB,
		'type'=>$type,
	);
	echo $this->_encode($arr);
  }
  //优秀部长评定表
  public function funcyxbz()
  {

 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$statu=1;
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if($control_info['is_over']==0&&$control_info['is_yxbz']==1)
		$status=0;
	//账号，时间
	$account=$_SESSION['account'];

	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//从tbl_yxbzhx中找出十个候选人
	$yxbzhx_model=new Model("Yxbzhx");
	$yxbz_model=new Model("Yxbz");
	$person_model=new Model("Person");
	$bzfk_model=new Model("Bzfk");
	$yxbzhx_info=$yxbzhx_model->where("(year=$year and month=$month)")->select();
	foreach($yxbzhx_info as $hx_v)
	{
	  $bz_account=$hx_v['HX'];
	  //判断是否为勾选状态
	  $checked=0;
	  $yxbz_info=$yxbz_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->find();
      if(!empty($yxbz_info['checked']))
		$checked=$yxbz_info['checked'];
	  //echo $bz_account."checked:".$checked."</br>";
	  $person_info=$person_model->where("account=$bz_account")->find();
	  //echo $bz_account."部门:".$person_info['apartment'].",checked:".$checked."</br>";
	  $name=$person_info['name'];
	  $depart=$person_info['apartment'];
	  $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and account=$bz_account")->find();
	  $score=$bzfk_info['total'];
	  //echo $bz_account."名字".$name.$score."</br>";
	  //确定该分数在所有候选人中的排名
	  $j=0;
	  $yxbzhx_info2=$yxbzhx_model->where("(year=$year and month=$month)")->select();
	  foreach($yxbzhx_info2 as $hx_v2)
	  {
	    if($bz_account==$hx_v2['HX'])
		  continue;
		$bz_account2=$hx_v2['HX'];
		 $bzfk_info2=$bzfk_model->where("(year=$year and month=$month) and account=$bz_account2")->find();
	     if($score<$bzfk_info2['total'])
	     {
	       $j++;
	     }
	     if($score==$bzfk_info2['total'])
	     {
	       //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
	       //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
           if(strcmp($bz_account,$bz_account2)>0)//学号小的排在前面	
             $j++;		 
	     }
	  }
	  //echo $bz_account."排名是：".$j."</br>";
	  $arrYXBZPDlist[$j]=Array(
	    'name'=>$name,
	    'account'=>$bz_account,
		'Checked'=>$checked,
		'depart'=>$depart,
		'score'=>$score,
	  );
	}
	for($k=0;$k<count($arrYXBZPDlist);$k++)
	{
	  $arrYXBZPDlist2[]=$arrYXBZPDlist[$k];
	}

	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'arrYXBZPDlist'=>$arrYXBZPDlist2,
	
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE); 
  }
  //查看未完成情况表
  public function funcUnfinished()
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
    //获取授权状态 status	  
	$status=$this->getStatus();	  
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$person_model=new Model("Person");
	$gszp_model=new Model("Gszp");
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$control_model=new Model("Control");
	//状态，普通考核表能否填
	$statusGSZP=1;
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if($control_info['is_yxbz']==0&&$control_info['is_over']==0)
		$statusGSZP=0;
	//状态，现在优秀部长评定表能否提交
	$statusYXBZPD=1;
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if($control_info['is_yxbz']==1 && $control_info['is_over']==0)
	{
		$statusYXBZPD=0;
	}
	//干事自评表
	$gszp_info=$gszp_model->where("total=0")->select();
	foreach($gszp_info as $v)
	{
		$account=$v['account'];
		$person_info=$person_model->where("account=$account")->find();
		$arrGSZP[]=Array(
			'name'=>$person_info['name'],
			'depart'=>$person_info['apartment'],
			'hadSubmit'=>$v['hadSubmit'],
		);
	}
	//部长自评表
	$bzzp_info=$bzzp_model->where("total=0")->select();
	foreach($bzzp_info as $v)
	{
		$account=$v['waccount'];
		$person_info=$person_model->where("account=$account")->find();
		$arrBZZP[]=Array(
			'name'=>$person_info['name'],
			'depart'=>$person_info['apartment'],
			'hadSubmit'=>$v['hadSubmit'],
		);
	}
	//干事考核
	$gskh_info=$gskh_model->where("total=0")->select();
	foreach($gskh_info as $v)
	{
		$account=$v['waccount'];
		$gs_account=$v['raccount'];
		$person_info=$person_model->where("account=$account")->find();
		$person_info2=$person_model->where("account=$gs_account")->find();
		$arrGSKH[]=Array(
			'name'=>$person_info['name']." - ".$person_info2['name'],
			'depart'=>$person_info['apartment'],
			'hadSubmit'=>$v['hadSubmit'],
		);
	}
	//部长考核表
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
		$account=$v['account'];
		$bzkh_info=$bzkh_model->where("waccount=$account and total=0")->select();
		if(!empty($bzkh_info))
		{
			$arrBZKH[]=Array(
				'name'=>$v['name'],
				'hadSubmit'=>$bzkh_info[0]['hadSubmit'],
			);
		}
	}
	//部门考核表
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
		$account=$v['account'];
		$bmkh_info=$bmkh_model->where("waccount=$account and total=0")->select();
		if(!empty($bmkh_info))
		{
			$arrBMKH[]=Array(
				'name'=>$v['name'],
				'hadSubmit'=>$bmkh_info[0]['hadSubmit'],
			);
		}
	}
	//生成将要返回的json数组
	$arr=Array(
	  'statusGSZP'=>$statusGSZP,
	  'statusYXBZPD'=>$statusYXBZPD,
	  'arrGSZP'=>$arrGSZP,
	  'arrBZZP'=>$arrBZZP,
	  'arrGSKH'=>$arrGSKH,
	  'arrBZKH'=>$arrBZKH,
	  'arrBMKH'=>$arrBMKH,
	);
	echo $this->_encode($arr);
  }
  //考核进程控制表
  public function funcControl()
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');	
	$year=$_POST['year'];
	$month=$_POST['month'];
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	$KSKH=0;
	$KSPD=0;
	$FBJG=0;
	if(!empty($control_info))
	{
		$KSKH=1;
		if($control_info['is_yxbz']==1)
			$KSPD=1;
		if($control_info['is_over']==1)
			$FBJG=1;
	}
	//生成将要返回的json数组
	$arr=Array(
	  'KSKH'=>$KSKH,
	  'KSPD'=>$KSPD,
	  'FBJG'=>$FBJG,
	);
	echo $this->_encode($arr);
  }
  //接收考核进程控制表的数据
  public function funcGetControl()
  {
  $authority_model=new Model("Authority");
  $control_model=new Model("Control");
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	$KSKH=$_POST['KHJCKZ']['KSKH'];
	$KSPD=$_POST['KHJCKZ']['KSPD'];
	$FBJG=$_POST['KHJCKZ']['FBJG'];
/*  	$year=2014;
	$month=9;
	$KSKH=1;
	$KSPD=1;
	$FBJG=1; */ 
	//开始一次考核
	if($KSKH==1 && $KSPD==0 && $FBJG==0)
	{
		//开启这次考核
		$back=$this->initPerform();
		if(false==$back)
		{
			//生成将要返回的json数组
			$arr=Array(
				"textBack"=>0,
			);
			echo $this->_encode($arr);
			return;
		}else{
				//生成将要返回的json数组
				$arr=Array(
					"textBack"=>1,
				);
				echo $this->_encode($arr);
				return;
		}
	}
	//停止考核，进行优秀部长评定
	if($KSKH==1 && $KSPD==1 && $FBJG==0)
	{
		$back=$this->funcGetRank();
		if(false==$back)
		{
			//生成将要返回的json数组
			$arr=Array(
				"textBack"=>0,
			);
			echo $this->_encode($arr);
			return;	
		}else{
			//生成将要返回的json数组
			$arr=Array(
				"textBack"=>1,
			);
			echo $this->_encode($arr);
			return;
		}
	}
	//停止优秀部长评定，发布考核结果
	if($KSKH==1 && $KSPD==1&& $FBJG==1)
	{
		$back=$this->funcGetAll();
		
		if(false==$back)
		{
			//生成将要返回的json数组
			$arr=Array(
				"textBack"=>0,
			);
			echo $this->_encode($arr);
			return;	
		}else{
			//生成将要返回的json数组
			$arr=Array(
				"textBack"=>1,
			);
			echo $this->_encode($arr);
			return;
		}
	}

	
  }
 //函数，判断只读状态还是读写状态,针对优秀部长评定表之前的所有考核表
  private function getStatus()
  {
	//可编辑性：
	$status=1;//默认为0，表示可以编辑
	//获取时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
    $control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if($control_info['is_over']==0&&$control_info['is_yxbz']==0)
		$status=0;
	return $status;
  }

  //在部长考核表中，需要根据主席团的 account,主管的部门 apartment,来生成arrBZ,
  private function getarrBZ($account,$apartment)
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
      //找到该本门部长
	  $person_model=new Model("Person");
	  $bzkh_model=new Model("Bzkh");
	  $person_info=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info as $v)
	  {

	    $bz_account=$v['account'];
	    $bz_name=$v['name'];
	    $bzkh_info=$bzkh_model->where("(year=$year and month=$month) and (raccount=$bz_account)")->find();
	    //生成评价
		$interact_model=new Model("Interact");
		$interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->find();
		$arrBZ[]=Array(
		  'account'=>$bz_account,
		  'bzmz'=>$bz_name,
		  'pj'=>$interact_info['text'],
		  'df0'=>$bzkh_info['DF1'],
		  'df1'=>$bzkh_info['DF2'],
		  'df2'=>$bzkh_info['DF3'],
		  'df3'=>$bzkh_info['DF4'],
		  'df4'=>$bzkh_info['DF5'],
		  'df5'=>$bzkh_info['DF6'],
		  'df6'=>$bzkh_info['DF7'],
		  'df7'=>$bzkh_info['DF8'],
		  'df8'=>$bzkh_info['DF9'],
		  'df9'=>$bzkh_info['DF10'],
		);
	  }    
	  return $arrBZ;
  }  
  //在部门考核表中，需要根据主席团的 account,主管的部门 apartment,来生成arrBZ,

  private function getarrBM($account,$apartment)
  {
    //$account='2012052311';
	//$apartment=1;
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$bmkh_model=new Model("Bmkh");
	$bmkh_info=$bmkh_model->where("(year=$year and month=$month) and (waccount=$account and rapartment=$apartment)")->find();
	$BM=Array(
	  'bm'=>$apartment,
	  'pj'=>$bmkh_info['text'],
	  'df0'=>$bmkh_info['DF1'],
	  'df1'=>$bmkh_info['DF2'],
	  'df2'=>$bmkh_info['DF3'],
	  'df3'=>$bmkh_info['DF4'],
	  'df4'=>$bmkh_info['DF5'],
	  'df5'=>$bmkh_info['DF6'],
	  'df6'=>$bmkh_info['DF7'],
	);
	//echo json_encode($BM,JSON_UNESCAPED_UNICODE);
	return $BM;
  }

  //在优秀部长评定表，需要根据传过来的部长account,生成对应信息
  public function getyxbz($raccount,$year,$month)
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$raccount")->find();
	$rname=$person_info['name'];
	$apartment=$person_info['apartment'];
	$bzfk_model=new Model("Bzfk");
	$bzfk_info=$bzfk_model->where("(year=$year and month=$month) and account=$raccount")->find();
	$total=$bzfk_info['total'];
	$yxbz_model=new Model("Yxbz");
	$yxbz_info=$yxbz_model->where("(year=$year and month=$month) and waccount=$account and raccount=$raccount")->find();
    $arrBZ=Array(
	  'account'=>$raccount,
	  'name'=>$rname,
	  'depart'=>$apartment,
	  'checked'=>$yxbz_info['checked'],
	  'score'=>$total,
	); 
	return $arrBZ;
 }


 //外调加分函数
 private function funcresource($account,$time)
 {
   for($i=1;$i<=$time;$i++)
   {
     $resource_model=new Model("Resource");
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
     $data['year']=$year;
     $data['month']=$month;
     $data['account']=$account;
     $data['assess']=3;
     $resource_model->add($data);
   }
 }
 //反馈加分函数
 private function funcdiaoyan($raccount,$rapartment,$caina)
 {
   $diaoyan_model=new Model("Diaoyan");
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
   $data['year']=$year;
   $data['month']=$month;
   $data['raccount']=$raccount;
   $data['rapartment']=$rapartment;
   $data['caina']=$caina;
   $diaoyan_model->add($data);
 }


 //绩效考核第二阶段：生成基本反馈,生成总分和排名
 private function funcGetRank()
 {
   //设置年月
	$authority_model=new Model("Authority");
	$arr=$this->getTime();
	$year=$arr['year'];
	$month=$arr['month'];	
	$flagInitYxbz=1;
	//需要满足下面条件:基本成员信息要求、该时间正在考核、系统不存在未结束的考核
	$authority_info=$authority_model->find();
	if($authority_info['is_init']!=1)
		$flagInitYxbz=0;
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if(empty($control_info['id']))
		$flagInitYxbz=0;	
	else
	{
		if($control_info['is_yxbz']==1 || $control_info['is_over']==1)
		{
			$flagInitYxbz=0;
		}
	}
	$control_info=$control_model->where("is_over=0||is_yxbz=0")->select();
	if(count($control_info)>1)
		$flagInitYxbz=0;	
	if($flagInitYxbz==0)
	{
		//echo "优秀部长评定初始化不满足开启条件</br>";
		return false;
	}
	//echo "即将进行各项初始化工作，耐心等待</br>";
	$this->funcfkonegs();
	$this->funcfkonebz();
	$this->funcfktwo();
	unset($data);
	$data['is_yxbz']=1;
	$control_info=$control_model->where("(year=$year and month=$month)")->save($data);
	return true;
 }
 
 //绩效考核第三阶段，根据主席团的评优结果，生成最终的优秀部长
 private function funcGetAll()
 {
	$arr=$this->getTime();
	$year=$arr['year'];
	$month=$arr['month'];
	$flagInitYxbz=1;
	$authority_model=new Model("Authority");
	//需要满足下面条件:基本成员信息要求、该时间正在考核、系统不存在未结束的考核
	$authority_info=$authority_model->find();
	if($authority_info['is_init']!=1)
		$flagInitYxbz=0;
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if(empty($control_info['id']))
		$flagInitYxbz=0;	
	else
	{
		if($control_info['is_yxbz']==0 || $control_info['is_over']==1)
		{
			$flagInitYxbz=0;
		}
	}
	$control_info=$control_model->where("is_over=0||is_yxbz=0")->select();
	if(count($control_info)>1)
		$flagInitYxbz=0;	
	if($flagInitYxbz==0)
	{
		//echo "优秀部长评定不满足开启条件</br>";
		return false;
	}
	$this->funcfkthree();
	$this->funcfkfour();
	$this->funcfkfive();
	unset($data);
	$data['is_over']=1;
	$control_info=$control_model->where("(year=$year and month=$month)")->save($data);
	return true;
 }
 //干事反馈处理
 private function funcfkonegs()
 {
    $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
/* 	$year=2014;
	$month=9; */
   //获取所有干事
    $yxchxz_model=new Model("Yxchxz");
   $person_model=new Model("Person");
   $gsfk_model=new Model("Gsfk");
   $person_model=new Model("Person");

   $person_info=$person_model->where("type=1 or type=2")->select();
   //计算总分
   foreach($person_info as $v)
   {
     $waccount=$v['account'];
	 //干事考核反馈表
     $this->getgsfk($waccount,$year,$month);
   }

   //排名是部门内的
   for($j=1;$j<=11;$j++)
   {
     $person_info=$person_model->where("apartment=$j and (type=1 or type=2)")->select();
     $person_info2=$person_model->where("apartment=$j and (type=1 or type=2)")->select();
     //将欠缺的干事排名，优秀干事补上
     foreach($person_info as $v)
     {
       $rank=1;
       $account1=$v['account'];
	   $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and (account=$account1)")->find();
	   $total1=$gsfk_info['total'];
       foreach($person_info2 as $v2)
	   {
	     if($v2['account']==$account1)
	       continue;
	     $account2=$v2['account'];
   	     $gsfk_info2=$gsfk_model->where("(year=$year and month=$month) and (account=$account2)")->find();
	     $total2=$gsfk_info2['total'];
	     if($total1<$total2)
	     {
	       $rank++;
	     }
	     if($total1==$total2)
	     {
	       //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
	       //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
           if(strcmp($account1,$account2)>0)//学号小的排在前面	
             $rank++;		 
	     }
	     //echo $account1.":".$total1."比较".$account2.":".$total2."</br>";
	   }
	   //echo $account1."总分：".$total1."排名:".$rank."</br>";
	   $data['rank']=$rank;
	   $gsfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
	 }
   }
   unset($data);

   //根据排名确定每个部门的优秀干事
   $gsfk_model=new Model("Gsfk");
   for($i=1;$i<=11;$i++)
   {
	 $flag=1;//跳出标志
	 $j=1;//从排名第一的开始算起	 
	 while($flag)
	 {
	   $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and rank=$j")->select();
	   foreach($gsfk_info as $v)
	   {
	     $gs_account=$v['account'];
	     $person_info=$person_model->where("account=$gs_account")->find();
		 if($person_info['apartment']==$i)
		   break;
	   }
	   //echo "部门".$i."的排名第".$j."的干事是：".$gs_account."</br>";
	   //$gs_account=$gsfk_info['account'];
	   $yxchxz_info=$yxchxz_model->where("account=$gs_account")->find();
	   if(empty($yxchxz_info))
	   {
	     //echo $gs_account."没有被限制了</br>";
	     unset($data);
		 $data['yxgs']=1;
		 $gsfk_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
	     $flag=0;
		  //echo "部门".$i."的优秀干事是：".$gs_account."</br>";
	   }
	   else{
	     //echo $gs_account."被限制了</br>"; 
	   }
	   $j++;
	   $person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
	   if($j>count($person_info))
	     $flag=0;
	 }
	
    
   }


 }
 //部长反馈处理
 private function funcfkonebz()
 {
   $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
  //部长反馈表
   $person_model=new Model("Person");
   $bzfk_model=new Model("Bzfk");
   $person_info=$person_model->where("type=3")->select();
   foreach($person_info as $v)
   {
     $this->getbzfk($v['account'],$year,$month);
   }
 
   //规矩改了，排名是内部的
   for($j=1;$j<=11;$j++)
   {
     $person_info=$person_model->where("type=3 and apartment=$j")->select();
     $person_info2=$person_model->where("type=3 and apartment=$j")->select();
     //将欠缺的部长排名补上
     foreach($person_info as $v)
     {
       $rank=1;
       $account1=$v['account'];
	   $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and (account=$account1)")->find();
	   $total1=$bzfk_info['total'];
	   //echo "tz:".$total1."</br>";
       foreach($person_info2 as $v2)
	   {
	     if($v2['account']==$account1)
	       continue;
	     $account2=$v2['account'];
	     $bzfk_info2=$bzfk_model->where("(year=$year and month=$month) and (account=$account2)")->find();
	     $total2=$bzfk_info2['total'];
	     if($total1<$total2)
	     {
	       $rank++;
	     }
	     if($total1==$total2)
	     {
	       //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
	       //echo $account1."比较：".$account2."结果：".strcmp($account1,$account2)."</br>";
           if(strcmp($account1,$account2)>0)//学号小的排在前面	
             $rank++;		 
	    }
	     //echo $account1.":".$total1."比较".$account2.":".$total2."</br>";
	   }
	   //echo $account1."总分：".$total1."排名:".$rank."</br>";
	   $data['rank']=$rank;
	   $bzfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
	 }	  
    }   

 }
 
 //优秀部长候选人处理
 private function funcfktwo()
 {
   $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
   $person_model=new Model("Person");
   $bzfk_model=new Model("Bzfk");
   $yxchxz_model=new Model("Yxchxz");
   $yxbzhx_model=new Model("Yxbzhx");
   
   	 //为避免重复，要先删后增
	 $yxbzhx_model->where("year=$year and month=$month")->delete();
   //总共有11个部门
   for($i=1;$i<=11;$i++)
   {
       unset($candidate);
       $rank=1;
       $flag=1;//跳出循环标志
	   //找出该部门排名$rank的部长
	   while($flag)
     {	   
	   $person_info=$person_model->where("apartment=$i and type=3")->select();
	   $bz_sum=count($person_info);
	   foreach($person_info as $person_v)
	   {
		 $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and rank=$rank")->select();
	     foreach($bzfk_info as $bzfk_v)
	     {
		   if($bzfk_v['account']==$person_v['account']){
		     $bz_account=$person_v['account'];break;}
         }			 
         
       }
	   //判断是否出现在限制名单中
	   $yxchxz_info=$yxchxz_model->where("account=$bz_account")->find();
	   if(empty($yxchxz_info))
	   {
	     //echo $bz_account."没被限制</br>";
	     $candidate=$bz_account;
		 $flag=0;
	   }
	   
	     //echo $bz_account."被限制了</br>";
	   $rank++;
	   if($rank>$bz_sum)
	     $flag=0;
     }
     //如果$candidate不为空，说明该部门有优秀部长候选人
     //找到该部门符合条件的候选人并插入数据库表 tbl_yxbzhx;
	 $yxbzhx_model=new Model("Yxbzhx");

	 if(!empty($candidate))
	 {
	    //echo "部门".$i."的优秀部长候选人是：".$candidate."</br>";
		unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['HX']=$candidate;
		$yxbzhx_info=$yxbzhx_model->add($data);
		//if($yxbzhx_info)
		  //echo $candidate."添加成功</br>";
	 }
	 //else
		//echo "部门".$i."没有优秀部长候选人</br>";
   }
   //候选人找到之后，就是给每个主席团匹配候选人
  
   //找到所有主席
	//echo "优秀部长评定表初始化开始</br>";
	$person_model=new Model("Person");
	$yxbz_model=new Model("Yxbz");
	$president_model=new Model("President");
	$yxbzhx_model=new Model("Yxbzhx");
	//为避免重复，要先删后增
	$yxbz_model->where("year=$year and month=$month")->delete();
	$yxbzhx_info=$yxbzhx_model->where("year=$year and month=$month")->select();
    //从优秀部长候选中选
	$person_model=$person_model->where("type=4")->select();
	foreach($person_model as $v)
	{
	  //必须投四个部长
	  $i=1;
	  foreach($yxbzhx_info as $v_hx)
	  { 
	    unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$v['account'];
		$data['raccount']=$v_hx['HX'];
		//被投部长默认为空，方便使用是用empty()判断
	    $data['checked']=1;
		$yxbz_info=$yxbz_model->add($data);
		//if(!$yxbz_info)
		  //echo $data['waccount']."优秀部长评定初始化失败";
		if($i>3)
			break;
		$i++;
     }
   }
   //echo "优秀部长评定表初始化完成</br>";

 }
 //优秀部长处理
 private function funcfkthree()
 {
    $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
   //从tbl_yxbzhx中找出十个候选人,从tbl_yxbz中统计所有主席团的评优结果
   $yxbzhx_model=new Model("Yxbzhx");
   $yxbz_model=new Model("Yxbz");
   $bzfk_model=new Model("Bzfk");
   $yxbzhx_info=$yxbzhx_model->where("year=$year and month=$month")->select();
   foreach($yxbzhx_info as $v_hx)
   {
     $bz_account=$v_hx['HX'];
	 $yxbz_info=$yxbz_model->where("(year=$year and month=$month) and raccount=$bz_account and checked=1")->select();
	// echo $bz_account."被评优了：".count($yxbz_info)."次</br>";
	 //将各个候选人的得票存起来
     //$arr=Array(
	   $arr[$bz_account]=count($yxbz_info);
	   //'total'=>count($yxbz_info),
	//);
	 
   }
   arsort($arr);
   //var_dump($arr);
   //将学号、票数、考核分数、综合排名合为一体
   foreach($arr as $k=>$v)
   {
     $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and account=$k")->find();
	 $info[]=Array(
	   'account'=>$k,
	   'ps'=>$v,
	   'total'=>$bzfk_info['total'],
	   'rank'=>1,
	 );
   }
   //重写排名
   for($i=0;$i<count($info);$i++)
   {
     $rank=1;
     for($j=0;$j<count($info);$j++)
	 {
	   if($info[$i]['account']==$info[$j]['account'])
	     continue;
	   if($info[$i]['ps']<$info[$j]['ps'])
	     $rank++;
	   if($info[$i]['ps']==$info[$j]['ps'])
	   {
	     if($info[$i]['total']<$info[$j]['total'])
		   $rank++;
	     if($info[$i]['total']==$info[$j]['total'])
         {
	       //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，相等返回0
           if(strcmp($info[$i]['account'],$info[$j]['account'])>0)//学号小的排在前面	
             $rank++;		 
         }
	   }
	 }
	 $info[$i]['rank']=$rank;
   }
/*    //检测输出
   for($k=0;$k<count($info);$k++)
   {
     echo $info[$k]['account']."	".$info[$k]['ps']."	".$info[$k]['total']."	".$info[$k]['rank']."</br>";
   } */
   //从$info中取出前三名
   for($k=0;$k<count($info);$k++)
   {
     if($info[$k]['rank']==1)
	   $account1=$info[$k]['account'];
	 if($info[$k]['rank']==2)
	   $account2=$info[$k]['account'];
	 if($info[$k]['rank']==3)
	   $account3=$info[$k]['account'];
   }
  //echo "三名优秀部长分别是：".$account1."	".$account2."	".$account3;
  //将三名优秀部长存入tbl_bzfk中
  $data['yxbz']=1;
  $bzfk_model->where("(year=$year and month=$month) and account=$account1")->data($data)->save();
  $bzfk_model->where("(year=$year and month=$month) and account=$account2")->data($data)->save();
  $bzfk_model->where("(year=$year and month=$month) and account=$account3")->data($data)->save();

 }

 //优秀部门处理
 private function funcfkfour()
 {
   //$year="2014";
   //$month="4";
   $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
   for($i=1;$i<=11;$i++)
   {
     $this->getbmfk($i,$year,$month);
   }
   $bmfk_model=new Model("Bmfk");
   $yxchxz_model=new Model("Yxchxz");
   //给部门进行排名
   for($i=1;$i<=11;$i++)
   {
     $rank=1;
	 $bmfk_info=$bmfk_model->where("(year=$year and month=$month) and apartment=$i")->find();
	 $total=$bmfk_info['total'];
	 for($j=1;$j<=11;$j++)
	 {
	   if($i==$j)
	     continue;
	   $bmfk_info2=$bmfk_model->where("(year=$year and month=$month) and apartment=$j")->find();
	   $total2=$bmfk_info2['total'];
	   if($total<$total2)
	     $rank++;
	   if($total==$total2)
	   {
	     if($i>$j)
		   $rank++;
	   }
	 }
	 //一个部门跑完，将排名存起来
	 //echo "部门".$i."的总分是".$total."排名是：".$rank."</br>";
	 unset($data);
	 $data['rank']=$rank;
	 $bmfk_model->where("(year=$year and month=$month) and apartment=$i")->data($data)->save();

   }

   //找到两个优秀部门，从排名高的开始
   $bmfk_model=new Model("Bmfk");
   $yxchxz_model=new Model("Yxchxz");
   //将优秀部门清空
   unset($data);
   $data['yxbm']=0;
   $bmfk_model->where("year=$year and month=$month")->data($data)->save();
  $j=0;
  for($k=1;$k<=11;$k++)
  {
	//判断是否在限制表里面
	$yxchxz_info=$yxchxz_model->where("account=$k")->find();
	if(!empty($yxchxz_info))
		continue;
	//找到排名第一的
	$bmfk_info=$bmfk_model->where("(year=$year and month=$month) and rank=$k")->find();
	$apartment=$bmfk_info['apartment'];
	unset($data);
	$data['yxbm']=1;
	$bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->data($data)->save();
	$j++;
	if($j>1)
		break;
 }
 }
 //外调次数及其排名处理
 private function funcfkfive()
 {
   $resource_model=new Model("Resource");
   $person_model=new Model("Person");
   $wdcs_model=new Model("Wdcs");
   $control_model=new Model("Control");
   $TIME=$this->getTime();
	$year=$TIME['year'];
	$month=$TIME['month'];
   //按部门处理
   for($i=1;$i<=11;$i++)
   {
     $person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
	 foreach($person_info as $v)
	 {
	   $gs_account=$v['account'];
	      //获取上次外调时间
		$arrLastTime=$this->getLastTime();
		$yearLast=$arrLastTime['year'];
		$monthLast=$arrLastTime['month'];
		$control_info=$control_model->where("is_over=1")->select();
		if(count($control_info)==0)
		{
			$resource_info=$resource_model->where("account=$gs_account")->select();
		}
		else{
			$control_info=$control_model->where("year=$yearLast and month=$monthLast")->find();
			$laststamp=$control_info['beginstamp'];
			$control_info=$control_model->where("is_over=0")->find();
			$thisstamp=$control_info['beginstamp'];
			$resource_info=$resource_model->where("$laststamp<create_time and $thisstamp>create_time and account=$gs_account")->select();
		}
	   //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$gs_account")->select();
	   $wdcs=count($resource_info);
	   //echo $gs_account."本月被外调了".$wdcs."次</br>";
	   $data['wdcs']=$wdcs;
	   $wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
	 }
   }
   //生成排名，也是按部门来
   for($i=1;$i<=11;$i++)
   {
     $person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
	 $person_info2=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
	 foreach($person_info as $v)
	 {
	   $rank=1;
	   $gs_account=$v['account'];
	   $wdcs_info=$wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->find();
	   $wdcs=$wdcs_info['wdcs'];
	   foreach($person_info2 as $v2)
	   {
	     $gs_account2=$v2['account'];
		 $wdcs_info2=$wdcs_model->where("(year=$year and month=$month) and account=$gs_account2")->find();
		 $wdcs2=$wdcs_info2['wdcs'];
		 if($wdcs<$wdcs2)
		   $rank++;
		 if($wdcs==$wdcs2)
		 {
		   //按学号大小排名          //strcmp函数：str1小于str2返回负数，str1大于str2返回正数，///相等返回0
           if(strcmp($gs_account,$gs_account2)>0)//学号小的排在前面	
             $rank++;	
		 }
	   }
	   //echo $gs_account."被外调".$wdcs."次，部门内排".$rank."</br>";
	   unset($data);
	   $data['rank']=$rank;
	   $wdcs_model->where("(year=$year and month=$month) and account=$gs_account")->data($data)->save();
	 }
   }
 }
 //在干事考核反馈表中，根据传过来干事的account，进行操作
 private function getgsfk($waccount,$year,$month)
 {
   //计算自评得分
   $gszp_model=new Model("Gszp");
   $person_model=new Model("Person");
   $gskh_model=new Model("Gskh");
   $chuqin_model=new Model("Chuqin");
   $resource_model=new Model("Resource");
   $interact_model=new Model("Interact");
   $tuiyou_model=new Model("Tuiyou");
   $diaoyan_model=new Model("Diaoyan");
   $qt_model=new Model("Qt");
   $control_model=new Model("Control");

   $gszp_info=$gszp_model->where("(year=$year and month=$month) and account=$waccount")->find();
   
   $total=$gszp_info['total'];
   $zpdf=($total/(9*10))*2;
   //echo $waccount."自评得分：".$zpdf."</br>";
   //找出其部长 
   $person_info=$person_model->where("account=$waccount")->find();
   $apartment=$person_info['apartment'];
   $person_info=$person_model->where("apartment=$apartment and type=3")->select();
   $bzpjdf=0;//部长评价得分
   $sum=count($person_info);
   foreach($person_info as $v)
   {
     
     $bz_account=$v['account'];
     $gskh_info=$gskh_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$waccount")->find();
	 //计算部长评价得分
     $total=$gskh_info['total'];
     $total=($total/(8*10))*5;
	 $bzpjdf+=$total;
   }
   $bzpjdf=$bzpjdf/$sum;
  // echo "部长评价得分".$bzpjdf."</br>";
   //获取出勤情况
   $chuqin_info=$chuqin_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
   $qj=$chuqin_info['qj']*(-0.1);
   $ct=$chuqin_info['ct']*(-0.2);
   $qx=$chuqin_info['qx']*(-0.3);
   //获取上次外调时间
   $arrLastTime=$this->getLastTime();
   $yearLast=$arrLastTime['year'];
   $monthLast=$arrLastTime['month'];
   $control_info=$control_model->where("is_over=1")->select();
   if(count($control_info)==0)
   {
	$resource_info=$resource_model->select();
   }
   else{
	$control_info=$control_model->where("year=$yearLast and month=$monthLast")->find();
	$laststamp=$control_info['beginstamp'];
	$control_info=$control_model->where("is_over=0")->find();
	$thisstamp=$control_info['beginstamp'];
	$resource_info=$resource_model->where("$laststamp<create_time and $thisstamp>create_time")->select();
	}
   //获取外调无辜缺席情况
  // echo $waccount."外调次数为".count($resource_info)."</br>";
   //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$waccount")->select();
   $wgqx=0;//外调无辜缺席次数
   $yb=0;//外调表现一般次数
   $tc=0;//外调表现突出次数
   if(!empty($resource_info)){
   foreach($resource_info as $v)
   {
     if($v['assess']==1)
	   $wgqx++;
	 if($v['assess']==3)
	   $yb++;
	 if($v['assess']==4)
	   $tc++;
   }
   }
   //出勤扣分
   $cqdf=1+$qj+$ct+$qx+$wgqx*(-0.1);
  // echo "出勤扣分".$cqdf;
   if($cqdf<0)
     $cqdf=0;
	 //echo "出勤得分".$cqdf."</br>";
   //echo $waccount."外调无辜缺席次数：".$wgqx."</br>";
   //echo $waccount."外调一般次数：".$yb."</br>";
   //echo $waccount."外调突出次数：".$tc."</br>";
   //$wgqxkf=$wgqx*(-0.1);
   //获取外调加分
   $wdjf=$yb*0.1+$tc*0.2;
   //echo "外调加分：".$wdjf."</br>";
   //干事推优加分
   $tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and raccount=$waccount and (wtype=1 or wtype=2)")->select();
   //echo $waccount."被推优次数：".count($tuiyou_info)."</br>";
   $tycs=count($tuiyou_info);//被推优次数
   $tyjf=$tycs*0.1;
   //echo "推优加分".$tyjf."</br>";
   //反馈加分：调研意见采纳加分
   $diaoyan_info=$diaoyan_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
   if(!empty($diaoyan_info)){
   $dycn=$diaoyan_info['caina'];
   }
   else
   {
     $dycn=0;
   }
   $dycnjf=$dycn*0.1;

   //echo "调研采纳加分：".$dycnjf."</br>";
   //其他
   $qt_info=$qt_model->where("(year=$year and month=$month) and account=$waccount")->find();
   $qt=$qt_info['qt'];
   //echo "其他得分".$qt."</br>";
   //计算总分：
  
   $total=$zpdf+$bzpjdf+$cqdf+$wdjf+$tyjf+$dycnjf+$qt;
    //echo $waccount."的总分是：".$total."</br>";
   //将所有这些信息存入数据库表 tbl_gsfk中
   //排名和优秀干事先留着
   $gsfk_model=new Model("Gsfk");
   unset($data);
   $data=Array(
     'year'=>$year,
	 'month'=>$month,
	 'account'=>$waccount,
	 'total'=>$total,
	 'zpdf'=>$zpdf,//自评得分
     'bzpjdf'=>$bzpjdf,//部长评价
     'cqdf'=>$cqdf,//出勤得分
     'wddf'=>$wdjf,//外调得分
     'tydf'=>$tyjf,//推优得分
     'fkdf'=>$dycnjf,//反馈得分
     'qtdf'=>$qt,//其他得分
   );
   //var_dump($data);
   //echo "</br>";
   $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and account=$waccount")->save($data);

   //echo json_encode($data,JSON_UNESCAPED_UNICODE);
 }
 //在部长反馈表，根据传过来的部长的waccount，year 和month进行操作
 private function getbzfk($waccount,$year,$month)
 {
   //计算自评得分
   $bzzp_model=new Model("Bzzp");
   $person_model=new Model("Person");
   $bzkh_model=new Model("Bzkh");
   $president_model=new Model("President");
   $interact_model=new Model("Interact");
   $evaluate_model=new Model("Evaluate");
   $chuqin_model=new Model("Chuqin");
   $resource_model=new Model("Resource");
   $diaoyan_model=new Model("Diaoyan");
   $qt_model=new Model("Qt");
   $control_model=new Model("Control");
   //echo $waccount."的反馈：</br>";
   $bzzp_info=$bzzp_model->where("(year=$year and month=$month) and waccount=$waccount")->find();
   $total=$bzzp_info['total'];
   $total=($total/(12*10))*2;
   $zpdf=$total;
  // echo "自评总分:".$total."</br>";
   //找出主管副主席
   $person_info=$person_model->where("account=$waccount")->find();
   $apartment=$person_info['apartment'];
   $president_info=$president_model->select();
   for($k=0;$k<count($president_info);$k++)
   {
	$apartment_tar="|".$apartment;
	if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
		continue;
	else{
		$fzx_account=$president_info[$k]['account'];
		break;
	}
   }
   $bzkh_info=$bzkh_model->where("(year=$year and month=$month) and waccount=$fzx_account and raccount=$waccount")->find();
   //计算主管副主席的给分
   //由于部长考核时没有计算总分，这里再计算一次
   $total=$bzkh_info['total'];     
   $zxpjdf=$total;
   $zxpjdf=($zxpjdf/(9*10))*5;
  // echo "主管副主席评价：".$zxpjdf."</br>";
   //找出所有干事
   $person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
   $gsgf=0;//累计干事给分
   $sum=count($person_info);//干事人数
   foreach($person_info as $v)
   {
	 $gs_account=$v['account'];
	 $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$waccount")->find();
	 $gsgf=$gsgf+$evaluate_info['df']*0.2;
   }
   //echo "总得分：".$gsgf."</br>";
   //echo "人数：".$sum."</br>";
   $gspjdf=$gsgf/$sum;
   //echo "来自干事的平均分：".$gspjdf."</br>";
   //本部门其他部长的评价
   //找出本部门其他部长
   $person_info=$person_model->where("apartment=$apartment and type=3")->select();
   $bzgf=0;
   $sum=count($person_info)-1;
   foreach($person_info as $v)
   {
     $bz_account=$v['account'];
     if($bz_account==$waccount)
	   continue;
	 $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$waccount")->find();
     $bzgf=$bzgf+$evaluate_info['df'];
    }
	$bzpjdf=$bzgf/$sum;
	$bzpjdf=$bzpjdf*0.2;
    //echo "总得分：".$bzgf."</br>";
    //echo "人数：".$sum."</br>";
	//echo "来自本部门其他部长平均分：".$bzpjdf."</br>";
	//计算出勤扣分
 //获取出勤情况
   $chuqin_info=$chuqin_model->where("(year=$year and month=$month) and (raccount=$waccount)")->find();
   $qj=$chuqin_info['qj']*(-0.1);
   $ct=$chuqin_info['ct']*(-0.2);
   $qx=$chuqin_info['qx']*(-0.3);
   //获取外调无辜缺席情况
     //获取上次外调时间
   $arrLastTime=$this->getLastTime();
   $yearLast=$arrLastTime['year'];
   $monthLast=$arrLastTime['month'];
   $control_info=$control_model->where("is_over=1")->select();
   if(count($control_info)==0)
   {
	$resource_info=$resource_model->select();
   }
   else{
	$control_info=$control_model->where("year=$yearLast and month=$monthLast")->find();
	$laststamp=$control_info['beginstamp'];
	$control_info=$control_model->where("is_over=0")->find();
	$thisstamp=$control_info['beginstamp'];
	$resource_info=$resource_model->where("$laststamp<create_time and $thisstamp>create_time")->select();
	}
	//echo $waccount."被外调了".count($resource_info)."次</br>";
   //$resource_info=$resource_model->where("(year=$year and month=$month) and account=$waccount")->select();
   $wgqx=0;//外调无辜缺席次数
   $yb=0;//外调表现一般次数
   $tc=0;//外调表现突出次数
   foreach($resource_info as $v)
   {
     if($v['assess']==1)
	   $wgqx++;
	 if($v['assess']==3)
	   $yb++;
	 if($v['assess']==4)
	   $tc++;
   }
   //出勤得分
   $cqdf=1+$qj+$ct+$qx-$wgqx*(-0.1);
   if($cqdf<0)
     $cqdf=0;
   //echo "出勤得分：".$cqdf."</br>";
   //echo $waccount."外调无辜缺席次数：".$wgqx."</br>";
   //echo $waccount."外调一般次数：".$yb."</br>";
   //echo $waccount."外调突出次数：".$tc."</br>";
   //$wgqxkf=$wgqx*(-0.1);
   
   //获取外调加分
   $wddf=$yb*0.1+$tc*0.2;
   //反馈加分：调研意见采纳加分
   $diaoyan_info=$diaoyan_model->where("(year=$year and month=$month) and raccount=$waccount")->find();
   $dycn=$diaoyan_info['caina'];
   $dycnjf=$dycn*0.1;
   $fkdf=$dycnjf;
   //其他
   $qt_info=$qt_model->where("(year=$year and month=$month) and account=$waccount")->find();
   $qtdf=$qt_info['qt'];
   //echo "其他得分是：".$qtdf."</br>";
   //计算总分：
   $total=$zpdf+$zxpjdf+$gspjdf+$bzpjdf+$cqdf+$wddf+$fkdf+$qtdf;
   //echo $waccount."的总分是".$total."</br>";
   //将所有这些信息存入数据库表 tbl_gsfk中
   //排名和优秀部长先留着	
   $data=Array(
     'year'=>$year,
	 'month'=>$month,
	 'account'=>$waccount,
	 'total'=>$total,
	 'zpdf'=>$zpdf,
	 'zxpjdf'=>$zxpjdf,
	 'gspjdf'=>$gspjdf,
	 'bzpjdf'=>$bzpjdf,
	 'cqdf'=>$cqdf,
	 'wddf'=>$wddf,
	 'fkdf'=>$fkdf,
	 'qtdf'=>$qtdf,
   );
   $bzfk_model=new Model("Bzfk");
   $bzfk_model->where("(year=$year and month=$month) and account=$waccount")->save($data);
   //if()
    // echo "添加成功</br>";
 }
 //在主席团反馈表，根据传过来的部门apartment，year和month进行操作
 public function getbmfk($apartment,$year,$month)
 {
  
   $person_model=new Model("Person");
   $bmkh_model=new Model("Bmkh");
   $interact_model=new Model("Interact");
   $president_model=new Model("President");
   $chuqin_model=new Model("Chuqin");
   $bzfk_model=new Model("Bzfk");
   $diaoyan_model=new Model("Diaoyan");
   $bmty_model=new Model("Bmty");
   $bmwg_model=new Model("Bmwg");
   $qt_model=new Model("Qt");
   //主席评价
   $president_info=$president_model->where("is_sub='n'")->find();
   $zx_account=$president_info['account'];
   //echo "主席是：".$zx_account;
   $bmkh_info=$bmkh_model->where("(year=$year and month=$month) and (waccount=$zx_account and rapartment=$apartment)")->find();
   $total=$bmkh_info['DF1']+$bmkh_info['DF2']+$bmkh_info['DF3']+$bmkh_info['DF4']+$bmkh_info['DF5']
		+$bmkh_info['DF6']+$bmkh_info['DF7'];
   $total=($total/(7*10))*5;
   $zxpjdf=$total;
   //echo "部门：".$apartment."的主席给分是：".$total."</br>";
   //主管副主席评价得分
   $president_info=$president_model->select();
   for($k=0;$k<count($president_info);$k++)
   {
	$apartment_tar="|".$apartment;
	if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
		continue;
	else{
		$fzx_account=$president_info[$k]['account'];
		break;
	}
   }
   $fzx_account=$president_info['account'];
   $bmkh_info=$bmkh_model->where("(year=$year and month=$month) and (waccount=$fzx_account and rapartment=$apartment)")->find();
   $total=$bmkh_info['DF1']+$bmkh_info['DF2']+$bmkh_info['DF3']+$bmkh_info['DF4']+$bmkh_info['DF5']
		+$bmkh_info['DF6']+$bmkh_info['DF7'];
   $total=($total/(7*10))*3;
   $zgpjdf=$total;
   //echo "部门：".$apartment."的主管副主席给分是：".$total."</br>";
   //出勤扣分
 //获取出勤情况
   $chuqin_info=$chuqin_model->where("(year=$year and month=$month) and (rapartment=$apartment)")->find();
   if(!empty($chuqin_info)){
   $qj=$chuqin_info['qj']*(-0.1);
   $ct=$chuqin_info['ct']*(-0.2);
   $qx=$chuqin_info['qx']*(-0.3);
   }
   else{
     $qj=0;
	 $ct=0;
	 $qx=0;
   }
   //出勤得分
   $cqdf=2+$qj+$ct+$qx;
   //echo "出勤得分：".$cqdf."</br>";
   if($cqdf<0)
     $cqdf=0;
   //主席团推优得分
   $tuiyou_model=new Model("Tuiyou");
   $tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and raccount=$apartment")->select();
   $tydf=count($tuiyou_info);
   $tydf=$tydf*0.3;
   //echo $apartment."的主席团推优得分是：".$tydf."</br>";
   //$tydf=0;
   //优秀部长加分
   //找出本部门部长
   $person_info=$person_model->where("apartment=$apartment and type=3")->select();
   $yxbz=0;
   foreach($person_info as $v)
   {
     $bz_account=$v['account'];
	 //echo "部长：".$bz_account."</br>";
	 $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and account=$bz_account")->find();
	 //echo "该部长是否为优秀：".$bzfk_info['yxbz']."</br>";
	 //var_dump($bzfk_info);
	 if($bzfk_info['yxbz']==1)
	 {
	   //echo "优秀部长：".$bz_account."</br>";
	   $yxbz=0.2;
	   break;
	 }
   }
   //获取反馈加分，包括部长和干事
   $fkdf=0;
   $person_info=$person_model->where("apartment=$apartment")->select();
   foreach($person_info as $v)
   {
     $raccount=$v['account'];
	 $diaoyan_info=$diaoyan_model->where("(year=$year and month=$month) and raccount=$raccount")->find();
	 $fkdf=$fkdf+$diaoyan_info['caina'];
   }
   $fkdf=$fkdf*0.1;
   //违规扣分
   $bmwg_info=$bmwg_model->where("(year=$year and month=$month) and apartment=$apartment")->select();
   if(count($bmwg_info)>0){
     foreach($bmwg_info as $v)
	 {
		$wgkf=$wgkf+$v['wgkf'];
	 }
     //$wgkf=-$bmwg_info['wgkf'];
	}
   else{
     $wgkf=0;}
   //其他
   $qt_info=$qt_model->where("(year=$year and month=$month) and account=$apartment")->find();
    $qt=$qt_info['qt'];
    //echo $apartment."的其他得分是：".$qt."</br>";
 
   //将所有这些信息存入数据库表
   $total=$zxpjdf+$zgpjdf+$cqdf+$tydf+$wgkf+$fkdf+$qt+$yxbz;
   $data=Array(
     'year'=>$year,
	 'month'=>$month,
	 'total'=>$total,
	 'apartment'=>$apartment,
	 'zxpjdf'=>$zxpjdf,
	 'zgpjdf'=>$zgpjdf,
	 'cqdf'=>$cqdf,
	 'wgkf'=>$wgkf,
	 'fkdf'=>$fkdf,
	 'tydf'=>$tydf,
	 'qtdf'=>$qt,
	 'yxbz'=>$yxbz,
   );
   
   $bmfk_model=new Model("Bmfk");
   $bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->data($data)->save();
   //if()
     //echo $apartment."添加成功</br>";
	 

 }

//下面j":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"},{"pj":"无"}],"bzpj":[{"bzpj":"空"},{"bzpj"是与前端通讯的各种反馈表
//向前端发送干事考核反馈表json数据
 public function jsgskh()
 {
   //
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	  
	//获取请求的时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//判断时间是否合理
	$gsfk_model=new Model("Gsfk");
    $tuiyou_model=new Model("Tuiyou");
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$bmfk_model=new Model("Bmfk");
	$person_info=$person_model->where("account=$account")->find();
	//基本信息
	$name=$person_info['name'];
	$apartment=$person_info['apartment'];
	$gsfk_info=$gsfk_model->where("(year=$year and month=$month) and account=$account")->find();
	$zongfen=$gsfk_info['total'];
	$paiming=$gsfk_info['rank'];
	//获取该部门该月优秀干事
	$person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
	foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and account=$gs_account")->find();
	  if($gsfk_info['yxgs']==1)
	  {
	    $yxgs_account=$gs_account;
		break;
	  }
	}
	$person_info=$person_model->where("account=$yxgs_account")->find();
	if(!empty($person_info))
	{
	  $yxgs_name=$person_info['name'];
	}
	else{
	  $yxgs_name="无";
	}
	//echo "优秀干事：".$yxgs_name;
	//所在部门的得分和排名
	$bmfk_info=$bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
	$bmpm=$bmfk_info['rank'];
	$bmdf=$bmfk_info['total'];
	//得分细节：
	$gsfk_info=$gsfk_model->where("(year=$year and month=$month) and account=$account")->find();
	$DFXJ[]=Array(
	  'a'=>$gsfk_info['zpdf'],
	  'b'=>$gsfk_info['bzpjdf'],
	  'c'=>$gsfk_info['cqdf'],
	  'd'=>$gsfk_info['wddf'],
	  'e'=>$gsfk_info['tydf'],
	  'f'=>$gsfk_info['fkdf'],
	  'g'=>$gsfk_info['qtdf'],
	);
	//自我评价
	$gszp_info=$gszp_model->where("(year=$year and month=$month) and account=$account")->find();
	$zwpj=$gszp_info['zptext'];
	//其他干事评价
	$person_info=$person_model->where("(type=1 or type=2) and apartment=$apartment")->select();
    foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  if($gs_account==$account)
	    continue;
	  $tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$account")->find();
	  $pj=$tuiyou_info['text'];
	  if(empty($pj))
	    $pj="无";
	  $qtgspj[]=Array(
	    'pj'=>$pj,
	  );
	}
	//部长评价
	$person_info=$person_model->where("(type=3) and apartment=$apartment")->select();
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$account")->find();
	  $bzdpj=$interact_info['text'];
	  $bzpj[]=Array(
	    'bzpj'=>$bzdpj,
	  );
	}
	//同事留言
	$interact_info=$interact_model->where("(year=$year and month=$month) and raccount=$account and (wtype=1 or wtype=2)")->select();
	foreach($interact_info as $v)
	{
		$liuyan[]=Array(
			'liuyan'=>$v['text'],
		);
	}
	//生成将要返回的json数组
	$arr=Array(
	  'zongfen'=>$zongfen,
	  'paiming'=>$paiming,
	  'yxgs'=>$yxgs_name,
	  'bmpm'=>$bmpm,
	  'bmdf'=>$bmdf,
	  'DFXJ'=>$DFXJ,
	  'zwpj'=>$zwpj,
	  'qtgspj'=>$qtgspj,
	  'bzpj'=>$bzpj,
	  'liuyan'=>$liuyan,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }
  
  //向前端发送部长反馈表的json数据
  public function jsbzfk()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
    $bzfk_model=new Model("Bzfk");
    $person_model=new Model("Person");
	$bzzp_model=new Model("Bzzp");
	$interact_model=new Model("Interact");
	$president_model=new Model("President");
	$gszp_model=new Model("Gszp");
	$bmfk_model=new Model("Bmfk");
	$oneway_model=new Model("Oneway");
	$gsfk_model=new Model("Gsfk");
	$qt_model=new Model("Qt");
	$bmwg_model=new Model("Bmwg");
	//$oneway
	//基本信息
	$person_info=$person_model->where("account=$account")->find();
    $apartment=$person_info['apartment'];
    //获取总分

	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$bzfk_info=$bzfk_model->where("(year=$year and month=$month) and account=$account")->find();
    $ZongFen=$bzfk_info['total'];
    //获取得分细则
    $arrDeFenXiZhe=Array(
	  'a'=>$bzfk_info['zpdf'],
	  'b'=>$bzfk_info['zxpjdf'],
	  'c'=>$bzfk_info['gspjdf'],
	  'd'=>$bzfk_info['bzpjdf'],
	  'e'=>$bzfk_info['cqdf'],
	  'f'=>$bzfk_info['wddf'],
	  'g'=>$bzfk_info['fkdf'],
	  'h'=>$bzfk_info['qtdf'],	 	  
	);	
	//获取自我评价
	$bzzp_info=$bzzp_model->where("(year=$year and month=$month) and waccount=$account")->find();
	$ZiWoPingJia=$bzzp_info['zptext'];
	//其他部长评价
	$person_info=$person_model->where("apartment=$apartment and type=3")->select();
	foreach($person_info as $v)
	{
	 
	  $bz_account=$v['account'];
	  if($bz_account==$account)
	    continue;
	  $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$bz_account and raccount=$account")->find();
	  $pj=$interact_info['text'];
      $arrQiTaBuZhanPinJia[]=Array(
	    'pj'=>$pj,
	  );	  
	}
	$QiTaBuZhanPinJia=Array(
	  'sum'=>count($person_info)-1,
	  'arrQiTaBuZhanPinJia'=>$arrQiTaBuZhanPinJia,
	);
	//echo json_encode($QiTaBuZhanPinJia,JSON_UNESCAPED_UNICODE);
	//主管副主席评价
   $president_info=$president_model->select();
   for($k=0;$k<count($president_info);$k++)
   {
	$apartment_tar="|".$apartment;
	if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
		continue;
	else{
		$fzx_account=$president_info[$k]['account'];
		break;
	}
   }	
	$interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$fzx_account and raccount=$account")->find();
	$ZhuGuanFuZhuXiPinJia=$interact_info['text'];
	//获取干事评价
	$person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
    $sum=count($person_info);
	foreach($person_info as $v)
    {
	  $gs_account=$v['account'];
	  $person_info=$person_model->where("account=$gs_account")->find();
	  //$gs_name=$person_info['name'];
	  $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$gs_account and raccount=$account")->find();
	  $arrGanShiPingJia[]=Array(
		'gspj'=>$interact_info['text'],
	  );
	}
    $GanShiPingJia=Array(
	  'sum'=>$sum,
	  'arrGanShiPingJia'=>$arrGanShiPingJia,
	);	
	//echo json_encode($GanShiPingJia,JSON_UNESCAPED_UNICODE);
	//获取干事自评
	$person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
	$sum=count($person_info);
	foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  $gszp_info=$gszp_model->where("(year=$year and month=$month) and account=$gs_account")->find();
	  $arrGSZP[]=Array(
	    'name'=>$v['name'],
		'account'=>$gs_account,
		'assess'=>$gszp_info['zptext'],
	  );
	}
	$GSZP=Array(
	  'sum'=>$sum,
	  'arrGSZP'=>$arrGSZP,
	);
	//echo json_encode($GSZP,JSON_UNESCAPED_UNICODE);
	//部门得分和部门排名
	$bmfk_info=$bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->select();
	$BuMenDeFeng=$bmfk_info['total'];
	for($k=1;$k<=11;$k++)
	{
	$bmfk_info=$bmfk_model->where("(year=$year and month=$month) and rank=$k")->find();

		$BuMenPaiMing[]=Array(
			'bm'=>$bmfk_info['apartment'],
			'df'=>$bmfk_info['total'],
		);
	}
	//部门得分细则
	$bmfk_info=$bmfk_model->where("(year=$year and month=$month) and apartment=$apartment")->find();
	$arrBuMenDeFenXiZhe=Array(
	  'a'=>$bmfk_info['zxpjdf'],
	  'b'=>$bmfk_info['zgpjdf'],
	  'c'=>$bmfk_info['cqdf'],
	  'd'=>$bmfk_info['wgkf'],
	  'e'=>$bmfk_info['fkdf'],
	  'f'=>$bmfk_info['tydf'],
	  'g'=>$bmfk_info['yxbz'],
	  'h'=>$bmfk_info['qtdf'],
	);
	//主管副主席的部门评价
	$oneway_info=$oneway_model->where("(year=$year and month=$month) and waccount=$fzx_account and rapartment=$apartment")->find();
	$ZhuGuanFuZhuXiBuMenPinJia=$oneway_info['text'];
	//主席的部门评价
	$president_info=$president_model->where("is_sub='n'")->find();
	$zx_account=$president_info['account'];
	$oneway_info=$oneway_model->where("(year=$year and month=$month) and waccount=$zx_account and rapartment=$apartment")->find();
    //var_dump($oneway_info);
	$ZhuXiDeBuMenPinJia=$oneway_info['text'];
	//每个部门所有干事的得分情况，按得分高低排
	$person_info=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
	for($i=1;$i<=count($person_info);$i++)
	{
      $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and rank=$i")->select();
	  foreach($gsfk_info as $v)
	  {
	    $gs_account=$v['account'];
	    $person_info2=$person_model->where("account=$gs_account")->find();
		if($person_info2['apartment']==$apartment)
		{
		  $arrGSPM[]=Array(
		    'name'=>$person_info2['name'],
			'score'=>$v['total'],
		  );
		  break;
		}
	  }
	}
	//同事留言
	$interact_info=$interact_model->where("(year=$year and month=$month) and (raccount=$account and wtype=3)")->select();
	foreach($interact_info as $v)
	{
		$LiuYan[]=Array(
			'liuyan'=>$v['text'],
		);
	}
	//干事对部门的留言
	$interact_info=$interact_model->where("(year=$year and month=$month) and (wtype=1 or wtype=2) and raccount=$apartment")->select();
	foreach($interact_info as $v)
	{
		$BuMenLiuYan[]=Array(
			'liuyan'=>$v['text'],
		);
	}
	//该部长其他情况加减分的理由
	$qt_info=$qt_model->where("(year=$year and month=$month) and account=$account")->find();
	$bzqitaliyou=$qt_info['text'];
	//该部门，各种违纪登记表扣分的理由，拼接成一个字符
	$bmwg_info=$bmwg_model->where("(year=$year and month=$month) and apartment=$apartment")->select();
	$weijiliyou=" ";
	foreach($bmwg_info as $v)
	{
		if($v['wgkf']==0)
			continue;
		else{
			$weijiliyou.=$v['text'];
		}
	}
	//该部门其他情况加减分表的理由
	$qt_info=$qt_model->where("(year=$year and month=$month) and account=$apartment")->find();
	$bmqitaliyou=$qt_info['text'];
	//向前端发送json数据
	$arr=Array(
	  'ZongFen'=>$ZongFen,
	  'arrDeFenXiZhe'=>$arrDeFenXiZhe,
	  'ZiWoPingJia'=>$ZiWoPingJia,
	  'QiTaBuZhanPinJia'=>$QiTaBuZhanPinJia,
	  'ZhuGuanFuZhuXiPinJia'=>$ZhuGuanFuZhuXiPinJia,
	  'GSZP'=>$GSZP,
	  'arrGSPM'=>$arrGSPM,
	  'GanShiPingJia'=>$GanShiPingJia,
	  'BuMenDeFeng'=>$BuMenDeFeng,
  'BuMenPaiMing'=>$BuMenPaiMing,
	  'arrBuMenDeFenXiZhe'=>$arrBuMenDeFenXiZhe,
	  //前端两个评价给颠倒了。。。
	  'ZhuGuanFuZhuXiBuMenPinJia'=>$ZhuGuanFuZhuXiBuMenPinJia,
	  'ZhuXiDeBuMenPinJia'=>$ZhuXiDeBuMenPinJia,
	  'LiuYan'=>$LiuYan,
	  'BuMenLiuYan'=>$BuMenLiuYan,
	  'bzqitaliyou'=>$bzqitaliyou,
	  'weijiliyou'=>$weijiliyou,
	  'bmqitaliyou'=>$bmqitaliyou,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }  


 //向前端发送整体考核结果反馈表json数据
 public function jsztkhjgfk()
 {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	
    $person_model=new Model("Person");
    $gsfk_model=new Model("Gsfk");
    $bzfk_model=new Model("Bzfk");
    $bmfk_model=new Model("Bmfk");
	$resource_model=new Model("Resource");
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
    //获取优秀部门
    $bmfk_info=$bmfk_model->where("(year=$year and month=$month) and yxbm=1")->select();
    foreach($bmfk_info as $v)
    {
	  //echo "优秀部门".$v['apartment'];
	  $arrYXBM[]=Array(
	    'bm'=>$v['apartment'],
		'df'=>$v['total'],
	  );
	}
    //echo json_encode($arrYXBM,JSON_UNESCAPED_UNICODE);    
	//获取优秀部长
	$bzfk_info=$bzfk_model->where("(year=$year and month=$month) and yxbz=1")->select();
	foreach($bzfk_info as $v)
	{
	  $yxbz_account=$v['account'];
	  $person_info=$person_model->where("account=$yxbz_account")->find();
	  $yxbz_name=$person_info['name'];
	  $ssbm=$person_info['apartment'];
	  $df=$v['total'];
	  $arrYXBZ[]=Array(
	    'account'=>$yxbz_account,
		'bm'=>$yxbz_name,
		'ssbm'=>$ssbm,
		'df'=>$df,
	  );
	}
	//echo json_encode($arrYXBZ,JSON_UNESCAPED_UNICODE);  

	//上面获取各部门排名前三干事有误
	for($i=1;$i<=11;$i++)
	{
	  for($j=1;$j<=3;$j++)
	  {
	    //优秀干事人数
		$sum=0;
	    $gsfk_info=$gsfk_model->where("(year=$year and month=$month) and rank=$j")->select();
		$person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
		foreach($person_info as $v)
		{
		  $gs_account=$v['account'];
		  foreach($gsfk_info as $v2)
		  {
		    if($gs_account==$v2['account'])
			{
			 
			  $GS[]=Array(
			    'name'=>$v['name'],
				'account'=>$gs_account,
				'df'=>$v2['total'],
				'ydyxgs'=>$v2['yxgs'],
			  );
			  break;
			}
		  }
		}
		//找到了$i部门排名第$j的信息		
	  }
	  //整个$i部门找完了
	  $arrBM[]=Array(
	    //'sum'=>3,
		'bm'=>$i,
		'GS'=>$GS,
	  );
	  unset($GS);
	}
	$YXGS=Array(
	  'bmsm'=>11,
	  'arrBM'=>$arrBM,
	);
	//echo json_encode($YXGS,JSON_UNESCAPED_UNICODE);
	//外调较多的人员
	//这里有点不明朗，前端需要的是较多人员，还是所有人员
	unset($GS);
	unset($arrBM);
	$wdcs_model=new Model("Wdcs");
	//外调较多人员代码有误，下面重写

	for($i=1;$i<=11;$i++)
	{
	  $person_info2=$person_model->where("apartment=$i")->select();
	  for($j=1;$j<=count($person_info2);$j++)
	  {
	    $wdcs_info=$wdcs_model->where("(year=$year and month=$month) and rank=$j")->select();
		$person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
		//var_dump($person_info);
		foreach($person_info as $v)
		{
		  $gs_account=$v['account'];
		  foreach($wdcs_info as $v2)
		  {
		    if($gs_account==$v2['account'])
			{
			  $GS[]=Array(
			    'name'=>$v['name'],
				'account'=>$gs_account,
				'wdcs'=>$v2['wdcs'],
			  );
			  break;
			}
		  }
		}
	  }
	  //找第二个部门前
	  $arrBM[]=Array(
	    //'sum'=>3,
		'bm'=>$i,
		'GS'=>$GS,
	  );
	  unset($GS);
	}
	$WDJDRY=Array(
	  'bmsm'=>11,
	  'arrBM'=>$arrBM,
	);
	//echo json_encode($WDJDRY,JSON_UNESCAPED_UNICODE);
	//生成将要返回的json数组
	$arr=Array(
	  'arrYXBM'=>$arrYXBM,
	  'arrYXBZ'=>$arrYXBZ,
	  'YXGS'=>$YXGS,
	  'WDJDRY'=>$WDJDRY,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
 }
 //向前端发送主席团反馈表json数据
 public function jszxtfk()
 {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 

	$account=$_SESSION['account'];
   $bmfk_model=new Model("Bmfk");
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
   //获取部门排名
   for($i=1;$i<=11;$i++)
   {
     $bmfk_info=$bmfk_model->where("(year=$year and month=$month) and rank=$i")->find();
	 $score=$bmfk_info['total'];
	 $apartment=$bmfk_info['apartment'];
	 $isExc=$bmfk_info['yxbm'];
	 $arrSorted[]=Array(
	   'name'=>$apartment,
	   'score'=>$score,
	   'isExc'=>$isExc,
	 );
   }
   $classSortDepart=Array(
     'sum'=>2,
	 'arrSorted'=>$arrSorted,
   );
   //echo json_encode($arrSorted,JSON_UNESCAPED_UNICODE);
   //获取优秀部长
   $bzfk_model=new Model("Bzfk");
   $person_model=new Model("Person");
   $bzfk_info=$bzfk_model->where("(year=$year and month=$month) and yxbz=1")->select();
   //var_dump($bzfk_info);
   foreach($bzfk_info as $v)
   {
     $bz_account=$v['account'];
	 $person_info=$person_model->where("account=$bz_account")->find();
	 $bz_name=$person_info['name'];
	 $apartment=$person_info['apartment'];
	 $score=$v['total'];
	 $arrExcMin[]=Array(
	   'name'=>$bz_name,
	   'account'=>$bz_account,
	   'depart'=>$apartment,
	   'score'=>$score,
	 );
   }
   //echo json_encode($arrExcMin,JSON_UNESCAPED_UNICODE);
   $ExcMinster=Array(
     'sum'=>3,
	 'arrExcMin'=>$arrExcMin,
   );
   //echo json_encode($ExcMinster,JSON_UNESCAPED_UNICODE);
   //获取部长对主管副主席评价
   $interact_model=new Model("Interact");
   $bzzp_model=new Model("Bzzp");
   $president_model=new Model("President");
   //找出部长们
   //echo $account;
   $president_info=$president_model->where("account=$account")->find();
   $apartmentArr=explode("|",$president_info['apartment']);
   for($k=0;$k<count($apartmentArr);$k++)
   {
	if($apartmentArr[$k]=='')
		continue;
	else{
		$apartment_tar=$apartmentArr[$K];
		 if($apartment_tar!=0)
		{
			$person_info=$person_model->where("type=3 and apartment=$apartment_tar")->select();  
			foreach($person_info as $v)
			{
				//echo $account."PK".$bz_account."</br>";
				$bz_account=$v['account'];
				$bz_name=$v['name'];
				$bzzp_info=$bzzp_model->where("(year=$year and month=$month) and waccount=$bz_account")->find();
				$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$bz_account and raccount=$account) and nm=0")->find();
				//var_dump($interact_info);
				$arrMinFeedBack[]=Array(
				'depart'=>$apartment_tar,
				'minister'=>$bz_name,
				'selfAssess'=>$bzzp_info['zptext'],
				'feedBack'=>$interact_info['text'],
				);	    
			}
				//匿名评价
			$person_info=$person_model->where("type=3 and (apartment=$apartment_tar)")->select();  
			//管辖下的部长数目
			$sum=count($person_info);
			foreach($person_info as $v)
			{
				//echo $account."PK".$bz_account."</br>";
				$bz_account=$v['account'];
				$bz_name=$v['name'];
				//$bzzp_info=$bzzp_model->where("waccount=$bz_account")->find();
				$interact_info=$interact_model->where("(waccount=$bz_account and raccount=$account) and nm=1")->find();
				//var_dump($interact_info);
				if(!empty($interact_info['text']))
				{
				$arrAnonymity[]=Array(
					'anonymityFeedBack'=>$interact_info['text'],
				);	
				}		  
			}

		}
	}
   }
  


    //echo json_encode($arrMinFeedBack,JSON_UNESCAPED_UNICODE);	
			$classSituation=Array(
				'sum'=>$sum,
				'arrMinFeedBack'=>$arrMinFeedBack,
				'arrAnonymity'=>$arrAnonymity,
			);
	  //echo json_encode($arrAnonymity,JSON_UNESCAPED_UNICODE);	
	  //生成将要返回的json数组
	  $arr=Array(
        'classSortDepart'=>$classSortDepart,
		'ExcMinster'=>$arrExcMin,
		'classSituation'=>$classSituation,
		'_arrAnonymity'=>$arrAnonymity,
	  );
	  echo $this->_encode($arr);
	  //echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
	  
 }
 
//下面是接收前端发送过来json数据
  //接收干事自评表
  public function post_gszp()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$account=$_SESSION['account'];
	//基本信息
	$person_model=new Model("Person");
	$interact_model=new Model("Interact");
	$person_info=$person_model->where("account=$account")->find();
    $apartment=$person_info['apartment'];
	$type=$person_info['type'];
	//获取时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
    $status=1;//操作是否成功的返回值\
	$flagCrud=1;
	//$DF=$_POST['arrDF'];
	//自我评价
	$data['zptext']=$_POST['zwpj'];
	//得分细则
    $data['DF1']=$_POST['arrDF'][0]['df'];
	$data['DF2']=$_POST['arrDF'][1]['df'];
	$data['DF3']=$_POST['arrDF'][2]['df'];
	$data['DF4']=$_POST['arrDF'][3]['df'];
	$data['DF5']=$_POST['arrDF'][4]['df'];
	$data['DF6']=$_POST['arrDF'][5]['df'];
	$data['DF7']=$_POST['arrDF'][6]['df'];
	$data['DF8']=$_POST['arrDF'][7]['df'];
	$data['DF9']=$_POST['arrDF'][8]['df'];
	$data['total']=$_POST['zongfen'];
	$data['hadSubmit']=$_POST['hadSubmit'];
	//总分
	//推优自评数据库操作
	$gszp_model=new Model("Gszp");
	$gszp_info=$gszp_model->where("(year=$year and month=$month ) and account=$account")->data($data)->save();
	if(false==$gszp_info)
	  $flagCrud=0;
	unset($data);
	//推优干事
	$tuiyou_model=new Model("Tuiyou");
	  unset($data);
	  $gs_account=$_POST['TYGS']['account'];
	  $data['raccount']=$_POST['TYGS']['account'];
	  $data['text']=$_POST['TYGS']['tyly'];
	  $tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and (waccount=$account and (rtype=1 or rtype=2))")->data($data)->save();
    //部长评价
	if(false==$tuiyou_info)
	  $flagCrud=0;
	$evaluate_model=new Model("Evaluate");
	for($i=0;$i<count($_POST['arrDBZPJ']);$i++)
	{
	  unset($data);
	  $bz_account=$_POST['arrDBZPJ'][$i]['account'];
	  $data['raccount']=$bz_account;
	  $data['df']=$_POST['arrDBZPJ'][$i]['fs'];
	  $data['text']=$_POST['arrDBZPJ'][$i]['pj'];
	  $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$bz_account)")->data($data)->save();
	  if(false==$evaluate_info)
	    $flagCrud=0;
	}
   //对同事留言
   
   $interact_model->where("(year=$year and month=$month) and (waccount=$account and rtype=$type)")->delete();
   for($i=0;$i<count($_POST['arrTongshiliuyan']);$i++)
   {
   unset($data);
    $data['year']=$year;
	$data['month']=$month;
    $data['waccount']=$account;
	$data['wapartment']=$apartment;
	$data['wtype']=$type;
    $data['raccount']=$_POST['arrTongshiliuyan'][$i]['account'];
	$data['rapartment']=$apartment;
	$data['rtype']=$type;
	$data['text']=$_POST['arrTongshiliuyan'][$i]['liuyan'];
	$data['nm']=1;
	$interact_info=$interact_model->add($data);
	if(false==$interact_info)
		$flagCrud=0;
   }
   //对部门的留言
   unset($data);
    $data['waccount']=$account;
	$data['wapartment']=$apartment;
	$data['wtype']=$type;
    $data['raccount']=$apartment;
	$data['text']=$_POST['bumenliuyan'];
	$data['nm']=1;
	$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$apartment)")->data($data)->save();
	if(false==$interact_info)
		$flagCrud=0;
	$arr=Array(
	  'flagCrud'=>$flagCrud,
	 'status'=>$_POST['arrTongshiliuyan'][0]['liuyan'],

	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }  
  //接收部长自评表
  public function post_bzzp()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    
	$account=$_SESSION['account'];
	//基本信息
	$person_model=new Model("Person");
	$interact_model=new Model("Interact");
	$evaluate_model=new Model("Evaluate");
	$president_model=new Model("President");
	$person_info=$person_model->where("account=$account")->find();
    $apartment=$person_info['apartment'];
	$type=$person_info['type'];
	//获取当前时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//记录数据库操作是否成功，默认为1表示成功
	$flagCrud=1;
	$status=1;
	//自我评价
	$data['zptext']=$_POST['zwpj'];
	//各种得分
	
	$data['DF1']=$_POST['arrDF'][0]['df'];
	$data['DF2']=$_POST['arrDF'][1]['df'];
	$data['DF3']=$_POST['arrDF'][2]['df'];
	$data['DF4']=$_POST['arrDF'][3]['df'];
	$data['DF5']=$_POST['arrDF'][4]['df'];
	$data['DF6']=$_POST['arrDF'][5]['df'];
	$data['DF7']=$_POST['arrDF'][6]['df'];
	$data['DF8']=$_POST['arrDF'][7]['df'];
	$data['DF9']=$_POST['arrDF'][8]['df'];
	$data['DF10']=$_POST['arrDF'][9]['df'];
	$data['DF11']=$_POST['arrDF'][10]['df'];
	$data['DF12']=$_POST['arrDF'][11]['df'];
	//计算总分
	$data['total']=$_POST['zongfen'];
	$data['hadSubmit']=$_POST['hadSubmit'];
	$bzzp_model=new Model("Bzzp");
	$bzzp_info=$bzzp_model->where("(year=$year and month=$month) and waccount=$account")->save($data);
    if(!$bzzp_info)
	  $flagCrud=0;
	
	//对本部门其他部长的评价
	$arrBZ=$_POST['DQTBZPJ']['arrBZ'];
	for($i=0;$i<count($arrBZ);$i++)
	{
	  unset($data);
	  $bz_account=$arrBZ[$i]['account'];
	  $data['text']=$arrBZ[$i]['pj'];
	  $data['df']=$arrBZ[$i]['fs'];
	  $evaluate_info=$evaluate_model->where("(year=$year and month=$month) and waccount=$account and raccount=$bz_account")->data($data)->save();
	  if(!$evaluate_info)
	    $flagCrud=0;
   }
   
   //对主管副主席的评价，不匿名
   //找出主管副主席
    $president_info=$president_model->select();
	$apartment_tar="|".$apartment;
	for($k=0;$k<count($president_info);$k++)
	{
		if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
			continue;
		else{
			$fzx_account=$president_info[$k]['account'];
			break;
		}
	}
   unset($data);
   $data['text']=$_POST['dzgfzxpj'];
   $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$fzx_account and nm=0")->data($data)->save();
   if(!$interact_info)
     $status=0;
	//对主席团的匿名评价

	for($i=0;$i<count($_POST['NMPJ']['arrNMPJ']);$i++)
	{
	  unset($data);
	  $zxt_account=$_POST['NMPJ']['arrNMPJ'][$i]['account'];
	  $data['text']=$_POST['NMPJ']['arrNMPJ'][$i]['pj'];
	  $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$account and raccount=$zxt_account and nm=1")->data($data)->save();
	  if(!$interact_info)
	    $status=0;
	}
	//对其他部门部长的留言
	$interact_model->where("(year=$year and month=$month) and waccount=$account and rtype=$type and rapartment!=$apartment")->delete();
	for($i=0;$i<count($_POST['TSLY']);$i++)
	{
		unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$account;
		$data['wapartment']=$apartment;
		$data['wtype']=$type;
		$data['raccount']=$_POST['TSLY'][$i]['account'];
		$data['rtype']=$type;
		$data['text']=$_POST['TSLY'][$i]['liuyan'];
		$data['nm']=1;
		$interact_info=$interact_model->add($data);
		if(false==$interact_info)
			$flagCrud=0;
	}
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }
  //接收跟进部门出勤统计表
  public function post_gjbmcqtj()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$flagCrud=1;
	$status=$this->getStatus();
	$account=$_SESSION['account'];
	$apartment=$_POST['gjbm'];
	$chuqin_model=new Model("Chuqin");
	for($i=0;$i<count($_POST['chuqin']);$i++)
	{
	  $raccount=$_POST['chuqin'][$i]['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['qj']=$_POST['chuqin'][$i]['qj'];
	  $data['ct']=$_POST['chuqin'][$i]['ct'];
	  $data['qx']=$_POST['chuqin'][$i]['qx'];
	  $chuqin_info=$chuqin_model->where("(year=$year and month=$month) and raccount=$raccount")->data($data)->save();
	  if(false==$chuqin_info)
	    $flagCrud=0;
	}

	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	  'gjbm'=>$_POST['gjbm'],
	  'renshu'=>$_POST['renshu'],
	  'str'=>$status,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
  }
   //接收调研意见采纳

  public function post_dyyjcn()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    $diaoyan_model=new Model("Diaoyan");
	$person_model=new Model("Person");
	$flagCrud=1;
	$account=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$status=$this->getStatus();
	for($i=0;$i<count($_POST['arrBM']);$i++)
	{
	  for($j=0;$j<count($_POST['arrBM'][$i]['arrCNJF']);$j++)
	  {
	    $x_account=$_POST['arrBM'][$i]['arrCNJF'][$j]['account'];
		$caina=$_POST['arrBM'][$i]['arrCNJF'][$j]['jiafen'];
		unset($data);
		$data['raccount']=$x_account;
		$data['caina']=$caina;
		$diaoyan_info=$diaoyan_model->where("(year=$year and month=$month) and raccount=$x_account")->data($data)->save();
	    if(false==$diaoyan_info)
			$flagCrud=0;
	  }
	}
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);	
  }

   //接收干事考核
  public function post_gskh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
	 
    //$account=$_SESSION['account'];	  
    $gskh_model=new Model("Gskh");
	$interact_model=new Model("Interact");
    //部长账号
	 $waccount=$_SESSION['account'];
	 //获取时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	 $flagCrud=1;
	 $status=1;//操作是否成功的返回值
	 //遍历得分
	 for($i=0;$i<count($_POST['GSDF']['arrGSDF']);$i++)
	 {
	   //每个干事
	   unset($data);
	   $raccount=$_POST['GSDF']['arrGSDF'][$i]['account'];
	   $data['DF1']=$_POST['GSDF']['arrGSDF'][$i]['df0'];
	   $data['DF2']=$_POST['GSDF']['arrGSDF'][$i]['df1'];
	   $data['DF3']=$_POST['GSDF']['arrGSDF'][$i]['df2'];
	   $data['DF4']=$_POST['GSDF']['arrGSDF'][$i]['df3'];
	   $data['DF5']=$_POST['GSDF']['arrGSDF'][$i]['df4'];
	   $data['DF6']=$_POST['GSDF']['arrGSDF'][$i]['df5'];
	   $data['DF7']=$_POST['GSDF']['arrGSDF'][$i]['df6'];
	   $data['DF8']=$_POST['GSDF']['arrGSDF'][$i]['df7'];
	   $data['total']=$data['DF1']+$data['DF2']+$data['DF3']+$data['DF4']+
	   $data['DF5']+$data['DF6']+$data['DF7']+$data['DF8'];
	   $data['hadSubmit']=$_POST['hadSubmit'];
	   $gskh_info=$gskh_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
	   if(!$gskh_info)
	     $flagCrud=0;
	 }
	 //遍历评价
	
	 for($i=0;$i<count($_POST['DGSPJ']['arrDGSPJ']);$i++)
	 {
	 
	   unset($data);
	   $raccount=$_POST['DGSPJ']['arrDGSPJ'][$i]['account'];
	   $data['text']=$_POST['DGSPJ']['arrDGSPJ'][$i]['pj'];
	   $interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
	   if(!$interact_info)
	     $flagCrud=0;
	 }
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	);
	echo $this->_encode($arr);
  }

  //接收部长考核表
  public function post_bzkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
	//$account=$_SESSION['account'];
	//主席账号
	$waccount=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$status=1;
	$flagCrud=1;
    $bzkh_model=new Model("Bzkh");
	$interact_model=new Model("Interact");
	//部门数目
	for($i=0;$i<count($_POST['BMBZ']['arrBM']);$i++)
	{
	  //该部门部长数目
      for($j=0;$j<count($_POST['BMBZ']['arrBM'][$i]['arrBZ']);$j++)	
	  {
	    $raccount=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['account'];
	    //得分细则
		unset($data);
		
		$data['DF1']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df0'];
		$data['DF2']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df1'];
		$data['DF3']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df2'];
		$data['DF4']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df3'];
		$data['DF5']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df4'];
		$data['DF6']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df5'];
		$data['DF7']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df6'];
		$data['DF8']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df7'];
		$data['DF9']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['df8'];
		$data['total']=$data['DF1']+$data['DF2']+$data['DF3']+$data['DF4']
					+$data['DF5']+$data['DF6']+$data['DF7']+$data['DF8']
					+$data['DF9'];
		$data['hadSubmit']=$_POST['hadSubmit'];
		$bzkh_info=$bzkh_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();	
		if(!$bzkh_info)
		  $flagCrud=0;
		unset($data);
		$data['text']=$_POST['BMBZ']['arrBM'][$i]['arrBZ'][$j]['pj'];
		$info.=$data['text'];
		$info.=$waccount;
		$info.=$raccount;
		$interact_info=$interact_model->where("(year=$year and month=$month) and waccount=$waccount and raccount=$raccount")->data($data)->save();
		if(!$interact_info)
		  $flagCrud=0;
	  }
	}
     
	$_POST['NMPJ'][0]['name'];
	//返回信息
    $arr=Array(
	  'status'=>$flagCrud,
	  'flagCrud'=>$flagCrud,
	  'info'=>$_POST['NMPJ'][0]['name'],
	  'gjbm'=>$_POST['gjbm'],
	  'renshu'=>$_POST['renshu'],
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);	    
  }
  
    //接收部门考核表的数据
  public function post_bmkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
	//主席团账号
	$waccount=$_SESSION['account'];
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$status=1;
	$flagCrud=1;
	$bmkh_model=new Model("Bmkh");
	$tuiyou_model=new Model("Tuiyou");
	//获取部门数目
	for($i=0;$i<count($_POST['BM']['arrBM']);$i++)
	{
	  //部门名字
	  $rapartment=$_POST['BM']['arrBM'][$i]['bm'];
	  //得分细则
	  unset($data);
	  $data['DF1']=$_POST['BM']['arrBM'][$i]['df0'];
	  $data['DF2']=$_POST['BM']['arrBM'][$i]['df1'];
	  $data['DF3']=$_POST['BM']['arrBM'][$i]['df2'];
	  $data['DF4']=$_POST['BM']['arrBM'][$i]['df3'];
	  $data['DF5']=$_POST['BM']['arrBM'][$i]['df4'];
	  $data['DF6']=$_POST['BM']['arrBM'][$i]['df5'];
	  $data['DF7']=$_POST['BM']['arrBM'][$i]['df6'];
	  $data['total']=$data['DF1']+$data['DF2']+$data['DF3']+$data['DF4']+
					$data['DF5']+$data['DF6']+$data['DF7'];
	  $data['text']=$_POST['BM']['arrBM'][$i]['pj'];
	  $data['hadSubmit']=$_POST['hadSubmit'];
	  $bmkh_info=$bmkh_model->where("(year=$year and month=$month) and (waccount=$waccount and rapartment=$rapartment)")->data($data)->save();
	  if(false==$bmkh_info)
	    $flagCrud=0;
	}
	//部门推优
	unset($data);
    $data['raccount']=$_POST['TYBM'];
	$tuiyou_info=$tuiyou_model->where("(year=$year and month=$month) and waccount=$waccount")->data($data)->save();
	if(!$tuiyou_info)
	  $flagCrud=0;
	//返回信息
    $arr=Array(
	  'status'=>$_POST['BM']['arrBM'][6]['pj']+$_POST['BM']['arrBM'][7]['pj'],
	  'flagCrud'=>$flagCrud,
	  'gjbm'=>$_POST['gjbm'],
	  'renshu'=>$_POST['renshu'],
	);
	echo $this->_encode($arr);
	//echo json_encode($arr,JSON_UNESCAPED_UNICODE);	    
  }
  //接收优秀部长评定表的数据
  public function post_yxbz()
  {

	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
	//主席账号
	$waccount=$_SESSION['account'];   
    $yxbz_model=new Model("Yxbz");	
	//获取时间
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	//将传过来的数据保存到tbl_yxbz中
	$flagCrud=1;
	if(!empty($_POST['arrIDlist'][0]['account']))
	{
	  $yxbz_info=$yxbz_model->where("(year=$year and month=$month) and waccount=$waccount")->delete();

      for($i=0;$i<=count($_POST['arrIDlist']);$i++)
	  {
	    unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$waccount;
		$data['raccount']=$_POST['arrIDlist'][$i]['account'];
	    $data['checked']=1;
		
	    $yxbz_info=$yxbz_model->add($data);
		if(false==$yxbz_info)
		  $flagCrud=0;
	  }
	}
		
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	  'status'=>$_POST['arrIDlist'][0]['account']
	  .$_POST['arrIDlist'][1]['account']
	  .$_POST['arrIDlist'][2]['account']
	  .$_POST['arrIDlist'][3]['account'],
	  'gjbm'=>$_POST['gjbm'],
	  'renshu'=>$_POST['renshu'],
	);
	echo $this->_encode($arr);
  }

 //接收其他情况加减分数据
  public function post_qt()
  {
    //拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');  
	$account=$_SESSION['account'];   
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$flagCrud=1;
	$qt_model=new Model("Qt");
	$person_model=new Model("Person");
	//接收干事部长的其他加减分
	for($i=0;$i<count($_POST['persons']);$i++)
	{
	  $x_account=$_POST['persons'][$i]['account'];
	  unset($data);
	  $data['account']=$x_account;
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['qt']=$_POST['persons'][$i]['jiajianfen'];
	  $data['text']=$_POST['persons'][$i]['liyou'];
	  $qt_info=$qt_model->where("(year=$year and month=$month) and account=$x_account")->data($data)->save();
		if(false==$qt_info)
			$flagCrud=0;
	}
	//接收部门的其他加减分
	$apartment=$_POST['bmjjf']['name'];
	unset($data);
	$data['account']=$apartment;
	$data['year']=$year;
	$data['month']=$month;
	$data['qt']=$_POST['bmjjf']['jiajianfen'];
	$data['text']=$_POST['bmjjf']['liyou'];
	$qt_info=$qt_model->where("(year=$year and month=$month) and account=$apartment")->data($data)->save();
	if(false==$qt_info)
		$flagCrud=0;
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	);
	echo $this->_encode($arr);
  }
  //接收违纪登记表数据
  public function post_bmwg()
  {
    //拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');  
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$flagCrud=1;
	$arrWJDJB=$_POST['arrBMWG']['arrWJDJB'];
	$type=$_POST['type'];
	$bmwg_model=new Model("Bmwg");
	for($i=0;$i<12;$i++)
	{
		unset($data);
		$data['wgkf']=$arrWJDJB[$i]['kf'];
		$data['text']=$arrWJDJB[$i]['ly'];
		$apartment=$arrWJDJB[$i]['bm'];
		$bmwg_info=$bmwg_model->where("(year=$year and month=$month) and (apartment=$apartment and type=$type)")->save($data);
		if(false==$bmwg_info)
			$flagCrud=0;
	}
	//返回信息
    $arr=Array(
	  'flagCrud'=>$flagCrud,
	  'status'=>$arrWJDJB[0]['kf'].$arrWJDJB[0]['ly'].$arrWJDJB[0]['bm'].$type,
	);
	echo $this->_encode($arr);
  }
  //接收优秀称号限定表的数据
  public function post_yxchxz()
  {
    $yxchxz_model=new Model("Yxchxz");
	$person_model=new Model("Person");
	//处理干事和部长的限制
    for($i=0;$i<count($_POST['arrDepart']);$i++)
	{
	  for($j=0;$j<count($_POST['arrDepart'][$i]['arrPersons']);$j++)
	  {
	    $x_account=$_POST['arrDepart'][$i]['arrPersons'][$j]['account'];
	    $check=$_POST['arrDepart'][$i]['arrPersons'][$j]['check'];
        $yxchxz_info=$yxchxz_model->where("account=$x_account")->find();
		if(empty($yxchxz_info) && $check==1)
		{
		  //勾选了但原来没有则添加到限制里面
		  unset($data);
		  $data['account']=$x_account;
		  $yxchxz_model->add($data);
		}
		if(!empty($yxchxz_info) && $check==0)
		{
		  //原来有的但取消了勾选则从限制表里面删除
		  $yxchxz_model->where("account=$x_account")->delete();
		}
	   }
	}
	//处理部门的限制
	for($i=0;$i<count($_POST['arrBMPD']);$i++)
	{
	  $apartment=$_POST['arrBMPD'][$i]['depart'];
	  $check=$_POST['arrBMPD'][$i]['check'];
	  $yxchxz_info=$yxchxz_model->where("account=$apartment")->find();
	  $status.="部门".$apartment."为".$check;
	  if(empty($yxchxz_info) && $check==1)
	  {
	    //勾选了但原来没有则添加到限制里面
		//$status.="部门".$apartment."勾选".$check;
		unset($data);
		$data['account']=$apartment;
		$yxchxz_model->add($data);
	  }
	  if(!empty($yxchxz_info) && $check==0)
	  {
	    //原来有的但取消了勾选则从限制表里面删除
		//$status.="部门".$apartment."取消勾选".$check;
		$yxchxz_model->where("account=$apartment")->delete();
	  }
	}
	$arr=Array(
	  'status'=>$status.$_POST['arrBMPD'][0]['check'],
	);
	echo $this->_encode($arr);
  }
  //将下面的激活函数浓缩在一起
  public function funcinitall()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
    //对传过来的时间进行判断,看看数据库里是否已经激活过该时间了
	$arrTime=$this->getTime();
	$year=$arrTime['year'];
	$month=$arrTime['month'];
	$gszp_model=new Model("Gszp");
	$flag=1;
	//判断时间是否合理
	if(empty($year)||empty($month))
	  $this->redirect('Perform/index'); 
	//干事自评表，部长自评表，干事考核表，部长考核表，部门考核表该月份必须为空
	$gszp_info=$gszp_model->where("year=$year and month=$month")->select();
	if(empty($gszp_info))
	  $flag=0;
	$bzzp_info=$bzzp_model->where("year=$year and month=$month")->select();
	if(empty($bzzp_info))
	  $flag=0;
	$gskh_info=$gskh_model->where("year=$year and month=$month")->select();
	if(empty($gskh_info))
	  $flag=0;
	$bmkh_info=$bmkh_model->where("year=$year and month=$month")->select();
	if(empty($bmkh_info))
	  $flag=0;
	if($flag==1){
	  $this->funcyjjh();
	  $this->funcinitbmty();
	  $this->funcinitgsfk();
	  $this->funcinitbzfk();
	  $this->funcinitbmfk();
	  $this->funcinityxbz();
	  $this->funcinitwdcs();
	}
	else{
	  echo "该月份已经激活了，请不要重复操作</br>";
	}
	//向前端返回status信息
  }



//初始化工作
  //时间获取函数
  private function funcsettime()
  {
/*     $year=2014;//$_POST['year'];
	$month=9;//$_POST['month']; */
	$year=$_POST['year'];
	$month=$_POST['month'];
	$arr=Array(
	  'year'=>$year,
	  'month'=>$month,
	);
	return $arr;
  }
  //删除某年某月绩效考核
  private function unsetPerform()
  {
	$arr=$this->funcsettime();
/* 	$year=$arr['year'];
	$month=$arr['month'];	 */
	$year=2014;
	$month=10;
	$control_model=new Model("Control");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$tuiyou_model=new Model("Tuiyou");
	$evaluate_model=new Model("Evaluate");	
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$wdcs_model=new Model("Wdcs");
	$chuqin_model=new Model("Chuqin");
	$diaoyan_model=new Model("Diaoyan");
	$qt_model=new Model("Qt");
	$gsfk_model=new Model("Gsfk");
	$bzfk_model=new Model("Bzfk");
	$bmfk_model=new Model("Bmfk");
	$yxchxz_model=new Model("Yxchxz");
	$bmwg_model=new Model("Bmwg");
	$yxbzhx_model=new Model("Yxbzhx");
	$yxbz_model=new Model("Yxbz");
	//干事部分
	$gszp_model->where("year=$year and month=$month")->delete();
	$interact_model->where("year=$year and month=$month")->delete();
	$tuiyou_model->where("year=$year and month=$month")->delete();
	$evaluate_model->where("year=$year and month=$month")->delete();
	$control_model->where("year=$year and month=$month")->delete();
	//部长部分
	$bzzp_model->where("year=$year and month=$month")->delete();
	$gskh_model->where("year=$year and month=$month")->delete();
	//主席部分
	$bzkh_model->where("year=$year and month=$month")->delete();
	$bmkh_model->where("year=$year and month=$month")->delete();
	//外调次数
	$wdcs_model->where("year=$year and month=$month")->delete();
	//出勤统计
	$chuqin_model->where("year=$year and month=$month")->delete();
	//调研采纳
	$diaoyan_model->where("year=$year and month=$month")->delete();
	//其他情况
	$qt_model->where("year=$year and month=$month")->delete();
	//反馈
	$gsfk_model->where("year=$year and month=$month")->delete();
	$bzfk_model->where("year=$year and month=$month")->delete();
	$bmfk_model->where("year=$year and month=$month")->delete();
	//优秀称号限制
	$yxchxz_model->where("year=$year and month=$month")->delete();
	//部门违规
	$bmwg_model->where("year=$year and month=$month")->delete();
	//候选，优秀部长
	$yxbzhx_model->where("year=$year and month=$month")->delete();
	$yxbz_model->where("year=$year and month=$month")->delete();
	echo $year."年".$month."月的绩效考核数据删除完毕，可以重新启动该月份的绩效考核</br>";
  }
  //考核系统初始化阶段一
  public function initPerform()
  {
 	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index');
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];	  
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	//根据tbl_authority判断，若时间已经存在拒绝访问
	//干事自评表，部长自评表，干事自评表，部长考核表，部门考核表
	//开始一次绩效考核需要满足下面的条件：基本成员信息要求、该时间未考核过、系统不存在未结束的考核
	$authority_model=new Model("Authority");
	$flagInitPerform=1;
	$authority_info=$authority_model->find();
	if($authority_info['is_init']!=1)
		$flagInitPerform=0;
	$control_model=new Model("Control");
	$control_info=$control_model->where("year=$year and month=$month")->find();
	if(!empty($control_info['id']))
		$flagInitPerform=0;
	$control_info=$control_model->where("is_over=0||is_yxbz=0")->select();
	if(count($control_info)>0)
		$flagInitPerform=0;
	if($flagInitPerform==0)
	{
		//echo "本次考核不满足开启条件</br>";
		return false;
	}
	//echo "即将进行各项初始化工作，耐心等待</br>";
	unset($data);
	$data['year']=$year;
	$data['month']=$month;
	$data['beginstamp']=time();
	$control_info=$control_model->add($data);
	$this->funcyjjh();
 	$this->funcinitbmty();
	$this->funcinitwdcs();
	$this->funcinitchuqin();
	$this->funcinitdiaoyan();
	$this->funcinitqtqk();
	$this->funcinitgsfk();
	$this->funcinitbzfk();
	$this->funcinitbmfk();
	$this->funcinityxchxz(); 
	$this->funcinitbmwg();
	return true;
	//echo "完毕</br>";
  } 
  //绩效考核初始化第一阶段，包括：干事自评表，部长自评表，干事考核表，部长考核表，部门考核表
  private function funcyjjh()
  {
    //设置年月
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    //一键激活数据库表，包括：
	$person_model=new Model("Person");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$tuiyou_model=new Model("Tuiyou");
	$evaluate_model=new Model("Evaluate");
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$president_model=new Model("President");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$oneway_model=new Model("Oneway");
	$bmty_model=new Model("Bmty");
	//echo "干事初始化开始</br>";
	//找出所有干事
	$person_info=$person_model->where("type=1 or type=2")->select();
	foreach($person_info as $v)
	{
	  $account=$v['account'];
	  //基本信息
	  $apartment=$v['apartment'];
	  unset($data);
	  $data['account']=$account;
	  $data['apartment']=$v['apartment'];
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['zptext']="空";
	  //干事自评表，每个部门的干事都要初始化
	  $gszp_info=$gszp_model->add($data);
	  //if(!$gszp_info)
	    //echo $account."干事自评表初始化出错</br>";
	  //干事推优干事
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$v['apartment'];
	  $data['wtype']=$v['type'];
	  $data['rapartment']=$v['apartment'];
	  $data['rtype']=$v['type'];
	  $data['text']="空";
	  $tuiyou_info=$tuiyou_model->add($data);
	 // if(!$tuiyou_info)
	   // echo $account."干事推优干事初始化出错</br>";
	  //对本部门的留言
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$v['apartment'];
	  $data['wtype']=$v['type'];
	  $data['raccount']=$v['apartment'];
	  $data['text']="空";
	  $interact_info=$interact_model->add($data);
	  //if(!$interact_info)
	   // echo $account."干事对部门留言初始化出错</br>";
	  //干事对部长的评分
	  //找出所有部长
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
        unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$v['apartment'];
	    $data['wtype']=$v['type'];
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$v['apartment'];
	    $data['rtype']=3;
		$data['text']="空";
		$data['nm']=1;
		$evaluate_info=$evaluate_model->add($data);
		//判断是否添加成功
		//if(!$evaluate_info)
		  //echo $account."干事对部长的评价初始化失败"."</br>";
	  }
	  
	}
	//echo "干事初始化完成</br>";
	//干事初始化完成
 	//找出所有部长
	//echo "部长初始化开始</br>";
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  //基本信息
	  $apartment=$v['apartment'];
	  $account=$v['account'];
	  //部长自评表
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['zptext']="空";
	  $bzzp_info=$bzzp_model->add($data);
	  //if(!$bzzp_info)
	    //echo $account."的部长自评初始化失败";
	  //该部长对本部门其他部长的评价
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
	    if($v_bz['account']==$v['account'])
		  continue;
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=3;
		$data['nm']=1;
		$data['text']="空";
		$evaluate_info=$evaluate_model->add($data);
		//if(!$evaluate_info)
		  //echo $account."部长对本部门其他部长的评价失败";
	  }

	  //该部长对其主管副主席的评价
	  //找出主管副主席
	  $president_info=$president_model->select();
	  //目标部门"|3"
	 
	  $apartment_tar="|".$apartment;
	  for($k=0;$k<count($president_info);$k++)
	  {
		if(false==strstr($president_info[$k]['apartment'],$apartment_tar))
			continue;
		else{
			$zg_account=$president_info[$k]['account'];
			break;
		}
	  }
	  //echo $account."主管副主席是：".$zg_account."</br>";
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zg_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
      $interact_info=$interact_model->add($data);	
	  //if(!$interact_info)
	    //echo $account."对主管副主席评价初始化失败</br>";
	  //对所有主席团的匿名留言
	  $person_info_zxt=$person_model->where("type=4")->select();
	  foreach($person_info_zxt as $v_zxt)
	  {
	    $zxt_account=$v_zxt['account'];
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zxt_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
	  $data['nm']=1;
	  $interact_info=$interact_model->add($data);	
	  //if(!$interact_info)
	    //echo $account."主席团成员匿名评价初始化失败</br>";
	  }
      //干事考核表，对部门所有干事的给分
      //找出该部长所有的干事
      $person_info_gs=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
      foreach($person_info_gs as $v_gs)
      {
	    //给干事打分
	    unset($data);
	    $data['year']=$year;
	    $data['month']=$month;	
	    $data['waccount']=$account;	
	    $data['wapartment']=$apartment;
        $data['raccount']=$v_gs['account'];				
		$gskh_info=$gskh_model->add($data);
		//if(!$gskh_info)
		  //echo $account."对干事考核初始化失败</br>";
		//对干事评价
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_gs['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=$v_gs['type'];
		$data['text']="空";
		$interact_info=$interact_model->add($data);
		//if(!$interact_info)
		  //echo $account."对干事评价初始化失败</br>";
	  }	  
	}
	//echo "部长初始化完成</br>";
	//部长初始化完成 
 	//找出所有主席团成员
	//echo "主席团初始化开始</br>";
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];
	  $president_info=$president_model->where("account=$account")->find();
	  $apartmentArr=explode("|",$president_info['apartment']);

	    if($president_info['is_sub']=='y')//一般主管副主席
		{
		  
		  for($k=0;$k<count($apartmentArr);$k++)
		  {
			$apartment_tar=$apartmentArr[$k];
			if($apartment_tar!=0)
		   {
		    $person_info_bz=$person_model->where("apartment=$apartment_tar and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //对部长进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_tar;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			 // if(!$bzkh_info)
			    //echo $account."对部长评分初始化失败</br>";
			  //进行对部长进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_tar;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			 // if(!$interact_info)
			    //echo $account."对部长评价初始化失败</br>";
			}
			//对部门1进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_tar;
			$data['year']=$year;
			$data['month']=$month;
			$data['text']="空";
			$bmkh_info=$bmkh_model->add($data);
			//if(!$bmkh_info)
			  //echo $account."对部门考核初始化失败</br>";
		  }
		  }
	
		  
		
		}
		else//主席
		{
		  //对管辖内的部长进行评分评价
		  for($k=0;$k<count($apartmentArr);$k++)
		  {
			$apartment_tar=$apartmentArr[$k];
			if($apartment_tar!=0)
		   {
		    $person_info_bz=$person_model->where("apartment=$apartment_tar and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //对部长进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_tar;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			 // if(!$bzkh_info)
			    //echo $account."对部长评分初始化失败</br>";
			  //进行对部长进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_tar;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			 // if(!$interact_info)
			    //echo $account."对部长评价初始化失败</br>";
			}
			//对部门1进行考核
			unset($data);
		  }
		  }
		  //对11个部门进行考核
		  //echo $account."</br>";
		  for($i=1;$i<=11;$i++)
		  {
			//对部门$i进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$i;
			$data['year']=$year;
			$data['month']=$month;		
			$data['text']="空";
			$bmkh_info=$bmkh_model->add($data);
			//if(!$bmkh_info)
			  //echo $account."对部门考核初始化失败</br>";
		  }
	  }
	
    }
    //echo "主席团初始化完成</br>";   
  } 
  //绩效考核初始化第一阶段，主席团的部门推优
  private function funcinitbmty()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	//echo "主席团的部门推优初始化开始</br>";
	//找出所有主席团成员
	$person_model=new Model("Person");
	$tuiyou_model=new Model("Tuiyou");
	$person_info=$person_model->where("type=4")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];
	  //不管是不是主席，都得对非主管部门推优
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=12;
	  $data['wtype']=4;
	  $data['text']="空";
	  $tuiyou_info=$tuiyou_model->add($data);
	  //if(!$tuiyou_info)
	    //echo $account."对非主管部门推优初始化失败</br>";
	}
	//echo "主席团的部门推优初始化完成</br>";
  }
  //绩效考核初始化第一阶段，成该月份的干事反馈表
  private function funcinitgsfk()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
    $gsfk_model=new Model("Gsfk");
    //找到所有的干事
    //echo "干事反馈表初始化开始</br>";
    $person_info=$person_model->where("type=1 or type=2")->select();
    foreach($person_info as $v)
    {
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$v['account'];
	  $gsfk_info=$gsfk_model->add($data);
	  //if(!$gsfk_info) 
	   //echo $v['account']."干事反馈初始化失败</br>";
    }
   // echo "干事反馈表初始化结束</br>";
  }
 //绩效考核初始化第一阶段，该月份的部长反馈表
  private function funcinitbzfk()
  {
    //echo "部长反馈表初始化开始</br>";
    //找出所有的部长
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	$person_model=new Model("Person");
	$bzfk_model=new Model("Bzfk");
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$bz_account;
	  $bzfk_info=$bzfk_model->add($data);
	 // if(!$bzfk_info)
	    //echo $data['account']."部长反馈表初始化失败</br>";
	}
	//echo "部长反馈表初始化完成</br>";
  }
  //绩效考核初始化第一阶段，该月份的部门反馈表
  private function funcinitbmfk()
  {
	//echo "部门反馈表初始化开始";
   $arr=$this->funcsettime();
	$year=$arr['year'];	
	$month=$arr['month'];
   //echo "部门反馈表初始化开始</br>";
   $bmfk_model=new Model("Bmfk");
   //找出11个部门
   for($i=1;$i<=11;$i++)
   {
     unset($data);
	 $data['year']=$year;
	 $data['month']=$month;
	 $data['apartment']=$i;
	 $bmfk_info=$bmfk_model->add($data);
	// if(!$bmfk_info)
	   //echo $i."部门反馈表初始化失败</br>";
   }
  // echo "部门反馈表初始化结束</br>";
  }

  //绩效考核初始化第一阶段，该月的外调次数表
  private function funcinitwdcs()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
   $wdcs_model=new Model("Wdcs");
   $person_model=new Model("Person");
   //echo "外调次数初始化开始</br>";
   //每个部门的干事、部长初始化
   for($i=1;$i<=12;$i++)
   {
     $person_info=$person_model->where("apartment=$i")->select();
	 foreach($person_info as $v)
	 {
	   unset($data);
	   $data['year']=$year;
	   $data['month']=$month;
	   $data['account']=$v['account'];
	   $wdcs_info=$wdcs_model->add($data);
	  // if(!$wdcs_info)
	     //echo $data['account']."外调次数初始化失败</br>";
	 }
   }
   //echo "外调次数初始化结束</br>";
  }
  //绩效考核初始化第一阶段，该月的出勤统计
  private function funcinitchuqin()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	$person_model=new Model("Person");
	$chuqin_model=new Model("Chuqin");
	$rlgj_model=new Model("Rlgj");
	//echo "出勤统计初始化开始</br>";
	//共11个部门，根据跟进干事记录各部门的出勤情况
    for($i=1;$i<=11;$i++)
	{
	  $rlgj_info=$rlgj_model->where("apartment=$i")->find();
	  $rlgs_account=$rlgj_info['account'];
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$rlgs_account;
		$data['raccount']=$v['account'];
		$data['rapartment']=$i;
		$chuqin_info=$chuqin_model->add($data);
		//if(!$chuqin_info)
		  //echo "出勤表初始化失败</br>";
	  }
	}
	//echo "出勤统计初始化结束</br>";
  }
  //绩效考核初始化第一阶段，该月的调研采纳统计
  private function funcinitdiaoyan()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
	$diaoyan_model=new Model("Diaoyan");
	$rlgj_model=new Model("Rlgj");
	//echo "调研采纳初始化开始</br>";
	//找出11个部门的干事和部长
	for($i=1;$i<=11;$i++)
	{
	  //找到跟进的干事
	  $rlgj_info=$rlgj_model->where("apartment=$i")->find();
	  $rlgs_account=$rlgj_info['account'];
	  $person_info=$person_model->where("apartment=$i")->select();
	  foreach($person_info as $v)
	  {
	    unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$data['waccount']=$rlgs_account;
		$data['raccount']=$v['account'];
		$data['rapartment']=$i;
		$diaoyan_info=$diaoyan_model->add($data);
		//if(!$diaoyan_info)
		  //echo "调研采纳初始化失败</br>";
	  }
	}
	//echo "调研采纳初始化结束</br>";
  }
  //绩效考核初始化第一阶段，其他情况加分表
  private function funcinitqtqk()
  {
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
    $person_model=new Model("Person");
	$qt_model=new Model("Qt");
	//echo "其他情况加减分初始化开始</br>";
	//找到所有的干事、部长
	$person_info=$person_model->where("(type=1 or type=2) or type=3")->select();
	foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$gs_account;
	  $data['text']="空";
	  $qt_info=$qt_model->add($data);
	 // if(!$qt_info)
	    //echo "其他情况加分表初始化失败</br>";
	}
	//找到所有部门
	for($i=1;$i<=11;$i++)
	{
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$i;
	  $data['text']="空";
	  $qt_info=$qt_model->add($data);
	 // if(!$qt_info)
	    //echo "其他情况加分表初始化失败</br>";
	}
	//echo "其他情况加减分初始化结束</br>";
  }
  //绩效考核初始化第一阶段，部门违规扣分表
  private function funcinitbmwg()
  {
	//echo "部门违规初始化开始</br>";
	$arr=$this->funcsettime();
	$year=$arr['year'];
	$month=$arr['month'];
	//找到所有人力干事
	$person_model=new Model("Person");
	$bmwg_model=new Model("Bmwg");
	$bmwgfzr_model=new Model("Bmwgfzr");
	for($j=1;$j<7;$j++)
	{
		unset($data);
		$data['year']=$year;
		$data['month']=$month;
		$bmwgfzr_info=$bmwgfzr_model->where("type=$j")->find();
		$data['account']=$bmwgfzr_info['account'];
		$data['type']=$j;
		for($i=1;$i<12;$i++)
		{
			$data['apartment']=$i;
			$data['wgkf']=0;
			$data['text']="空";
			$bmwg_info=$bmwg_model->add($data);
			//if(false==$bmwg_info)
				//echo "部门违规初始化失败</br>";
		}
	}
	//echo "部门违规初始化结束</br>";
  }
  //绩效考核初始化第一阶段，上月的优秀某某限定表
  private function funcinityxchxz()
  {
    //获取上次考核的时间
	$arr=$this->funcgettime();
	if(false==$arr)
	{
		return;
	}
	$lastyear=$arr['year'];
	$lastmonth=$arr['month'];
	$person_model=new Model("Person");
	$gsfk_model=new Model("Gsfk");
	$bzfk_model=new Model("Bzfk");
	$bmfk_model=new Model("Bmfk");
	$yxchxz_model=new Model("Yxchxz");
	//echo "限定表初始化开始</br>";
	//先删除
	$yxchxz_model->where("id>0")->delete();
    //获取上次考核的优秀干事
	$gsfk_info=$gsfk_model->where("(year=$lastyear and month=$lastmonth) and yxgs=1")->select();
	foreach($gsfk_info as $v)
	{
	  $gs_account=$v['account'];
	  unset($data);
	  $data['account']=$gs_account;
	  $yxchxz_info=$yxchxz_model->add($data);
	 // if(!$yxchxz_info)
	    //echo "优秀干事限定初始化失败</br>";
	}
	//获取上次考核的优秀部长
	$bzfk_info=$bzfk_model->where("(year=$lastyear and month=$lastmonth) and yxbz=1")->select();
    foreach($bzfk_info as $v)
	{
	  $bz_account=$v['account'];
	  unset($data);
	  $data['account']=$bz_account;
	  $yxchxz_info=$yxchxz_model->add($data);
	  //if(!$yxchxz_info)
	     //echo "优秀部长限定初始化失败</br>";
	}
	//获取上次考核的优秀部门
	$bmfk_info=$bmfk_model->where("(year=$lastyear and month=$lastmonth) and yxbm=1")->select();
    foreach($bmfk_info as $v)
	{
	  unset($data);
	  $data['account']=$v['apartment'];
	  $yxchxz_info=$yxchxz_model->add($data);
	  //if(!$yxchxz_info)
        //echo "优秀部门限定初始化失败</br>";
	}
	//echo "优秀部长限定初始化结束</br>";
  }
 
  //函数，获取上月考核月份
  private function funcgettime()
  {
	$control_model=new Model("Control");
	$control_info=$control_model->find();
	if(empty($control_info['month'])||empty($control_info['year']))
	{
		//echo "没有任何关于绩效考核的数据</br>";
		return false;
	}
	$month=$control_info['month'];
	$year=$control_info['year'];
	$timeBase=mktime(0,0,0,$month,15,$year);
	$control_info=$control_model->where("year!=$year and month!=$month")->select();
	foreach($control_info as $v)
	{
		$month=$v['month'];
		$year=$v['year'];
		$time=mktime(0,0,0,$month,15,$year);
		if($time>$timeBase)
			$timeBase=$time;
	}
	$date=getdate($timeBase);
	$arr=Array(
		'year'=>$date['year'],
		'month'=>$date['mon'],
	);
	return $arr;
  }
 
  }
?>