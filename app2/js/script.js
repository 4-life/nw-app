(function() {
    "use strict";

	function nw_App() {	
		this.nw = require('nw.gui');
		this.full_path = process.execPath;
		this.win = this.nw.Window.get();
        this.menu = new this.nw.Menu();
        this.subMenu = new this.nw.Menu();
		this.init();
	}
	
	nw_App.prototype.init = function() {
        var self = this;
		
		this.nw.App.clearCache();
		this.win.isMaximized = false;
        
        console.info(this.full_path);
        
        document.getElementById('windowControlMinimize').onclick = function(){ self.win.minimize(); }
        document.getElementById('windowControlClose').onclick    = function(){ self.win.close(); }
        document.getElementById('windowControlMaximize').onclick = function(){ self.win.isMaximized ? self.win.unmaximize() : self.win.maximize(); }
		
		this.win.on('maximize', function(){ self.win.isMaximized = true; });
        
		this.win.on('unmaximize', function(){ self.win.isMaximized = false; });	
        
		document.getElementById("externalLink").onclick = function(e){
			e.preventDefault();
			self.nw.Shell.openExternal('http://nwjs.io/');
		}
        
        this.menu.append(new self.nw.MenuItem({label: 'Тынц!',
            click: function() {
                alert("Хлюп!");
            }}));
	
        this.subMenu.append(new self.nw.MenuItem({label: 'Хлюп'}));
        this.menu.append(new self.nw.MenuItem({
            label: "Хлюп",
            submenu: self.subMenu
        }));

        document.body.addEventListener('contextmenu', function(e) { 
             e.preventDefault();
             self.menu.popup(e.x, e.y);
             return false;
        });
        
	}
    
	new nw_App();
	
})();