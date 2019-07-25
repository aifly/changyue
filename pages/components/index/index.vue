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

					<div class='zmiti-article-remark' v-html='desc'>
						
					</div>
					<div class='zmiti-article-content' ref='content' v-html='content.innerHTML'>
						
					</div>
				</div>
			</div>

			<div class='zmiti-checked-userlist'>
				<h3>已选审核人：</h3>
				<div @click="showCheckedUser = true">
					<ul class='zmiti-has-checked'>
						<li @click="toggleCheckUser(item,k,'remove')" v-for='(item,k) of defaultCheckedUser' :key="k" title='点击选择'>
							{{item.realname}}
						</li>
					</ul>
					<div class='zmiti-back'></div>
				</div>

			</div>
			<div class='zmiti-submit-btn'  v-press @click="submitDoc">
				提交<span v-if='isSubmiting'></span>
			</div>
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
							{{item.realname}}
						</li>
					</ul>
				</div>
				<hr>
				<h3>未选审核人：</h3>
				<div v-for='(checkuser,i) of unCheckuserList' :key="i">
					<h3>{{checkuser.departmentname}}</h3>
					<ul class='zmiti-has-unchecked'>
						<li @click="toggleCheckUser(item,k,'add')" v-for='(item,k) of checkuser.list' :key="k" title='点击选择'>
							{{item.realname}}
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
	var {cityActions,weatherActions,userActions,companyAdminActions,resourceActions} = zmitiUtil;
	import Vue from 'vue';
	
	import '../../common/directive';
	var json = {};
	export default {
		props:[],
		name:'zmitiindex',
		data(){
			return{
				company_list:[],
				isSubmiting:false,
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

			console.log(content);



			return;

		
		   

		},
		
		methods:{
			submitDoc(){
				if(this.isSubmiting){
					return;
				}
				this.isSubmiting = true;
				let {obserable} = Vue;
				var userids = this.defaultCheckedUser.map(item=>{
								return item.userid
							}).join(',');

	
				if(!userids){
					obserable.trigger({
						type:"showToast",
						data:{
							type:'errMsg',
							content:'审核人不能为空  ：( ',
							duration:4000
						}
					})
					this.isSubmiting = false;
					return;
				}
			
				var {title,author,docRelTime,docSourceName,desc,content,docid,defaultCheckedUser} = this;

				var set = new Set();

				var content = this.$refs['content'];
				[...content.querySelectorAll("img")].forEach((img)=>{
					//FCK__PageBreak为分页组件。过滤掉
					if(img.className !== 'FCK__PageBreak' && img.getAttribute('src').indexOf('http')<=-1){//过滤掉分页图片和外网图片
						set.add(img.src);
					}
				});
				var {host} = Vue;
				let tasks = [];
				var urls = [...set];
				urls.forEach((url,i)=>{
					let iNow = i;
					var p1 = new Promise((resolve,reject)=>{
						var img = new Image();
						img.onload = ()=>{
							var canvas = document.createElement('canvas');
							canvas.width = img.width;
							canvas.height = img.height;
							var context = canvas.getContext('2d');
							context.drawImage(img,0,0);
							resolve();
							var p2 = new Promise((res,rej)=>{
								zmitiUtil.ajax({
									remark:'userUploadByBase64',
				 					_ui:{
										type:2
									},
									data:{
										action:resourceActions.userUploadByBase64.action,
										base64:canvas.toDataURL()
									},
									success(data){
										if(data.getret === 0||data.getret === 1){
											var src = host + data.filepath;
											[...content.querySelectorAll("img")].forEach((img,i)=>{
												if(img.src === url){
													content.querySelectorAll("img")[i].src = src;
												}
											})
											res();
										}
									}
								});
							});
							tasks.push(p2);

							if(iNow === urls.length -1){
								
								Promise.all(tasks).then(()=>{
									this.submit();
								})

							}
						}
						img.src = url;
					})
					tasks.push(p1);
				})
				if(urls.length<=0){
					this.submit();
				}

			},

			submit(){
				let {obserable} = Vue;
				var {title,author,docRelTime,docSourceName,desc,content,docid,defaultCheckedUser} = this;
				var frame = document.querySelector('#_trs_editor_');
				var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
				this.content = content;

				var companyid = window.localStorage.getItem('currentCompany');
				if(!companyid){
					this.$router.push({path:'/company/index'});
					return;
				}

				var s = this;

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
							companyid,
							check_userids:defaultCheckedUser.map(item=>{
								return item.userid
							}).join(',')
						}
					},
					success(data){
						s.isSubmiting = false;
						if(data.getret === 0 ){
							s.$router.push({path:'/nav'});
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
				this.docid = zmitiUtil.getQueryString('DocumentId');
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
						condition:{
							docid:s.docid,
							companyid

						}
					},
					success(data){
						if(data.getret === 0 ){
							s.checkedUser = data.checkedUser;

							s.unCheckuserList = data.unchecked;
							var userid = s.userinfo.ui.userid*1;
							s.unCheckuserList.forEach((c,i)=>{
								c.list.forEach((item,k)=>{
									if(item.userid*1 === userid){
										c.list.splice(k,1);
									}
								});
							})
							s.unCheckuserList.forEach((c,i)=>{
								if(c.list.length<=0){
									s.unCheckuserList.splice(i,1);
								}
							})
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
 

