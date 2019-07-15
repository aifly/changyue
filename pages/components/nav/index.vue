<template>
	<div class="zmiti-nav-main-ui lt-full">
		<h2 class='zmiti-title'>功能选择</h2>
		<div class='zmiti-function-list'>
			<ul>
				<li>
					<router-link to="index">
						<div class='zmt_iconfont'>&#xe609;</div>
					</router-link>
				</li>
				<li class='zmt_iconfont'>
					<router-link to="index">
						<div class='zmt_iconfont'>&#xe60c;</div>
					</router-link>
				</li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
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
				company_list:[]
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
 

