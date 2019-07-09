<template>
	<div v-if='value'>
		<Modal title='更换头像' v-model="show" :transfer='false'
			:mask-closable='false'
			@on-visible-change='closeModal'
			>
				<div slot='footer'>
					<Button @click='chooseAvatar'  type='primary'>确定</Button>
				</div>
				<div class='zmiti-avatar-list'>
					<span @click='index = i' :class="{'active': index === i}" class='zmt_iconfont' v-for='(font,i) in avatarList' :key="i" v-html='font'>
						
					</span>
				</div>
			</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
export default {
	props:{
		value:{
			type:Boolean
		},
		avatar:{
			type:String,
			default:''
		}
		
	},
	watch:{
		value(val){
			if(!val){
				this.chooseAvatar();
				this.show = false;
			}
			this.show = val;
		}
	},
	methods:{
		chooseAvatar(){
			this.$emit('getAvatar',this.avatarList[this.index]);
			this.$emit('input',false);
		},
		closeModal(val){
			if(!val){
				this.chooseAvatar();
				this.show = false;
			}
			this.show = val;
		}
	},
	data(){
		return {
			show:true,
			index:-1,
			avatarList:[
				'&#xe6a5;',
				'&#xe6a4;',
				'&#xe6a3;',
				'&#xe6a2;',
				'&#xe6a0;'
			]
		}
	},
	mounted(){
		this.avatarList.forEach((font,index)=>{
			if(font === this.avatar){
				this.index = index;
			}
		})
	}


}
</script>
