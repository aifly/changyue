


chrome.contextMenus.create({
	"title": '提交审核',
	"type": "normal",
	"contexts": ["page", "frame", "selection"],
	"onclick": function (info, tab) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
			chrome.tabs.sendMessage(tab[0].id, { data: 1 }, function (response) {
				
			});
			return;
			$.ajax({
				url:"./pages/login.html?t="+new Date().getTime(),
				success(data){
					
				}
			});
		});
	}
});

/* chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	$.ajax({
		url: "./pages/" + request.type +".html?t=" + new Date().getTime(),
		success(data) {
			sendResponse({data})
		}
	});
 

});

  */