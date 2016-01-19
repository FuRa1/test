(function () {
    'use strict';
    angular
        .module('testApp')
        .factory('User', UserModel)
        .factory('Comments', Comments)
        .factory('Likes', Likes)
        .factory('Progress', Progress);

    function UserModel() {
        return {
            fullName: 'Вероника Ростова',
            position: 'Менеджер по продажам',
            status: 'Подберу для Вас лучшие предложения. Мои услуги абсолютно бесплатны',
            avatarUri: 'img/square.png',
            services: [
                {
                    name: 'Ручное бронирование',
                    count: 11,
                    color: '#B2E19B', //'rgb(178,225,155);',
                    progress: null
                },
                {
                    name: 'Пакетные туры',
                    count: 3,
                    color: '#B1E4F5',
                    progress: null
                },
                {
                    name: 'Отели',
                    count: 1,
                    color: '#B1E4F5', //'rgb(177,228,245);',
                    progress: null
                }
            ],
            likes: 155,
            getTotalCount: function () {
                var total = 0;

                this.services.forEach(function (el) {
                    total += el.count;
                });

                return total;
            }
        }
    }

    function Progress(){
        return{
            getProgress: function(count, total){
                var progress = 0;
                progress = count/total*100;
                return progress;

            }
        }
    }

    function Likes() {
        return {
            addLike: function (likeAmount) {
                var newLikeAmount = likeAmount + 1;
                return newLikeAmount;
            }
        };

    }

    function Comments() {
        var comments = [];
        var commentsShowed = 5;

        return {
            getAllComments: function () {
                return comments;
            },
            getLastComments: function () {
                return comments.slice(0, commentsShowed);
            },
            createComment: function (message, userName) {
                if (!message) {
                    return;
                }
                var comment = new Comment(message, userName);
                comments.unshift(comment);
            },
            length: function () {
                return comments.length;
            }
        };

        function Comment(message, userName) {
            this.text = message;
            this.date = new Date().toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            this.user = userName ? userName : "Anonymous";
        }
    }
})();