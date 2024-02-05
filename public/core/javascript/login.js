nowuiDashboard = {
	misc: {
		navbar_menu_visible: 0,
	},

	showNotification: function (options) {
		color = options.colorTheme;

		$.notify(
			{
				icon: options.icon,
				message: options.message,
			},
			{
				type: color,
				timer: options.timer,
				placement: {
					from: options.from,
					align: options.align,
				},
			}
		);
	},
};

function notifySuccess() {
	try {
		var succes = document.getElementById("message").getAttribute("data-msg");
		var opt = {
			from: "top",
			align: "center",
			colorTheme: "success",
			message: succes,
			timer: 800,
			icon: "fa fa-check",
		};
		nowuiDashboard.showNotification(opt);
	} catch (error) {
		console.log(error);
	}
}

function notifyError() {
	try {
		var error = document
			.getElementById("error-message")
			.getAttribute("data-msg");
		var opt = {
			from: "top",
			align: "center",
			colorTheme: "danger",
			message: error,
			timer: 800,
			icon: "fa fa-exclamation-triangle",
		};
		nowuiDashboard.showNotification(opt);
	} catch (error) {
		console.log(error);
	}
}

function notifyWarning() {
	try {
		var warning = document
			.getElementById("warning-message")
			.getAttribute("data-msg");
		var opt = {
			from: "top",
			align: "center",
			colorTheme: "warning",
			message: warning,
			timer: 800,
			icon: "fa fa-exclamation",
		};
		nowuiDashboard.showNotification(opt);
	} catch (error) {
		console.log(error);
	}
}

function notifyContent() {
	var opt = {
		from: "top",
		align: "center",
		colorTheme: "warning",
		message: "warning",
		timer: 800,
		icon: "fa fa-exclamation",
	};
	nowuiDashboard.showNotification(opt);
}

// notifyContent();

function runnotifications() {
	notifySuccess();
	notifyError();
	notifyWarning();
}

document.onreadystatechange = () => {
	if (document.readyState === "complete") {
		runnotifications();
	}
};
