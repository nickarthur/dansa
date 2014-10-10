var fs = require('fs');
var clientId = 'dd05cd4c464c2594f4875132abf36798';

/**
 * GET /
 * Choose song or whatever
 */
exports.index = function(req, res, next){
	fs.readdir('public/songs', function (err, files){
		if(err) return next(err);

		files = files.filter(function (f){
			return !isNaN(parseInt(f, 10));
		}).map(function (f){
			return parseInt(f, 10);
		});

		files.sort(function (a, b){
			return a - b;
		});

		res.render('index', {
			songs: files,
			scClientId: clientId
		});
	});
};

/**
 * GET /play
 */
exports.play = function(req, res, next){
	var songId = parseInt(req.query.songId, 10);
	var scSong = req.query.scSong;
	var backgroundUrl = req.query.bg || false;

	res.render('play', {
		songId: songId,
		soundCloudSong: scSong,
		backgroundUrl: backgroundUrl,
		scClientId: clientId
	});
};

/**
 * GET /setup
 */
exports.setup = function(req, res, next){
	res.render('setup');
};