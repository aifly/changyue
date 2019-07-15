import Vue from "vue";
import Obserable from './pages/lib/obserable';
import zmitiUtil from './pages/lib/util'
import VueRouter from 'vue-router'
import Main from './pages/common/main';
import Login from './pages/components/login'
import Company from './pages/components/company'
import Nav from './pages/components/nav'
import Index from './pages/components/index'
Vue.use(VueRouter)

Vue.obserable = new Obserable();

//var VueTouch = im('vue-touch')
/*import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'})*/
chrome.extension &&
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(frame,'frame');
	
		//zmitiObj.data && $('.zmiti-dialog-main-ui').removeClass('hide');
	var frame = document.querySelector('#_trs_editor_');

	document.querySelector('#basicprops .attr_textarea textarea');

	var zmitiObj = {};
	
	var content  = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');
	zmitiObj.content = content.innerHTML;
	sendResponse(123);
	
 	init( );

	
	
});


function init( ){
	var app = document.createElement('div');
	app.id = 'app';
	document.body.appendChild(app);

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
			},{
				path: '/',
				name: '',
				component: Login,
				props: true
 			},{
				path: '/company',
				name: 'company',
				component: Company,
				props: true
			},{
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
		]
	});
	new Vue({
		router,
		data: {
			obserable,
			imgs:window.imgs,
			viewH: document.documentElement.clientHeight,
			
		},
		el: '#app',
			template: `<div id='app1'>
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
	}).$mount('#app1')
}

if(!chrome.extension){
	init();
}	