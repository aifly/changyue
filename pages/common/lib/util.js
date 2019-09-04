import zmitiActions from '../action.js';
import   './qrcode';
import Vue from 'vue';

var zmitiUtil = {
	userActions: zmitiActions.userActions,
	adminActions: zmitiActions.adminActions,
	companyActions: zmitiActions.companyActions,
	resourceActions: zmitiActions.resourceActions,
	basicConfigActions: zmitiActions.basicConfigActions,
	weatherActions: zmitiActions.weatherActions,
	cityActions: zmitiActions.cityActions,
	companyAdminActions: zmitiActions.companyAdminActions,
	changYueAcions: zmitiActions.changYueAcions,

	createQrCode(container, url,size=150) {
		//实例化
		var qrcode = new QRCode(
			//二维码存放的div
			container, {
				width: size, //设置宽高
				height: size
			}
		);
		//根据input框的值生成二维码
		qrcode.makeCode(url);
	},

	formatDate(inputTime,flag = false){
		var date = new Date(inputTime * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if(flag){
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		}
		return y + '-' + m + '-' + d ;
	},
	getCurrentCMS(){
		try {
			var cms = JSON.parse(window.localStorage.getItem('currentCMS'));
			return cms;
		}
		catch (e) {
			return {};
		}
	},

	getCurrentCompanyId(){
		try{
			var company = JSON.parse(window.localStorage.getItem('currentCompany'));
			return company;
		}
		catch(e){
			return {};
		}
	},

	productid:"1946048392",

	getQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	changeURLPar: function (url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},
	getUserInfo(key = 'login') {

		var loginObj = {};
		try {
			loginObj = JSON.parse(localStorage.getItem(key));
		} catch (error) {
			//window.location.reload();
			window.location.hash = 'login';
			if (window.location.hash != '#/login') {
				//window.location.reload();
			}
		}

		return loginObj;
	},

	getAdminUserInfo() {
		return this.getUserInfo('adminlogin');
	},
	formatDate(time = +new Date()) {
		var date = new Date(time * 1000 + 8 * 3600 * 1000); // 增加8小时
		return date.toJSON().substr(0, 19).replace('T', ' ');
	},
	getProductListByAdmin() {

	},

	randomString(len) {
		var len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},

	heart(){
		if (!this.getUserInfo()){
			return;
		}
		var { userid, token } = this.getUserInfo().ui;
		var { socket} = this;
		setTimeout(() => {
			var json = JSON.stringify({ action: 500, ui: { userid: userid, token: token } })
			socket.send(json);
		}, 10*1000);
	},

	getTempToken(token){
		if (!this.socket){
			this.socket = new WebSocket("ws://newapi.zmiti.com:50294");
			
			var { socket } = this;
			this.socket.onopen = function () {
				
				var json = JSON.stringify({ action: zmitiActions.userActions.getTempToken.action, client_token: token });
				
				socket.send(json);
			};
			this.heart();
			this.socket.onmessage = (evt) => {
				var data = JSON.parse(evt.data);
				console.log(data,'===');
				
				switch (data.action) {
					case 0:
					case 9995:
						//提示并退出
						break;
					case 90000001://授权成功。
						if(data.getret === 0){
						}
						Vue.obserable.trigger({
							type: 'closeQrcodePage'
						});
						break;
					case 90000002:
						Vue.obserable.trigger({
							type: 'loginSuccess',
							data
						});
						break;
					case 500:
						this.heart();
						break;
					default:
						break;
				}
			};
		}else{
		

		}
		
		
	},

	listener(uid, tk) {

		var { userid, token } = this.getUserInfo().ui;

		if (!userid || !token) {
			userid = uid;
			token = tk;
		}
		if (this.socket) {
			return;
		}

		var socket = new WebSocket("ws://newapi.zmiti.com:50294");

		socket.onopen = function () {
			var json = JSON.stringify({ type:3,action: 10000000, ui: { userid: userid, token: token } })
			socket.send(json);
		};

		this.socket = socket;
		this.heart();

		socket.onmessage = (evt) => {
			var data = JSON.parse(evt.data);
			console.log(data, 'onmessage');
			if (data.getret === 0) {

				switch (data.action) {
					case 0:
					case 9995:

						break;
					case 90000001:
						Vue.obserable.trigger({
							type: 'closeQrcodePage'
						});
						break;
					case 90000002:
						break;
					case 500:
						this.heart();
						break;
					default:
						break;
				}
			}
			if (data.getret === 9995 || data.getret === 9994) {
				window.localStorage.clear();
				window.location.href = window.location.href.split('#')[0];
			}
		};

	},

	getProductList(fn) { //

		this.ajax({
			remark: 'getProductList',
			data: {
				action: zmitiActions.userActions.getProductList.action,
				condition: {
					page_index: 0,
					page_size: 20,
				}
			},
			success(data) {
				fn && fn(data);
			}
		})

	},

	adminAjax(option = {}) {
		option.isAdmin = true;
		this.ajax(option, () => {
			if (window.location.hash === '#/login') {
				setTimeout(() => {
					window.location.reload();
				}, 10);
			}
			window.location.hash = 'login';
			window.location.reload();

		});
	},

	createViewData(h5id) {
		axios.post('http://newapi.zmiti.com:50293/api/viewdata', JSON.stringify({ h5id, appsecret: 'c9GxtUre3kOJCgvp' })).then(data => {
			console.log(data.data);
		})
	},
	baseUrl: 'http://newapi.zmiti.com',
	ajax(option, adminErrorFn) {


		var opt = option.data || {};
		var _ui = option._ui || {};
		var userInfo = this.getUserInfo(option.isAdmin ? 'adminlogin' : 'login');

		if (userInfo && userInfo.ui) {
			opt.ui = Object.assign(userInfo.ui, _ui);
		}
		var  baseUrl = this.baseUrl;
		$.ajax({
			type:'post',
			url:baseUrl + '?name=' + (option.remark || '').toLowerCase(),
			data:JSON.stringify(opt),
			error(){
				option.fnError && option.fnError();
				option.error && option.error();
				option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
			},
			success(dt){

				if (dt.getret === 0) {

				}
				else if (dt.getret === 9997 || dt.getret === 9996) {

					window.localStorage[option.isAdmin ? 'adminlogin' : 'login'] = '';
					if (option.isAdmin) {
						adminErrorFn && adminErrorFn();
					} else {
						window.location.hash = '/login';
						setTimeout(() => {
							window.location.reload();
						}, 10);
					}

				}
				option.fn && option.fn(dt);
				option.success && option.success(dt);
			}
		});
		

		return;

	}




}
export default zmitiUtil;