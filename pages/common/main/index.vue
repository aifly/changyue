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
			})
        },
        watch:{
             
        },
		methods:{
			closeAll(){//移除整个插件~~~
				document.body.removeChild(document.querySelector("#changyue-app1"));
			}
		}
	}
</script>
 

  