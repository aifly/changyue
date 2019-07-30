<template>
	<div class="zmiti-mycheck-main-ui lt-full">
		<div class='zmiti-back' >
			<router-link :to='"/user"'></router-link>
		</div>
		<div class="lt-full" v-if='dataSource.some(item=>{ return item.showConfirm})' @click="clearConfirm"></div>
		<h2 class='zmiti-title'>我的审核</h2>
		<div class='zmiti-scroll' :style="{height:viewH - 140+'px'}">
			<div v-if='isLoading' style="width:100%;text-align:center">loading....</div>
			<div v-else v-for='(item,i) in dataSource' :key="i" class='zmiti-mycheck-list'>
				<div>
					<div>提交时间：</div>
					<div class='zmiti-mycheck-date'>{{item.createtime}}</div>
				</div>
				<div>
					<div>标题：</div>
					<div class='zmiti-mycheck-title'>
						<router-link :to='"/detail/"+item.manuscriptid'>{{item.doctitle}}</router-link>
					</div>
				</div>

				<div>
					<div>提交人：</div>
					<div class='zmiti-mycheck-list-C'>
						<div class='zmiti-mycheck-date'>
							<span>{{item.realname}}</span>
						</div>
					</div>
				</div>
				<div>
					<div></div>
					<div class='zmiti-mycheck-del'>
						<div class='zmiti-confirm-C' v-show="item.showConfirm">
							<textarea v-model="item.suggestion" placeholder="请输入审核意见">

							</textarea>
							<div>
								<div @click="checkManuscript(item,1)">通过</div>
								<div @click="checkManuscript(item,2)">拒绝</div>
								<div @click="checkManuscript(item,3)">暂缓</div>
							</div>
						</div>
						<span @click="showConfirmModal(item)">操作</span>
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
				dataSource:[],
				isLoading:true,
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
			checkManuscript(item,status){//审核稿件
				var s = this;
				zmitiUtil.ajax({
					remark:'checkManuscript',
					data:{
						action:changYueAcions.checkManuscript.action,
						info:{
							manuscriptid:item.manuscriptid,
							status,
							suggestion:item.suggestion,
						}
					},
					success(data){
						Vue.obserable.trigger({
							type:"showToast",
							data:{
								type:data.getret === 0 ? 'msg':'errMsg',
								content:data.msg + (data.getret === 0? ' ^_^ ' : ' ：( '),
								duration:2000
							}
						});
						s.clearConfirm();
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
					remark:"getMyCheckList",
					data:{
						action:changYueAcions.getMyCheckList.action,
						condition
					},
					success(data){
						s.isLoading = false;
						if(data.getret === 0){
							s.dataSource = data.list;
						}
					}
				})
			},
		}
	}
</script>
 

