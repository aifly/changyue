var user_company ={
	title:'用户单位',
	tabs:[
		{
			name: '用户单位',
			link: '/',
			status: true,
			children: [
				{
					name: '用户管理',
					link: '/user'

				},
				{
					name: '单位管理',
					link: '/company'
				}
			]
		}
	]
};

var basicconfig_admin_rolegroup_setrole_pv_form ={
	title:"系统管理",
	tabs: [
		{
			name: '基础配置',
			link: '/basicconfig'
		}, 
		{
			name: '管理员管理',
			link: '/admin'
		}, {
			name: '权限管理',
			link: '/role',
			children: [
				{
					name: '权限组管理',
					link: '/rolegroup'
				}, {
					name: '权限分配',
					link: '/setrole'
				}
			]
		},{
			name:"简易统计",
			link:'/',
			children:[
				{
					name:'浏览量统计',
					link:'/pv'
				},
				{
					name:'简易表单',
					link:'/form'
				}
			]	
		}
	]
};

let workorder_workorderlist = {
	title: "工单管理",
	tabs: [
		{
			name: '提交工单',
			link: '/workorder'
		},{
			name:'工单列表',
			link:'/workorderlist'
		}
	]
};


var menuObj = {
	user_company,
	basicconfig_admin_rolegroup_setrole_pv_form,
	workorder_workorderlist
};

export default menuObj;