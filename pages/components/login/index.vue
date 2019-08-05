<template>
	<div  class="zmiti-login-ui lt-full" >
		<div class='zmiti-login-C'>
			<h2 class='zmiti-title'>登录</h2>
			<div class='zmiti-icon'>
				<img src="chrome-extension://ccaajbldnogccgckclndmioalfneplic/assets/images/logo.png" alt="">
			</div>

			<div class='zmiti-login-form'>
				<h3>
					<div @click='changeLoginType(0)' :class="{'active':loginType === 0}">账号密码登录</div>
					<div @click='changeLoginType(1)' :class="{'active':loginType === 1}">二维码登录</div>
				</h3>
				<template v-if='loginType === 0'>
					<div class='zmiti-login-input'>
						<input type="text"  v-model='username' placeholder="智媒体用户名" />
					</div>
					<div class='zmiti-login-input'>
						<input type="password" v-model='password' placeholder="智媒体密码" @keydown.13='login'/>
					</div>
					<div class='zmiti-login-error'>{{errMsg}}</div>
					<div class='zmiti-login-btn' @click='login'>登录</div>
				</template>
				<template v-else>
					<div class='zmiti-login-qrcode'>
						<div ref='loginqrcode'></div>
						<section>{{qrCodeErrMsg}}</section>
					</div>
				</template>
			</div>
		</div>

		<div class='zmiti-qrcode-page' v-if='showQRCodePage && qrCodePageIndex>-1'>
			<section>

				
				<template  v-if='qrCodePageIndex===0'>
					<h2>请完成账号绑定操作</h2>
					<h2>第一步</h2>
				</template>
				<template v-else>
					<h2>请关注公众号</h2>
					<h2>第二步</h2>
				</template>
				<div class='zmiti-qrcode-C'>
					<div class='zmiti-scan-tip'>微信扫描二维码关注智小媒微信公众号</div>
					<div class='zmiti-warning-tip'>
						您即将进入畅阅平台，请保证网络畅通
						<span>&times;</span>
					</div>
					<div ref='container' class='zmiti-qrcode-role'>
						
					</div>
					<div class='zmiti-logo'>
						<img v-if='qrCodePageIndex === 0' src="chrome-extension://ccaajbldnogccgckclndmioalfneplic/assets/images/logo.png" alt="">
						<img v-else src="chrome-extension://ccaajbldnogccgckclndmioalfneplic/assets/images/zxm.png" alt="">
					</div>
					<div class='zmiti-sms-tip' v-if='qrCodePageIndex === 0'>我不想关注，只用手机短信接收信息</div>
				</div>
			</section>
			
		</div>
	</div>

</template>

<script>
	import zmitiUtil from '../../common/lib/util';
	import Vue from "vue";

	var userActions = zmitiUtil.userActions;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				qrCodeErrMsg:'',
				showQRCodePage:false,
				qrCodePageIndex:-1,
				errMsg:"",
				loginType:0,
				viewH:document.documentElement.clientHeight,
				username:window.localStorage.getItem('cy-username'),
				password:window.localStorage.getItem('cy-password')

			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		mounted() {
			if(this.username && this.password){
				//this.login();
			}


			Vue.obserable.on('closeQrcodePage',()=>{
				this.qrCodePageIndex = 1;
				this.getWXCode((data)=>{
					this.$refs['container'].innerHTML = '';
					zmitiUtil.createQrCode(s.$refs['container'],data.url,170);
				},2)
				var t = setInterval(() => {
					zmitiUtil.ajax({
						remark:'getWXFollow',
						data:{
							action:userActions.getWXFollow.action
						},
						success(data){
							if(data.getret === 0){
								clearInterval(t);
								s.showQRCodePage = false;
							}
						}
					});
				}, 3000);
				//this.showQRCodePage = false;
				//this.$router.push({path:this.companyList.length<=1?"/nav":'/company/'});
			})

			var s = this;
			Vue.obserable.on('loginSuccess',(data)=>{

				if (data.getret === 0 || data.getret === 100) {
					var {username,password } = this;
					window.localStorage.clear();
					window.localStorage.setItem('login', JSON.stringify(data));
					window.localStorage.setItem('cy-username', username);
					window.localStorage.setItem('cy-password', password);
					var companyList = data.info.company_list;
					s.companyList = companyList;
					if(companyList.length <= 0){
						alert('你还没有绑定单位');
						return;
					}
					if(companyList.length<=1){
						window.localStorage.setItem('currentCompany',JSON.stringify(companyList[0]));
					}
					zmitiUtil.listener();
					if(data.info.wechat_auth_url){
						s.showQRCodePage = true;
						s.qrCodePageIndex = 0;
						setTimeout(() => {
							zmitiUtil.createQrCode(s.$refs['container'],data.info.wechat_auth_url,170);
						}, 10);
					}
					else{
						s.$router.push({path:companyList.length<=1?"/nav":'/company/'});
					}

				}else{
					s.qrCodeErrMsg = data.msg;
					s.createLoginQRCode();
					setTimeout(() => {
						s.qrCodeErrMsg = '';
					}, 4000);
				}

			})
		},
		
		methods:{
			changeLoginType(index){
				if(this.loginType === index){
					return;
				}
				this.loginType = index;
				var s = this;
				if(index === 1){//二维码登录
					this.createLoginQRCode();
				}
			},
			createLoginQRCode(){
				var s = this;
				this.getWXCode(function(info){
					zmitiUtil.getTempToken(info.token);
					s.$refs['loginqrcode'].innerHTML = '';
					zmitiUtil.createQrCode(s.$refs['loginqrcode'],info.url,170);
				},1)
			},
			getWXCode(fn,type=1){
				var s = this;

				zmitiUtil.ajax({
					remark:'getWXCode',
					data:{
						action: userActions.getWXCode.action,
						type,
					},
					success(data){
						if(data.getret === 0){
							fn && fn (data.info);	
						}
					}
				})
			},
			login(){
				var {username,password} =this;
				var s= this;
				zmitiUtil.ajax({
					remark:'login',
					data:{
						action:userActions.userLogin.action,
						username,
						password
					},
					success(data){
					
						if (data.getret === 0 || data.getret === 100) {
							window.localStorage.clear();
							window.localStorage.setItem('login', JSON.stringify(data));
							window.localStorage.setItem('cy-username', username);
							window.localStorage.setItem('cy-password', password);
							var companyList = data.info.company_list;
							s.companyList = companyList;
							if(companyList.length <= 0){
								alert('你还没有绑定单位');
								return;
							}
							if(companyList.length<=1){
								window.localStorage.setItem('currentCompany',JSON.stringify(companyList[0]));
								
							}
							zmitiUtil.listener();
							if(data.info.wechat_auth_url){
								s.showQRCodePage = true;
								s.qrCodePageIndex = 0;
								setTimeout(() => {
									//s.getWXCode(function())
									zmitiUtil.createQrCode(s.$refs['container'],data.info.wechat_auth_url,170);
								}, 10);
							}
							else{
								s.$router.push({path:companyList.length<=1?"/nav":'/company/'});
							}

						}else{
							s.errMsg = data.msg;
							setTimeout(() => {
								s.errMsg = '';
							}, 2000);
						}
					}
				})
			}
		}
	}
</script>
 <style lang='scss' scope>
	@import './index.scss';
 </style>
 