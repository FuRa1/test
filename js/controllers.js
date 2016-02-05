(function () {
    'use strict';
    angular
        .module('testApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', 'Comments', 'User'];


    function mainController($scope, Comments, UserModel) {
        $scope.isShowAll = false;
        $scope.getComments = getComments;
        $scope.keyCheck = keyCheck;
        $scope.addComment = addComment;
        $scope.getCommentsLength = getCommentsLength;
        $scope.user = UserModel;

        (function(){
			Comments.createComment("Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует " +
                "кинетический момент?", "Лилия Семёновна");
            Comments.createComment("Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует " +
                "кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами?", "Лилия Семёновна");
            Comments.createComment("Привет Верунь! ниче себе ты крутая. Фотка класс!!!", "Самуил");

        })();

        function keyCheck(event) {
            if ((event.ctrlKey && event.keyCode === 13) || event.keyCode === 10) {
                addComment();
            }
        }

        function getComments() {
            if ($scope.isShowAll) {
                return Comments.getAllComments();
            }

            return Comments.getLastComments();

        }

        function getCommentsLength() {
            return Comments.length();
        }

        function addComment() {
            if (!$scope.userComment) {
                return;
            }

            Comments.createComment($scope.userComment, $scope.userName);
            $scope.userComment = null;
        }


    }

})();
