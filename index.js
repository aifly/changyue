import Vue from "vue";
import Obserable from './pages/lib/obserable';
import zmitiUtil from './pages/common/lib/util'
import VueRouter from 'vue-router'
import Main from './pages/common/main';
import Login from './pages/components/login'
import Company from './pages/components/company'
import Nav from './pages/components/nav'
import Setting from './pages/components/setting'
import Index from './pages/components/index'
import User from './pages/components/user'
import Password from './pages/components/password'
import MySubmit from './pages/components/mysubmit'
import MyCheck from './pages/components/mycheck'
import Detail from './pages/components/detail';
import WorkOrder from './pages/components/workorder';

import './pages/common/css/index.css';
Vue.use(VueRouter)


let host = 'http://file.zmiti.com/index/files/file?p=';
Vue.obserable = new Obserable();
Vue.host = host;

//var VueTouch = im('vue-touch')
/*import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'})*/

var ips = [
	'172.27.2.167',
	'172.27.2.197',
	'172.27.2.201',
	'172.27.2.202',
	'172.27.2.168',
	'172.27.2.203',
	'172.27.2.204',
];

chrome.extension &&
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(frame,'frame');
	
		//zmitiObj.data && $('.zmiti-dialog-main-ui').removeClass('hide');
	/* var frame = document.querySelector('#_trs_editor_');

	document.querySelector('#basicprops .attr_textarea textarea');

	var zmitiObj = {};
	
	var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
	zmitiObj.content = content.innerHTML; */
	if (zmitiUtil.getQueryString('DocumentId') && zmitiUtil.getQueryString('FromEditor')){
		sendResponse(123);
		init();
	}
});


function init( ){

	
	var app = document.createElement('div');
	app.id = 'changyue-app';
	document.body.appendChild(app);

	setTimeout(() => {
		
		var obserable = new Obserable();

		/* eslint-disable no-new */

		const router = new VueRouter({
			routes: [
				//{path: '*', name: 'error', component: FError },
				{
					path: '/login',
					name: 'login',
					component: Login,
					props: true
				}, {
					path: '/',
					name: '',
					component: Login,
					props: true
				}, {
					path: '/company/:id?',
					name: 'company',
					component: Company,
					props: true
				}, {
					path: '/nav',
					name: 'nav',
					component: Nav,
					props: true
				},
				{
					path: '/index',
					name: 'index',
					component: Index,
				},
				{
					path: '/setting/:id?',
					name: 'setting',
					component: Setting,
				},
				{
					path: '/user/:id?',
					name: 'user',
					component: User,
				}, {
					path: '/password',
					name: 'password',
					component: Password,
				}, {
					path: '/mysubmit',
					name: 'mysubmit',
					component: MySubmit,
				}, {
					path: '/mycheck',
					name: 'mycheck',
					component: MyCheck
				}, {
					path: '/detail/:id',
					name: 'detail',
					component: Detail
				},{
					path:'/workorder',
					name:'workorder',
					component:WorkOrder
				}
			]
		});
		router.afterEach((to,from)=>{
			
			if(to.name === 'index'){

				var cms = zmitiUtil.getCurrentCMS();
				if(!cms || !cms.cmsid){
					router.push({path:'/setting/index'});
				}
			}
		})
		new Vue({
			router,
			data: {
				obserable,
				imgs: window.imgs,
				viewH: document.documentElement.clientHeight,

			},
			el: '#changyue-app',
			template: `<div id='changyue-app1'>
			<Main  :obserable='obserable'></Main>
		</div>`,
			methods: {

			},
			components: {
				Main
			},
			mounted() {

				//zmitiUtil.getOauthurl(obserable);
				//zmitiUtil.wxConfig(document.title, window.desc);

				return;

			}
		}).$mount('#changyue-app1')
		
	}, 100);

}

if(!chrome.extension){
	init();
}	