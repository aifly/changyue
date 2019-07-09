<template>
	<div class="zmiti-checkuser-main-ui lt-full">
		<h2 class='zmiti-title'>审核人员名单</h2>
			<div class='zmiti-checkuser-list  zmiti-scroll'>
				<h3>已选审核人：</h3>
				<ul class='zmiti-has-checked'>
					<li title='点击移除'>徐畅徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
					<li title='点击移除'>徐畅</li>
				</ul>
				<h3>未选审核人：</h3>
				
				<ul class='zmiti-has-unchecked'>
					<li title='点击选择'>徐畅徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
					<li title='点击选择'>徐畅</li>
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
 

