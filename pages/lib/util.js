var zmitiUtil = {
	wxInfo() {
		return {
			wxappid: window.wxappid,
			wxappsecret: wxappsecret,
			customid: window.customid
		}
	},
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	changeURLPar: function(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	wxConfig: function(title, desc, url, isDebug = false) {
		axios.get(window.config.get_weixinConfig,{}).then((res)=>{
			
			if(typeof res === 'object'){
				var result = res;
			}else{
				var result = JSON.parse(res);
			}
			var dt = result.data;
			if(typeof dt === 'string'){
				dt = JSON.parse(dt);
			}
			var data = dt.data;
			if (dt.rc === 0) {
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp: data.timestamp,
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone",
						"onMenuShareWeibo"
					]
				});

				var linkUrl = window.location.protocol+'//h5.zhongguowangshi.com/h5/'+window.h5name+'/assets/images/301.jpg';
				var durl = url || window.location.href.split('#')[0];
				wx.ready(function () {
					var config = {
						title: title,
						desc: desc,
						link: durl,
						imgUrl: linkUrl,
						error: function () { },
						success() { }
					};
					wx.onMenuShareAppMessage(config);
					wx.onMenuShareTimeline(config);
				});
			}
		});
	},

	saveWxUserInfo(option) {
		$.ajax({
			url: window.protocol + '//api.zmiti.com/v2/weixin/add_wxuser/',
			type: 'post',
			data: option
		}).done((data) => {
			//document.title = data.getret + ','+data.getmsg;
			///alert('add_wxuser : data.getret => ' + data.getret + '\n data.getmsg =>' + data.getmsg);
		})
	},

	getOauthurl: function(obserable) {

		var s = this;
		var {
			wxappid,
			wxappsecret,
			customid
		} = this.wxInfo();

		 var url = location.href;
		 var paraString = '';
		 if (url.indexOf("?") > 0 ) {
		 	paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		 }

		 //alert(paraString);
		 //new VConsole();
		 var key = '13headingur1',
			 key1 = '13nickname31';
			var nickname = this.getQueryString('nickname');
			var headimgurl = this.getQueryString('headimgurl');

		if (nickname || window.localStorage.getItem(key1)) {
			if(nickname){
				window.localStorage.setItem(key, headimgurl);
				window.localStorage.setItem(key1, nickname);
				window.nickname = nickname;
				window.headimgurl = headimgurl;
				///window.location.href = window.location.href.split('?')[0];
			}else{
				window.nickname = window.localStorage.getItem(key1);
				window.headimgurl = window.localStorage.getItem(key);
			}
			
			obserable.trigger({
				type: "setUserInfo",
				data: {
					nickname: decodeURI(window.nickname),
					headimgurl
				}
			})
			setTimeout(()=>{
				//
			//	wxHandlercallback('',  document.title, window.desc);
			},1000)
		}
		else{
			 if (!this.isWeiXin()) {
			 	return;
			 }
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=https://openapi.zhongguowangshi.com/wxHandler.ashx?action=getWeixinUserInfo&response_type=code&scope=snsapi_userinfo&state=XHSAh5A' + window.h5name + 'AindexAhtml#wechat_redirect'
			window.location.href = url;
			
		 }

		 var re = /^[\u4e00-\u9fa5]{0,}$/;
		
		 if (window.location.href.split('?').length > 1 ) {
		 	window.location.href = window.location.href.split('?')[0];
		 }
		
		return;
	
 
	}
}

function add(x, y) {
	return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
}

function SHA1hex(num) {
	var sHEXChars = "0123456789abcdef";
	var str = "";
	for (var j = 7; j >= 0; j--)
		str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
	return str;
}

function AlignSHA1(sIn) {
	var nblk = ((sIn.length + 8) >> 6) + 1,
		blks = new Array(nblk * 16);
	for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
	for (i = 0; i < sIn.length; i++)
		blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
	blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
	blks[nblk * 16 - 1] = sIn.length * 8;
	return blks;
}

function rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

function ft(t, b, c, d) {
	if (t < 20) return (b & c) | ((~b) & d);
	if (t < 40) return b ^ c ^ d;
	if (t < 60) return (b & c) | (b & d) | (c & d);
	return b ^ c ^ d;
}

function kt(t) {
	return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
		(t < 60) ? -1894007588 : -899497514;
}

function SHA1(sIn) {
	var x = AlignSHA1(sIn);
	var w = new Array(80);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var e = -1009589776;
	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		var olde = e;
		for (var j = 0; j < 80; j++) {
			if (j < 16) w[j] = x[i + j];
			else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
			var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
			e = d;
			d = c;
			c = rol(b, 30);
			b = a;
			a = t;
		}
		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd);
		e = add(e, olde);
	}
	var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);
	return SHA1Value.toUpperCase();
}
export default zmitiUtil;