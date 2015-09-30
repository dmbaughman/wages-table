var View = function() {
    'use strict';

    var self = this;

    console.info( 'hello from View' );

    self.render = function( data, pages ) {

        var $wagesTable = $( '#js-wages-table-placeholder' );

        var source = $( '#js-tmpl-table-rows' ).html();
        var template = Handlebars.compile( source );
        var html = template( data );
        $wagesTable.html( html );

    };
};
