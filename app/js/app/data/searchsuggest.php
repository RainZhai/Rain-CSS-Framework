<?php 
    header('Content-Type:application/javascript;charset=utf-8');
	$str = array
       (
          'gamelist'=>array(
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/gg/index.html',
		'imgurl'=>'http://wande.me/game/images/gameicons-2.jpg',
		'name'=>'帅哥爱消除',
		'intro'=>'一款帅哥消除游戏',
		'start'=>'开始游戏'
	), 
	
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/mm/index.html',
		'imgurl'=>'http://wande.me/game/images/gameicons-3.jpg',
		'name'=>'美女爱消除',
		'intro'=>'一款美女消除游戏',
		'start'=>'开始游戏'
	), 
	
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/demo/game.html',
		'imgurl'=>'http://wande.me/game/images/gameicons-4.png',
		'name'=>'松鼠蹦蹦蹦',
		'intro'=>'松鼠蹦起来顶松子',
		'start'=>'开始游戏'
	), 
	
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/game/2048',
		'imgurl'=>'http://wande.me/game/images/gameicons-8.jpg',
		'name'=>'2048',
		'intro'=>'一款停不下来的游戏',
		'start'=>'开始游戏'
	), 
	
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/game/Flappy2048/',
		'imgurl'=>'http://wande.me/game/images/gameicons-8.jpg',
		'name'=>'Flappy2048',
		'intro'=>'2048升级版',
		'start'=>'开始游戏'
	), 
	
		array(
		'showimg'=>true,
		'url'=>'http://wande.me/game/Flappy2048/',
		'imgurl'=>'http://wande.me/game/images/gameicons-8.jpg',
		'name'=>'Flappy2048',
		'intro'=>'2048升级版',
		'start'=>'开始游戏'
	)
		), 
		'btnText'=>'换一批'
       );

	$jsonencode = json_encode($str);
	echo "var data =".$jsonencode;
?>