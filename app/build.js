({
    appDir: './',
    baseUrl: './js',
    dir: './dist',
    modules: [{
        name: 'main'
    }],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: 'lib/jquery-1.7.2.min',
        html: 'lib/freehtml.min',
        template: 'lib/template',
        swipe: 'lib/swipe.min', 
        slide: 'lib/slide.min' , 
        util:  'lib/util.min' , 
        headview: 'app/view/head',
        footview: 'app/view/foot' ,
        navview: 'app/view/nav' ,
        commondata: 'app/data/common', 
        searchheadview: 'app/view/searchHead',
        searchmainview: 'app/view/searchMain', 
        listview: 'app/view/list',
        cateview: 'app/view/category', 
        catedata: 'app/data/category', 
        topicview: 'app/view/topic', 
        topicdetailview: 'app/view/topicdetail',
        gamepicview: 'app/view/gamepic', 
        gamepicdetailview: 'app/view/gamepicdetail', 
        wplistview: 'app/view/wplist',
        wpgamelistview: 'app/view/wpgamelist',
        wplistdetailview: 'app/view/wplistdetail'
    },
    shim: {
        'util': {
            deps: ['jquery'],
            exports: 'util'
        },
        'swipe': {
            deps: ['jquery'],
            exports: 'swipe'
        },
        'slide': {
            deps: ['jquery','util'],
            exports: 'slide'
        }
    }
})