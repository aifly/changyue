<template>
	<div class="zmiti-setting-main-ui lt-full">
		<div class='zmiti-back'>
			<router-link :to='$route.params.id?"/"+$route.params.id:"/nav"'></router-link>
		</div>
		<h2 class='zmiti-title'>选择CMS版本</h2>
		<div class='zmiti-cms-item zmiti-menu-item'>
			<div class='zmiti-cms-name zmiti-menu-name' :class='{"active":cmsIndex>-1,"slider":showCmsName}' @click="showCmsName = !showCmsName">
				<span v-if='cmsIndex>-1'>
					{{cmsList[cmsIndex].cmsname}}
				</span>
				<span v-else>请选择CMS名称</span>
				 <label class=''></label>
				 <label class='label'></label>
			</div>
			<ul :class='{"active":showCmsName}' :style="{height:showCmsName?61*cmsList.length+'px':0+'px'}">
				<li v-for="(cms,i) in cmsList" :key="i" @click="getCMS(cms,i)">
					{{cms.cmsname}}
				</li>
			</ul>
		</div>
		<div class='zmiti-cms-item zmiti-menu-item'>
			<div class='zmiti-cms-name zmiti-menu-name'  :class='{"active":versionIndex>-1,"slider":showVerion}' @click="showVerion = !showVerion">
				<span v-if='versionIndex>-1'>
					{{cmsList[cmsIndex].version[versionIndex].version}}
				</span>
				<span v-else>请选择CMS版本</span>
				<label class=''></label>
				<label class='label'></label>
			</div>
			<ul v-if='cmsIndex>-1' :style="{height:showVerion?61* cmsList[cmsIndex].version.length+'px':0+'px'}">
				<li v-for="(version,i) in cmsList[cmsIndex].version" :key="i" @click="getVersion(version,i)">
					{{version.version}}
				</li>
			</ul>
		</div>

		<div class='zmiti-setting-ok' v-press @click='sure'>
			确定
		</div>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {weatherActions,userActions} = zmitiUtil;
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				cmsIndex:-1,
				versionIndex:-1,
				cmsList:[],
				showCmsName:false,
				showVerion:false,
				cms:{}
			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		watch:{
			showCmsName(val){
				if(val){
					this.showVerion = false;	
				}
			},
			showVerion(val){
				if(val){
					this.showCmsName = false;	
				}
			}
		},
		mounted(){
			 
		  this.userinfo = zmitiUtil.getUserInfo();
		  this.getCMSList();
		
		},
		
		methods:{
			sure(){
				var cms = zmitiUtil.getCurrentCMS();
				if(!cms || !cms.cmsid){
					return;
				}
				else{
					this.$router.push({path:this.$route.params.id?"/"+this.$route.params.id:"/nav"});
				}
			},
			getVersion(version,index){
				this.showVerion = false;
				this.version = version;
				this.versionIndex = index;
				window.localStorage.setItem('currentCMS',JSON.stringify(version))
			},
			getCMS(cms,index){
				this.showCmsName = false;
				this.cms = cms;
				this.cmsIndex = index;
				
			},
			 getCMSList(){
				 var s = this;
				 var company = zmitiUtil.getCurrentCompanyId();
				 var companyid;
				 if(company){
					 companyid = company.companyid;
				 }
				 var productid = zmitiUtil.productid;
				 zmitiUtil.ajax({
					 remark:"getCMSList",
					 data:{
						 action:userActions.getCMSList.action,
						 condition:{
							 page_size:10,
							 page_index:0,
							 companyid,
							 productid


						 }
					 },
					 success(data){
						 if(data.getret === 0){
							 s.cmsList = data.list;
						 }
						 console.log(data);
					 }
				 })
			 }
		}
	}
</script>
 

