var labelFontSize = 15;
var slideChangeTimeout = 4000;

$(function() {
	setupCanvas();

	setTimeout(function() {
		createSlideShow('key_partners', '#key_partners_slides', 'Key Partners')
	}, 0);
	setTimeout(function() {
		createSlideShow('cost_structure', '#cost_structure_slides', 'Cost Structure')
	}, 0);

	setTimeout(function() {
		createSlideShow('key_activities', '#key_activities_slides', 'Key Activities')
	}, 100);
	setTimeout(function() {
		createSlideShow('key_resources', '#key_resources_slides', 'Key Resources')
	}, 100);

	setTimeout(function() {
		createSlideShow('value_proposition', '#value_proposition_slides', 'Value Proposition')
	}, 200);

	setTimeout(function() {
		createSlideShow('revenue_streams', '#income_streams_slides', 'Income Streams')
	}, 300);

	setTimeout(function() {
		createSlideShow('customer_relationships', '#customer_relationships_slides', 'Customer Relationships')
	}, 400);
	setTimeout(function() {
		createSlideShow('channels', '#key_channels_slides', 'Key Channels')
	}, 400);

	setTimeout(function() {
		createSlideShow('customer_segments', '#customer_segments_slides', 'Customer Segments')
	}, 500);

});

function slideShow(imageList, currentSlide, canvas, title) {
	this.imageList = imageList;
	this.currentSlide = currentSlide;
	this.canvas = canvas;
	this.title = title;
}

function createSlideShow(canvasId, slidesSelector, title) {
	var imageList = [];
	var canvas = document.getElementById(canvasId);

	// collect all images
	$(slidesSelector).children().each(function(i) {
		var img = new Image();
		img.src = this.src;
		imageList.push(img);
	});

	var show = new slideShow(imageList, 0, canvas, title);
	beginSlideShow(show);
}

function beginSlideShow(slideShow) {
	changeSlide(slideShow);
	var iTimer = setInterval(function() {
		changeSlide(slideShow)
	}, slideChangeTimeout);
}

function changeSlide(slideShow) {
	fadeOutAndFadeIn(slideShow);
}

function drawLabel(slideShow) {
	var ctx = slideShow.canvas.getContext('2d');
	
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "black";
	var blockHeight = (labelFontSize + 10);
	
	ctx.fillRect(0, slideShow.canvas.height - blockHeight, slideShow.canvas.width, slideShow.canvas.height )
	
	ctx.globalAlpha = 1;
	ctx.fillStyle = "white";
	ctx.font = labelFontSize + "pt Verdana";
	ctx.fillText(slideShow.title, 5, slideShow.canvas.height - (labelFontSize/2) + 2);
}

function fadeIn(slideShow) {
	var alpha = 0;
	var ctx = slideShow.canvas.getContext('2d');

	var interval = setInterval(function() {
		clearCanvas(slideShow)
		ctx.globalAlpha = alpha;
		ctx.drawImage(slideShow.imageList[slideShow.currentSlide], 0, 0, slideShow.canvas.width, slideShow.canvas.height);

		drawLabel(slideShow);

		alpha = alpha + 0.05;

		if (alpha > 1) {
			clearInterval(interval);
		}
	}, 20);
}

function fadeOutAndFadeIn(slideShow) {
	var alpha = 1;
	var ctx = slideShow.canvas.getContext('2d');

	var interval = setInterval(function() {
		clearCanvas(slideShow)
		ctx.globalAlpha = alpha;
		ctx.drawImage(slideShow.imageList[slideShow.currentSlide], 0, 0, slideShow.canvas.width, slideShow.canvas.height);

		drawLabel(slideShow);

		alpha = alpha - 0.05;

		if (alpha < 0) {
			clearInterval(interval);
			nextSlide(slideShow)
			fadeIn(slideShow);
		}
	}, 20);
}

function nextSlide(slideShow) {
	slideShow.currentSlide++;

	if (slideShow.currentSlide == $(slideShow.imageList).length) {
		slideShow.currentSlide = 0;
	}
}

function clearCanvas(slideShow) {
	slideShow.canvas.width = slideShow.canvas.width;
}

function setupCanvas() {
	var screenHeight = $(window).height() - 15;

	$(".tall").height(Math.round(screenHeight * 0.66));
	$(".short").height(Math.round(screenHeight * 0.33));

	var screenWidth = $(window).width() - 15;

	$(".wide").width(Math.round(screenWidth * 0.5));
	$(".narrow").width(Math.round(screenWidth * 0.2));

	$("canvas").each(function() {
		this.width = $(this).parent().width();
		this.height = $(this).parent().height();
	});
}

