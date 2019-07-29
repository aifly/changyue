<template>
	<div class="zmiti-password-main-ui lt-full">
		<div class='zmiti-back' >
			<router-link :to='"/user"'></router-link>
		</div>
		<h2 class='zmiti-title'>修改密码</h2>

		<div class='zmiti-password-C'>
			<div class='zmiti-password-input'><input v-model="oldPass" placeholder="请输入旧密码" type="text"></div>
			<div class='zmiti-password-input'><input v-model="newPass" placeholder="请输入新密码" type="text"></div>
			<div class='zmiti-password-input'><input v-model="surePass" placeholder="请再次输入新密码" type="text"></div>
			<div class='zmiti-password-msg'>{{errorMsg}}</div>
			<div class='zmiti-modify-password-btn' @click="modifyPass" v-press>完成</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions} = zmitiUtil;
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				errorMsg:'',
				oldPass:'',
				newPass:'',
				surePass:'',
				menuList:[
					{
						name:'我的审查',
						to:'/company'
					},{
						name:'我的提交',
						to:'/company'
					},{
						name:'切换单位',
						to:'/company'
					},{
						name:'修改密码',
						to:'/company'
					}
				]
			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		watch:{
			
		},
		mounted(){
			 

		},
		
		methods:{
			toast(msg,time = 2000){
				this.errorMsg = msg;
				setTimeout(() => {
					this.errorMsg = '';
				}, time);
			},
			modifyPass(){
				var s = this;
				if(!s.oldPass){
					s.toast('旧密码不能为空');
					return;
				}
				if(!s.newPass){
					s.toast('新密码不能为空');
					return;
				}
				if(s.newPass !== s.surePass){
					s.toast('两次密码不一致');
					return;
				}
				zmitiUtil.ajax({
					remark:'userModifyPassword',
					data:{
						action:userActions.userModifyPassword.action,
						oldpwd:s.oldPass,
						newpwd:s.newPass
					},
					success(data){
						if(data.getret === 0){
							Vue.obserable.trigger({
								type:"showToast",
								data:{
									type:'msg',
									content:data.msg + ' :)',
									duration:2000
								}
							});
							s.$router.push({path:'/user'})
						}
						console.log(data);
					}
				});
			}
		}
	}
</script>
 

