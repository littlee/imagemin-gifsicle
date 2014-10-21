'use strict';

var gifsicle = require('../');
var isGif = require('is-gif');
var path = require('path');
var read = require('vinyl-file').read;
var test = require('ava');

test('optimize a GIF', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.gif'), function (err, file) {
		t.assert(!err);

		var stream = gifsicle();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isGif(data.contents));
		});

		stream.end(file);
	});
});

test('optimize a GIF using ctor', function (t) {
	t.plan(3);

	var Gifsicle = gifsicle.ctor();

	read(path.join(__dirname, 'fixtures/test.gif'), function (err, file) {
		t.assert(!err);

		var stream = new Gifsicle();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isGif(data.contents));
		});

		stream.end(file);
	});
});
