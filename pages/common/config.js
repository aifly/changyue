var workOrderType = {
		0:'财务类',
		1:"会员账号",
		2:"定制服务类",
		3:"产品技术类",
		4:"其它类"
	};



let  orderStatus = {
	0:{
		status:'已受理'
	},
	1:{
		status:'已处理'
	},
	2:{
		status:'已确认'
	},
	3:{
		status:'已评价'
	}
};
let resourceClass = [//资源分类
	{
		name:"全部",
		type:-1,
	},{
		name:'图片',
		type:0
	},{
		name:'视频',
		type:1
	},{
		name:'音频',
		type:2
	},
	{
		name:'文件',
		type:3
	}
];
let defaultClass = (id=3)=> [ //资源库默认分类
	{
		name:'系统',
		icon:'&#xe611;',
		id:1
	},
	{
		name:'单位',
		icon:'&#xe612;',
		id:2
	},{
		name:"个人",
		icon:'&#xe613;',
		id,
		cateList:resourceClass.concat([])
	}
];

let defaultExtNames = {
	pdf:'&#xe665;',

	xls:'&#xe614;',
	xlsx: '&#xe614;',
	
	mp3:'&#xe7df;',
	ogg:'&#xe7df;',
	m4a:'&#xe7df;',
	
	doc:'&#xe63c;',
	docx:'&#xe63c;',
	
	mp4:'&#xe601;',
	webm:'&#xe601;',
	mov:'&#xe601;',
	flv:'&#xe601;',

	other:'&#xe606;'

}

 export {
	workOrderType,
	orderStatus,
	defaultClass,
	defaultExtNames
};