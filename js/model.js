var Model = function( view ) {
    'use strict';

    console.info( 'hello from Model' );

    var self = this;

    self.original = {};
    self.filtered = {};
    self.current = null;

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

    self.refreshView = function() {
        view.render( self.current );
    };

    function getData() {
        var ENDPOINT = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json';
    
        $.ajax( ENDPOINT )
            .done( function( data ) {
                
                self.original.rows = formatData( data );
                self.current = self.original;
                self.refreshView();
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

    view.render( this.current );
};

Model.prototype.filterByMinimum = function( min ) {
    this.filtered.rows = this.original.rows.filter( function( obj ) {
        return obj.female_avg_hrly_rate >= min &&
                obj.male_avg_hrly_rate >= min;
    });

    this.current = this.filtered;
    this.refreshView();
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
    this.refreshView();
};

Model.prototype.resetFilter = function() {
    this.current = this.original;
    this.refreshView();
};