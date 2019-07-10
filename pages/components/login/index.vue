<template>
	<div  class="zmiti-login-ui lt-full" >
		<div class='zmiti-login-C'>
			<h2 class='zmiti-title'>登录</h2>
			<div class='zmiti-icon'>

			</div>

			<div class='zmiti-login-form'>
				<h3>账号密码登录</h3>
				<div class='zmiti-login-input'>
					<input type="text"  v-model='username' placeholder="智媒体用户名" />
				</div>
				<div class='zmiti-login-input'>
					<input type="password" v-model='password' placeholder="智媒体密码" />
				</div>
				<div class='zmiti-login-btn' @click='login'>登录</div>
			</div>
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
				this.login();
			}
		},
		
		methods:{
			login(){
				var {username,password} =this;
				zmitiUtil.ajax({
					remark:'login',
					data:{
						action:userActions.userLogin.action,
						username,
						password
					},
					success(data){

					
						if (data.getret === 0 || data.getret === 100) {
							
							window.localStorage.setItem('login', JSON.stringify(data));
							window.localStorage.setItem('cy-username', username);
							window.localStorage.setItem('cy-password', password);
							window.location.hash = '#/company'
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
 