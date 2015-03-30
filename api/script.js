/*
	api script v0.1	
*/

"use strict";

(function() {


	function api_app() {
		this.css = [];
		this.init();
	}
	
	
	api_app.prototype.init = function(){
		/*var fs = require('fs');
		var cont="";
		var files = fs.readdirSync('lib/css/');
		for (var i in files) {
			cont+="<p>"+files[i]+"</p>";
		}
		$("#debug").html(cont);*/
		$("#loader").removeClass("active");
	}
	
	api_app.prototype.insertCss = function(css){
		var tag_css = document.createElement('link');
		tag_css.href = 'http://test.ru/styles.css'; 
		tag_css.type = 'text/css';
		var tag_head = document.getElementsByTagName('head');
		tag_head[0].appendChild(tag_css);	
	}
	
	
	
	new api_app();
	
})();


