<template>
	<div class="sysbin-group-ui">
		<Tab :title='menuObj.title' :tabs='tabs' :tabIndex='tabIndex'>
			<div slot='zmiti-tab-menu'>
				<ul class="symbin-tab-menu">
					<li :key="i" @click.stop.prevent='tab1(i,tab.children)' v-for='(tab,i) in tabs' :class='{"active": !tab.children && (tab.link.substring(1) === $route.name && !tab.children),"level1":tab.children && !tab.status,"open":tab.status || (tab.children && tab.children.some(child=> child.link.substring(1) === $route.name )) }'>
						<div v-if='!(tab.children && tab.children.length>0)'>
							<router-link :to="tab.link">{{tab.name}}</router-link>
						</div>
						<div v-if='tab.children && tab.children.length>0'>
							{{tab.name}}
						</div>
						<ol :style='{height:(tab.status?tab.children.length*50:0)+"px"}' v-if='tab.children' >
							<li :key="k" @click.stop.prevent='tab2(i,k)' :class="{'active':($route.name === child.link.substring(1))}" v-for='(child,k) in tab.children'>
								<div v-if='child.link'><router-link :to="child.link">{{child.name}}</router-link></div>
								<div v-if='!child.link'>{{child.name}}</div>
							</li>
						</ol>
					</li>
				</ul>
			</div>

		</Tab>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Tab from '../tab/index';
	import Vue from 'vue';
	import menuObj from './menu';

	export default {
		props:[],
		data(){
			return{
				tabIndex:[0,-1,-1],
				theme2:"light",
				menuObj:{},
				tabs:[
					 
				]
			}
		},
		components:{
			Tab
		},
		watch:{
			$route:{
				deep:true,
				handler(){
					this.changeGroup();
				}
			}
		},

		mounted(){
			var obserable = Vue.obserable;
			
			this.changeGroup();

			
			
			obserable.on('fillTabs',(data)=>{
				this.tabs = data || [];
			});

			obserable.on('fillTabIndex',(data)=>{

				
				data[2]!==-1 && (this.tabs[data[2]].status = true);
				data.length = 2;
				this.tabIndex = data;
			})
		},

		beforeDestory(){

		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{

			checkActive(tabs){
				tabs.forEach((tab)=>{
					
					if(tab.children){
						tab.status = tab.children.some(item=>{
							return item.link.substring(1) === this.$route.name;
						})
					}
				})
			},
			changeGroup(){
				Object.keys(menuObj).forEach((key,i)=>{
					key.split('_').forEach((item,j)=>{
						if(item === this.$route.name){
							this.menuObj = menuObj[key];
							this.tabs = menuObj[key].tabs;
							this.checkActive(this.tabs);
						}
					})
				})
			},

			tab1(index,level){

				if(level && level.length){
					this.tabs[index].status = !this.tabs[index].status;
					this.tabs = this.tabs.concat([]);
				}else{
					this.tabIndex = [index,-1]
				}
			},
			tab2(i,k){
				this.tabIndex = [i,k];
			}
		}
	}
</script>
 