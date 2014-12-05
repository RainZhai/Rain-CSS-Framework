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
		)
		)
       );

	$jsonencode = json_encode($str);
	echo "var data =".$jsonencode;
?>