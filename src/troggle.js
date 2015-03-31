'use strict';


angular.module('troggle', [])

	.directive('troggle', [function () {
		return {
			restrict: 'E',
			require: 'ngModel',
			link: function(scope, elem, attrs, ngModel) {
				// check if it was defined.  If not - set a default
				scope.map = scope.map || [
					{value:true, label:'Yes', class:'btn-success'},
					{value:false, label:'No', class:'btn-danger'}];

				scope.troggle = function (v) {

					if (v.value == scope.ngModel){ // unset if clicked current
						scope.ngModel = undefined;
					} else {
						scope.ngModel = v.value;
					}

					validate(scope.ngModel);
					ngModel.$setViewValue(scope.ngModel);
				};


				scope.setClass = function(mapItem){
					if (mapItem.value == scope.ngModel)
						return mapItem.class;
					else
						return false;
				};

				function validate(value) {
					ngModel.$setValidity('required',  !(typeof value === 'undefined'));
				}
			},
			scope: {
				ngModel: '=',
				onClick: '=?',
				map: '=?'
			},

			templateUrl: 'template/troggle.html'
		}
	}])
	.value('version', '0.0.01');
