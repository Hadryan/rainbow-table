
app = function(){
	'use strict';

	var init = function(){
		buildTable();
		events();
	};

	// Default params
	var params = {
		row: 4,
		col: 6,
		max: 50,
		color: {
			h: 256,
			s: 95,
			l: 75
		}
	};

	// Handlebars template
	var source = document.querySelector('#tpl').innerHTML;
	var template = Handlebars.compile(source);

	// Random values in the cells
	var randomValues = function() {
		return Math.floor(Math.random() * params.max + 1);
	};

	// Random background color and [data-color]
	var randomColor = function(index) {
		var color = (params.color.h/params.max) * index;
		return color.toFixed(0) + ', '+ params.color.s +'%, '+ params.color.l +'%';
	};


	/**
	 * Build new table with new values
	 */
	var buildTable = function() {
		var data = new Array();
		
		for (var i=0; i<params.row; i++) {
			var that = data[i];
			data[i] = new Array();

			for (var j=0; j<params.col; j++) {
				var obj = new Object;
				var value = randomValues();

				obj['color'] = randomColor(value);
				obj['number'] = value;

				data[i][j] = obj;
			}
		}

		document.querySelector('#table').innerHTML = template(data);
	};

	/**
	 * Export Stylesheet
	 */
	var generateCss = function() {
		var banner = '/** \n'
			+ ' * Rainbow Table \n'
			+ ' * --- \n'
			+ ' * by Thibaud B. <http://thibaudb.com> \n'
			+ ' */\n';
		var to_css = '';

		for (var i=0; i<params.max; i++) {
			var color = (params.color.h/params.max) * i;
			var hsl = 'hsl(' + randomColor(i) + ')';       
		
			to_css += '[data-color="'+ (i+1) +'"]{background:'+ hsl +'}'; 
		};
		
		return banner + to_css;
	};


	/**
	 * Event Listeners
	 */
	var events = function() {
		var btnRandom = document.querySelector('#btnRandom');
		var valueForm = document.querySelector('#valueForm');
		maxNb.value = params.max;

		btnRandom.addEventListener('click', function() {
			buildTable();
			return false;
		});

		valueForm.addEventListener('submit', function(e) {
			e.preventDefault();
			console.log('test');
			params.max = maxNb.value;
			window.open('data:text/json;charset=utf-8,' + escape( generateCss() ));
		});
	};


	return {
		init: init
	}

}();

app.init();