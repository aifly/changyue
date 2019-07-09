<template>
	<div class="zmiti-company-main-ui lt-full">
		<h2 class='zmiti-title'>单位选择</h2>
		<ul id='zmiti-company-list'>
			<li @click='getCurrentCompany(company)' v-for="(company,i) of company_list" ::key="i">
				<label></label>
				<span>{{company.companyname}}</span>
				<label></label>
			</li>
		</ul>
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
			getCurrentCompany(item){
				window.localStorage.setItem('currentCompany',item.companyid);
				this.$router.push({path:'nav'});
			}
		}
	}
</script>
 

