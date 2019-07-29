<template>
	<div class="zmiti-user-main-ui lt-full">
		<h2 class='zmiti-title'>我的</h2>
		<div class='zmiti-menu-item' v-for="(menu,i) in menuList" :key="i">
			<div class='zmiti-menu-name' @click="$router.push({path:menu.to})" >
				<span>{{menu.name}}</span>
				<label class=''></label>
				<label class='label'></label>
			</div>
		</div>
		<div class='zmiti-exit-btn' @click="exit">退出</div>
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
			 exit(){
				 window.localStorage.clear();
				 this.$router.push({path:"/login"});
			 }
		}
	}
</script>
 

