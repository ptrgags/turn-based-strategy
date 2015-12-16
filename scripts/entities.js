// Generated by CoffeeScript 1.10.0
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Entity = (function() {
    Entity.id = 0;

    Entity.next_id = function() {
      return Entity.id++;
    };

    function Entity(row, col, type, layer) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.layer = layer;
      this.shape = null;
      this.id = Entity.next_id();
    }

    Entity.prototype.coords = function() {
      return [this.row, this.col];
    };

    return Entity;

  })();

  this.Unit = (function(superClass) {
    extend(Unit, superClass);

    function Unit(row, col, type, movement) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.movement = movement;
      Unit.__super__.constructor.call(this, this.row, this.col, this.type, 'unit');
    }

    return Unit;

  })(Entity);

  this.Terrain = (function(superClass) {
    extend(Terrain, superClass);

    function Terrain(row, col, type, movement_cost) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.movement_cost = movement_cost;
      Terrain.__super__.constructor.call(this, this.row, this.col, this.type, 'terrain');
    }

    return Terrain;

  })(Entity);

  this.Structure = (function(superClass) {
    extend(Structure, superClass);

    function Structure(row, col, type, is_passable) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.is_passable = is_passable;
      Structure.__super__.constructor.call(this, this.row, this.col, this.type, 'structure');
    }

    return Structure;

  })(Entity);

  this.SelectionSquare = (function(superClass) {
    extend(SelectionSquare, superClass);

    function SelectionSquare(row, col, type) {
      this.row = row;
      this.col = col;
      this.type = type;
      SelectionSquare.__super__.constructor.call(this, this.row, this.col, this.type, 'selection');
    }

    return SelectionSquare;

  })(Entity);

  this.Player = (function(superClass) {
    extend(Player, superClass);

    function Player(row, col, movement, team) {
      var blue_matrix, disabled_matrix;
      this.row = row;
      this.col = col;
      this.movement = movement != null ? movement : 4;
      this.team = team != null ? team : 0;
      this.on_click = bind(this.on_click, this);
      Player.__super__.constructor.call(this, this.row, this.col, 'player', this.movement);
      this.shape = shapes.player.clone();
      disabled_matrix = new createjs.ColorMatrix().adjustSaturation(-100);
      this.disabled_filter = new createjs.ColorMatrixFilter(disabled_matrix);
      blue_matrix = new createjs.ColorMatrix().adjustHue(-120);
      this.blue_filter = new createjs.ColorMatrixFilter(blue_matrix);
      if (this.team === 0) {
        this.shape.filters = [];
      } else {
        this.shape.filters = [this.blue_filter];
      }
      this.shape.cache(0, 0, CELL_SIZE, CELL_SIZE);
      this.enabled = true;
    }

    Player.prototype.disable = function() {
      this.enabled = false;
      this.shape.filters = [this.disabled_filter];
      return this.shape.updateCache(0, 0, CELL_SIZE, CELL_SIZE);
    };

    Player.prototype.enable = function() {
      this.enabled = true;
      if (this.team === 0) {
        this.shape.filters = [];
      } else {
        this.shape.filters = [this.blue_filter];
      }
      return this.shape.updateCache(0, 0, CELL_SIZE, CELL_SIZE);
    };

    Player.prototype.on_click = function() {
      if (this.enabled && game.current_team === this.team) {
        if (fsm.state === 'select unit') {
          return fsm.do_event('select unit', this);
        } else if (fsm.state === 'select action') {
          if (this.id === game.selected_unit.id) {
            return fsm.do_event('deselect unit');
          } else {
            return fsm.do_event('select unit', this);
          }
        }
      }
    };

    return Player;

  })(Unit);

  this.Hill = (function(superClass) {
    extend(Hill, superClass);

    function Hill(row, col) {
      this.row = row;
      this.col = col;
      Hill.__super__.constructor.call(this, this.row, this.col, 'hill', 2);
      this.shape = shapes.hill.clone();
    }

    return Hill;

  })(Terrain);

  this.Rock = (function(superClass) {
    extend(Rock, superClass);

    function Rock(row, col) {
      this.row = row;
      this.col = col;
      Rock.__super__.constructor.call(this, this.row, this.col, 'rock', false);
      this.shape = shapes.rock.clone();
    }

    return Rock;

  })(Structure);

  this.MoveSquare = (function(superClass) {
    extend(MoveSquare, superClass);

    function MoveSquare(row, col) {
      this.row = row;
      this.col = col;
      this.on_click = bind(this.on_click, this);
      MoveSquare.__super__.constructor.call(this, this.row, this.col, 'move square');
      this.shape = shapes.move_square.clone();
    }

    MoveSquare.prototype.on_click = function() {
      return fsm.do_event('select movement', this);
    };

    return MoveSquare;

  })(SelectionSquare);

}).call(this);