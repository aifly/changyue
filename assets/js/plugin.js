

var data = {
	getret:0,
	msg:'',
	list:[

	]
};

var frame = [];

var zmitiObj = {};

var zmitiUtil = {
	init(request,zmitiObj){
		
		this.laout(request, zmitiObj);
		 
	},
	notify(){
		Notification.requestPermission(function (result) {
			//result 默认值'default'等同于拒绝 'denied' -用户选择了拒绝 'granted' -用户同意启用通知
			if ("granted" != result) {
				alert('请授权浏览器能够进行通知!');
				return false;
			} else {
				var tag = "sds" + Math.random();
				var notify = new Notification(
					'aaaaaa',
					{
						dir: 'auto',
						lang: 'zh-CN',
						tag: tag,//实例化的notification的id
						icon: imgUrl,//通知的缩略图,icon 支持ico、png、jpg、jpeg格式
						body: 'aaaaaaa' //通知的具体内容
					}
				);
				// 定义通知窗口点击函数
				notify.onclick = function () {
					//如果通知消息被点击,通知窗口将被激活
					window.focus();
				};
				// 定义通知错误事件
				notify.onerror = function () {
					// console.log("");
				};
				// 定义通知显示事件 可以设置多少秒之后关闭 也可以不设置关闭
				notify.onshow = function () {
					// 窗口显示 播放音频
					// 窗口显示3S后关闭
					setTimeout(function () {
						notify.close();
					}, 3000);
				};
				// 定义通知关闭事件
				notify.onclose = function () {

				};
			}
		});

	},
	login(fn){
		//用户登录
		$('.zmiti-login-btn').on('click', () => {
			$.ajax({
				type: "post",
				url: 'http://newapi.zmiti.com',
				data: JSON.stringify({
					action: "2000000",
					username: $('#zmiti-username').val(),
					password: $('#zmiti-password').val()
				}),
				success(data) {
					if (data.getret === 0 || data.getret === 100) {
						chrome.extension.sendRequest({ type: 'company' }, function (response) {
							
							$('#zmiti-main-replace').html(response.data);
							var html = '';
							if (data.info.company_list && data.info.company_list.length) {
								data.info.company_list.forEach(com => {
									html += `
											<li data-id='${com.companyid}'>
												<label></label>
												<span>${com.companyname}</span>
												<label></label>
											</li>
										`
								})
							}
							$('#zmiti-company-list').html(html);
							fn && fn();
						});
						window.localStorage.setItem('login', JSON.stringify(data));
					} else {

					}
				}
			})
		})
	},
	fillActicle(){

		var title = document.getElementById('DocTitle').value;
		var descObj = document.querySelector('#basicprops .attr_textarea textarea');
		var desc = descObj.value;
		frame = document.querySelector('#_trs_editor_');
	
		var content = document.querySelector('#_trs_editor_').contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor').innerHTML;


		var author = $('input[name="DocAuthor"]').val();
		var docRelTime = $('#DocRelTime').val();//撰写时间

		var docSourceName = $('#DocSourceName').val();//来源
	 
		$('.zmiti-article-date div:eq(0)').html(author + " (" + docRelTime+")");
		$('.zmiti-article-date div:eq(1)').html(docSourceName);
		$('.zmiti-article-title').html(title);
		$('.zmiti-article-remark').html(desc);
		$('.zmiti-article-content').html(content);

	},

	setIframe(mainContent){
		try{

			document.querySelector('#_trs_editor_').contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor').innerHTML = mainContent;
		}catch(e){
			setTimeout(() => {
				this.setIframe(mainContent);
			}, 400);
		}
	},
	laout(request, zmitiObj){
		var html = `
			<div class='zmiti-dialog-main-ui'>
				<div id='zmiti-main-content'>
					<div id='zmiti-dialog-close'>
						&times;
					</div>
					<section id='zmiti-main-replace'>
						${request.data}
					</section>
				</div>
			</div>
		`

		$('.zmiti-dialog-main-ui').remove();

		document.body.innerHTML += html;
		
		document.querySelector('#basicprops .attr_textarea textarea').value = zmitiObj.value;
		
	
		this.setIframe(zmitiObj.content.innerHTML);

		$('input[name="DocAuthor"]').val(zmitiObj.author);
		$('#DocRelTime').val(zmitiObj.docRelTime);//撰写时间
		$('#DocSourceName').val(zmitiObj.docSourceName);//来源
		$('#DocTitle').val(zmitiObj.docTitle);//来源

		/* */
		$('#zmiti-dialog-close').on('click', () => {
			$('.zmiti-dialog-main-ui').addClass('hide');
		});
		
		///$('.zmiti-preview').css({ background: 'url(' + chrome.extension.getURL('assets/images/phone.png')+')'});

		this.login(()=>{
			//单位选择点击事件
			var s = this;
			$('#zmiti-company-list li').on('click', e => {
				chrome.extension.sendRequest({ type: 'get' }, function (response) {
					
					$('#zmiti-main-replace').html(response.data);
					s.fillActicle();
					
				});
			})
		});
	},
};
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log(frame,'frame');
	
	    //zmitiObj.data && $('.zmiti-dialog-main-ui').removeClass('hide');
		frame = document.querySelector('#_trs_editor_');
		zmitiObj.data = request.data;

		var descObj = document.querySelector('#basicprops .attr_textarea textarea');
		var value = descObj.value;
		
		zmitiObj.content = frame.contentWindow.document.getElementById('TRS_Editor___Frame').contentWindow.document.querySelector('#xEditingArea iframe').contentWindow.document.querySelector('.TRS_Editor');

		var author = $('input[name="DocAuthor"]').val();
		var docRelTime = $('#DocRelTime').val();//撰写时间
		var docSourceName = $('#DocSourceName').val();//来源
		var docTitle = $('#DocTitle').val();//来源

		zmitiObj.value = value;
		zmitiObj.author = author;
		zmitiObj.docRelTime = docRelTime;
		zmitiObj.docSourceName = docSourceName;
		zmitiObj.docTitle = docTitle;

	


		zmitiUtil.init(request, zmitiObj);

		
		
	sendResponse(zmitiObj.content.innerHTML);

	
});