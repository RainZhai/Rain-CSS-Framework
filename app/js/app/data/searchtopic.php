<?php 
    header('Content-Type:text/json;charset=utf-8');
$str = array(
    'showimg' =>true,
    'url' => '#/topic1',
    'imgurl' => 'images/t1.jpg',
    'name' => '双十一，游戏也来年终大促！',
    'date' => '2014-11-11',
    'intro' => '游戏年终大促，双11敢玩赶送！手机、京东购物卡、话费拿到你手软！不玩？小心后悔剁手啊',
    'list'=>array(
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
    echo $jsonencode;
?>