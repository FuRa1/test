(function () {
    'use strict';
    angular
        .module('testApp')
        .factory('User', UserModel)
        .factory('Comments', Comments);

    function UserModel() {

        function progress(user) {
            var total = user.getTotalCount();
            for (var i = 0; i < user.services.length; i++) {
                var currProgress = 0;
                currProgress = user.services[i].count / total * 100;
                user.services[i].progress = currProgress;
            }
        }

        function setCss(services) {
            var baseBonus = 15;
            for (var i = 0; i < services.length; i++) {
                if (services[i].progress < 70) {
                    services[i].color = '#B1E4F5'
                } else {
                    services[i].color = '#B2E19B';
                }

                services[i].css = {
                    'width': services[i].progress + baseBonus + '%',
                    'background-color': services[i].color
                }
            }
        }

        var user = {
            fullName: 'Вероника Ростова',
            position: 'Менеджер по продажам',
            status: 'Подберу для Вас лучшие предложения. Мои услуги абсолютно бесплатны',
            avatarUri: 'img/square.png',
            services: [
                {
                    name: 'Ручное бронирование',
                    count: 11,
                    progress: 5
                },
                {
                    name: 'Пакетные туры',
                    count: 3,
                    progress: 5
                },
                {
                    name: 'Отели',
                    count: 1,
                    progress: 6
                }
            ],
            likes: 155,
            addLike: function () {
                var likes = this.likes;
                likes++;
                this.likes = likes;
                console.log(likes);
            },
            getTotalCount: function () {
                var total = 0;

                this.services.forEach(function (el) {
                    total += el.count;
                });

                return total;
            }

        };
        (function init() {
            progress(user);
            setCss(user.services);
        })();
        return user;
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
})
();