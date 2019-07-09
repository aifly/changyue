<template>
	<div  class="wm-reg-ui lt-full">
		<header>
			<div>
				<div><img :src="imgs.userLoginTitle"  /></div>
				<div>
					已有账号：<a href='#/login'>去登录></a>
				</div>
			</div>
		</header>
		<section>
			<div class="wm-reg-C">
				<div class="wm-reg-form">
					<h2>欢迎注册智媒体2.0～</h2>
					<section class='zmiti-add-form zmiti-scroll' >
						<div class='zmiti-admin-avatar' @click="showAvatarModal = true">
							<span class='zmt_iconfont' v-html='formUser.avatar'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :rules="ruleValidate" :model="formUser" :label-width="100">
							<FormItem label="用户名：" prop='username'>
								<Input v-model="formUser.username" placeholder="用户名：" />
							</FormItem>
							<FormItem label="真实姓名：" prop='realname'>
								<Input v-model="formUser.realname" placeholder="真实姓名：" />
							</FormItem>
							<FormItem label="密码：" prop='password'>
								<Input type='password' v-model="formUser.password" placeholder="密码：" />
							</FormItem>
							<FormItem label="确认密码：" v-if='false'>
								<Input type='password' v-model="formUser.repassword" placeholder="确认密码：" />
							</FormItem>
							<FormItem label="邮箱：" prop='useremail'>
								<Input v-model="formUser.useremail" placeholder="邮箱：" />
							</FormItem>
							<FormItem label="手机号：" prop='usermobile'>
								<Input v-model="formUser.usermobile" placeholder="手机号：" />
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click="reg">注册</Button>
						</div>
					 
					</section>
					
				</div>
				<div class="wm-copyright">
					智媒体 &copy;版权所有
				</div>
			</div>
		</section>
		<Avatar v-model="showAvatarModal" :avatar='formUser.avatar' @getAvatar='getAvatar'></Avatar>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var userActions = zmitiUtil.userActions;
	import Vue from "vue";

	import Avatar from '../../common/avatar';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				username:'',
				showAvatarModal:false,
				password:'',
				checked:false,
				isLogined:false,
				isMove:false,
				showLoading:false,
				showError:false,
				errorMsg:'',
				provinceList:[
				
				],
				userError:"",
				companyError:"",
				usernameError:"",
				passError:"",
				repassError:"",
				emailError:"",
				formUser:{
					avatar:'&#xe6a4;'
				},

				ruleValidate:{
					username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
					],
					realname: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
					],
					password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
					],
					useremail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' }
					],
					usermobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
				},

				viewH:document.documentElement.clientHeight
			}
		},
	
		components:{
			Avatar
		},
		
		methods:{
			getAvatar(avatar){
				this.formUser.avatar = avatar;
			},
			checkUserName(){
				if(!this.formUser.username){
					this.toastError('请输入用户名');
					return;
				}
			 
			},
			toastError(msg =  '用户名不能为空',type='userError'){
				this.$Message.error(msg);
			},
			reg(){
				var _this = this;
				
				if(!this.formUser.username){
					this.toastError();
 					return;
				}
				
				if(!this.formUser.password){
					this.toastError('密码不能为空','passError');
 					return;
				}
				/* if(!this.formUser.repassword){
					this.toastError('确认密码不能为空','repassError');
 					return;
				}
				if(this.formUser.repassword !==this.formUser.password) {
					this.toastError('两次密码输入不一致','repassError');
 					return;
				} */
				if(!this.formUser.useremail){
					this.toastError('邮箱不能为空','usernameError');
 					return;
				}
				if(!this.formUser.realname){
					this.toastError('姓名不能为空','usernameError');
 					return;
				}
				if(!this.formUser.usermobile){
					this.toastError('手机不能为空','emailError');
 					return;
				}
				 

				var params = this.formUser;
				params.userpwd = params.password;
				params.useremail = params.useremail || '';
				params.username = params.username || '';
				params.realname = params.realname;
				params.usermobile = params.usermobile || '';

				this.showLoading = true;
				zmitiUtil.ajax({
					data:{
						action:userActions.userRegister.action,
						info:params
					},
					remark:'userRegister',
					success(data){
						if(data.getret === 0){
							_this.$Message.success({ 
								content: '注册成功,等待管理员审核……',
                    			duration: 4,
							});
							setTimeout(()=>{
								window.location.hash = '#/login'
							},4000)
						}else{
							_this.$Message.error(data.msg);
						}
					}
				})
			},
			getCityById(e,callback){
				
				var provinceId = e.__value.split(',')[0];
				var cityid = e.__value.split(',')[1];
				var s = this;

				
				zmitiUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/share/getarealist',
					data:{
						cityid
					},
					success(data){
						if(data.getret === 0){
							console.log(data);
							s.provinceList.forEach((item,i)=>{
								if(item.value === provinceId*1){
									item.children.forEach((child,k)=>{
										if(child.value === cityid*1){
											child.children = child.children || [];
											data.list.map((d,l)=>{
												child.children.push({
													value:d.cityid,
													label:d.name,
													//loading: false
												})
											})
											
										}
									})
									callback();
									
								}
								
							});
							

						}
					}

				})
			},
			getCityData(){
				var s = this;
				zmitiUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/share/getcitylist/',
					data:{},
					success(data){
						//console.log(data);
						if(data.getret === 0){
							data.list.map((item,i)=>{
								var children = [];
								item.children && item.children.map((child,l)=>{
									children.push({
										value:child.cityid,
										label:child.name,
										loading: false,
										children:[]
										
									})
								})
								s.provinceList.push({
									value:item.cityid,
									label:item.name,
									children,
									loading: false
								})
							})
						}
					}
				})
			},
			checkCache(){
				/*var username = window.localStorage.getItem('wm_username'),
					password = window.localStorage.getItem('wm_password');
				
				if(username && password){
					this.username = username;
					this.password = password;
					this.checked = true;
				}*/
			}
		
			

		},
		mounted(){
			//this.checkCache();
			this.getCityData();
		}
	}
</script>
 <style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 