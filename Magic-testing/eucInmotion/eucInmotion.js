//code by freestyl3r
/*
	//info type:
	NoOp(0),
	Version=1,
	info=2,
	Diagnostic=3,
	live=4,
	bms=5,
	Something1=16,
	stats=17,
	Settings=32,
	control=96;
*/
euc.tmp={count:0,loop:0,last:0};
euc.cmd=function(no,val){
	let cmd;
	euc.tmp.last=no;
	switch (no) {
		case "live": return  		  [170, 170, 20, 1, 4, 17];
		case "stats": return  		  [170, 170, 20, 1, 17, 17];
		case "drlOn": return          [170, 170, 20, 3, 96, 45, 1, 91];
		case "drlOff": return         [170, 170, 20, 3, 96, 45, 0, 90];
		case "lightsOn": return       [170, 170, 20, 3, 96, 64, 1, 54];
		case "lightsOff": return      [170, 170, 20, 3, 96, 64, 0, 55];
		case "fanOn": return          [170, 170, 20, 3, 96, 67, 1, 53];
		case "fanOff": return         [170, 170, 20, 3, 96, 67, 0, 52];
		case "fanQuietOn": return     [170, 170, 20, 3, 96, 56, 1, 78];
		case "fanQuietOff": return    [170, 170, 20, 3, 96, 56, 0, 79];
		case "liftOn": return         [170, 170, 20, 3, 96, 46, 1, 88];
		case "liftOff": return        [170, 170, 20, 3, 96, 46, 0, 89];
		case "lock": return           [170, 170, 20, 3, 96, 49, 1, 71];
		case "unlock": return         [170, 170, 20, 3, 96, 49, 0, 70];
		case "transportOn": return    [170, 170, 20, 3, 96, 50, 1, 68];
		case "transportOff": return   [170, 170, 20, 3, 96, 50, 0, 69];
		case "rideComfort": return    [170, 170, 20, 3, 96, 35, 0, 84];
		case "rideSport": return      [170, 170, 20, 3, 96, 35, 1, 85];
		case "performanceOn": return  [170, 170, 20, 3, 96, 36, 1, 82];
		case "performanceOff": return [170, 170, 20, 3, 96, 36, 0, 83];
		case "remainderReal": return  [170, 170, 20, 3, 96, 61, 1, 75];
		case "remainderEst": return   [170, 170, 20, 3, 96, 61, 0, 74];
		case "lowBatLimitOn": return  [170, 170, 20, 3, 96, 55, 1, 65];
		case "lowBatLimitOff": return [170, 170, 20, 3, 96, 55, 0, 64];
		case "usbOn": return          [170, 170, 20, 3, 96, 60, 1, 74];
		case "usbOff": return         [170, 170, 20, 3, 96, 60, 0, 75];
		case "loadDetectOn": return   [170, 170, 20, 3, 96, 54, 1, 64];
		case "loadDetectOff": return  [170, 170, 20, 3, 96, 54, 0, 65];
		case "mute": return           [170, 170, 20, 3, 96, 44, 0, 91];
		case "unmute": return         [170, 170, 20, 3, 96, 44, 1, 90];
		case "calibration": return    [170, 170, 20, 5, 96, 66, 1, 0, 1, 51];
		case "speedLimit":
			cmd = [170, 170, 20, 4, 96, 33];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "pedalTilt":
			cmd = [170, 170, 20, 4, 96, 34];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "pedalSensitivity":
			cmd = [170, 170, 20, 4, 96, 37, val, 100];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "setBrightness": 
			cmd = [170, 170, 20, 3, 96, 43, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "setVolume":
			cmd = [170, 170, 20, 3, 96, 38, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "playSound":   
			cmd = [170, 170, 20, 4, 96, 65, val, 1];
			cmd.push(cmd.reduce(checksum));
			return cmd;
	}
};
//
function checksum(check, val) {
	return (check ^ val) & 0xFF;
}
//
function validateChecksum(buffer) {
	receivedChecksum = buffer[buffer.length - 1];
	array = new Uint8Array(buffer, 0, buffer.length - 1);
	calculatedChecksum = array.reduce(checksum);
	return receivedChecksum == calculatedChecksum;
}
//
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		return global['\xFF'].BLE_GATTS.disconnect();
	}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
		.then(function(g) {
			return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
		}).then(function(s) {
			euc.serv=s;
			return euc.serv.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"); // write
		}).then(function(wc) {
			euc.wCha=wc;//write
			return euc.serv.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");//read
		}).then(function(rc) {
			euc.rCha=rc;
			//read
			euc.rCha.on('characteristicvaluechanged', function(event) {
				if (set.bt===2) print("responce packet: ", event.target.value.buffer);
				if (euc.busy) return;
				if ( euc.tmp.last === "stats" ) {
					//trip total
					dash.live.trpT=event.target.value.getUint32(5, true)/100;
						euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=dash.live.trpT;});
					//time
					dash.live.time=(event.target.value.getUint32(17, true)/60)|0;
					dash.live.timR=(event.target.value.getUint32(21, true)/60)|0;
					//deb
					if (set.bt===2) print("trip total :", dash.live.trpT);
					if (set.bt===2) print("on time :", dash.live.time);
					if (set.bt===2) print("ride time :", dash.live.timR);

					return;
				}
				if (event.target.value.buffer[3] != 51 || !validateChecksum(event.target.value.buffer)) {
					if (set.bt===2) print ("packet dropped: ",event.target.value.buffer);
					return;
				}
				//print ("packet: ",event.target.value.buffer);
				euc.alert=0;			
				//volt
				dash.live.volt=event.target.value.getUint16(5, true)/100;
				//batt
				dash.live.bat=Math.round(100*(dash.live.volt*5 - dash.live.batE ) / (420-dash.live.batE));
				batL.unshift(dash.live.bat);
				if (20<batL.length) batL.pop();
				dash.live.batC = (50 <= dash.live.bat)? 0 : (dash.live.bat <= dash.live.batL)? 2 : 1;	
				if ( dash.live.hapB && dash.live.batC ==2 )  euc.alert ++;
				//trip 
				dash.live.trpL=event.target.value.getUint16(17, true)/100;
				dash.live.trpR=(event.target.value.getUint16(19, true))*10; //remain
				//temp
				dash.live.tmp=(event.target.value.buffer[22] & 0xff) + 80 - 256;
				dash.live.tmpC=(dash.live.tmpH - 5 <= dash.live.tmp )? (dash.live.tmpH <= dash.live.tmp )?2:1:0;
				if (dash.live.hapT && dash.live.tmpC==2) euc.alert++;
				//amp
				dash.live.amp= event.target.value.getInt16(7, true) / 100;
				//log
				ampL.unshift(Math.round(dash.live.amp));
				if (20<ampL.length) ampL.pop();
				dash.live.ampC = ( dash.live.ampH <= dash.live.amp || dash.live.amp <= dash.live.ampL )? 2 : ( dash.live.amp  <= -0.5 || 15 <= dash.live.amp)? 1 : 0;
				if (dash.live.hapA && dash.live.ampC==2) {
					if (dash.live.ampH<=dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (dash.live.amp - dash.live.ampH) / dash.live.ampS) ;
					else euc.alert =  euc.alert + 1 + Math.round(-(dash.live.amp - dash.live.ampL) / dash.live.ampS) ;
				}
				//alarm
				dash.live.alrm=event.target.value.buffer[52];
				//log
				almL.unshift(dash.live.alrm);
				if (20<almL.length) almL.pop();		
				//haptic
				if (dash.live.alrm) euc.alert=20;
				//speed
				//dash.live.spd=Math.round((event.target.value.getInt16(9, true) / 100)*dash.live.spdF*((set.def.dash.mph)?0.625:1));
				dash.live.spd=event.target.value.getInt16(9, true) / 100;
				if (dash.live.spdM < dash.live.spd) dash.live.spdM = dash.live.spd;
				if (dash.live.spd<0) dash.live.spd=-dash.live.spd;
				dash.live.spdC = ( dash.live.spd1 <= dash.live.spd )? 2 : ( dash.live.spd2 <= dash.live.spd )? 1 : 0 ;	
				if ( dash.live.hapS && dash.live.spdC == 2 ) 
					euc.alert = 1 + Math.round((dash.live.spd-dash.live.spd1) / dash.live.spdS) ; 	
				//average
				//dash.live.spdA=(event.target.value.getUint16(17, true))/100;
				//dash.live.spdM=(event.target.value.getUint16(19, true))/100;
				//haptic
				//euc.new=1;
				if (!euc.buzz && euc.alert) {  
					if (!w.gfx.isOn&&(dash.live.spdC||dash.live.ampC||dash.live.alrm)) face.go(set.dash[set.def.dash.face],0);
					//else face.off(6000);
					euc.buzz=1;
					if (20 <= euc.alert) euc.alert = 20;
					var a=[];
					while (5 <= euc.alert) {
						a.push(200,500);
						euc.alert = euc.alert - 5;
					}
					let i;
					for (i = 0; i < euc.alert ; i++) {
						a.push(200,150);
					}
					digitalPulse(ew.pin.BUZZ,0,a);  
					setTimeout(() => { euc.buzz = 0; }, 3000);
				}
			});
			//on disconnect
			global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
				euc.off(reason);
			});
			return  rc;
		}).then(function(c) {
			//connected 
			if (set.bt===2) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			buzzer([90,40,150,40,90]);
			dash.live.lock=0;
			//write function
			euc.wri=function(cmd,value){
				if (euc.state==="OFF"||cmd==="end") {
					euc.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
						euc.loop=setTimeout(function(){ 
							euc.loop=0;
							if (global['\xFF'].BLE_GATTS && !global['\xFF'].BLE_GATTS.connected)  {euc.off("not connected");return;}
							euc.wCha.writeValue(euc.cmd("lightsOff")).then(function() {
								global["\xFF"].BLE_GATTS.disconnect(); 
							}).catch(function(err)  {
								euc.state="OFF";
								euc.off("end fail");	
								return;
							});
						},500);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						euc.busy=0;euc.horn=0;
						return;
					}
					
				}else if (cmd==="start") {
					euc.busy=0;
					euc.wCha.writeValue(euc.cmd((dash.live.light)?"lightsOn":"lightsOff")).then(function() {
						euc.rCha.startNotifications();	
						if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
						euc.loop=setTimeout(function(){ 
							euc.loop=0;
							euc.busy=0;
							euc.run=1;
							euc.wri("live");
						},300);	
					}).catch(function(err)  {
						euc.off("end fail");	
					});
				}else if (cmd==="hornOn") {
					//if (euc.horn) return;
					euc.busy=1;euc.horn=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					euc.loop=setTimeout(function(){
						euc.wCha.writeValue(euc.cmd("playSound",24)).then(function() { 
						euc.horn=0;euc.loop=0;
						euc.loop=setTimeout(function(){
							euc.loop=0;
							euc.busy=0;
							euc.wri("live");	
						},150);
					});
					},350);
				}else if (cmd==="hornOff") {
					euc.horn=0;					
				} else {
					//if (euc.busy) return; 
					euc.wCha.writeValue(euc.cmd(cmd,value)).then(function() {
						if (euc.busy) return; 
						if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
						euc.loop=setTimeout(function(){
								euc.loop=0;
								euc.wri("live");	
						},125);
					}).catch(function(err)  {
						euc.off("writefail");	
					});
				}
			};
			if (!setter.read("dash","slot"+setter.read("dash","slot")+"Mac")) {
				dash.live.mac=euc.mac; dash.live.batF=420;
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				setter.write("dash","slot"+setter.read("dash","slot")+"Mac",euc.mac);
			}			
			setTimeout(() => {euc.wri("start");}, 200);
		//reconnect
		}).catch(function(err)  {
			euc.off(err);
	});
};

euc.off=function(err){
	//if (set.bt===2) console.log("EUC:", err);
	//  global.error.push("EUC :"+err);
	if (euc.tmp.loop) {clearInterval(euc.tmp.loop);euc.tmp.loop=0;}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.bt===2) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.bt===2) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (dash.live.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1000);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		if (set.bt===2) console.log("EUC OUT:",err);
		if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.def.cli) console.log("EUC write, not connected");};
		euc.conn=function(err){if (set.def.cli) console.log("EUC conn, not connected");};
		euc.cmd=function(err){if (set.def.cli) console.log("EUC cmd, not connected");};
		euc.run=0;
		euc.tmp=0;
		euc.busy=0;
		euc.serv=0;euc.wCha=0;euc.rCha=0;euc.gatt=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);	
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};