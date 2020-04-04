
	Vue.component( 'search_item_wrap', {

		template: document.querySelector( "#templates .search_item_wrap" ).outerHTML,

		props: [ "item_data", "level" ],

		data: function () {

			return {

				expanded: false,

			};

		},

	});

	new Vue({

		el: "#root",

		data: {

			main_item_data_arr: [],
			item_data_arr: [],
			active_page_name: "main",
			query: "",

		},

		watch: {

			query: function () {

				if ( this.query ) {

					var new_item_data_arr = [];

					this.main_item_data_arr.forEach( ( item_data ) => {

						if ( item_data.name.indexOf( this.query ) > -1 ) {

							new_item_data_arr.push( item_data );

						};


					});

					this.item_data_arr = new_item_data_arr;

				} else {

					this.item_data_arr = this.main_item_data_arr;

				};

			},

		},

		methods: {

			extend_data: function ( item_data_arr ) {

				item_data_arr.forEach( ( item ) => {

					item.expanded = false;

					if ( item.item_data_arr ) {

						this.extend_data( item.item_data_arr );

					};

				});

			}

		},

		mounted: async function () {

			var result = await fetch( chrome.extension.getURL( "/pages/popup/main_item_arr.json" ) );
			var json = await result.json();

			this.extend_data( json );

			this.main_item_data_arr = json;
			this.item_data_arr = json;

		},

	});