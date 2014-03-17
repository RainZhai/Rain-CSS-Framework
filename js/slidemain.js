require.config({
    "baseUrl": "./js/",
    paths: {
        jquery: 'jquery-1.7.2',
        util:'util',
        slide: 'slide'
    },
    shim : {
        'util' : {
            deps : ['jquery'],
            exports : 'util'
        },
        'slide' : {
            deps : ['jquery'],
            exports : '$.slide'
        }
    },
    priority: ['jquery']
});
require(['jquery','util','slide'], function ($,util,slide){
    $(function () {
        new $.slide({
            hook: '#slide',  //滑动的块
            src: ['images/figure1.jpg', 'images/figure2.jpg', 'images/figure3.jpg', 'images/figure4.jpg', 'images/figure5.jpg'],    //图片的src
            alt: ['1111', '2222', '3333', '4444', '5555'],  //图片的alt
            text: ['1111', '2222', '3333', '4444', '5555'], //图片的text
            fix: false,  //是否固定大小
            width: 320, //宽
            height: 195, //高
            images: 3,  //展示图片的格式
            slides: 1,  //每次滑动图片个数
            length: 40, //触屏最小滑动长度
            control: false, //是有控制按钮
            loop: true, //是否是无缝轮播
            auto: true, //自动轮播
            speed: 800, //滑动速度
            delay: 2000 //滚动间隔
        });
    });
});

