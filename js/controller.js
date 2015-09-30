var Controller = function( model ) {
    'use strict';

    console.info( 'hello from Controller' );

    var self = this;

    function bindSort() {
        $( 'body' ).on( 'click', '[data-sort]', function( ev ) {
            var $this = $( this );
            var prop = $this.data( 'sort' );

            model.sort( prop );
            ev.preventDefault();
        });
    }

    function bindFilter() {
        $( 'body' ).on( 'click', '[data-filter-min]', function( ev ) {
            var $this = $( this );
            var min = $this.data( 'filter-min' );
            
            ev.preventDefault();
            model.filterByMinimum( min );
        });
    }


    function bindResetFilter() {
        $( 'body' ).on( 'click', '[data-reset]', function( ev ) {
            var $this = $( this );

            ev.preventDefault();
            model.resetFilter();
        });
    }

    self.init = function() {
        bindSort();
        bindFilter();
        bindResetFilter();
    };

};
