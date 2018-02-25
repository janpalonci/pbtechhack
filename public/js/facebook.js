let userID = '';
let accessToken = '';

checkLoginState = () => {
	FB.getLoginStatus(data => {
		console.log("getLoginStatus called: " + JSON.stringify(data));
		checkStatus(data);
	});
};

checkStatus = (data) => {
	console.log("statusChangeCallback called!");
	console.log("Data: " + JSON.stringify(data));
	let status = false;
	if(data.status === 'connected') {
		window.Cookies.set('facebook', 'true', { expires: 2 });
		userID = data.authResponse.userID;
		accessToken = data.authResponse.accessToken;
		status = true;
		$('#post-card-loggedIn').show();
		$('#post-card-loggedOut').hide();
		console.log("Connected facebook!");
		console.log(`ID: ${userID}`);
	}
	else {
		console.log("not logged in to facebook");
		FB.login(data => {
			console.log("Login response:" + JSON.stringify(data));
		});
	}
	return status;
};

shareFB = () => {
	FB.ui({
	method: 'share',
	href: 'https://google.com',
}, (data) => {
	console.log("share data: " + data);
});
}

setShareLink = (uri) => {
	 $(".fb-share-button").attr('data-href', encodeURIComponent(uri));
	 $('#facebook-share').attr('href', encodeURIComponent(`https://www.facebook.com/sharer/sharer.php?u=${uri};src=sdkpreparse`))
}
