/*
	nw-app script v.01	
*/

"use strict";


(function() {


	function nw_App() {
	
		this.nw = require('nw.gui');
		this.debug = true;
		this.api_url = 'http://ovchinnikov.us/test/api/script.js';
		this.elStart = $("#start")[0];
		this.full_path = process.execPath.replace("app.exe","cubecraft\\");
		this.win = this.nw.Window.get();
		this.init();
	}
	
	nw_App.prototype.init = function() {
		var self=this;
		
		self.nw.App.clearCache();
		
		this.win.isMaximized = false;
		$("#windowControlMinimize").on("click", function(){
			self.win.minimize();
		});
		$("#windowControlClose").on("click", function(){
			self.win.close();
		});		
		/*
		$("#windowControlMaximize").on("click", function(){
			win.isMaximized ? win.unmaximize() : win.maximize();
		});
		*/
		this.win.on('maximize', function(){
			self.win.isMaximized = true;
		});
		this.win.on('unmaximize', function(){
			self.win.isMaximized = false;
		});			
		$(".site").on("click",function(e){
			e.preventDefault();
			self.nw.Shell.openExternal('http://cubecraft.org/');
		});	
		setTimeout(function(){
			self.check();
		},1500);
			
		this.initEvents();
		this.loadAuth();
	};	
	
	nw_App.prototype.loadAuth = function(){
		var self = this,
			login = localStorage.getItem("login"),
			pass = localStorage.getItem("pass");
			
		if(login&&pass){
			$("#login").val(login);
			$("#pass").val(pass);
			$("#save_pass").prop("checked",true);
		}
		
		$(".submit").on("click",function(e){
			e.preventDefault();
			var login = $("#login").val(),
				pass = $("#pass").val(),
				l1=false,
				l2=false;
				
			if(login==""){
				$("#login").addClass("error");
			}else{
				$("#login").removeClass("error");
				l1=true;
			}
			if(pass==""){
			$("#pass").addClass("error");
			}else{
				$("#pass").removeClass("error");
				l2=true;
			}
			
			if($("#save_pass").prop("checked")){					
				localStorage.setItem("login", login);
				localStorage.setItem("pass", pass);		
			}else{
				localStorage.removeItem("login");
				localStorage.removeItem("pass");					
			}
		
			l1&&l2 ? self.successAuth() : false;
		});
	};
	
	nw_App.prototype.successAuth = function(){
		$(".auth").addClass("go");
		$("main").addClass("active");
	};
	
	nw_App.prototype.check = function(){
		var self = this;
		this.debugInfo("проверка соединения...");
		$("#loader").addClass("active");
		/*var fs = require('fs');
		var cont="";
		var files = fs.readdirSync('/');
		for (var i in files) {
			cont+="<p>"+files[i]+"</p>";
		}
		$("#debug").html(cont);
		*/
		$.ajax({
			type: "GET",
			//data : {type: "check"},
			url: self.api_url,
		}).done(function(data) {
			data ? self.debugInfo(data) : self.debugInfo("нет соединения");
			
			var tag_js = document.createElement('script');
			tag_js.href = self.api_url;
			var tag_head = document.getElementsByTagName('body');
			tag_head[0].appendChild(tag_js);	
			
			$("#loader").removeClass("active");
		}).fail(function(data) {
			self.debugInfo("нет соединения"+ JSON.stringify(data));
			$("#loader").removeClass("active");
		});	
		$("#loader").removeClass("active");
	};
	
	nw_App.prototype.initEvents = function() {
		this.elStart.onclick = this.startMC;
	};
	
	nw_App.prototype.startMC = function(){
		var self = nw_App;
		
		nw_App.debugInfo("приложение запускается...");
		
		var dir = '%APPDATA%\\minecraft\\';
		var start = 'java -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Xmx1G -Djava.library.path="'
			+dir+'versions\\ForgeOptiFine 1.6.4\\natives" -cp "'
			+dir+'libraries\\net\\optifine\\optifine\\1.6.4_HD_U_D1\\optifine-1.6.4_HD_U_D1.jar;'
			+dir+'libraries\\net\\minecraftforge\\minecraftforge\\9.11.1.965\\minecraftforge-9.11.1.965.jar;'
			+dir+'libraries\\net\\minecraft\\launchwrapper\\1.8\\launchwrapper-1.8.jar;'
			+dir+'libraries\\org\\ow2\\asm\\asm-all\\4.1\\asm-all-4.1.jar;'
			+dir+'libraries\\org\\scala-lang\\scala-library\\2.10.2\\scala-library-2.10.2.jar;'
			+dir+'libraries\\org\\scala-lang\\scala-compiler\\2.10.2\\scala-compiler-2.10.2.jar;'
			+dir+'libraries\\lzma\\lzma\\0.0.1\\lzma-0.0.1.jar;'
			+dir+'libraries\\net\\sf\\jopt-simple\\jopt-simple\\4.5\\jopt-simple-4.5.jar;'
			+dir+'libraries\\com\\paulscode\\codecjorbis\\20101023\\codecjorbis-20101023.jar;'
			+dir+'libraries\\com\\paulscode\\codecwav\\20101023\\codecwav-20101023.jar;'
			+dir+'libraries\\com\\paulscode\\libraryjavasound\\20101123\\libraryjavasound-20101123.jar;'
			+dir+'libraries\\com\\paulscode\\librarylwjglopenal\\20100824\\librarylwjglopenal-20100824.jar;'
			+dir+'libraries\\com\\paulscode\\soundsystem\\20120107\\soundsystem-20120107.jar;'
			+dir+'libraries\\argo\\argo\\2.25_fixed\\argo-2.25_fixed.jar;'
			+dir+'libraries\\org\\bouncycastle\\bcprov-jdk15on\\1.47\\bcprov-jdk15on-1.47.jar;'
			+dir+'libraries\\com\\google\\guava\\guava\\14.0\\guava-14.0.jar;'
			+dir+'libraries\\org\\apache\\commons\\commons-lang3\\3.1\\commons-lang3-3.1.jar;'
			+dir+'libraries\\commons-io\\commons-io\\2.4\\commons-io-2.4.jar;'
			+dir+'libraries\\net\\java\\jinput\\jinput\\2.0.5\\jinput-2.0.5.jar;'
			+dir+'libraries\\net\\java\\jutils\\jutils\\1.0.0\\jutils-1.0.0.jar;'
			+dir+'libraries\\com\\google\\code\\gson\\gson\\2.2.2\\gson-2.2.2.jar;'
			+dir+'libraries\\org\\lwjgl\\lwjgl\\lwjgl\\2.9.0\\lwjgl-2.9.0.jar;'
			+dir+'libraries\\org\\lwjgl\\lwjgl\\lwjgl_util\\2.9.0\\lwjgl_util-2.9.0.jar;'
			+dir+'versions\\ForgeOptiFine 1.6.4\\ForgeOptiFine 1.6.4.jar" -Dfml.ignoreInvalidMinecraftCertificates=true -Dfml.ignorePatchDiscrepancies=true net.minecraft.launchwrapper.Launch --username "user" --session "1234" --version "OptifIne" --gameDir "%appdata%\\minecraft" --assetsDir "assets\\virtual\\legacy" --tweakClass cpw.mods.fml.common.launcher.FMLTweaker';
		
			var exec = require('child_process').exec;
			exec(start, function(error, stdout, stderr) {
				self.debugInfo('stdout: ' + stdout);
				self.debugInfo('stderr: ' + stderr);
				if (error !== null) {
					self.debugInfo('exec error: ' + error);
				}
			});
		
	};
	
	nw_App.prototype.debugInfo = function(info){
		this.debug ? $("#debug").append("<p>"+info+"</p>") : false;
	};
	
	
	new nw_App();
	
})();