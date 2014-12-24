/*
	nw-app script v.01	
*/

"use strict";

$(function() {
	var 
	
	func = {
		options: {
			nw : require('nw.gui')
		},
		init: function(){	
			var self = this;

			//var full_path = process.execPath;
		
			//full_path = full_path.replace("app.exe","cubecraft\\");
		
			var win = this.options.nw.Window.get();
			win.isMaximized = false;
			document.getElementById('windowControlMinimize').onclick = function(){
				win.minimize();
			};

			document.getElementById('windowControlClose').onclick = function(){
				win.close();
			};
			/*
			document.getElementById('windowControlMaximize').onclick = function(){
				win.isMaximized ? win.unmaximize() : win.maximize();
			};
			*/

			win.on('maximize', function(){
				win.isMaximized = true;
			});

			win.on('unmaximize', function(){
				win.isMaximized = false;
			});			
			
			self.init_events();
			self.start_mc();
		},
		init_events:function(){
			var self = this;
			
			
			var login = localStorage.getItem("login");
			var pass = localStorage.getItem("pass");
			
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
				
				l1&&l2 ? self.success() : false;
			});
			
			$(".site").on("click",function(e){
				e.preventDefault();
				self.options.nw.Shell.openExternal('http://cubecraft.org/');
			})
			
		},
		connect: function(){
			/*
			var mysql = require('mysql');
			var connection = mysql.createConnection({
				host     : 'localhost:8080',
				user     : 'root',
				password : ''
			});

			connection.connect();

			connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
				if (err) throw err;
				log('The solution is: ', rows[0].solution);
			});

			connection.end();
			*/	
		},
		start_mc:function(){
					
			var log = "";
		
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
		
			document.getElementById('start').onclick = function(){
				var exec = require('child_process').exec;
				exec(start, function(error, stdout, stderr) {
					log +='stdout: ' + stdout;
					log +='stderr: ' + stderr;
					if (error !== null) {
						log +='exec error: ' + error;
					}
					document.getElementById('textarea').value = log;
				});
				document.getElementById('textarea').value = log;
			};
		},
		success:function(){
			$(".auth").addClass("go");
			$("main").addClass("active");
		}
	};		
	func.init();
	

});



/*
(function() {
	function Example( el, options ) {
		this.el = el;
		this.init();
	}
	Example.prototype.init = function() {
		this.initEvents();
	};	
	Example.prototype.initEvents = function() {
		this.el.addEventListener( 'click', this.toggle.bind(this) );
	};
	Example.prototype.toggle = function() {
		var self = this;
		if( this.isOpen ) {
			return;
		}else{
			return;
		}
		this.isOpen = !this.isOpen;	
	};
	new Example( document.getElementById( 'example' ) );
})();
*/

		
		
		
