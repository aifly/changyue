<template>
	<div class="zmiti-checkuser-main-ui lt-full">
		<h2 class='zmiti-title'>审核人员名单</h2>
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


<style lang="scss" scoped>
	@import './index.scss';
</style>	

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions,companyAdminActions} = zmitiUtil;
	import Vue from 'vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				company_list:[],
				checkedUser:[
					
				],
				unCheckuserList:[
					
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
			 
		  this.userinfo = zmitiUtil.getUserInfo();
		  this.company_list = this.userinfo.info.company_list;
			var s = this;
		  zmitiUtil.ajax({

			  remark:'getCheckUserList',
			  data:{
				  action:companyAdminActions.getCheckUserList.action,
				  docid:123
			  },
			  success(data){
				  if(data.getret === 0 ){
					  s.checkedUser = data.checkedUser;
					  s.unCheckuserList = data.unchecked;
				  }
			  }
		  });
		   zmitiUtil.ajax({

			  remark:'submit',
			  data:{
				  action:companyAdminActions.submitManuscript.action,
				  info:{
					  doctitle:123,
					  content:"contentcontentcontent",
					  cmsid:1,
					  docauthor:"docauthor111",
					  docfrom:'中国文明网',
					  remark:"remark",
					  docid:1,
					  check_userids:'1'

				  }

			  },
			  success(data){
				  if(data.getret === 0 ){
					console.log(data);
				  }
			  }
		  });

		},
		
		methods:{
			toggleCheckUser(user,index,type){//选择审核人。
				switch (type) {
					case 'add':
						this.checkedUser.push(this.unCheckuserList.splice(index,1)[0]);
						break;
					case 'remove':
						this.unCheckuserList.push(this.checkedUser.splice(index,1)[0]);
						break;
				
					default:
						break;
				}
			},
		}
	}
</script>
 

