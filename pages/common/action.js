
let adminActions = {
	//管理员模块
	adminlogin: {
		desc: '管理员登录',
		action: '1000000'
	},
	getAdminList: {
		desc: '获取管理员列表',
		action: '1000100'
	},
	addAdminUser: {
		desc: '管理员添加管理员',
		action: '1000101'
	}, 
	editAdminUser: {
		desc: '管理员编辑',
		action: '1000102'
	},
	delAdmin: {
		desc: '管理员删除',
		action: '1000103'
	},
	modifyAdminPassword: {
		desc: '修改管理员密码',
		action: '1000104'
	},
	modifyAdminSelfPassword: {
		desc: '管理员自助修改密码',
		action: '1000105'
	},
	
	checkAdminUserName:{
		desc:"管理员检测用户名是否存在",
		action:'1000106'
	},
	getGroupList:{
		desc:"管理员组列表",
		action:'1000200'
	},
	addGroup:{
		desc:"添加管理员组",
		action:'1000201'
	},
	editGroup: {
		desc: "编辑管理员组",
		action: '1000202'
	},
	delGroup: {
		desc: "删除管理员组",
		action: '1000203'
	},
	getAdminGroupSipleList:{
		desc:'管理员组列表（简要信息，不参与权限验证）',
		action:'1000204'
	},
	getProductList: {
		desc: "获取产品列表",
		action: '1000300'
	},
	delProduct:{
		desc:"管理员删除产品",
		action:'1000303'
	},
	addProduct: {
		desc: "管理员添加产品",
		action: '1000301'
	}, 
	editProduct: {
		desc: "管理员修改产品",
		action: '1000302'
	},
	getUserWorkOrderList:{
		desc:'管理员查看工单列表',
		action:'1000111'
	},
	userReadWorkOrder:{
		desc:"管理员查看工单",
		action:'1000113'
	},
	replayWorkOrder:{
		desc:"管理员回复工单",
		action:'1000112'
	}
}

let companyActions = {//用户单位模块
	getCompanyList: {
		desc: '单位列表',
		action: '1000700'
	},
	editCompany: {
		desc: '编辑单位',
		action: '1000702'
	},
	addCompany: {
		desc: '添加单位',
		action: '1000701'
	},
	delCompany: {
		desc: '删除单位',
		action: '1000703'
	},
	modifyCompanyStatus: {
		desc: '单位状态修改',
		action: '1000705'
	},
	getCompanyListWithoutAuth: {
		desc: "单位列表(简要信息，不参与权限验证)",
		action: '1000706'
	},
	addUser:{
		desc:'添加用户',
		action:'1000801',
	},
	getUserList:{
		desc:'获取用户列表',
		action:'1000800'
	},
	editUser:{
		desc:'编辑用户',
		action:'1000802'
	},
	delUser:{
		desc:'删除用户',
		action:"1000803"
	},
	modifyUserStatus:{
		desc:'修改用户状态',
		action: '1000805'
	},
	checkUserName:{
		desc:"用户检测用户名",
		action:"1000806"
	},
	checkUserEmail:{
		desc:'用户检测邮箱',
		action:'1000807'
	},
	checkUserMobile:{
		desc:'用户检测手机号',
		action:'1000808'
	},
	joinCompany:{
		desc:'用户加入单位',
		action:'1000809'
	},
	exitCompany: {
		desc: '用户退出单位',
		action: '1000810'
	},
	getUserListByCompanyId:{
		desc:"单位获取用户列表",
		action:'1000708'
	},
	getJoinedCompany:{
		desc:'用户获取已加入单位',
		action:'1000811'
	},
	changeCompanyAdmin:{
		desc:'单位变更管理员',
		action:'1000709'
	}
	

}

let userActions = {

	userLogin:{
		desc:'用户端登录',
		action: '2000000'
	},//
	userModifyPassword:{
		desc:'用户端修改密码',
		action: '2000010'
	},//
	userRegister: {
		desc:'用户注册',
		action: '2000004'
	},//用户注册
	userCommitWorkOrder:{
		desc:'用户提交工单',
		action:"2001000"
	},
	userCloseWorkOrder:{
		desc:"用户关闭工单",
		action:'2001001'
	},
	userReadWorkOrder:{
		desc:"用户查看工单",
		action:'2001002'
	},
	userDelWorkOrderFile:{
		desc:'用户删除工单附件',
		action:'20010003'
	},
	delWorkOrder:{
		desc:'用户删除工单',
		action:'2001004'
	},
	getUserWorkOrderList:{
		desc:"获取用户工单列表",
		action:'2001006'
	},
	getProductList:{
		desc:"获取产品列表",
		action:'2001007'
	}, 
	replayWorkOrder: {
		desc: "用户回复工单",
		action: '2001005'
	},
	evaluateWorkOrder:{
		desc:"用户评价工单",
		action:"2001008"
	}
};

//基础配置
let basicConfigActions = {
	getBasicConfig:{
		action:'1000210',
		desc:'获取基础配置'
	},
	updateBasicConfig:{
		action:'1000211',
		desc:'更新基础配置'
	}
};




//通用接口
let resourceActions = {
	getResourceCateList:{
		desc:'获取资源分类',
		action:'3001300'
	},
	addResourceCate:{
		desc:'添加资源分类',
		action:'3001301'
	},
	editResourceCate:{
		desc:'编辑资源分类',
		action:'3001302'
	},
	delResourceCate:{
		desc:'删除资源分类',
		action:'3001303'
	},
	getResourceList:{
		desc:'获取资源文件列表',
		action:'3001310'
	},
	editResource:{
		desc:'编辑资源文件',
		action:'3001312'
	},
	delResource:{
		desc:'删除资源文件',
		action:'3001313'
	},
	basicUpdload:{
		desc:"基础上传",
		action:'/index/upload/upload_file'
	}

};

//天气预报
let weatherActions = {
	viewTrafficdata:{
		desc:"限行数据",
		action:'3002000'
	},
	viewLastdata:{
		desc:"精简预报6天",
		action:'3002001'
	},
	viewTimedata:{
		desc:"精简实况",
		action:'3002002'
	},
	viewAir:{
		desc:"空气质量指数",
		action:'3002003'
	},
	viewCitydata:{
		desc:"天气预警",
		action:'3002004'
	},
	getWeatherData:{
		desc:"天气预报",
		action:'3002007'
	}
};
//获取城市信息
let cityActions = {
	ipView:{
		desc:"通过IP地址获取城市信息",
		action:'3002005'
	},
	postView:{
		desc:"通过经纬度获取城市信息",
		action:'3002006'
	}
};

var zmitiActions =   /*#__PURE__*/{
	userActions,
	resourceActions,
	adminActions,
	companyActions,
	basicConfigActions,
	weatherActions,
	cityActions
}

export  default zmitiActions;

