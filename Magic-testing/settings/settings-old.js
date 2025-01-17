//settings

face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	g:w.gfx,
	bpp:set.def.bpp?0:1,
		init: function(){ 
		face.mode=0;
		if (face.faceSave==-1) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
		this.cli=-1;this.bt=-1;this.gb=-1;this.hid=-1;this.emuZ=-1;this.bri=-1;this.acc=-1;this.buzz=-1;this.sys=1;this.btn2=1;this.fmp=-1;
		face[0].btSetOn=1;
		var d=(Date()).toString().split(' ');
		var t=(d[4]).toString().split(':');	
		//bottom
		this.g.setColor(0,0);
		this.g.fillRect(0,156,239,239);
		this.g.setColor(1,14);
		//this.g.drawImage(icon("torch"),10,195);	
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")),10,195);
		//this.g.drawImage(icon("info"),95,195);
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwI2zgP/Ao0f////P/nE/AoP9/88ApU4EZYADAooAICg2AApE8/+/G4P4Aon8AoscCIgjLACkf8AFE+CJDz/3/B9CAoP8ApRBBDogFJF4gAsA=")),95,195);	//this.g.drawImage(require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA==")),94,195);
		//this.g.drawImage(icon("alarm"),180,195);
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwIKH/ACBh8Agf+AoN/4EH/+AgH/+EP//AgP//EfAoMDAo38n4dDAoIpCj4FB8E//kHAoPA///wIFBwYFB8AFBGAI0BvkeFQIuBnkcn/wDgM4FgOAgIyC/41CAQIICn4OB/kB4EfAoP4AoMPKAPwAo8H8ABBAo8DAoJ2BAo5EBAYIFF8AFE+AFE/gFC8BMBEYQFBh+DAocHw4fCL4IJBAoZTBL4IFE/inCZAJ3EQYzaBR4abBh4aDU4QFEBYU/AoIXCvwFB3wFBvjbBjwFBXYMAAoQAEA=")),180,195);
		if (this.bpp)this.g.flip();
		this.run=true;
	},
	show : function(s){
		if (!this.run) return;
		//torch
		if (s) face.mode=1;
		if (this.tor==1) {
			this.g.setColor(0,15);
			this.g.fillRect(0,0,239,239); 
			this.g.setColor(1,3);
			//this.g.drawImage(icon("torch"),50,30,{scale:3});
			this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")),50,30,{scale:3});
			this.g.flip();
			this.appImgNone=0;
			this.btSetOn=1;
			return;
		}else if (face.mode) {
			if (!this.appImgNone) if (Boolean(require('Storage').read('w_apps'))) eval(require('Storage').read('w_apps')); 
		}else if(this.themeSet){
			if(this.themeSetOn){
			 	this.themeSetOn=0;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,155);
				this.g.setColor(1,1);
				this.g.fillRect(0,0,239,75);
				//this.g.fillRect(0,80,239,155); 
				if (this.bpp)this.g.flip();
				this.g.setColor(0,15);
				this.g.setFont("Vector",35);
				this.g.drawString(face.appRoot[0],120-(this.g.stringWidth(face.appRoot[0])/2),20);
				if (this.bpp)this.g.flip();
				this.themetout();
			}
			
		}else if(this.btSet){
			if(this.btSetOn){
				this.btSetOn=0;
				//this.g.setColor(1,(set.def.cli||set.def.gb||set.def.emuZ||set.def.hid)?4:1);
				this.g.setColor(1,1);
				this.g.fillRect(0,0,155,75);
				this.g.setColor(0,15);
				//bt
				this.g.drawImage(require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")),54,15);
				this.g.drawImage((set.def.rfTX==-4)?E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74=")):(set.def.rfTX==0)?E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74=")):E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74=")),125,32);
				if (this.bpp)this.g.flip();
			}
			if (set.def.cli!=this.cli) {
				this.cli=set.def.cli;
				//UI.btn.img("_2x3",3,icon("cli"),this.cli?15:0,this.cli?4:3);//btn3
				UI.btn.img("_2x3",3,require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4")),this.cli?15:0,this.cli?4:3);//btn3
			}
			if (set.def.gb!=this.gb) {
				this.gb=set.def.gb;
				//UI.btn.img("_2x3",4,icon("gb"),this.gb?15:0,this.gb?4:3);//btn4
				UI.btn.img("_2x3",4,require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A==")),this.gb?15:0,this.gb?4:3);//btn4
			}
			if (set.def.emuZ!=this.emuZ) {
				this.emuZ=set.def.emuZ;
				UI.btn.img("_2x3",5,require("heatshrink").decompress(atob("mEwwIcZn////+AoIEBAAOAgIFD4EDAofgg/gCgMD+EH4AFBgPwh+AE4X4h4tDvAFFj8DwITBvkegeDD4M8AoPDAoQRBwYRCj4jKGopBFJosD/AFBj/gMopxFPo0PAoIaCEIIrCAqg9CEgQiDH4P8Wgg0CAAM+nwbC//8j5NBg4/BIYKzBApQZBRgojDF447FI4pTFABI")),this.emuZ?15:0,this.emuZ?4:3);//btn5
			}
			if (set.def.hid!=this.hid) {
				this.hid=set.def.hid;
				UI.btn.img("_2x3",6,require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA=")),this.hid?15:0,this.hid?4:3);//btn6
			}
		}else{	//settings
			this.appImgNone=0;
			//bluetooth settings
			if (set.bt!=this.bt) {
				this.bt=set.bt;
				let state=(set.def.cli||set.def.gb||set.def.emuZ||set.def.hid)?1:0;
				//bt btn
				this.img=require("heatshrink").decompress(atob("lkwwIPMg4FE/AKE4AFDtwEDg1gAocjAgcDnAFDmOAAgUBxgKDjAbChkBwwJC8EMmAEBh8A4IbC+EEjAKDsBCC7/+g//4EN//gv//wFAEgUMgw0DsBQDgQKEkAKDg0EBQfgFYf4FYf8IIMGhhBDoJMDhhMCh0A4YhC4BtDPAOOPAifDgYaCAAMzRwcCPoQABsyvEXQl8AgcPDQcAuD/XABYA="));
				UI.btn.img("_2x3",1,(state)?require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")):this.img,state?14:15,state?2:2);
				this.img=0;
				//this.g.setColor(0,0);
				//this.g.fillRect(76,0,79,75);
				//if (this.bpp)this.g.flip();
			}
			//themes 
			if (this.btn2) {
				this.btn2=0;
				this.g.setColor(0,1);
				this.g.fillRect(80,0,155,75); //2
				this.g.setColor(1,14);
				this.g.drawImage(require("heatshrink").decompress(atob("mEwwIHEgfwAocH/AFDh/8Aocf/wFDn//Aod/Aon//8PAQPBAomDAQMfAQMH//+AoP+BwIFC/gCE+AuB/Ef4AuC+EfwAuC8AFBgIFB4AFBgYFBwAFBFwJGBAoIuCAoQuCAoQuCAonwoAFBGgPgFIQLB4IFBQIJgB4EeRoJgB4Ecg+D/wFBjE/8P8h5XC+H4AoQzB+AFD/lAAoJdBIoIFDKIIFfQIIpDApB+BAoZsBAoX4PAPANIPwAoR1B+CtDcQaHCYAL3CTwIAC")),95,15);
				//if (this.bpp) 
				if (this.bpp)this.g.flip();
				//this.g.setColor(0,0);
				//this.g.fillRect(156,0,159,75);
				//if (this.bpp)this.g.flip();
			}
			//buzz on/off
			if (set.def.buzz!=this.buzz) {
				 this.buzz=set.def.buzz;
				UI.btn.img("_2x3",3,(this.buzz)?require("heatshrink").decompress(atob("mEwwIdag/gApMOuAFDn18Aof4j4ECgPAgeAAoIDBA4IiCAQIkChwCBEgUMKoQCBjACKBwUcAogaFAv4FEsACBgx8BPQQDBQwaMCTAYFH/4ACAozRNjCOCAo8MJITdHJIYAXA")):require("heatshrink").decompress(atob("mEwwIdag/gEAIFEuAFBhwDBA4MAn18gPAAoP4j8DwEABAMDw4KBBAMBxwiCAQMcEQQCBnACBhgCBFwUYEoQFDgPYMgQlBzAFDg4aCAoMOAokcAok4AolwAongAoZUBAoZUBAoZUBAoZUBAoZdBAoZdBAoZdBAoVgRgMGKwPBRgMDQwODRgiDCgAFBQYQFCj//AAIaBn4FERgQACXYQABEoMYS4RdBAoZdCbYQuBboRPCIoL/TAAo")),this.buzz?14:15,this.buzz?2:2);//btn3

			}
			//find my phone
			if (set.fmp!=this.fmp) {
				this.fmp=set.fmp;
				UI.btn.img("_2x3",4,require("heatshrink").decompress(atob("mEwwILIv/+AgUD///4AFBg8//HgAoMGj/4sAFCAQIFfgYFD4EPAofghwFDuEcAoc4nAFDjkw4wFBscMuIFDx1hwwFBAYPjAofG8YdD4/HApPjAqIjEAovHsY1D45BFJopZFMopxFPosHAofwSoq/jAo0HAQL1Cgf//40BAAM87wECAAg")),(set.bt==3)?15:0,(set.bt==3)?1:2);//btn4
			}
			//acc on/off
			if (set.def.acc!=this.acc) {
				this.acc=set.def.acc;
				UI.btn.img("_2x3",5,require("heatshrink").decompress(atob("mEwwJC/AAkPwAECgP//AFCg///4FCj4FBCQU/AoPgAoN/4Ef+AFB/wZBDwMB/gCCgUDBwV+h0HDQU/jkP4AsCvg/Dh/8j5JDAokH/k+Igf4Aoc//E8AoRbBvhhEAoUD//wjAnBwIFBEIRaEn/AgIFDJ4QFIKoQdDAoibDgECbfA=")),14,(euc.state=="READY")?4:2);
			}
			//brightness level
			if (this.g.bri.lv!=this.bri) {
				this.bri=this.g.bri.lv;
				this.c=15;
				this.g.setColor(0,1);
				this.g.fillRect(160,80,239,155);//brightness
				this.g.setColor(1,this.c);
				this.g.setFont("Vector",30);
				this.g.drawImage(require("heatshrink").decompress(atob("jEXwIHEhAKCAQcEAgMGAQMCuADB+EAgICEgYCBnYFEBwoXCDoUGiEAhw9DAQ4ABA")),170,107);
				this.g.setFont("Vector",45);
				this.g.drawString(this.g.bri.lv,194,99);   
				if (this.bpp)this.g.flip();
			}
		}
		this.g.flip();
		//loop
		this.tid=setTimeout(function(t,o){
			t.tid=-1;
			t.show(o);
		},100,this);
	},
	tid:-1,
	run:false,
	clear : function(o){
		//pal[0]=0;
		//this.g.clear();
		if (set.tor==1){
			w.gfx.bri.set(this.cbri);
			face.faceSave=-1;
			set.tor=-1;
		}
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=-1;
		return true;
	},
	off: function(o){
		this.g.off();
		this.clear(o);
	},
	themetout:function(tim){
		this.g.setColor(0,1);
		this.g.fillRect(0,80,239,155); 
		this.g.setColor(1,15);
		this.g.setFont("Vector",18);
		this.tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
		this.g.drawString("TIMEOUT (" + ((this.tout<60000)?"seconds":(this.tout<3600000)?"minutes":"hours") + ")",120-(this.g.stringWidth("TIMEOUT (" + ((this.tout<60000)?"seconds":(this.tout<3600000)?"minutes":"hours") + ")")/2),85);
		//this.g.setFont("Vector",18);
		//this.g.drawString("TIMEOUT (seconds)",120-(this.g.stringWidth("TIMEOUT (seconds)")/2),85);
		this.g.setFont("Vector",30);
		this.g.drawString("<",20,120);this.g.drawString(">",195,120);
		this.g.setFont("Vector",45);
		this.g.drawString(this.tout/   ( (this.tout<60000)?"1000":(this.tout<3600000)?"60000":"3600000"),120-(this.g.stringWidth( this.tout/( (this.tout<60000)?"1000":(this.tout<3600000)?"60000":"3600000") )/2),115);
		if (this.bpp)this.g.flip();
	},
};
//
face[1] = {
  offms:1000,
  g:w.gfx,
  init: function(){
  return true;
  },
  show : function(){
	face[0].btSetOn=1;
	if (face.faceSave!=-1) {
		  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
    }else face.go("main",0);
    return true;
  },
  clear: function(){
  return true;
  },
};	
//info face

//touch-settings  
touchHandler[0]=function(e,x,y){
    if (set.tor==1){
        w.gfx.bri.set(face[0].cbri);
        set.tor=-1;
        face[0].tor=0;
        face.go("settings",0);
        return;
    }else if (e==5){
		if(x<77&&y<75){//btn1
			if (face[0].btSet) {
				buzzer(buz.ok);face[0].btSet=0;
				face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			}else if (face[0].themeSet) {
				buzzer(buz.na);
			}else if (face.mode) {
				if (face[0].appDo1) {
					buzzer(buz.ok);eval(face[0].appDo1);return;
				}else buzzer(buz.na);
			}else {
				face[0].btSetOn=1;face[0].btSet=1;buzzer(buz.ok);
				face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			}
		}else if(77<x&&x<158&&y<75){//btn2
			if (face[0].btSet) {
				buzzer(buz.ok);face[0].btSet=0;
				face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			}else if (face[0].themeSet) {
				buzzer(buz.na);
			}else if (face.mode) {
				if (face[0].appDo2) {buzzer(buz.ok);eval(face[0].appDo2);return;} 
				else buzzer(buz.na);
			}else {
				face[0].themeSetOn=1;face[0].themeSet=1;buzzer(buz.ok);
				face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
				//face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			}
		}else if(158<x&&x<239&&y<75){//btn3
			if (face.mode) {if (face[0].appDo3) {buzzer(buz.ok);eval(face[0].appDo3);return;} else buzzer(buz.na);
			}else if (face[0].btSet) {
				set.def.cli=1-set.def.cli;setter.updateBT();buzzer(buz.ok);
			}else if (face[0].themeSet) {
				buzzer(buz.na);
			}else {
				set.def.buzz=1-set.def.buzz;
				if (set.def.buzz){ 
					buzzer=digitalPulse.bind(null,ew.pin.BUZZ,0);buzzer(buz.ok);
				}else{
					buzzer(buz.ok);
					buzzer=function(){};
				}
			}
		}else if(77>x&&77<y&&y<159){//btn4
			if (face.mode) {if (face[0].appDo4) {buzzer(buz.ok);eval(face[0].appDo4);return;} else buzzer(buz.na);
			}else if (face[0].btSet) {
				set.def.gb=1-set.def.gb;setter.updateBT();buzzer(buz.ok);
			}else if (face[0].themeSet) {
				if ( 1000 < face[0].tout && face[0].tout <= 60000 ){
				  set.def.off[face.appRoot[0]]=face[0].tout-3000;
				  if (set.def.off[face.appRoot[0]] < 3000  )  set.def.off[face.appRoot[0]]=3000;
				}else if (60000 < face[0].tout && face[0].tout <= 3600000 ){					
				  set.def.off[face.appRoot[0]]=face[0].tout-600000; 
				  if (set.def.off[face.appRoot[0]] < 60000)  set.def.off[face.appRoot[0]]=60000;
				}else if (3600000 < face[0].tout ){
				  set.def.off[face.appRoot[0]]=face[0].tout-1800000; 
  				  if (set.def.off[face.appRoot[0]] < 3600000  )  set.def.off[face.appRoot[0]]=3600000;
				}else set.def.off[face.appRoot[0]]=3000; //1sec
				face[0].themetout();
				buzzer(buz.ok);
			}else if (set.bt==3){
				buzzer(buz.ok);
				set.fmp=1-set.fmp;
				if (set.fmp) set.gbSend({ "t": "findPhone", "n": true });else set.gbSend({ "t": "findPhone", "n": false });
				//face.go("settings",5);return;
			} else buzzer(buz.na);
		}else if(77<x&&x<157&&77<y&&y<159){//btn5
			if (face.mode) {if (face[0].appDo5) {buzzer(buz.ok);eval(face[0].appDo5);return;} else buzzer(buz.na);
			}else if (face[0].btSet) {
				set.def.emuZ=1-set.def.emuZ;setter.updateBT();buzzer(buz.ok);
			}else if (face[0].themeSet) {
				buzzer(buz.na);
			}else {set.def.acc=1-set.def.acc;setter.accR();buzzer(buz.ok);}
		}else if(158<x&&x<239&&77<y&&y<159) {//btn6
			if (face.mode) {if (face[0].appDo6) {buzzer(buz.ok);eval(face[0].appDo6);return;} else buzzer(buz.na);
			}else if (face[0].btSet) {
				set.def.hid=1-set.def.hid;setter.updateBT();buzzer(buz.ok);
			}else if (face[0].themeSet) {
				if (1000 <= face[0].tout && face[0].tout < 60000 )
					set.def.off[face.appRoot[0]]=face[0].tout+3000;
				else if (60000 <= face[0].tout && face[0].tout < 3600000){
					set.def.off[face.appRoot[0]]=face[0].tout+600000; 
					if (set.def.off[face.appRoot[0]] < 1200000  )  set.def.off[face.appRoot[0]]=600000;
				}else if (3600000 <= face[0].tout ){
					set.def.off[face.appRoot[0]]=face[0].tout+1800000; 
					if ( 14400000 < set.def.off[face.appRoot[0]]  )  set.def.off[face.appRoot[0]]=14400000;
				}else set.def.off[face.appRoot[0]]=3000; //1sec
				face[0].themetout();				
				buzzer(buz.ok);
			}else {
				face[0].cbri=w.gfx.bri.lv+1;
				if (face[0].cbri>7) face[0].cbri=1;
				w.gfx.bri.set(face[0].cbri);   
				buzzer(buz.ok);
			}
		}else if(0<x&&x<75&&158<y&&y<239){//btn7
			set.tor=1;
			face[0].cbri=w.gfx.bri.lv;
			w.gfx.bri.set(7);
			face[0].tor=1;
			if (face.offid>=0) {clearTimeout(face.offid); face.offid=-1;}
			face.offid=setTimeout((f)=>{
				face[0].tor=0;
				set.tor=-1;
				w.gfx.bri.set(face[0].cbri);
				if (f>=0 && face[f].off) face[f].off();
				face.offid=-1;face.pageCurr=-1;face.appPrev="main";
			},25000,face.pageCurr);
			buzzer(buz.ok);
			return;  
		}else if(77<x&&x<157&&158<y&&y<239){//btn8	
			buzzer(buz.ok);
			if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
				face.go(face.faceSave[0].substring(0,4)+"Options",0);
			}else face.go("settings",5);
			return;
		}else if(158<x&&x<239&&160<y&&y<239){ //btn9
			buzzer(buz.ok);
			if (Boolean(require("Storage").read("alarm")))
			face.go("alarm",0);return;
		} else buzzer(buz.na);
	}else if  (e==1){
		//if (face[0].btSet) {
		//	face[0].btSet=0;
		//}else 
		if(158<x&&x<239&&60<y&&y<180&&!face.mode) {
			face[0].cbri=w.gfx.bri.lv-1;
			if (face[0].cbri<1) face[0].cbri=1;
			w.gfx.bri.set(face[0].cbri);
			buzzer(buz.ok);
		}else { 
			if (face.faceSave!=-1) {
			  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
			}else{
			  if (face.appPrev=="settings"||face.appPrev==face.faceSave[0].substring(0,4)+"Options") {face.appPrev="main";face.pagePrev=0;}
			  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
			}
		}  
	}else if  (e==2){
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(buz.ok);
		}else if (face[0].btSet) {
			face[0].btSet=0;
			face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
		}else if (face[0].themeSet) {
			w.gfx.setColor(0,0);
			w.gfx.fillRect(76,0,79,160);
			if (face[0].bpp)w.gfx.flip();	
			w.gfx.fillRect(156,0,159,160);
			if (face[0].bpp)w.gfx.flip();
			face[0].themeSet=0;
		}else if(158<x&&x<239&&60<y&&y<180&&!face.mode) {
			face[0].cbri=w.gfx.bri.lv+1;
			if (face[0].cbri>7) face[0].cbri=7;
			w.gfx.bri.set(face[0].cbri);
			buzzer(buz.ok);
		}else if (face.faceSave!=-1) {
			face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else{
			if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
			face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		}    
	}else if  (e==3){
		if (face[0].btSet) {
			face[0].btSet=0;
		}else if (face[0].themeSet) {
			w.gfx.setColor(0,0);
			w.gfx.fillRect(76,0,79,160);
			if (face[0].bpp)w.gfx.flip();	
			w.gfx.fillRect(156,0,159,160);
			if (face[0].bpp)w.gfx.flip();
			face[0].themeSet=0;
		}else if (Boolean(require('Storage').read('w_apps'))){
			face.mode=1-face.mode;
			face[0].btSet=0;
			face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			buzzer(buz.ok);
		} else buzzer(buz.na);
	}else if  (e==4){
		if (face[0].btSet) {
			face[0].btSet=0;
		}else if (face[0].themeSet) {
			w.gfx.setColor(0,0);
			w.gfx.fillRect(76,0,79,160);
			if (face[0].bpp)w.gfx.flip();	
			w.gfx.fillRect(156,0,159,160);
			if (face[0].bpp)w.gfx.flip();
			face[0].themeSet=0;
		}else if (Boolean(require('Storage').read('w_apps'))){
			face.mode=1-face.mode;
			face[0].btSet=0;
			face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			buzzer(buz.ok);
		}else{
			buzzer(buz.na);
		}
	}else if  (e==12){
		if (face[0].btSet) {
			if(x<160&&y<77){//bt toggle tx
				buzzer(buz.ok);
				if (set.def.rfTX===-4) set.def.rfTX=0;
				else if (set.def.rfTX===0) set.def.rfTX=4;
				else if (set.def.rfTX===4) set.def.rfTX=-4;
				NRF.setTxPower(set.def.rfTX);
				face[0].btSetOn=1;
			} else buzzer(buz.na);
		} else buzzer(buz.na);
	}
};