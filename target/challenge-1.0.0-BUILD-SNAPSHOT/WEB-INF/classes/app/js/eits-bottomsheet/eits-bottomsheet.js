(function (angular) {
    "use strict";
    /**
     *
     */

    angular.module("eits-bottomsheet", [])
        .directive('bottomsheet', function () {
            return {
                restrict: 'EA',
                transclude: true,
                template: '<div></div><div ng-transclude class="eits-bottomsheet eits-bottomsheet-content"></div>',
                scope: {
                    delay: '='
                },
                link: function postLink(scope, element, attrs) {
                    //$(element).addClass('eits-bottomsheet');

                    var delay = scope.delay != undefined ? scope.delay : 300;
                    scope.$on('showEitsBottomSheetEvent', function () {


                        var bottomSheetElement = element.find('.eits-bottomsheet');

                        if (bottomSheetElement.is(':animated')) {
                            bottomSheetElement.stop(false, true);
                        }

                        bottomSheetElement.animate({
                            height: bottomSheetElement.css('height') == '0px' ? '150px' : '0px'
                        }, {
                            duration: delay
                        });

                        bottomSheetElement.find('.eits-bottomsheet').animate({
                            height: bottomSheetElement.css('height') == '0px' ? '150px' : '0px'
                        }, {
                            duration: delay
                        });

                        if (element.css('display') == 'inline-block')
                            element.css('display', 'none');
                    });
                }
            };
        });
}(window.angular));