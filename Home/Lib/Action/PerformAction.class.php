<?php
//绩效考核控制器
class PerformAction extends Action
{
  //绩效考核首页
  public function index()
  {
    $this->display();
  }
  //是否过了填表时间的判断
  public function check()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index');  
	//判断状态status,默认为0，表示不能编辑，当为1时则可以编辑
	$status=0;
	//获取当前时间
	$year=date("Y");
    //获取当前的月份，数字，1，或者23
    $month = date("n");
    $day=date("j");
    //20号到24号允许访问
	//获取数据库表tbl_authority,验证当前是否可写
	$auth_model=new Model("Authority");
	$auth_info=$auth_model->where("year=$year and month=$month")->find();
	if($auth_info['active']=='y'&& (20<=$day&&$day<=24))
	  $status=1;
	//根据传送过来的表的id，决定要生成那些数据返回
	$table_id=1;//$_GET['table_id'];
	switch($table_id)
	{
	  case "1":$table_info=$this->gszp($status);break;
	}
	$arr=Array('status'=>$status,);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }
  //干事自评表
  public function funcgszp()
  {
    
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status 	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
	//获得类型，部门
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	//var_dump($person_info);
	$type=$person_info['type'];
	//var_dump($type);
	$apartment=$person_info['apartment'];
    //除己之外干事
	$person_model=new Model("Person");
	$person_info=$person_model->where("(apartment=$apartment and type=$type) && account!=$account")->select();
     
	foreach($person_info as $v)
	{
	  $arr_TongShi[]= Array('name'=>$v['name'],'account'=>$v['account']);	  
	}
    //echo json_encode($arr_TongShi,JSON_UNESCAPED_UNICODE);
	//获取推优干事账号，名字，推优理由（该年该月，谁对谁）
	$interact_model=new Model('Interact');
	
	$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and rtype=$type) ")->find();
	$tygs_account=$interact_info['raccount'];
	$tygs_tyly=$interact_info['text'];
	//var_dump($tygs_account);
	$person_info=$person_model->where("account=$tygs_account")->find();
	//var_dump($person_info);
	$tygs_name=$person_info['name'];
	//var_dump($tygs_name);
	$arr_tygs=Array('account'=>$tygs_account,'tygs'=>$tygs_name,'tyly'=>$tygs_tyly);	
	//echo json_encode($arr_tygs,JSON_UNESCAPED_UNICODE);
	//获取部长级的姓名，账号，得分，评价
	$person_info=$person_model->where("apartment=$apartment and type!=$type")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  $bz_name=$v['name'];
	  $interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$bz_account)")->find();
	  $bz_pj=$interact_info['text'];
	  $bz_df=$interact_info['DF'];
	  $arr_DBZPJ[]=Array('account'=>$bz_account,'name'=>$bz_name,'fs'=>$bz_df,'pj'=>$bz_pj);
	}
	//echo json_encode($arr_DBZPJ,JSON_UNESCAPED_UNICODE);
	//按照当前账号找出干事自评表的信息
	$gszp_model=new Model("Gszp");
	$gszp_info=$gszp_model->where("account=$account and (year=$year and month=$month)")->find();
    //var_dump($gszp_info);
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
	$arrDF[]=Array('df'=>$gszp_info['DF10'],);
	$arrDF[]=Array('df'=>$gszp_info['DF11'],);
	$arrDF[]=Array('df'=>$gszp_info['DF12'],);

	

	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'DF'=>$arrDF,
	  'zongfen'=>$gszp_info['total'],
	  'zwpj'=>$gszp_info['zptext'],	  
	  'TongShi'=>$arr_TongShi,
	  'TYGS'=>$arr_tygs,
	  'DBZPJ'=>$arr_DBZPJ,  
	);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	
	
  }
  //干事考核表
  //暂时忽略部门特色这一节
  public function funcgskh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
	//获取部门，类型
	$person_model=new Model("Person");
	//echo $account;
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];
	$person_info=$person_model->where("apartment=$apartment and type!=$type")->select();
	//获取干事得分
	$interact_model=new Model("Interact");
	$gskh_model=new Model("Gskh");
	foreach($person_info as $v)
	{
	  $gs_account= $v['account']; 
	  $gs_name= $v['name'];
	  //$interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$gs_account)")->find();
	  //echo $interact_info['waccount'].$interact_info['raccount'].$interact_info['text'].$interact_info['DF']."</br>";
	  $gskh_info=$gskh_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$gs_account)")->find();
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
		'df9'=>$gskh_info['DF10'],
		'df10'=>$gskh_info['DF11'],
		'df11'=>$gskh_info['DF12'],
		'df12'=>$gskh_info['DF13'],
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
	  $interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$gs_account)")->find();
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
	//生成将要返回的json数组
	$arr=Array(
	  'status'=>$status,
	  'bmts'=>$strBMTS,
	  'arrGSDF'=>$arrGSDF,
	  'arrDGSPJ'=>$arrDGSPJ,
	);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }
  //部长自评表
  public function funcbzzp()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
	//获取部门，类型
	$person_model=new Model("Person");
	//echo $account;
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];  
	//获取总分
	$bzzp_model=new Model("Bzzp");
	$interact_model=new Model("Interact");
	$bzzp_info=$bzzp_model->where("(year=$year and month=$month) and (waccount=$account)")->find();
    $zongfeng=$bzzp_info['total'];
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
	$arrDF[]=Array('df'=>$bzzp_info['DF13'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF14'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF15'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF16'],);
	$arrDF[]=Array('df'=>$bzzp_info['DF17'],);
  //echo json_encode($arrDF,JSON_UNESCAPED_UNICODE);
  //获取自我评价
  $zwpj=$bzzp_info['zptext'];
  //echo $zwpj;
  //找出本部门其他部长
  $person_info=$person_model->where("(apartment=$apartment and type=$type) and account!=$account")->select();
  foreach($person_info as $v)
  {
    $ts_account=$v['account'];
	$ts_name=$v['name'];
    $interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$ts_account)")->find();
    $arrDQTBZPJ[]=Array(
	  'account'=>$ts_account,
	  'name'=>$ts_name,
	  'fs'=>$interact_info['DF'],
	  'pj'=>$interact_info['text'],
	);
 }
 //人数
 $ts_count=count($person_info);
 //找出对主管副主席评价
 $president_model=new Model("President");
 $president_info=$president_model->where("apartment1=$apartment or apartment2=$apartment")->find();
 $zg_account=$president_info['account'];
 $interact_info=$interact_model->where("(year=$year and month=$month) and (waccount=$account and raccount=$zg_account)")->find();
 $dzgfzxpj=$interact_info['text'];
 //生成将要返回的json数组
 $arr=Array(
   'zongfeng'=>$zongfeng,
   'status'=>$status,
   'arrDF'=>$arrDF,
   'zwpj'=>$zwpj,
   'DQTBZPJ'=>
   Array(
   'sum'=>$ts_count,
   'arrBZ'=>$arrDQTBZPJ),
   'dzgfzxpj'=>$dzgfzxpj,
 );
 echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  }
  //部长考核表（前段有质疑，暂时留着）
  public function funcbzkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
	//获取部门，类型
	$person_model=new Model("Person");
	//echo $account;
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];   
	//判断是否为主席，还是副主席
	$president_model=new Model("President");
	$interact_model=new Model("Interact");
	$bzkh_model=new Model("Bzkh");
	$president_info=$president_model->where("account=$account")->find();
    $sub=$president_info['is_sub'];
	//如果是副主席，找到两个部门
	if($sub=='y')
	{
	  $apartment1=$president_info['apartment1'];
	  $apartment2=$president_info['apartment2'];
	  //找到部门apartment1的部长信息
      $arrBZ=$this->getarrBZ($account,$apartment1);
	  //echo json_encode($arrBZ,JSON_UNESCAPED_UNICODE);
	  //生成第一个部门信息
	  $arrBM[]=Array(
	    'bm'=>$apartment1,
		'arrBZ'=>$arrBZ,
	  );	  
	  //找到部门apartment2的部长信息
      $arrBZ=$this->getarrBZ($account,$apartment2);  
	  //生成第二个部门信息
	  $arrBM[]=Array(
	    'bm'=>$apartment2,
		'arrBZ'=>$arrBZ,
	  );
	// echo json_encode($arrBM,JSON_UNESCAPED_UNICODE);
	}
	  
	else
	{
	  //主席要负责总共11个部门的信息
	 $arrBZ=$this->getarrBZ($account,1);
	// 
	 for($i=1;$i<=2;$i++)
	 {
	   $arrBZ=$this->getarrBZ($account,$i);
	 }
	}
	//生成将要返回的json数组
	$arr=Array(
      'status'=>$status,
	  'arrBM'=>$arrBM,
	);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	
  }
  //部门考核表
  public function funcbmkh()
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
	//获取部门，类型
	$person_model=new Model("Person");	//echo $account;
	$person_info=$person_model->where("account=$account")->find();
	$type=$person_info['type'];
	$apartment=$person_info['apartment'];   
	//获取该主席所主管的部门信息
	$interact_model=new Model("Interact");
	$president_model=new Model("President");
	$bmkh_model=new Model("Bmkh");
	$president_info=$president_model->where("account=$account")->select();
	foreach($president_info as $v)
	{
	  $zg_apartment=$v['apartment1'].$v['apartment2'];
	}
	
  }
  //函数，判断只读状态还是读写状态
  public function getStatus()
  {
	//判断状态status,默认为0，表示不能编辑，当为1时则可以编辑
	$status=1;
	//获取当前时间
	$year=date("Y");
    //获取当前的月份，数字，1，或者23
    $month = date("n");
    $day=date("j");
    //20号到24号允许访问
	//获取数据库表tbl_authority,验证当前是否可写
	$auth_model=new Model("Authority");
	$auth_info=$auth_model->where("year=$year and month=$month")->find();
	if($auth_info['active']=='y'&& (20<=$day&&$day<=24))
	  $status=0;
	return $status;
  }
  //在部长考核表中，需要根据主席团的 account,主管的部门 apartment,来生成arrBZ,
  //由于数量巨多，采用函数的方式解决
  public function getarrBZ($account,$apartment)
  {
	//拒绝未登录访问
	session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
    //获取授权状态 status	  
	$status=$this->getStatus();
	//账号，时间
	$account=$_SESSION['account'];
	$year=date("Y");
	$month = date("n");
      //找到该本门部长
	  $person_model=new Model("Person");
	  $bzkh_model=new Model("Bzkh");
	  $person_info=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info as $v)
	  {

	    $bz_account=$v['account'];
	    $bz_name=$v['name'];
	    $bzkh_info=$bzkh_model->where("(year=$year and month=$month) and (raccount=$bz_account)")->find();
	    $arrBZ[]=Array(
		  'account'=>$bz_account,
		  'bzmz'=>$bz_name,
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
		  'df10'=>$bzkh_info['DF11'],
		  'df11'=>$bzkh_info['DF12'],
		  'df12'=>$bzkh_info['DF13'],
		  'df13'=>$bzkh_info['DF14'],
		  'df14'=>$bzkh_info['DF15'],
		);
	  }    
	  return $arrBZ;
  }  
  
}
?>