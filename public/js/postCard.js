console.log('post card online');

const postURL = 'http://localhost:3000/posts';
let loggedInLinkedIn = window.Cookies.get('linkedin');
let loggedInFB = window.Cookies.get('facebook');
let hashtags = [];

$("#post-card-toggle").on('click', () => {
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

	$('#card-pro').on('change', () => {
		$("#card-pro-selected").slideToggle( "slow", function() {
		// Animation complete.
	});
	});

	$('#card-classroom').on('change', () => {

			hashtags = [];
			$("#card-hashtags").val("");
			$("#card-internship").prop('checked', false)
			$("#card-externship").prop('checked', false)
			$("#card-mentorship").prop('checked', false)

		$("#card-pro-selected").slideToggle( "slow", function() {
		// Animation complete.
	});
	});

	$("#card-internship").on('change', () => {
		let val = "#internship";
		if($("#card-internship").is(':checked')) {
			if(!hashtags.includes(val)) {
				hashtags.push(val);
				$("#card-hashtags").val(hashtags);
			}
		}
		else {
			let index = hashtags.indexOf(val);
			hashtags.splice(index, 1);
			$("#card-hashtags").val(hashtags);
		}
	});

	$("#card-mentorship").on('change', () => {
		let val = "#mentorship";
		if($("#card-mentorship").is(':checked')) {
			if(!hashtags.includes(val)) {
				hashtags.push(val);
				$("#card-hashtags").val(hashtags);
			}
		}
		else {
			let index = hashtags.indexOf(val);
			hashtags.splice(index, 1);
			$("#card-hashtags").val(hashtags);
		}
	});

	$("#card-externship").on('click', () => {
		let val = "#externship";
		if($("#card-externship").is(':checked')) {
			if(!hashtags.includes(val)) {
				hashtags.push(val);
				$("#card-hashtags").val(hashtags);
			}
		}
		else {
			let index = hashtags.indexOf(val);
			hashtags.splice(index, 1);
			$("#card-hashtags").val(hashtags);
		}
	});
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
});
	let type = 'class';
	if($('#card-pro').is(':checked')) {
		type = "company";
	}
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
		hashtags: $('#card-hashtags').val().split(",")
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

$(".post-card-cancel").on('click', () => {
	console.log('cancel');
	$('.post-card').hide();
	$("#post-card-toggle").show();
});


// $("#post-card-toggle").on('click', () => {
//
//
// });
