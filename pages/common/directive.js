import Vue from 'vue';
Vue.directive('press', {
    bind: function (el, binding) {
		console.log(el);
        el.addEventListener('mousedown',(e)=>{
            //el.classList.add(binding.value);
			if (el.className.indexOf('zmiti-checkuser-main-ui')>-1){
				return;
			}
            el.style.WebkitTransform = 'scale(.98) translateY(2px)';
            el.style.transform = 'scale(.98) translateY(2px)';
        });
        el.addEventListener('mouseup',e=>{
            //el.classList.remove(binding.value);
            el.style.WebkitTransform = 'scale(1) translateY(0)';
            el.style.transform = 'scale(1) translateY(0)';
        });
    }
});
