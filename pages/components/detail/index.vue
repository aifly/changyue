<template>
	<div class='zmiti-detail-ui lt-full zmiti-scroll'>
		<div class='zmiti-back' >
			<router-link :to='"/mycheck"'></router-link>
		</div>
		<h2 style="height:80px;"></h2>
		<Preview
			:title='title'
			:author='author'
			:docRelTime='docRelTime'
			:docSourceName='docSourceName'
			:desc='desc'
			:content='content'
		></Preview>

		<div class='zmiti-check-C'>
			<div>
				<textarea name="" placeholder="请输入审核意见（非必填）" id="" v-model="suggestion" cols="30" rows="10"></textarea>
			</div>
			<div class='zmiti-check-btns'>
				<div @click="checkManuscript(1)">通过</div>
				<div @click="checkManuscript(2)">拒绝</div>
				<div @click="checkManuscript(3)">暂缓</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang='scss'>
	@import './index.scss';
</style>


<script>

import Preview from '../../common/preview';
import zmitiUtil from '../../common/lib/util';
var {changYueAcions,formatDate} = zmitiUtil;
import Vue from 'vue';
export default {
	data(){
		return {
			title:"",
			author:"",
			docRelTime:"",
			docSourceName:"",
			desc:"",
			content:"",

			suggestion:'',
		}
	},
	components:{
		Preview
	},
	mounted() {
		this.getDetail();
	},
	methods: {
		getDetail(){
			
			var manuscriptid = this.$route.params.id;
			if(!manuscriptid){
				
				return;
			}
			var s = this;
			s.modaldetail=true;
			zmitiUtil.ajax({
				remark:'manuscriptDetail',
				data:{
					action:changYueAcions.manuscriptDetail.action,
					condition:{
						manuscriptid
					}
				},
				success(data){
					s.detailData=data.detail;


					s.title = data.detail.doctitle;
					s.author =data.detail.docauthor;
					s.docRelTime = formatDate(data.detail.doctime);
					s.docSourceName = data.detail.docfrom;
					s.desc = data.detail.remark;
					s.content = data.detail.content;
					//console.log(s.formCheck.manuscriptid,'s.formCheck.manuscriptid');
				}
			})
		},
		checkManuscript(status){//审核稿件
			var s = this;
			zmitiUtil.ajax({
				remark:'checkManuscript',
				data:{
					action:changYueAcions.checkManuscript.action,
					info:{
						manuscriptid:s.$route.params.id,
						status,
						suggestion:s.suggestion,
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
					s.$router.push({path:'/mycheck'})
				}
			})
		},
	},
}
</script>