onLinkedInLoad = () => {
	console.log("linkedIn loaded");

	IN.Event.on(IN, "auth", getProfileData);
}

onError = () => {
	console.log("there was an error pls try again");
}

authorizeUser = () => {
	console.log('authorize');
	IN.User.authorize(() => {
		console.log('user successfully authorized').error(onError);
	});
}

getProfileData = () => {
	window.Cookies.set('linkedin', 'true', { expires: 2 });
	$('#post-card-loggedIn').show();
	$('#post-card-loggedOut').hide();
	console.log('getting profile data');
	IN.API.Raw("people/~?format=json").method("GET").body().result((data) => {
		$('#card-first-name').val(data.firstName);
		$('#card-last-name').val(data.lastName);
		console.log('data: ' + JSON.stringify(data));

	}).error(onError);
}

checkAuth = () => {
	let authorized = IN.User.isAuthorized();
	console.log("user authorized linkedIn: " + authorized);
	return authorized;
}

shareLinkedIn = () => {
	if(checkAuth()) {
		console.log("share stuff");
		let payload = {
			'comment':'user comment',
			'content':{
				'title':'test title',
				'description':'test description',
				'submitted-url':'https://google.com',
				'submitted-image-url':'https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_960_720.jpg',
			},
			'visibility':{
				'code':'anyone'
			}
		};
		const url="/people/~/shares?format=json";
		//const queryString = $.param(payload);
		const queryString = JSON.stringify(payload);
		console.log("query string: " + queryString);
		IN.API.Raw().url(url).method("POST").body(queryString).result((data) => {
			console.log('share callback: ' + data.updateUrl);
		}).error(onError);
	}
	else {
		console.log("user is not authorized");
		authorizeUser();
	}
}

refreshUserToken = () => {
	IN.User.refresh();
	console.log('user refreshed');
}

logout = () => {
	IN.User.logout(() => {
		cobsole.log('user logged out');
	}).error(onError);
}
