(function () {
    angular
        .module('testApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', 'Comments', 'User', 'Likes', 'Progress'];

    function mainController($scope, Comments, UserModel, Likes, Progress) {
        $scope.isShowAll = false;
        $scope.getComments = getComments;
        $scope.keyCheck = keyCheck;
        $scope.addComment = addComment;
        $scope.getCommentsLength = getCommentsLength;
        $scope.user = UserModel;
        $scope.addLike = addLike;
        $scope.progress = setProgress();
        $scope.setCss = setCss();

        function setCss() {
            UserModel.services.forEach(function (el) {
                el.css = {
                    "background-color": el.color,
                    "width": el.progress
                };
            })
        }

        function setProgress() {
            var total = UserModel.getTotalCount();
            UserModel.services.forEach(function (el) {
                var count = el.count;
                var progressValue = 0;
                var baseBonus = 15; //Padding -10% + 5% additional for display.
                progressValue = Progress.getProgress(count, total) + baseBonus;
                progressValue += '%';
                el.progress = progressValue;
            })
        }

        function keyCheck(event) {
            if ((event.ctrlKey && event.keyCode === 13) || event.keyCode === 10) {
                addComment();
            }
        }

        function addLike() {
            UserModel.likes = Likes.addLike(UserModel.likes);
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
