var View = function() 
{	
	this.platform = document.querySelector('#platform');
   	this.bricks = null;
	this.ball = document.querySelector('#ball');
	this.field = document.querySelector('#field');
	
    this.onKeyDownEvent = null;
    this.onMouseMoveEvent = null;
};

View.prototype.render = function (objs) 
{
	this.platform.style.top = objs.platform.y + 'px';
	this.platform.style.left = objs.platform.x + 'px';
	this.platform.style.width = objs.platform.w + 'px';
	this.platform.style.height = objs.platform.h + 'px';
		
    this.ball.style.top = objs.ball.y + 'px';	
	this.ball.style.left = objs.ball.x + 'px';
	this.ball.style.width = objs.ball.w + 'px';
	this.ball.style.height = objs.ball.h + 'px';

	objs.bricks.forEach((brick, i) => {
		if (this.blockStates[i] == true && brick.alive == true)
		{
			this.bricks[i].style.visibility = 'visible';
		}

		if (this.blockStates[i] == true && brick.alive == false)
		{
			this.bricks[i].style.visibility = 'hidden';
		}
	});
};

View.prototype.init = function (objs)
{
    document.addEventListener('keydown', this.onKeyDownEvent);
    document.addEventListener('mousemove', this.onMouseMoveEvent);

	this.blockStates = [];

    this.field.style.top = objs.field.y + 'px';	
	this.field.style.left = objs.field.x + 'px';
	this.field.style.width = objs.field.w + 'px';
	this.field.style.height = objs.field.h + 'px';

	this.ball.style.background = objs.ball.color;

	objs.bricks.forEach(brick => {
		let div = document.createElement('div');
		div.className = "brick";

		div.style.top = brick.y + 'px';
		div.style.left = brick.x + 'px';
		div.style.width = brick.w + 'px';
		div.style.height = brick.h + 'px';

		field.appendChild(div);

		this.blockStates.push(brick.alive);
	});

	this.bricks = document.querySelectorAll('.brick');
};

var arkanoidView = new View();
