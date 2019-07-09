<template>
    <div class='zmiti-changyue-main-ui lt-full'>
		<div class='zmiti-changyue-main'>
				<div class='zmiti-dialog-close'>
					&times;
				</div>
        	<router-view></router-view>
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
        },
        watch:{
             
        },
		methods:{
			 
           
         
          
		}
	}
</script>
 

  