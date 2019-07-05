
function init(){
	var util = {
		init(){
			this.setSize();
			this.bindEvent();
			
		},
		bindEvent(){
			document.querySelector('#btn').onclick = function(){
				chrome.tabs.query({ active: true }, function (tab) {
					if (tab.length<=0){
						alert('请打开你要抓取的页面');
						return;
					}
					console.log(tab);
					chrome.tabs.sendMessage(tab[tab.length-1].id, { greeting: "hello" }, function (response) {
						console.log(response);
					});
				});
			}
		},
		viewW:window.innerWidth,
		viewH:window.innerHeight,
		setSize(){
			
			$('#zmiti-container').css({width:500,height: 583+'px' })
		}
	};
	//util.init();


	


	function genericOnClick(info, tab) {
		
		console.log("info: " + JSON.stringify(info));
		console.log("tab: " + JSON.stringify(tab));

		chrome.tabs.query({ active: true, currentWindow: true}, function (tab) {
			chrome.tabs.sendMessage(tab[0].id, { greeting: "hello" }, function (response) {
				console.log(response);
			});
		});
	}

	// Create one test item for each context type.  
	var contexts = ["page", "selection", "link", "editable", "image", "video",
		"audio"];
	context = ['page'];
	for (var i = 0; i < contexts.length; i++) {
		var context = contexts[i];
		var id = chrome.contextMenus.create({
			"title": '提交审核',
			"contexts": [context],
			"onclick": genericOnClick
		});
		console.log("'" + context + "' item:" + id);
	}

	// Create a parent item and two children.  
	/* var parent = chrome.contextMenus.create({ "title": "Test parent item" });
	var child1 = chrome.contextMenus.create(
		{ "title": "Child 1", "parentId": parent, "onclick": genericOnClick });
	var child2 = chrome.contextMenus.create(
		{ "title": "Child 2", "parentId": parent, "onclick": genericOnClick });

 
	// Create some radio items.  
	function radioOnClick(info, tab) {
		console.log("radio item " + info.menuItemId +
			" was clicked (previous checked state was " +
			info.wasChecked + ")");
	}*/
/* 	var radio1 = chrome.contextMenus.create({
		"title": "Radio 1", "type": "radio",
		"onclick": radioOnClick
	});
	var radio2 = chrome.contextMenus.create({
		"title": "Radio 2", "type": "radio",
		"onclick": radioOnClick
	});
	console.log("radio1:" + radio1 + " radio2:" + radio2);
 

	// Create some checkbox items.  
	function checkboxOnClick(info, tab) {
		console.log(JSON.stringify(info));
		console.log("checkbox item " + info.menuItemId +
			" was clicked, state is now: " + info.checked +
			"(previous state was " + info.wasChecked + ")");

	}
	var checkbox1 = chrome.contextMenus.create(
		{ "title": "Checkbox1", "type": "checkbox", "onclick": checkboxOnClick });
	var checkbox2 = chrome.contextMenus.create(
		{ "title": "Checkbox2", "type": "checkbox", "onclick": checkboxOnClick });
	console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);
*/

	// Intentionally create an invalid item, to show off error checking in the  
	// create callback.  
	
	chrome.contextMenus.create({ "title": "Oops", "parentId": 999 }, function () {
		if (chrome.extension.lastError) {
			console.log("Got expected error: " + chrome.extension.lastError.message);
		}
	});  
	
}

init();
window.onload = function(){

}