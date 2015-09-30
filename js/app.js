var Model       = require( './model' );
var View        = require( './view' );
var Controller  = require( './controller' );

var view       = new View();
var model      = new Model( view );
var controller = new Controller( model );

model.init();
controller.init();
