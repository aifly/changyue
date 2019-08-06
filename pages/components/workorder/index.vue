<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<header class="zmiti-tab-header">
			<div>提交工单</div>
			<div>
			</div>
		</header>

		<div class='zmiti-workorder-choose'>
			<div class="zmiti-workorder-list" v-show="workorderstatus">
				<header class='zmiti-workorder-header-bar'>
					工单列表
				</header>
			</div>
			<div class="zmiti-workorder-choose-inner" v-show="formstatus">
				

				<form class="ivu-form" :rules="ruleValidate" :model="formWorkOrder">
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">问题描述：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<textarea wrap="soft" autocomplete="off" spellcheck="false" rows="4" class="ivu-input" v-model="formWorkOrder.content"></textarea>
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">手机号：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<input autocomplete="off" spellcheck="false" type="text" class="ivu-input ivu-input-default" v-model="formWorkOrder.usermobile">
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">接收短信时间：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<div class="ivu-radio-group" v-model="formWorkOrder.smstime">
									<label class="ivu-radio-wrapper ivu-radio-group-item ivu-radio-default ivu-radio-wrapper-checked">
									<span class="ivu-radio ivu-radio-checked">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input"></span>
									任意时间</label>
									<label class="ivu-radio-wrapper ivu-radio-group-item ivu-radio-default">
									<span class="ivu-radio">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input"></span>
									每天9点~18点</label>
									<label class="ivu-radio-wrapper ivu-radio-group-item ivu-radio-default">
									<span class="ivu-radio">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input"></span>
									从不接收</label>
								</div>
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">邮箱：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<input autocomplete="off" spellcheck="false" type="email" class="ivu-input ivu-input-default" v-model="formWorkOrder.useremail">
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label"></label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<button type="button" class="ivu-btn ivu-btn-primary" @click="submitWorkOrder"><span>提交</span></button>
							</div>
						</div>
					</div>
				</form>
			</div>

		</div>

	</div>
</template>


<style lang="scss" scoped>
@import './index.scss';
</style>
<script>
	import zmitiUtil from '../../common/lib/util';
	var userActions = zmitiUtil.userActions;
	
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				formstatus:false,//隐藏表单
				workorderstatus:true,//显示工单列表
				formWorkOrder:{
					powerid:6,//默认类型
					smstime:2,//接收时间
				 	productid:'1946048392',//畅阅产品
				 	useremail:'',
				 	usermobile:'',
				 	content:''
				},
				ruleValidate: {
					content: [
						{ required: true, message: '问题描述不能为空', trigger: 'blur' }
					],
					usermobile:[
						{ required: true, message: '手机号不能为空', trigger: 'blur' }
					]
				}
			
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
		},
		watch:{
			
		},
		mounted(){
			this.userinfo = zmitiUtil.getUserInfo();
			console.log(userActions.userCommitWorkOrder,'用户提交工单')
		},
		
		methods:{

			submitWorkOrder(){//提交工单
				console.log(this.formWorkOrder,'this.formWorkOrder');
				zmitiUtil.ajax({
					remark:'userCommitWorkOrder',
					data:{
						action:userActions.userCommitWorkOrder.action,
						info:this.formWorkOrder
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
					}
				});
			}
		}
	}
</script>
 

