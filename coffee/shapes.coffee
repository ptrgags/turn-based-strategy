@shapes = {}
@CELL_SIZE = 32

shapes.click_area = new createjs.Shape
gfx = shapes.click_area.graphics
gfx.beginFill "black"
gfx.drawRect 0, 0, CELL_SIZE, CELL_SIZE

shapes.move_square = new createjs.Shape
gfx = shapes.move_square.graphics
gfx.beginFill "green"
gfx.drawRect 0, 0, CELL_SIZE, CELL_SIZE
shapes.move_square.alpha = 0.50


#Bitmaps are nice and easy! though probably want to preload them
shapes.rock = new createjs.Bitmap "images/rock.png"

shapes.player = new createjs.Bitmap "images/player.png"
shapes.player.hitArea = shapes.click_area.clone()

###
shapes.player = new createjs.Shape
gfx = shapes.player.graphics
gfx.beginStroke "black"
gfx.beginFill "red"
gfx.drawCircle CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 4
shapes.player.hitArea = shapes.click_area.clone()
###

shapes.hill = new createjs.Shape
gfx = shapes.hill.graphics
gfx.beginFill "brown"
gfx.beginStroke "black"
gfx.moveTo CELL_SIZE / 2, CELL_SIZE / 4
gfx.lineTo CELL_SIZE * 2 / 3, CELL_SIZE * 2 / 3
gfx.lineTo CELL_SIZE * 1 / 3, CELL_SIZE * 2 / 3
gfx.lineTo CELL_SIZE / 2, CELL_SIZE / 4
