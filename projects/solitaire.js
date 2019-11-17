var Game = function()
{
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");	
	
	var FPS = 60;
	var renderImage  = true;
	
	var cache;
	
	var SCALING = 1;
	var TILE_SIZE = 32;
	
	
	var previousSelectedMapX = 0;
	var previousSelectedMapY = 0;
	var currentSelectedMapX = 0;
	var currentSelectedMapY = 0;
	var firstSelected = false;
	
	var spritesheet=document.createElement('img');
	spritesheet.src='solitare_sprites.png';
	
	var Map = [
	[3,3,3,3,3,3,3,3,6],
	[3,2,2,1,1,1,2,2,3],
	[3,2,2,1,1,1,2,2,3],
	[3,1,1,1,1,1,1,1,3],
	[3,1,1,1,0,1,1,1,3],
	[3,1,1,1,1,1,1,1,3],
	[3,2,2,1,1,1,2,2,3],
	[3,2,2,1,1,1,2,2,3],
	[3,3,3,3,3,3,3,3,3]];
	
	var previousMap = Array.from(Map);
	
	var spriteNoPeg = new Sprite(0,0,0);
	var spritePeg = new Sprite(1,32,0);
	var spriteBlank = new Sprite(2,64,0);
	var spriteWall = new Sprite(3,96,0);
	var spriteCursor = new Sprite(4,128,0);
	var spriteSelectedPeg = new Sprite(5,160,0);
	var spriteBack = new Sprite(6, 192, 0);
	
	var cursor = new Cursor();
	
	var sprites = [spriteNoPeg,spritePeg,spriteBlank,spriteWall,spriteCursor,spriteSelectedPeg, spriteBack];
	
	cls();
	
	setInterval(function() {
    update();
    drawToCanvas();
    }, 1000/FPS);
	
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mouseup', mouseUp, false);
	
	
	function keyUp(e)
	{	
		e.preventDefault();
		switch(e.keyCode)
		{
			case KEYS.LEFT: 
				player.left = false;
				break;
			case KEYS.RIGHT: 
				player.right = false;
				break;
			case KEYS.UP: 
				player.up = false;
				break;
			case KEYS.DOWN: 
				player.down = false;
				break;
		}
	}
	
	function mouseMove(e)
	{
		var mapCoords = getMouseMapCoords(e)
		cursor.setX(mapCoords.x*TILE_SIZE);
		cursor.setY(mapCoords.y*TILE_SIZE);
		renderImage = true;
		
	}
	
	function mouseUp(e)
	{
		var mapCoords = getMouseMapCoords(e)
		// Shift along map positions
		previousSelectedMapX = currentSelectedMapX;
		previousSelectedMapY = currentSelectedMapY;
		currentSelectedMapX = mapCoords.x;
		currentSelectedMapY = mapCoords.y;
		
		
		if(Map[currentSelectedMapY][currentSelectedMapX] == 6) // back button
		{
			Map = JSON.parse(JSON.stringify(previousMap));
			firstSelected = false;
			for(var i = 0; i<=Map[0].length-1; i++)
			{
				for(var g = 0; g<=Map.length-1; g++)
				{
					if(Map[g][i] == 5) Map[g][i] = 1;	
				}
			}
		}
		else
		{
			if(firstSelected) // There is a peg selected
			{
				if(Map[currentSelectedMapY][currentSelectedMapX] != 0) // if the new one is not an empty spot
				{
					Map[previousSelectedMapY][previousSelectedMapX] = 1	
				}
				else	// An empty spot is selected so check if it is legal.
				{
					//UP
					if(currentSelectedMapY < previousSelectedMapY && previousSelectedMapY > 2 && Map[previousSelectedMapY - 1][previousSelectedMapX] == 1 && Map[previousSelectedMapY - 2][previousSelectedMapX] == 0) // if it is low enough
					{
						previousMap = JSON.parse(JSON.stringify(Map));
						Map[previousSelectedMapY][previousSelectedMapX] = 0	// clear old one
						Map[previousSelectedMapY - 1][previousSelectedMapX] = 0 // delete middle one
						Map[previousSelectedMapY - 2][previousSelectedMapX] = 1 // set top one 
						
					}
		
					//DOWN
					else if(currentSelectedMapY > previousSelectedMapY && previousSelectedMapY < 6 && Map[previousSelectedMapY + 1][previousSelectedMapX] == 1 && Map[previousSelectedMapY + 2][previousSelectedMapX] == 0) // if it is high enough
					{
						previousMap = JSON.parse(JSON.stringify(Map));
						Map[previousSelectedMapY][previousSelectedMapX] = 0	// clear old one
						Map[previousSelectedMapY + 1][previousSelectedMapX] = 0 // delete middle one
						Map[previousSelectedMapY + 2][previousSelectedMapX] = 1 // set top one 
						
					}
					
					//LEFT
					else if(currentSelectedMapX < previousSelectedMapX && previousSelectedMapX > 2 && Map[previousSelectedMapY][previousSelectedMapX - 1] == 1 && Map[previousSelectedMapY][previousSelectedMapX - 2] == 0) // if it is to the right enough
					{
						previousMap = JSON.parse(JSON.stringify(Map));
						Map[previousSelectedMapY][previousSelectedMapX] = 0	// clear old one
						Map[previousSelectedMapY][previousSelectedMapX -1] = 0 // delete middle one
						Map[previousSelectedMapY][previousSelectedMapX -2] = 1 // set top one 
						
					}
					
					//RIGHT
					else if(currentSelectedMapX > previousSelectedMapX && previousSelectedMapX < 6 && Map[previousSelectedMapY][previousSelectedMapX + 1] == 1 && Map[previousSelectedMapY][previousSelectedMapX + 2] == 0 ) // if it is to the right enough
					{
						previousMap = JSON.parse(JSON.stringify(Map));
						Map[previousSelectedMapY][previousSelectedMapX] = 0	// clear old one
						Map[previousSelectedMapY][previousSelectedMapX + 1] = 0 // delete middle one
						Map[previousSelectedMapY][previousSelectedMapX + 2] = 1 // set top one 
					}
					else	// illegal move
					{
						Map[previousSelectedMapY][previousSelectedMapX] = 1
					}
				}
				firstSelected = false;
			}
		}
		
		
		if(Map[currentSelectedMapY][currentSelectedMapX] == 1) // if a peg;
		{
			Map[currentSelectedMapY][currentSelectedMapX] = 5;
			firstSelected = true; 
		}
	
		renderImage = true;
	}
	
	function update()
	{
		renderImage = true;
	}
	
	function drawToCanvas()
	{
		if(renderImage)
		{
			cache = createCanvas(c.width, c.height);
			draw(cache.getContext('2d'));
			renderImage = false;
		}
		ctx.drawImage(cache, 0, 0);
	}
	
	function draw(ctx)
	{
		for(var i = 0; i<=Map[0].length-1; i++)
		{
			for(var g = 0; g<=Map.length-1; g++)
			{
				for(var s = 0; s<=sprites.length-1; s++)
				{
					sprites[Map[g][i]].draw(ctx, 32*i*SCALING, 32*g*SCALING);
				}
			}
		}
		cursor.draw(ctx);
	}
	
	function getMouseMapCoords(e)
	{	
		var rect = c.getBoundingClientRect();
		var pX = Math.floor((e.clientX - rect.left)/TILE_SIZE); 
		var pY = Math.floor((e.clientY - rect.top)/TILE_SIZE);
		return {
			x: pX,
			y: pY
		};
	}
	
	function createCanvas(width, height) 
	{
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}
	
	function Cursor()
	{
		this.x = 0;
		this.y = 0;
		this.mapX = 0;
		this.mapY = 0;
		this.sprite = spriteCursor;
		this.draw = function(ctx)
		{
			if(this.mapX < 9 && this.mapY <9)	//check the cursor is focussed on the board
			{
				if(Map[this.mapY][this.mapX] == 0 || Map[this.mapY][this.mapX] == 1)		// Check the cursor is on the correct tile
				{
					this.sprite.draw(ctx, this.x, this.y);
				}
			}
		}
		this.setX = function(x)
		{
			this.mapX = x/TILE_SIZE;
			this.x = x;
		}
		this.setY = function(y)
		{
			this.mapY = y/TILE_SIZE;
			this.y = y;
		}
		
	}
	
	function Sprite(id, sx,sy)
	{
		this.ID = id;
		this.sheetX = sx;
		this.sheetY = sy;
		this.draw = function(ctx, x, y)
		{	
			ctx.drawImage(spritesheet,this.sheetX,this.sheetY,32,32,x,y,32*SCALING,32*SCALING);
		}
		
	}
	
	function block(isWall)
	{
		this.isWall = isWall;
		this.sprite;
		this.getImage = function(resLoc)
		{
			img = x;
		}
	}

	function cls()
	{
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}