<template>
	<div class="zmiti-index-main-ui lt-full">
		<div class='zmiti-back' @click="showCheckedUser = false" v-if='showCheckedUser'>

		</div>
		<template v-if='!showCheckedUser'>
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
					<div class='zmiti-article-content' v-html='content.innerHTML'>
						
					</div>
				</div>
			</div>

			<div class='zmiti-checked-userlist'>
				<h3>已选审核人：</h3>
				<div @click="showCheckedUser = true">
					<ul class='zmiti-has-checked'>
						<li @click="toggleCheckUser(item,k,'remove')" v-for='(item,k) of defaultCheckedUser' :key="k" title='点击选择'>
							{{item.username}}
						</li>
					</ul>
					<div class='zmiti-back'></div>
				</div>

			</div>
			<div class='zmiti-submit-btn'  v-press @click="submitDoc">提交</div>
		</template>
		<template v-else>
			<div class="zmiti-checkuser-main-ui lt-full">
				<h2 class='zmiti-title' >审核人员名单</h2>
				<div class='zmiti-checkuser-list  zmiti-scroll'>
				<h3>已选审核人：</h3>
				<div v-for='(checkuser) of checkedUser' :key="checkuser.departmentname">
					<h3>{{checkuser.departmentname}}</h3>
					<ul class='zmiti-has-checked'>
						<li @click="toggleCheckUser(item,k,'remove')" v-for='(item,k) of checkuser.list' :key="k" title='点击选择'>
							{{item.username}}
						</li>
					</ul>
				</div>
				<hr>
				<h3>未选审核人：</h3>
				<div v-for='(checkuser,i) of unCheckuserList' :key="i">
					<h3>{{checkuser.departmentname}}</h3>
					<ul class='zmiti-has-unchecked'>
						<li @click="toggleCheckUser(item,k,'add')" v-for='(item,k) of checkuser.list' :key="k" title='点击选择'>
							{{item.username}}
						</li>
						
					</ul>
				</div>
			</div>
		</div>
		</template>
	</div>
</template>


<style lang="scss" >
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions,companyAdminActions} = zmitiUtil;
	import Vue from 'vue';
	
	import '../../common/directive';
	var json = {};
	export default {
		props:[],
		name:'zmitiindex',
		data(){
			return{
				company_list:[],
				checkedUser:[
					
				],
				unCheckuserList:[
					
				],
				defaultCheckedUser:[],
				showCheckedUser:false,
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
		  this.getCheckUserList();
		  this.company_list = this.userinfo.info.company_list;

		  console.log(this);

		  	var frame = document.querySelector('#_trs_editor_');
			var descObj = document.querySelector('#basicprops .attr_textarea textarea');
			if(!descObj){
				return;
			}
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
			this.docid = zmitiUtil.getQueryString('DocumentId')
			
			var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
			this.content = content;



			return;

		
		   

		},
		
		methods:{
			submitDoc(){
				let {obserable} = Vue;
				var {title,author,docRelTime,docSourceName,desc,content,docid,defaultCheckedUser} = this;

				var set = new Set();
				[...content.querySelectorAll("img")].forEach((img)=>{
					if(img.className !== 'FCK__PageBreak' && img.getAttribute('src').indexOf('http')<=-1){//过滤掉分页图片和外网图片
						set.add(img.src);
					}
				});
				
				[...set].forEach((url)=>{
					console.log(url)
				})

				return;
				zmitiUtil.ajax({
					remark:'submitManuscript',
					data:{
						action:companyAdminActions.submitManuscript.action,
						info:{
							doctitle:title,
							content:content.innerHTML,
							cmsid:1,
							docauthor:author,
							docfrom:docSourceName,
							doctime:docRelTime,
							remark:desc,
							docid:docid,
							check_userids:defaultCheckedUser.map(item=>{
								return item.userid
							}).join(',')
						}
					},
					success(data){
						if(data.getret === 0 ){
							console.log(data);
						}

						obserable.trigger({
							type:"showToast",
							data:{
								type:data.getret === 0 ? 'msg':'errMsg',
								content:data.msg + (data.getret === 0? ' ^_^ ' : ' ：( '),
								duration:2000
							}
						})

					}
				});
			},
			getCheckUserList(){
				window.ss = this;
				this.userinfo = zmitiUtil.getUserInfo();
				var companyid = zmitiUtil.getCurrentCompanyId();
				if(!companyid){
					this.$router.push({path:'/company/index'});
					return;
				}
				this.company_list = this.userinfo.info.company_list;
				var s = this;
				zmitiUtil.ajax({

					remark:'getCheckUserList',
					data:{
						action:companyAdminActions.getCheckUserList.action,
						docid:123,
						companyid

					},
					success(data){
						if(data.getret === 0 ){
							s.checkedUser = data.checkedUser;
							s.unCheckuserList = data.unchecked;
							data.checkedUser.concat([]).map((dt)=>{
								s.defaultCheckedUser = s.defaultCheckedUser.concat(dt.list);
							})
						}
					}
				});
			},
			toggleCheckUser(user,index,type){//选择审核人。
				switch (type) {
					case 'add':
						this.checkedUser.push(this.unCheckuserList.splice(index,1)[0]);
						this.defaultCheckedUser = [];
						this.checkedUser.map((dt)=>{
							this.defaultCheckedUser = this.defaultCheckedUser.concat(dt.list);
						})
						break;
					case 'remove':
						this.unCheckuserList.push(this.checkedUser.splice(index,1)[0]);
						this.defaultCheckedUser = [];
						this.checkedUser.map((dt)=>{
							this.defaultCheckedUser = this.defaultCheckedUser.concat(dt.list);
						})
						break;
				
					default:
						break;
				}
			},
			 
		}
	}
</script>
 

