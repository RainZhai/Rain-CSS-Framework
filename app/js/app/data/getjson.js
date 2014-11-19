define(['jquery'],function ($) {
						getJson = function (url, callback) { 
                $.ajax({
                  url: url,
                  type: 'get',
                  dataType: 'json',
                  success: function (data) {
                      callback(data);
                  }
              });
            };

        return {
            getJson: getJson
        };
    }
);