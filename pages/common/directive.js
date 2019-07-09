import Vue from 'vue';
Vue.directive('press', {
    bind: function (el, binding) {
        el.addEventListener('mousedown',(e)=>{
            //el.classList.add(binding.value);
            ///console.log(binding);
            el.style.WebkitTransform = 'scale(.98) translateY(4px)';
            el.style.transform = 'scale(.98) translateY(4px)';
        });
        el.addEventListener('mouseup',e=>{
            //el.classList.remove(binding.value);
            el.style.WebkitTransform = 'scale(1) translateY(0)';
            el.style.transform = 'scale(1) translateY(0)';
        });
    }
});
