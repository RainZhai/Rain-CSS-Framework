require.config({
    "baseUrl": "./js/",
    paths: {
        jquery: 'jquery-1.7.2',
        checkbox: 'checkbox',
        group: 'jquery.group'
    },
    shim: {
        'checkbox': {
            deps: ['jquery'],
            exports: 'checkBox'
        },
        'group': {
            deps: ['jquery']
        }
    },
    priority: ['jquery']
});
require(['jquery', 'checkbox', 'group'], function ($, checkBox, group) {
    var box = new $.checkBox({
        callback: function () {
            $("#j_group_1").find(".c_box").on('click', function () {
                var _this = $(this), Ok_icon = _this.find(".icon-ok"), checkedObj = _this.find(':checkbox');
                Ok_icon.toggleClass("vf").parent().toggleClass("gb");
                if (checkedObj.attr('checked') == undefined) {
                    checkedObj.attr('checked', true);
                } else {
                    checkedObj.attr('checked', false);
                }
            });
        }
    });
    var g = new $.group({
        groupSelector: "#j_group_1",
        align: 'vertical',
        icon: false,
        childObj: [box]
    });
});