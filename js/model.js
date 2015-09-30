var Model = function( view ) {
    'use strict';

    console.info( 'hello from Model' );

    var self = this;

    self.original = {};
    self.filtered = {};
    self.results = {};

    self.current = null;
    self.offset = 0;
    self.perPage = 25;

    function formatData( rawData ) {
        var result = [];
        var columns = rawData.meta.view.columns;
        var values = rawData.data;

        for ( var i = 0; i < values.length; i++ ) {
            var item = {};
            
            for ( var j = 0; j < columns.length; j++ ) {
                item[ columns[ j ].fieldName ] = values[ i ][ j ];
            }
            result.push( item );
        }
        return result;
    }

    self.updateView = function() {
        self.setResults( self.offset, self.perPage );
        self.setPagination();
        view.render( self.results );
    };

    function getData() {
        var ENDPOINT = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json';
    
        $.ajax( ENDPOINT )
            .done( function( data ) {
                self.original.rows = formatData( data );
                self.current = self.original;
                self.updateView();
            } )
            .fail( function( error ) {
                console.error( 'Failed to fetch data: ' + error );
        });
    }

    self.init = function() {
        getData();
    };

};

Model.prototype.sort = function( prop ) {
    this.current.rows.sort( function( a, b ) {
        if ( a[ prop ] < b[ prop ] ) {
            return -1;
        } else if ( a[ prop ] > b[ prop ] ) {
            return 1;
        } else {
            return 0;
        }
    });

    this.updateView();
};

Model.prototype.filterByMinimum = function( min ) {
    this.filtered.rows = this.original.rows.filter( function( obj ) {
        return obj.female_avg_hrly_rate >= min &&
                obj.male_avg_hrly_rate >= min;
    });

    this.current = this.filtered;
    this.updateView();
};

Model.prototype.filterHigherWage = function( gender ) {

    this.filtered.rows = this.original.rows.filter( function( obj ) {
        if ( obj.female_avg_hrly_rate !== null && obj.male_avg_hrly_rate !== null ) {
            if ( gender === 'female' ) {
                return obj.female_avg_hrly_rate > obj.male_avg_hrly_rate;
            } else {
                return obj.female_avg_hrly_rate < obj.male_avg_hrly_rate;
            }
        }
    });

    this.current = this.filtered;
    this.updateView();
};

Model.prototype.resetFilter = function() {
    this.current = this.original;
    this.updateView();
};


Model.prototype.setPagination = function() {
    var pages = Math.ceil( this.current.rows.length / this.perPage );
    this.results.page = Math.floor( this.offset / this.perPage ) + 1;
    this.results.pagination = [];
    for( var i = 0; i < pages; i++) {
        this.results.pagination.push({
            page: i + 1,
            offset: i * this.perPage
        });
    }
};


Model.prototype.setResults = function() {
    var pageResults = [];
    // @FIXME: Blank results on last page of set
    for (var i = this.offset; i < this.perPage + this.offset; i++) {
        pageResults.push( this.current.rows[ i ] );
    }
    
    this.results.rows = pageResults;
};

