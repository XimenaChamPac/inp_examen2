(function(){
	'use strict';
	angular.module('angular',[]);

	var apl = angular.module('angular');

	apl.controller("mainController",['$scope','$http', function(s,h){
		s.formData = {};
		s.todos = [];
		h.get('/api/todos')
			.success(function(data) {
				s.todos = data;
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		
		s.createTodo = function() {
			socket.emit('saveOne',s.formData);
			}

		socket.on('sendAll',function(data){
				s.todos.push(data[data.length-1]);
			s.$apply();
			console.log(s.todos);
		});
		s.deleteTodo = function(id) {
			h.delete('/api/todos/' + id)
			.success(function(data) {
				s.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		}
	}]);
}());