function rgb2hex(rgb) {
	var input = /^rgb\(([a-f\d]+)\,([a-f\d]+)\,([a-f\d]+)\)$/.exec(rgb);
	var r = parseInt(input[1], 10);
	var g = parseInt(input[2], 10);
	var b = parseInt(input[3], 10);
	var res = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
	return res;
}

var View = function () {
	this.onKeyDownEvent = null;
	this.onMouseMoveEvent = null;
	this.ctx = null;

	this.prev_platform_x;
	this.prev_ball_x;
	this.prev_ball_y;
	this.prev_ball_w;
	this.ball_color;
	this.blockStates = [];
};

View.prototype.init = function (objs) {
	document.addEventListener('keydown', this.onKeyDownEvent);
	document.addEventListener('mousemove', this.onMouseMoveEvent);

	var canvasScene = document.getElementById("field");
	this.ctx = canvasScene.getContext('2d');

	canvasScene.width = objs.field.w;
	canvasScene.height = objs.field.h;
	this.canvasw = canvasScene.width;
	this.canvash = canvasScene.height;

	this.ctx.fillStyle = 'white';
	this.ctx.fillRect(0, 0, this.canvasw, this.canvash);

	ball_color = rgb2hex(objs.ball.color);

	this.prev_platform_x = objs.platform.x;
	this.prev_ball_x = objs.ball.x;
	this.prev_ball_y = objs.ball.y;
	this.prev_ball_w = objs.ball.w;
	this.blockStates = [];
	objs.bricks.forEach(brick => {
		this.blockStates.push(brick.alive);
	});
};

View.prototype.render = function (objs) {
	this.ctx.beginPath();
	this.ctx.arc(this.prev_ball_x + this.prev_ball_w / 2, this.prev_ball_y + this.prev_ball_w / 2, this.prev_ball_w / 2 + 1, 0, Math.PI * 2, false);
	this.ctx.closePath();
	this.ctx.fillStyle = "white";
	this.ctx.fill();

	this.prev_ball_x = objs.ball.x;
	this.prev_ball_y = objs.ball.y;

	this.ctx.beginPath();
	this.ctx.arc(objs.ball.x + objs.ball.w / 2, objs.ball.y + objs.ball.h / 2, objs.ball.w / 2, 0, Math.PI * 2, false);
	this.ctx.closePath();
	this.ctx.fillStyle = objs.ball.color;
	this.ctx.fill();

	this.ctx.strokeStyle = "white";
	this.ctx.clearRect(this.prev_platform_x, objs.platform.y, objs.platform.w, objs.platform.h);
	this.ctx.strokeRect(this.prev_platform_x, objs.platform.y, objs.platform.w, objs.platform.h);
	this.ctx.fillStyle = "black";
	this.prev_platform_x = objs.platform.x;

	this.ctx.fillRect(objs.platform.x, objs.platform.y, objs.platform.w, objs.platform.h);
	objs.bricks.forEach((brick, i) => {
		if (this.blockStates[i] == true && brick.alive == true) {
			this.blockStates[i] = true;
			this.ctx.fillStyle = "gray";
			this.ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
		}

		if (this.blockStates[i] == true && brick.alive == false) {
			this.blockStates[i] = false;
			this.ctx.fillStyle = "white";
			this.ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
		}
	});
};

var arkanoidView = new View();