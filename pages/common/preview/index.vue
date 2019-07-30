<template>
	<div class="zmiti-preview">
		<div class='zmiti-preview-content zmiti-scroll'>
			<h2 class='zmiti-article-title'>
				{{title}}
			</h2>
			<div class='zmiti-article-date'>
				<div>
					{{author + " ("+ docRelTime +") "}}
				</div>
				<div>
					{{docSourceName}}
				</div>
			</div>

			<div class='zmiti-article-remark' v-html='desc'>
				
			</div>
			<div class='zmiti-article-content' ref='content' v-html='content'>
				
			</div>
		</div>
	</div>
</template>

<style lang="scss" >
	@import './index.scss';
</style>

<script>
export default {
	props:['docSourceName','title','author','docRelTime','docSourceName','desc','content'],
	data(){
		return {

		}
	}

}
</script>