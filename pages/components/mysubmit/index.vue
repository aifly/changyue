<template>
	<div class="zmiti-submit-main-ui lt-full">
		<div class='zmiti-back' >
			<router-link :to='"/user"'></router-link>
		</div>
		<div class="lt-full" v-if='dataSource.some(item=>{ return item.showConfirm})' @click="clearConfirm"></div>
		<h2 class='zmiti-title'>我的提交</h2>
		<div class='zmiti-scroll' :style="{height:viewH - 140+'px'}">
			<div v-if='isLoading' style="width:100%;text-align:center">loading....</div>
			<div v-else v-for='(item,i) in dataSource' :key="i" class='zmiti-submit-list'>
				<div>
					<div>提交时间：</div>
					<div class='zmiti-submit-date'>{{item.createtime}}</div>
				</div>
				<div>
					<div>标题：</div>
					<div class='zmiti-submit-title'>{{item.doctitle}}</div>
				</div>

				<div>
					<div>审核人：</div>
					<div class='zmiti-check-list-C'>
						<div v-for='(user,k) in item.checkuserlist' :key="k" class='zmiti-check-list'>
							<div class='zmiti-submit-date'>
								<span>{{user.realname}}</span>
								<span :title='manuscriptStatus[user.status].name+":" + user.suggestion' class='zmt_iconfont' :style="{color:manuscriptStatus[user.status].color}" v-html='manuscriptStatus[user.status].icon'></span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div></div>
					<div class='zmiti-submit-del'>
						<div class='zmiti-confirm-C' v-show="item.showConfirm">
							<div>
								确定要删除吗？
							</div>
							<div>
								<div @click="clearConfirm">取消</div>
								<div @click="delSubmit(item,i)">确定</div>
							</div>
						</div>
						<span @click="showConfirmModal(item)">删除</span>
					</div>
				</div>
			</div>

			<div class='zmiti-more'>
				<a href='http://user.zmiti.com' target='_blank'>更多>></a>
			</div>
		</div>
		
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions,changYueAcions} = zmitiUtil;
	import {manuscriptStatus} from '../../common/config';
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				manuscriptStatus,
				isLoading:true,
				dataSource:[],
				viewH:window.innerHeight,
				condition:{
					page_index:0,
					page_size:20
				}
			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		watch:{
			
		},
		mounted(){
			 
			this.getDataList();
		},
		
		methods:{
			clearConfirm(){
				this.dataSource.forEach(item=>{
					item.showConfirm = false;
				})
				this.dataSource = this.dataSource.concat([]);
			},
			showConfirmModal(item){
				item.showConfirm = true;
				this.dataSource = this.dataSource.concat([]);
			},
			delSubmit(item,i){
				var s = this;
				zmitiUtil.ajax({
					remark:'delManuscript',
					data:{
						action:changYueAcions.delManuscript.action,
						condition:{
							manuscriptids:item.manuscriptid
						}
					},
					success(data){
						if(data.getret === 0){

							Vue.obserable.trigger({
								type:"showToast",
								data:{
									type:'msg',
									content:'删除成功 :)',
									duration:2000
								}
							});
							s.dataSource.splice(i,1);
							
							///s.dataSource = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getMySubmitList",
					data:{
						action:changYueAcions.getMySubmitList.action,
						condition
					},
					success(data){
					
						if(data.getret === 0){
							s.dataSource = data.list;
							s.isLoading = false;
						}
					}
				})
			},
		}
	}
</script>
 

