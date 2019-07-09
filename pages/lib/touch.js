import Vue from 'vue';

function vueTouch(el, binding, type) {
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.touchType = type;
    this.vueTouches = {
        x: 0,
        y: 0
    };
    this.vueMoves = true;
    this.vueLeave = true;
	this.longTouch = true;
	this.vueCallBack = typeof(binding.value) == "object" ? binding.value.fn : binding.value;
    this.obj.addEventListener("touchstart", function(e) {
        _this.start(e);
    }, false);
    this.obj.addEventListener("touchend", function(e) {
        _this.end(e);
    }, false);
    this.obj.addEventListener("touchmove", function(e) {
        _this.move(e);
    }, false);
};
vueTouch.prototype = {
    start: function(e) {
        this.vueMoves = true;
        this.vueLeave = true;
        this.longTouch = true;
        this.vueTouches = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        this.time = setTimeout(function() {
            if (this.vueLeave && this.vueMoves) {
                this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
                this.longTouch = false;
            };
        }.bind(this), 1000);
    },
    end: function(e) {
        var disX = e.changedTouches[0].pageX - this.vueTouches.x;
        var disY = e.changedTouches[0].pageY - this.vueTouches.y;
        clearTimeout(this.time);
        if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
            this.touchType == "swipe" && this.vueCallBack(this.binding.value, e);
            if (Math.abs(disX) > Math.abs(disY)) {
                if (disX > 10) {
                    this.touchType == "swiperight" && this.vueCallBack(this.binding.value, e);
                };
                if (disX < -10) {
                    this.touchType == "swipeleft" && this.vueCallBack(this.binding.value, e);
                };
            } else {
                if (disY > 10) {
                    this.touchType == "swipedown" && this.vueCallBack(this.binding.value, e);
                };
                if (disY < -10) {
                    this.touchType == "swipeup" && this.vueCallBack(this.binding.value, e);
                };
            };
        } else {
            if (this.longTouch && this.vueMoves) {
                this.touchType == "tap" && this.vueCallBack(this.binding.value, e);
                this.vueLeave = false
            };
        };
    },
    move: function(e) {
        this.vueMoves = false;
    }
};

Vue.directive("swipe", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipe");
    }
});
Vue.directive("swipeleft", {
    bind: function(el, binding) {
		
        new vueTouch(el, binding, "swipeleft");
    }
});
Vue.directive("swiperight", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swiperight");
    }
});
Vue.directive("swipedown", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipedown");
    }
});
Vue.directive("swipeup", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeup");
    }
});
Vue.directive("longtap", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "longtap");
    }
});

Vue.directive('press', {
	bind: function (el, binding) {
		el.addEventListener('touchstart', (e) => {
			//el.classList.add(binding.value);
			///console.log(binding);
			el.style.WebkitTransform = 'scale(.98) translateY(4px)';
			el.style.transform = 'scale(.98) translateY(4px)';
		});
		el.addEventListener('touchend', e => {
			//el.classList.remove(binding.value);
			el.style.WebkitTransform = 'scale(1) translateY(0)';
			el.style.transform = 'scale(1) translateY(0)';
		});
	}
});
