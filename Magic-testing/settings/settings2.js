//settings
face[0] = {
	g:w.gfx,
	btn:{},
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	bpp:set.def.bpp?0:1,
	init: function(o){ 
		set.def.info=0;
		if (face.faceSave==-1) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
		UI.ele.fill("_ele","topS",1);
		//UI.ele.fill("_ele","topS1",1);
		UI.ele.fill("_ele","btm",0);
		eval(require('Storage').read(o?'set_apps':'set_set')); 
		this.run=false;
	},
	show : function(s){
		if (!this.run) return;
		//loop
		this.tid=setTimeout(function(t,o){
			t.tid=-1;
			t.show(o);
		},100,this);
	},
	tid:-1,
	run:false,
	clear : function(o){
		TC.removeAllListeners("tc5");
		TC.removeAllListeners("tc12");
		TC.removeAllListeners("tc1");
		TC.removeAllListeners("tc2");
		TC.removeAllListeners("tc3");
		TC.removeAllListeners("tc4");
		//pal[0]=0;
		//this.g.clear();
		if (set.tor==1){
			w.gfx.bri.set(set.bri);
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
	}
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

touchHandler[0]=function(){};
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 	
tcL=(x,y)=>{
	buzzer(buz.ok);
	print("left",x,y);
	if (face[0].page=="set"){
		set.def.info=1;
		eval(require('Storage').read('set_apps')); 
	}else  { 
		set.def.info=0;
		eval(require('Storage').read('set_set')); 
	}
};	
TC.on('tc3',tcL); 	
TC.on('tc4',tcL); 	

