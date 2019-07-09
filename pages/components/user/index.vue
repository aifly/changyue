<template>
	<div class="wm-user-ui">
		<header>
			<div>个人中心</div>
		</header>
		<div class="wm-user-center">
			<div>
				<div class="wm-user-form-item">
					<label for="">用户名：</label><input type="text"  v-model='userinfo.username'>
					<div class="wm-user-error" v-if='userError'>{{userError}}</div>
				</div>
				<div class="wm-user-form-item">
					<label for="">密码：</label><input :disabled='!showPassWord' type="password" v-model="userinfo.password">
					<Button type='primary' @click='modifyPwd'>{{showPassWord?'确定':'修改密码'}}</Button>
					<div class="wm-user-error" v-if='passError'>{{passError}}</div>
				</div>
				<div class="wm-user-form-item" v-if='showPassWord'>
					<label for="">确认密码：</label><input type="password" v-model="userinfo.repassword">
					
					<div class="wm-user-error" v-if='repassError'>{{repassError}}</div>
				</div>
				<div class="wm-user-form-item">
					<label for="">姓名：</label><input type="text" v-model="userinfo.nickname">
					<div class="wm-user-error" v-if='usernameError'>{{usernameError}}</div>
				</div>
				<div class="wm-user-form-item">
					<label for="">手机：</label><input type="text" v-model="userinfo.mobile">
					<div class="wm-user-error" v-if='mobileError'>{{mobileError}}</div>
				</div>
				<div class="wm-user-form-item ">
					<label for="">单位：</label><input type="text" v-model="userinfo.companyname">
					<div class="wm-user-error" v-if='companyError'>{{companyError}}</div>
				</div>

				<div class="wm-user-form-item " >
					<label for="">地址：</label>
					<Cascader v-model="userinfo.cityids"  :load-data="getCityById"  change-on-select :data='provinceList'></Cascader>
				</div>

				<div class="wm-user-form-item ">
					<label for="">详细地址：</label><input type="text" v-model="userinfo.detailaddress">
				</div>
				<div class="wm-user-form-item ">
					<label for="">邮箱：</label><input type="text"  v-model="userinfo.email">
				</div>
				<div class="wm-user-form-item wx-reg-btn" @click="modifyUser">
					确 定
				</div>
			</div>
		</div>

		
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				imgs:window.imgs,
				isLoading:false,
				userError:"",
				showPassWord:false,
				companyError:"",
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",

				provinceList:[],

				
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

			this.validate = validate;
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			
			
			this.getCityData();
			this.getCityById({__value:this.userinfo.provinceid*1+','+this.userinfo.cityid*1});

			this.userinfo.cityids = [this.userinfo.provinceid*1,this.userinfo.cityid*1,this.userinfo.areaid*1]

		},
		
		methods:{

			modifyPwd(){
				if(!this.showPassWord){
					this.showPassWord = true;
				}else{
					var s = this;
					if(!this.userinfo.password){
						this.passError ='密码不能为空';
						setTimeout(() => {
							this.passError ='';
						}, 2000);
						return;
					}

					if(this.userinfo.repassword !== this.userinfo.password){
						this.repassError ='两次密码不一致';
						setTimeout(() => {
							this.repassError ='';
						}, 2000);
						return;
					};

					symbinUtil.ajax({
						_this:s,
						url:window.config.baseUrl+'/wmadvuser/updateuserpwd/',
						data:{
							username:s.userinfo.username,
							accesstoken:s.userinfo.accesstoken,
							userpwd:s.userinfo.password
						},
						success(data){
							console.log(data);
							if(data.getret === 0){
								
								s.$Message.success('修改密码成功,请重新登录');
								setTimeout(() => {
									window.location.hash = '#/login';
								}, 400);
							}
							else{
								s.$Message.error('修改密码失败');
							}
						}
					})
				}
			},

			getCityById(e,callback){
				
				var provinceId = e.__value.split(',')[0];
				var cityid = e.__value.split(',')[1];
				var s = this;
				
				symbinUtil.ajax({
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
				symbinUtil.ajax({
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
			modifyUser(){

				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadvuser/updateuser',
					validate:s.validate,
					data:{
						username:s.userinfo.username,
						accesstoken:s.userinfo.accesstoken,
						nickname:s.userinfo.nickname,
						mobile:s.userinfo.mobile,
						detailaddress:s.userinfo.detailaddress,
						email:s.userinfo.email,
						provinceid:s.userinfo.cityids[0],
						cityid:s.userinfo.cityids[1],
						areaid:s.userinfo.cityids[2],
						companyname:s.userinfo.companyname
					},success(data){
						console.log(data);
						 if(data.getret === 0){
							s.$Message.success(data.getmsg);
							data.list.username = s.userinfo.username;
							data.list.accesstoken = s.userinfo.accesstoken;
							window.localStorage.setItem('login',JSON.stringify(data.list));
							///window.location.hash =  '/login';
						}else{
							s.$Message.error('修改密码失败');
						} 
					}

				})

			},
			ok(){
				if(this.formUser.newpassword  !== this.formUser.surepassword){
					this.$Message.error('新密码和确认密码不一致');
					return false;
				}
				var s = this;

				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmuser/modify_password',
					validate:s.validate,
					data:{
						oldpassword:s.formUser.oldpassword,
						password:s.formUser.newpassword,
						repassword:s.formUser.surepassword
					},success(data){

						if(data.getret === 0){
							s.$Message.warning('请重新登录');
							window.location.hash =  '/login';
						}else{
							s.$Message.error('修改密码失败');
						}
					}

				})
				
			},
			cancel(){
				this.formUser = {};
			}
		}
	}
</script>
 