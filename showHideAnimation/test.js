Module.register("test", {
	// Default module config.
	defaults: {},

	start: function () {
		this.timer = null;
		this.onoff = 1;
	},

	getDom: function () {
		var dom = document.createElement("div");
		dom.innerHTML = `
      <p>
      This is the test module.<br/>
      Lorem Ipsum <br/>
    
    `;
		return dom;
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "DOM_OBJECTS_CREATED") {
			var modules = MM.getModules().filter((m) => {
				if (m.name === "compliments") {
					m.hideAnimation = (selfDom, speed) => {
						selfDom.style.transition = "opacity " + speed / 1000 + "s";
						selfDom.style.opacity = 0;
						let keyframe = [
							{ transform: "rotate(0deg) scale(1, 1)", opacity: 1, easing: "ease-in" },
							{ transform: "rotate(1080deg) scale(0, 0)", opacity: 0, easing: "ease-out" }
						];
						let animation = selfDom.animate(keyframe, {
							duration: speed
						});
					};
				}
			});
			this.job();
		}
	},

	job: function () {
		clearTimeout(this.timer);
		this.onoff = 1 - this.onoff;

		const position = (pos) => {
			if (pos.search("_left") >= 0) return "(-400px, 0)";
			if (pos.search("_right") >= 0) return "(400px, 0)";
			if (pos.search("top_bar") >= 0 || pos.search("upper") >= 0 || pos.search("middle") >= 0) return "(0, -200px)";
			if (pos.search("bottom_bar") >= 0 || pos.search("lower") >= 0) return "(0, 200px)";
			return "(0,0)";
		};

		const hideModule = (module) => {
			module.hide(1000, {
        animation: ({moduleWrapper, module, speed}) => {
          moduleWrapper.style.transition = "opacity " + speed / 1000 + "s";
		      moduleWrapper.style.opacity = 0;
          const selfDom = moduleWrapper
          const value = position(module.data.position)
          let keyframe = [
            { transform: 'translate(0, 0)', easing: 'ease-out'},
            { transform: `translate${value}`, easing: 'ease-in' },
          ];
          let animation = selfDom.animate(
            keyframe, {
              duration: speed,
            }
          )
        }
			});
		};

		const showModule = (module) => {
			module.show(1000, {
        animation: ({moduleWrapper, module, speed}) => {
          moduleWrapper.style.transition = "opacity " + speed / 1000 + "s";
		      moduleWrapper.style.opacity = 1;
          const selfDom = moduleWrapper
          const value = position(module.data.position)
          let keyframe = [
            { transform: `translate${value}`, easing: 'ease-in'},
            { transform: 'translate(0, 0)', easing: 'ease-out' },
          ];
          let animation = selfDom.animate(
            keyframe, {
              duration: speed,
            }
          )
        }
			});
		};

		const sleep = (ms) => {
			return new Promise((resolve) => setTimeout(resolve, ms));
		};

		const hides = async (modules) => {
			for await (let m of modules) {
				hideModule(m);
				await sleep(100);
			}
		};

		const shows = async (modules) => {
			for await (let m of modules) {
				showModule(m);
				await sleep(100);
			}
		};

		var modules = MM.getModules();
		if (this.onoff) {
			hides(modules);
		} else {
			shows(modules);
		}

		this.timer = setTimeout(() => {
			this.job();
		}, 5000);
	},

	hideAnimation: function (selfDom, speed) {
		selfDom.style.transition = "opacity " + speed / 1000 + "s";
		selfDom.style.opacity = 0;
		let keyframe = [
			{ transform: "rotate(0deg) scale(1, 1)", opacity: 1, easing: "ease-in" },
			{ transform: "rotate(1080deg) scale(0, 0)", opacity: 0, easing: "ease-out" }
		];
		let animation = selfDom.animate(keyframe, {
			duration: speed
		});
	},

	showAnimation: function (selfDom, speed) {
		selfDom.style.transition = "opacity " + speed / 1000 + "s";
		selfDom.style.opacity = 1;
		let keyframe = [
			{ transform: "rotate(-1080deg) scale(0, 0)", opacity: 0, easing: "ease-in" },
			{ transform: "rotate(0deg) scale(1, 1)", opacity: 1, easing: "ease-out" }
		];
		let animation = selfDom.animate(keyframe, {
			duration: speed
		});
	}
});
