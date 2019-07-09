<template>
	<div class="zmiti-index-main-ui lt-full">
		<h2 class='zmiti-title'>内容抓取</h2>
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

				<div class='zmiti-article-remark'>
					{{desc}}
				</div>
				<div class='zmiti-article-content' v-html='content'>
					
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" >
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
				title:"",
				author:"",
				docRelTime:"",
				docSourceName:"",
				desc:'',
				content:''
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

		  console.log(this);

		  	var frame = document.querySelector('#_trs_editor_');
			var descObj = document.querySelector('#basicprops .attr_textarea textarea');
			var desc = descObj.value;
			document.querySelector('#basicprops .attr_textarea textarea');
			var author = $('input[name="DocAuthor"]').val();
			var title = document.getElementById('DocTitle').value;

			var docRelTime = $('#DocRelTime').val();//撰写时间

			var docSourceName = $('#DocSourceName').val();//来源

			this.title = title;
			this.author = author;
			this.docRelTime = docRelTime;
			this.docSourceName = docSourceName;
			this.desc = desc;
			
			var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
			this.content = content.innerHTML;


		},
		
		methods:{
			 
		}
	}
</script>
 

