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

    function bindFilterMin() {
        $( 'body' ).on( 'click', '[data-filter-min]', function( ev ) {
            var $this = $( this );
            var min = $this.data( 'filter-min' );
            
            ev.preventDefault();
            model.filterByMinimum( min );
        });
    }



    function bindFilterHigherWage() {
        $( 'body' ).on( 'click', '[data-filter-higher-wage]', function( ev ) {
            var $this = $( this );
            var gender = $this.data( 'filter-higher-wage' );
            
            ev.preventDefault();
            model.filterHigherWage( gender );
        });
    }

    function bindResetFilter() {
        $( 'body' ).on( 'click', '[data-reset]', function( ev ) {
            var $this = $( this );

            ev.preventDefault();
            model.resetFilter();
        });
    }

    function bindPagination() {
        $( 'body' ).on( 'click', '[data-offset]', function( ev ) {
            var $this = $( this );
            var offset = $this.data( 'offset' );

            ev.preventDefault();
            model.offset = offset;
            model.updateView();
        });
    }

    function bindResultsPerPage() {
        $( 'body' ).on( 'change', '[data-results-per-page]', function( ev ) {
            var $this = $( this );
            var count = $this.val();

            ev.preventDefault();
            model.perPage = parseInt( count );
            model.updateView();
        });
    }

    self.init = function() {
        bindSort();
        bindFilterMin();
        bindFilterHigherWage();
        bindResetFilter();
        bindPagination();
        bindResultsPerPage();
    };

};
