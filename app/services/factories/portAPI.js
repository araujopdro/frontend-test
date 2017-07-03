angular.module("devtest").factory("portAPI", function ($http) {
    var address = "http://netflixroulette.net/api/api.php?"

    var titleSearch = address + "title=";
    var directorSearch = address + "director=";

    var _stringProcessing = function(_string){
        return _string.replace(/\s/g, "%20")
    };

    var _getByTitle = function (title) {
        return $http.get(titleSearch + _stringProcessing(title));
    };
    var _getByDirector = function (directorsName){
        return $http.get(directorSearch + _stringProcessing(directorsName));
    };
    
    return {
        stringProcessing: _stringProcessing,
        getByTitle: _getByTitle,
        getByDirector: _getByDirector
    };
});