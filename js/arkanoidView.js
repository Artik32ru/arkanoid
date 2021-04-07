var View = function() {
    this.onKeyDownEvent = null;

    this.field = document.querySelector('#field');
    this.platform = document.querySelector('#platform');
    this.ball = document.querySelector('#ball');

	this.bricks = [];
    this.onKeyDownEvent = null;
    this.onMouseMoveEvent = null;
};

View.prototype.init = function (objs)
{
    document.addEventListener('keydown', this.onKeyDownEvent);
    document.addEventListener('mousemove', this.onMouseMoveEvent);

	field.setAttribute('width', objs.field.w);
	field.setAttribute('height', objs.field.h);

	platform.setAttribute('x',objs.platform.x);
	platform.setAttribute('y',objs.platform.y);
	platform.setAttribute('width',objs.platform.w);
	platform.setAttribute('height',objs.platform.h);

	ball.setAttribute('cx',objs.ball.x + objs.ball.w / 2);
	ball.setAttribute('cy',objs.ball.y + objs.ball.h / 2);
	ball.setAttribute('r',objs.ball.w / 2);
	ball.style.fill = objs.ball.color;			
	
	objs.bricks.forEach(brick => {
        var newBlock = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

        newBlock.setAttribute('class','brick');

		newBlock.style.fill = 'gray';			
		newBlock.style.visibility = 'visible';			
		newBlock.setAttribute('x',brick.x);
		newBlock.setAttribute('y',brick.y);
		newBlock.setAttribute('width',brick.w);
		newBlock.setAttribute('height',brick.h);

        this.field.appendChild(newBlock);
	});

   	this.bricks = document.querySelectorAll('.brick');
};

View.prototype.render = function (objs) 
{
	platform.setAttribute('x',objs.platform.x);
	platform.setAttribute('y',objs.platform.y);

	ball.setAttribute('cx',objs.ball.x + objs.ball.w/2);
	ball.setAttribute('cy',objs.ball.y + objs.ball.w/2);


	objs.bricks.forEach((brick, i) => {
		if (brick.alive == false && this.bricks[i].style.visibility == "visible")
		{
			this.bricks[i].style.visibility = 'hidden';
		}

		if (brick.alive == true && this.bricks[i].style.visibility == "hidden")
		{
			this.bricks[i].style.visibility = 'visible';	
		}
	});
};


var arkanoidView = new View();