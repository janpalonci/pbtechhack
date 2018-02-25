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
	console.log('getProfileData')
	let loggedInLinkedIn = window.Cookies.get('linkedin');
	if(!loggedInLinkedIn){
		$('#post-card-loggedIn').show();
		$('#post-card-loggedOut').hide();
		window.Cookies.set('linkedin', 'true', { expires: 2 });
	}

	
	
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

shareLinkedIn = (postId) => {
	if(checkAuth()) {
		console.log("share stuff");

		let post = window.feed.state.posts.find( post => post._id === postId)
		let payload = {
			'comment':'',
			'content':{
				'title':post.title,
				'description':post.description,
				'submitted-url':'https://www.palmbeachschools.org/stem/',
				'submitted-image-url':post.picUrl,
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
			// var win = window.open(data.updateUrl, '_blank');
			// win.focus();
			swal("Good job!", "You shared this!", "success");
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
