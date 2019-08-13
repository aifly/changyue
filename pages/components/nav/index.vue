<template>
	<div class="zmiti-nav-main-ui lt-full">
		<h2 class='zmiti-title'>功能选择</h2>
		<div class='zmiti-function-list'>
			<ul>
				<li>
					<router-link to="index">
						<div class='zmt_iconfont'>&#xe647;</div>
						<span class='zmiti-function-name'>提交审阅</span>
					</router-link>
				</li>
				<li class='zmt_iconfont' >
					<a href='javascript:void(0)' @click='getSensitiveWords'>
						<div class='zmt_iconfont'>&#xe635;</div>
						<span class='zmiti-function-name'>敏感词</span>
					</a>
				</li>
				<li>
					<router-link to="workorder">
						<div class='zmt_iconfont'>&#xe61c;</div>
						<span class='zmiti-function-name'>工单</span>
					</router-link>
				</li>
				<li>
					<router-link to="setting">
						<div class='zmt_iconfont'>&#xe7e8;</div>
						<span class='zmiti-function-name'>设置</span>
					</router-link>
				</li>
				<li>
					<router-link to="user">
						<div class='zmt_iconfont'>&#xe633;</div>
						<span class='zmiti-function-name'>个人中心</span>
					</router-link>
				</li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>

		<!-- <div class='zmiti-check-sensitive-words-C' v-if='html' :style="{transform:'translate('+x+'px,'+y+'px)'}">
		<header ref='header' class='zmiti-check-result-header'>
			<span>检查结果</span>
			<span class='zmiti-check-close'>&times;</span>
		</header>
		<div class='zmiti-check-result-content zmiti-scroll' v-html='html'>
		
		</div>
		<footer>
			<div class='zmiti-check-btn'>确定</div>
			<div class='zmiti-check-btn'>取消</div>
		</footer> 
	</div>-->
	<div  v-if='html'>
		<checksensitivewords :html='html' @closeDialog='closeDialog'></checksensitivewords>
	</div>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions} = zmitiUtil; 
	import checksensitivewords from '../checksensitivewords/index.vue';
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				html:'',
				x:0,
				y:0,
				sensitivewords:[
					{
						wordname:"新华社",
						rank:1
					},
					{
						wordname:"习近平",
						rank:1
					},
					{
						wordname:"总理",
						rank:1
					},
				]
			}
		},
		components:{ 
			checksensitivewords
		},

		beforeCreate(){
			 
		},
		watch:{
			html(val){
				if(val){
					//this.initDrag();
				}
			}	
		},
		mounted(){
			 
		  this.userinfo = zmitiUtil.getUserInfo();
		  this.company_list = this.userinfo.info.company_list;

		  

		},
		
		methods:{

			closeDialog(){
				this.html = '';
			},
			
			getSensitiveWords(){

				
				var frame = document.querySelector('#_trs_editor_');
				var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');

				var html =  content.innerHTML;
				var json = {};
				this.sensitivewords.forEach((item)=>{
					var keywords =  new RegExp(item.wordname,'ig');
					json[item.wordname] = json[item.wordname]||{};
					var res = html.match(keywords);
					json[item.wordname].num = res.length;
					html = html.replace(keywords,'<span style="color:#f00;text-decoration:underline">'+item.wordname+'</span>');
				});

				this.html = html;

				
				Vue.obserable.trigger({
					type:'togglePlugin',
					data:{
						value:'none',
					}
				}); 
				/* */
				/*  */
			},
		}
	}
</script>
 

