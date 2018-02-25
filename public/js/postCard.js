console.log('index online');
let cardOut = false;
const postURL = 'http://localhost:3000/posts';
let loggedInLinkedIn = window.Cookies.get('linkedin');
let loggedInFB = window.Cookies.get('facebook');

$("#post-card-toggle").on('click', () => {
	console.log('CLICK')
$("#post-card-toggle").hide();
let loggedIn = loggedInLinkedIn || loggedInFB;
	if(loggedIn) {
		$('#post-card-loggedIn').show();
		$('#post-card-loggedOut').hide();
	}
	else {
		$('#post-card-loggedIn').hide();
		$('#post-card-loggedOut').show();
	}
	// $(".post-card").animate({ "opacity": "1"}, "slow", () => {

	// });
	// if(cardOut) {
	// 	$("#post-card-toggle").show();
	// 	$(".post-card").animate({ "opacity": "0"}, "slow", () => {
	// 		cardOut = false;
	// 		$(".post-card").hide();
	// 	});
	// }
	// else {
	// 	$("#post-card-toggle").hide();
	// 	$(".post-card").show();
	// 	$(".post-card").animate({ "opacity": "1"}, "slow", () => {
	// 		cardOut = true;
	// 	});
	// }

});

$("#post-card-submit").on('click', () => {
	console.log('post card submitted');
$("#post-card-toggle").show();
$(".post-card").animate({ "opacity": "0"}, "slow", () => {
	cardOut = true;
});
	let json = {
		author: {
			firstName: $('#card-first-name').val(),
			lastName: $('#card-last-name').val()
		},
		contact: {
			email: $('#card-email').val(),
			phone: $('#card-phone').val()
		},
		title: $('#card-title').val(),
		picUrl: $('#card-picture-url').val(),
		type: $('#card-type').val(),
		description: $('#card-description').val(),
		hashtags: $('#card-hashtags').val().split(" ")
	};
	console.log('New post = ',json)
	window.feed.createNewPost(json)
	// $.ajax({
	// type: "POST",
	// url: postURL,
	// data: json,
	// success: () => {
	// 	console.log('post success!')
	// },
	// dataType: 'json'

	// });
});

$("#post-card-cancel").on('click', () => {
	$('.post-card').hide();
	$("#post-card-toggle").show();
});


// $("#post-card-toggle").on('click', () => {
//
//
// });
