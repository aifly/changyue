<template>
	<div class="zmiti-checkuser-main-ui lt-full">
		<h2 class='zmiti-title'>审核人员名单</h2>
			<div class='zmiti-checkuser-list  zmiti-scroll'>
				<h3>已选审核人：</h3>
				<ul class='zmiti-has-checked'>
					<li v-for='(user,i) of checkedUser' :key="i" title='点击移除'>
						{{user.username}}
					</li>
				</ul>
				<h3>未选审核人：</h3>
				<div v-for='(checkuser,i) of checkuserList' :key="i">
					<h3>{{checkuser.departmentname}}</h3>
					<ul class='zmiti-has-unchecked'>
						<li v-for='(item,k) of checkuser.list' :key="k" title='点击选择'>
							{{item.username}}
						</li>
						
					</ul>
				</div>
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
				company_list:[],
				checkedUser:[
					{
						userid:1,
						username:'徐畅'
					}
				],
				checkuserList:[
					{
						departmentname:'宣传部',
						list:[
							{
								userid:1,
								username:'徐畅'
							},{
								userid:1,
								username:'徐畅'
							},{
								userid:1,
								username:'徐畅'
							}
						]
					},
					{
						departmentname:'组织部',
						list:[
							{
								userid:1,
								username:'徐畅'
							},{
								userid:1,
								username:'徐畅'
							},{
								userid:1,
								username:'徐畅'
							}
						]
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
			 
		  this.userinfo = zmitiUtil.getUserInfo();
		  this.company_list = this.userinfo.info.company_list;

		},
		
		methods:{
			 
		}
	}
</script>
 

