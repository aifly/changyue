<template>
	<div  class="zmiti-login-ui lt-full" >
		<div class='zmiti-login-C'>
			<h2 class='zmiti-title'>登录</h2>
			<div class='zmiti-icon'>
				<img src="chrome-extension://ccaajbldnogccgckclndmioalfneplic/assets/images/logo.png" alt="">
			</div>

			<div class='zmiti-login-form'>
				<h3>账号密码登录</h3>
				<div class='zmiti-login-input'>
					<input type="text"  v-model='username' placeholder="智媒体用户名" />
				</div>
				<div class='zmiti-login-input'>
					<input type="password" v-model='password' placeholder="智媒体密码" @keydown.13='login'/>
				</div>
				<div class='zmiti-login-error'>{{errMsg}}</div>
				<div class='zmiti-login-btn' @click='login'>登录</div>
			</div>
		</div>

		<div class='zmiti-qrcode-page' v-if='showQRCodePage'>
			<div ref='container'></div>
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
				showQRCodePage:false,
				errMsg:"",
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
				this.showQRCodePage = false;
				this.$router.push({path:this.companyList.length<=1?"/nav":'/company/'});
			})
		},
		
		methods:{
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
								setTimeout(() => {
									zmitiUtil.createQrCode(s.$refs['container'],data.info.wechat_auth_url);
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
 