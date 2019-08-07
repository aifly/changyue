<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<div class='zmiti-back' >
			<router-link :to='"/nav"'></router-link>
		</div>
		<h2 class='zmiti-title'>工单
			<button type="button" class="ivu-btn ivu-btn-default" @click="openForm">
				<span v-show="toggleStatus==false">提交工单</span>
				<span v-show="toggleStatus==true">工单列表</span>				
			</button>
		</h2>
		<div class='zmiti-workorder-choose'>
			<div class="zmiti-workorder-list" v-show="toggleStatus==false">
				<header class='zmiti-workorder-header-bar'>
					工单列表					
				</header>
				<section>
					<ul>
						<li v-for="(item,index) in dataSource" :key="index">
							<div class="items">
								<div class="item-title">工单内容：</div>
								<div class="item-content">{{item.content}}</div>
							</div>
							<div class="items">
								<div class="item-title">时间：</div>
								<div class="item-content">{{item.createtime | formatDate}}</div>
							</div>
							<div class="items">
								<div class="item-title">状态：</div>
								<div class="item-content">
									{{orderStatus[item.status].status}}
								</div>
							</div>
						</li>
					</ul>
				</section>
			</div>
			<div class="zmiti-workorder-choose-inner" v-show="toggleStatus==true">				

				<form class="ivu-form" :model="formWorkOrder">
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">问题描述：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<textarea wrap="soft" autocomplete="off" spellcheck="false" rows="4" class="ivu-input" v-model="formWorkOrder.content"></textarea>
								<div class="ivu-form-item-error-tip" v-if="formcontentstatus===true">问题描述不能为空</div>
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">手机号：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<input autocomplete="off" spellcheck="false" type="text" class="ivu-input ivu-input-default" v-model="formWorkOrder.usermobile">
								<div class="ivu-form-item-error-tip" v-if="formmobilestatus===true">{{mobileMsg}}</div>
							</div>
						</div>
					</div>
					<div class="ivu-form-item">
						<label class="ivu-form-item-label">接收短信时间：</label>
						<div class="ivu-form-item-content">
							<div class="ivu-input-wrapper">
								<div class="ivu-radio-group">
									<label :class="['ivu-radio-wrapper','ivu-radio-group-item','ivu-radio-default']" @click="radioHandle(0)">
									<span :class="['ivu-radio',{'ivu-radio-checked':formWorkOrder.smstime===0}]">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input" value="0" v-model="formWorkOrder.smstime"></span>
									任意时间</label>

									<label class="ivu-radio-wrapper ivu-radio-group-item ivu-radio-default" @click="radioHandle(1)">
									<span :class="['ivu-radio',{'ivu-radio-checked':formWorkOrder.smstime===1}]">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input" value="1" v-model="formWorkOrder.smstime"></span>
									每天9点~18点</label>

									<label class="ivu-radio-wrapper ivu-radio-group-item ivu-radio-default" @click="radioHandle(2)">
									<span :class="['ivu-radio',{'ivu-radio-checked':formWorkOrder.smstime===2}]">
									<span class="ivu-radio-inner"></span>
									<input type="radio" class="ivu-radio-input" value="2" v-model="formWorkOrder.smstime"></span>
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
								<div class="ivu-form-item-error-tip" v-if="formemailstatus===true">{{emailMsg}}</div>
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

<style type="text/css">
.zmiti-changyue-main-ui .zmiti-dialog-close{z-index:99;}
</style>
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
				toggleStatus:false,
				formcontentstatus:false,
				formmobilestatus:false,
				formemailstatus:false,
				mobileMsg:'手机号不能为空',
				condition:{
					page_index:0,
					page_size:10,
				},
				dataSource:[{
					content:'工单的内容1工单的内容1工单的内容1工单的内容1工单的内容1工单的内容1工单的内容1工单的内容1',
					createtime:'2019-08-04',
					status:0
				},{
					content:'工单的内容2',
					createtime:'2019-08-05',
					status:0
				},{
					content:'工单的内容3',
					createtime:'2019-08-06',
					status:0
				}],
				formWorkOrder:{
					//powerid:6,//默认类型
					smstime:2,//接收时间
				 	productid:'1946048392',//畅阅产品
				 	useremail:'',
				 	usermobile:'',
				 	content:''
				},
				orderStatus:{
					0: {
						status: '已禁用'
					},
					1:{
						status:'已受理'
					},
					2:{
						status:'已处理'
					},
					3:{
						status:'已确认'
					},
					4:{
						status:'已评价'
					}
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
			this.getDataList();
			//console.log(userActions,'userActions')
		},
		
		methods:{
			getDataList(){//工单列表
				zmitiUtil.ajax({
					remark:'getUserWorkOrderList',
					data:{
						action:userActions.getUserWorkOrderList.action,
						condition:this.condition
					},
					success(data){
						if(data.getret === 0){
							//console.log(data.list);
							s.dataSource = data.list;
						}
					}
				})
			},
			submitWorkOrder(){//提交工单
				//console.log(this.formWorkOrder,'this.formWorkOrder');
				var s = this;
				zmitiUtil.ajax({
					remark:'userCommitWorkOrder',
					data:{
						action:userActions.userCommitWorkOrder.action,
						info:s.formWorkOrder
					},
					success(data){
						if(data.getret===0){
							s.formstatus=false;
							s.workorderstatus=true;
							s.toggleStatus=false;
							s.formWorkOrder={
								smstime:2,
							 	productid:'1946048392',
							 	useremail:'',
							 	usermobile:'',
							 	content:''
							}
						}else if(data.getret===4){
							console.log('没有问题描述');
							s.formcontentstatus=true;
						}else if(data.getret===6){
							console.log('没有手机号');
							s.formcontentstatus=false;
							s.formmobilestatus=true;
							s.formcontentstatus=false;
						}else if(data.getret===7){
							s.formmobilestatus=true;
							s.formcontentstatus=false;
							s.mobileMsg='手机号格式有误';
						}else if(data.getret===9){
							s.formmobilestatus=false;
							s.formcontentstatus=false;
							s.formemailstatus=true;
							s.emailMsg='邮箱格式有误';
						}else{
							s.formemailstatus=false;
							s.formcontentstatus=false;
						}
					}
				});
			},
			openForm(){
				this.toggleStatus=!this.toggleStatus;
			},
			radioHandle(val){
				this.formWorkOrder.smstime=val;
			}
		},
		filters: {
	        formatDate: function (value) {
				let date = new Date(value*1000);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h +':'+m+':'+s;
		    }
	    }
	}
</script>
 

