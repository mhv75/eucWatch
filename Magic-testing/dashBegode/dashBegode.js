//Begode set options
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
 		if (!face.appPrev.startsWith("dash")||face.appPrev.startsWith("dash_")) this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();	
        this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("OPTIONS",120-(this.g.stringWidth("OPTIONS")/2),217); 
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(106,200,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(75,200,120,204);
		this.g.flip(); 
		this.btn("LIGHTS",18,60,15,(dash.live.aLight==="lightsOff")?0:(dash.live.aLight==="lightsOn")?4:7,0,0,119,97,(dash.live.aLight==="lightsOff")?"OFF":(dash.live.aLight==="lightsOn")?"ON":"STROBE",28,60,50); //1
		this.btn("WATCH",22,185,17,(dash.live.hapS||dash.live.hapA||dash.live.hapT||dash.live.hapB)?4:1,122,0,239,97,"ALERTS",22,185,55);//2
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		this.btn((dash.live.tpms)?dash.live.tpms:"TPMS",18,60,115,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1,0,100,119,195,(dash.live.tpms)?(tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].psi)?Math.round(tpms.euc[dash.live.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",(dash.live.tpms)?32:28,60,150); //3		
   		this.btn("HORN",25,185,137,(dash.live.horn)?4:1,122,100,239,195); //4
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(txt,size,x,y,clr,rx1,ry1,rx2,ry2,txt1,size1,x1,y1){
			this.g.setColor(0,clr);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);	
            this.g.drawString(txt,x-(this.g.stringWidth(txt)/2),y); 
   			if (txt1){
            this.g.setFont("Vector",size1);	
            this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1);
            }
			this.g.flip();
    },
    ntfy: function(txt,clr,size){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",(size)?size:20);
			this.g.drawString(txt,122-(this.g.stringWidth(txt)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("OPTIONS",122-(t.g.stringWidth("OPTIONS")/2),217); 
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(75,200,120,204);
				t.g.flip(); 	
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		face.go(set.dash[set.def.dash.face],0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		if ( x<=120 && y<=100 ) { //lights
			if (dash.live.aLight=="lightsOff") { dash.live.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,4,0,0,119,97,"ON",28,60,50); }
			else if (dash.live.aLight=="lightsOn") { dash.live.aLight="lightsOff"; euc.wri("lightsOff"); face[0].btn("LIGHTS",18,60,15,0,0,0,119,97,"OFF",28,60,50); }
			else  { dash.live.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,4,0,0,119,97,"ON",28,60,50); }
            face[0].ntfy("HOLD -> STROBE",1);
			buzzer(buz.ok);
		}else if ( 120<=x && y<=100 ) { //haptic
			buzzer(buz.ok);						
			face.go("dashAlerts",0);
			return;	
		}else if ( x<=120 && 100<=y ) { //tpms
			buzzer(buz.ok);		
			if (!dash.live.tpms) face[0].ntfy("HOLD-> ON/OFF",4);
			else {
				tpms.def.pos=Object.keys(tpms.def.list).indexOf(dash.live.tpms);
				face.go("tpmsFace",0);
				return;
			}
		}else if (120<=x && 100<=y ) { //horn
			dash.live.horn=1-dash.live.horn;
            face[0].btn("HORN",25,185,136,(dash.live.horn)?4:1,122,100,239,195);//2
            face[0].ntfy((dash.live.horn)?"BUTTON IS HORN >2KPH":"HORN DISABLED",(dash.live.horn)?4:1,(dash.live.horn)?18:20);
			buzzer(buz.ok);						
		}else buzzer(buz.na);
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(buz.ok);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		break;
	case 3: //slide left event
		face.go("dashBegodeAdv",0);
		return;	
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash.face],0);
		return;
	case 12: //long press event
		if ( x<=120 && y<100 ) { //lights
			face[0].btn("LIGHTS",18,60,15,7,0,0,119,97,"STROBE",28,60,50);
			dash.live.aLight="lightsStrobe";
			euc.wri("lightsStrobe");
			buzzer(buz.ok);
		}else if  (x<=120 && 100<=y ) { //tpms
			buzzer(buz.ok);
			if (dash.live.tpms) {
				dash.live.tpms=0;
				face[0].btn("TPMS",18,60,115,1,0,100,119,195,"OFF",28,60,155); //3
				face[0].ntfy("TPMS DISABLED",1);
				return;
			}else{
				if (global.tpms){ 
					tpms.scan();
					face.go("tpmsFace",0);
				}else 
					face[0].ntfy("NOT INSTALLED",7);
			}
			return;
		}else if ( 120<=x && 100<=y ) { //off
			euc.wri("off");
			buzzer(buz.ok);	
			euc.state="OFF";
	    }else buzzer(buz.na);
		break;
  }
};
