<template>
    <div class='zmiti-changyue-main-ui lt-full'>
		<div class='zmiti-changyue-main'>
				<div class='zmiti-dialog-close' @click='closeAll'>
					&times;
				</div>
        	<router-view></router-view>
			<transition name="toast">
				<div v-if='errMsg' class='zmiti-err-msg zmiti-msg'>
					{{errMsg}}
				</div>
				<div v-if='msg' class='zmiti-success-msg zmiti-msg'>
					{{msg}}
				</div>
			</transition>
		</div>

    </div>
</template>
<style lang='scss'>
	@import './index.scss';
</style>
<script>
	import Vue from 'vue';
    import zmitiUtil from '../lib/util';
	export default {
		props:['isAdmin'],
		name:'',
		data(){
			return{
				errMsg:"",
				msg:"",
				imgs:window.imgs,
				showMenu:false,
                viewH:document.documentElement.clientHeight,
                tabIndex:0,
                userinfo:{},
                productList:[],
                kw:"",
                topMenu:[
                ],
                defaultMenu:[
                  
                ],
              
			}
		},
		components:{
		},
        beforeCreate(){
            
            if(this.$route.name !== 'login' && this.$route.name !== 'register'){
            }

        },
		mounted(){
           ///this.menus = this.defaultMenu.concat([]);
			var obserable = Vue.obserable;

			
			
			var userinfo = zmitiUtil[this.isAdmin ? 'getAdminUserInfo':'getUserInfo']();
			

            this.userinfo = userinfo; 
            if(this.$route.name !== 'login' && this.$route.name !== 'register' && !this.isAdmin){
				
               /* zmitiUtil.getProductList((arr)=>{
                   this.productList = arr;
               },this); */
			}
			
			obserable.on('showToast',(data)=>{
				this[data.type] = data.content;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this[data.type] = '';
				}, data.duration||2000);
			});

			obserable.on('togglePlugin',(data)=>{
				document.querySelector("#changyue-app1").classList[data.value === 'none'?'add':'remove']('hide');

			});
        },
        watch:{
             
        },
		methods:{
			getHtml(){
				var frame = document.querySelector('#_trs_editor_');
				var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
				var html = content.innerHTML.replace(/孙茂芳/ig,'<span style="color:#f00">孙茂芳</span>');
				return html;
			},
			closeAll(){//移除整个插件~~~
				document.body.removeChild(document.querySelector("#changyue-app1"));
			}
		}
	}
</script>
 

  