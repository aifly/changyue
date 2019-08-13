<template>
	<div class='zmiti-check-sensitive-words-C' ref='container' v-transfer-dom :data-transfer="transfer" :style="{transform:'translate('+x+'px,'+y+'px)'}" >
		<header class='zmiti-check-result-header' ref='header'>
			<span>检查结果</span>
			<span class='zmiti-check-close' @click="closeDialog">&times;</span>
		</header>
		<div class='zmiti-check-result-content zmiti-scroll' v-html='html'>
		
		</div>
		<footer>
			<div class='zmiti-check-btn' @click="closeDialog">确定</div>
			<div class='zmiti-check-btn' @click="closeDialog">取消</div>
		</footer>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import TransferDom from '../../common/transfer-dom';
	import Vue from 'vue';
	export default {
		props:{
			html:{
				type:String,
				default:''
			},
			transfer: {
                type: Boolean,
                default () {
                    return true;
                }
            },
		},
		directives: { TransferDom },
		data(){
			return {
				x:0,
				y:0,
			}
		},
		methods: {
			closeDialog(){
				Vue.obserable.trigger({
					type:'togglePlugin',
					data:{
						value:'block',
					}
				});
				this.$emit('closeDialog')
			},
			initDrag(){
				setTimeout(() => {

					var dragObj = this.$refs['header'];
						var container = this.$refs['container'];
						var isCanMove = false;
						var disX = 0, disY = 0;
						var startX = 0,startY = 0;
						var s = this;
						dragObj.onmousedown = function(e){
							 disX = e.pageX - this.offsetLeft;
							 disY = e.pageY - this.offsetTop;
							isCanMove = true;
							console.log(disX,disY);
							e.preventDefault();
						}
	
						document.addEventListener('mousemove',function(e){
							if( isCanMove ){
								var x = e.pageX - disX + startX;
								var y = e.pageY - disY + startY;
								s.x = x;
								s.y = y;
							}
						});
						document.onmouseup = function(e){
							startX = s.x;
							startY = s.y;
							isCanMove = false;
							e.preventDefault();
						}
				}, 120);
			},
			
		},
		mounted() {

			this.initDrag();
			
		},
	}	
</script>