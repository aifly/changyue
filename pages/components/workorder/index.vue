<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<header class="zmiti-tab-header">
			<div>提交工单</div>
			<div>
			</div>
		</header>

		<div class='zmiti-workorder-choose'>
			<header class='zmiti-workorder-header-bar'>
				咨询类工单问题
			</header>
			<template v-if='formWorkOrder.workordertype <= -1 && !formWorkOrder.productid'>
				<ul >
					<li v-for='(type ,i) of workOrderType' :key="i">
						<div class='zmiti-workerorder-type-top'>
							<div>{{type.type}}</div>
							<div><Button @click="formWorkOrder.workordertype = i">提问</Button></div>
						</div>
						<div>
							{{type.desc}}
						</div>
					</li>
				</ul>
				<header class='zmiti-workorder-header-bar' style='margin-top:30px;'>
					产品类型工单问题
				</header>
				<ul>
					<li v-for='(type ,i) of productionList' :key="i" style="background:#eee">
						<div class='zmiti-workerorder-type-top zmiti-workerorder-type-top1'>
							<div style='margin-right:30px;'>{{type.productname}}</div>
							<div><Button @click="chooseOrderType(type)">提问</Button></div>
						</div>
						<div>
							{{type.desc}}
						</div>
					</li>
				</ul>
			</template>
			<Form :rules="ruleValidate"  style="padding-top:20px;width:90%;margin:0 auto;" v-else class='zmiti-add-form-C' :model="formWorkOrder" :label-width="100">
				<FormItem label="问题描述：" prop='content'>
					<Input :rows="4"  type='textarea' v-model="formWorkOrder.content" placeholder="问题描述：" />
				</FormItem>
				<FormItem label="手机号：" prop='usermobile'>
					<Input v-model="formWorkOrder.usermobile" placeholder="手机号：" />
				</FormItem>
				
				<FormItem  label="接收短信时间：">
					 <RadioGroup v-model="formWorkOrder.smstime">
						<Radio :label="0">任意时间</Radio>
						<Radio :label="1">每天9点~18点</Radio>
						<Radio :label="2">从不接收</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="邮箱：" prop='useremail'>
					<Input v-model="formWorkOrder.useremail" placeholder="邮箱：" />
				</FormItem>
				<FormItem  label="附件上传：">
					 <Button icon='md-cloud-upload'>上传</Button>
				</FormItem>
				<FormItem  label="">
					 <Button type='primary' @click="submitWorkOrder">提交</Button>
				</FormItem>
			</Form>
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

				productionList:[],
				formWorkOrder:{
					workordertype:-1,
					smstime:2,
				 	productid:'',
				},

				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1
				},
				ruleValidate: {
					content: [
						{ required: true, message: '问题描述不能为空', trigger: 'blur' }
					],
					usermobile:[
						{ required: true, message: '手机号不能为空', trigger: 'blur' }
					]
				},
				workOrderType:[
					{
						type:'财务类',
						desc:'订单，合同，充值，发票，汇款，等与资金相关问题'
					},{
						type:'会员帐号类',
						desc:'更换用户信息，找回密码，空间，到期时间，用户数等相关'
					},{
						type:'定制服务类',
						desc:'个性化定制，设计，规划及相关服务类问题'
					},{
						type:'产品技术类',
						desc:'现有产品的所有技术相关问题及接口类问题'
					},{
						type:'其它类',
						desc:'您无法判断的所有问题都可以此选择提问'
					}
				]
			
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		watch:{
			
		},
		mounted(){
			
			
			this.getProductList();

			



		},
		
		methods:{
			chooseOrderType(type){
				
				this.formWorkOrder.productid = type.productid
				console.log(this.formWorkOrder,'this.formWorkOrder')
			},
			getProductList(){
				zmitiUtil.getProductList((data)=>{
					if(data.getret  === 0){
						this.productionList = data.list;
					}
				})
			},

			submitWorkOrder(){//提交工单
				if(this.formWorkOrder.workordertype === -1){
					delete this.formWorkOrder.workordertype;
				}
				var {$Message} = this;
				zmitiUtil.ajax({
					remark:'userCommitWorkOrder',
					data:{
						action:userActions.userCommitWorkOrder.action,
						info:this.formWorkOrder
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						setTimeout(() => {
							window.location.hash = '/workorderlist';
						}, 1000);
					}
				});
			}
			
			
		}
	}
</script>
 

