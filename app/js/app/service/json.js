define('json', ['jquery'], function($) {
	var getJson = function(url, callback) {
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			cache: false,
			success: function(data) {
				callback(data);
			}
		});
	};

	return {
		getJson: getJson
	};
});