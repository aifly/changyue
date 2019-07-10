

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
				chrome.extension.sendRequest({ type: 'index' }, function (response) {
					
					$('#zmiti-main-replace').html(response.data);

					
					
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




`
	由于互联网上有很多有关于threejs的入门教程，我这里也是入门级的，但是我会深入源代码去分析其核心功能的实现原理。
	所以我希望在看此文章的你：

	1、熟练掌握js基础，尤其是面向对象
	2、有一些threejs的基础
	3、有大概了解过原生的webgl（不太明白的可以去看一下我前几篇关于wegbl的文章）

	几乎所有的threejs基础都会教你怎么去生成一个立方体，然后在那转来转去的。那么接下来我们也实现一个，然后再去分析其源码




`