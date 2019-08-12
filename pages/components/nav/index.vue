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

		<div class='zmiti-check-sensitive-words-C' v-if='html' :style="{transform:'translate('+x+'px,'+y+'px)'}">
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
				html:'',
				x:0,
				y:0
			}
		},
		components:{ 
		},

		beforeCreate(){
			 
		},
		watch:{
			html(val){
				if(val){
					this.initDrag();
				}
			}	
		},
		mounted(){
			 
		  this.userinfo = zmitiUtil.getUserInfo();
		  this.company_list = this.userinfo.info.company_list;

		  

		},
		
		methods:{

			initDrag(){
				setTimeout(() => {
					
					var dragObj = this.$refs['header'];
						var container = document.querySelector('.zmiti-check-sensitive-words-C');
						var isCanMove = false;
						var disX = 0, disY = 0;
						var startX = 0,startY = 0;
						var s = this;
						dragObj.onmousedown = function(e){
							 disX = e.pageX - this.offsetLeft;
							 disY = e.pageY - this.offsetTop;
							isCanMove = true;
							e.preventDefault();
						}
	
						document.onmousemove = function(e){
							if( isCanMove ){
								var x = e.pageX - disX + startX;
								var y = e.pageY - disY + startY;
								s.x = x;
								s.y = y;
							}
						}
						document.onmouseup = function(e){
							var x = e.pageX - disX + startX;
							var y = e.pageY - disY + startY;
							startX = x;
							startY = y;
							isCanMove = false;
	
							e.preventDefault();
						}
				}, 120);
			},
			getSensitiveWords(){

				var frame = document.querySelector('#_trs_editor_');
				var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
				var html = content.innerHTML.replace(/孙茂芳/ig,'<span style="color:#f00">孙茂芳</span>');
				this.html = html;

				return;
				Vue.obserable.trigger({
					type:'togglePlugin',
					data:{
						value:'none',
						html
					}
				}); 
				/* */
				/*  */
			},
		}
	}
</script>
 

