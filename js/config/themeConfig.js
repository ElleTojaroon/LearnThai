'use strict';

app.config(
    ['$mdThemingProvider',
        function ($mdThemingProvider) {
            
            $mdThemingProvider
                .theme('blueSky')
                .primaryPalette('indigo', {
                    'default': '500',
                })
                .accentPalette('pink', {
                    'default': 'A200',
                })
                .warnPalette('red', {
                    'default': '700',
                });

            //$mdThemingProvider
            //    .theme('default')
            //    .primaryPalette('teal', {
            //        'default': '500',
            //    })
            //    .accentPalette('indigo', {
            //        'default': '500',
            //    })
            //    .warnPalette('red', {
            //        'default': '700',
            //    });


            $mdThemingProvider.definePalette('jellyfish', {
                '50': '#f2aeb9',
                '100': '#ee98a6',
                '200': '#eb8293',
                '300': '#e76c80',
                '400': '#e4566d',
                '500': '#E0405A',
                '600': '#dc2a47',
                '700': '#cc213d',
                '800': '#b61e36',
                '900': '#a01a30',
                'A100': '#f5c4cc',
                'A200': '#f9dadf',
                'A400': '#fcf0f2',
                'A700': '#8a1629',
                'contrastDefaultColor': 'light'
            });

            $mdThemingProvider.definePalette('cantaloupe', {
                "50": "#ffffff",
                "100": "#fff7ec",
                "200": "#ffdfb4",
                "300": "#ffc06c",
                "400": "#ffb34e",
                "500": "#ffa62f",
                "600": "#ff9910",
                "700": "#f18a00",
                "800": "#d27800",
                "900": "#b46700",
                "A100": "#ffffff",
                "A200": "#fff7ec",
                "A400": "#ffb34e",
                "A700": "#f18a00",
                'contrastDefaultColor': 'light'
            });

            $mdThemingProvider.definePalette('lightseagreen', {
                "50": "#f3fbfa",
                "100": "#bbe7e3",
                "200": "#91d8d2",
                "300": "#5dc5bc",
                "400": "#46bdb2",
                "500": "#3ca99f",
                "600": "#34928a",
                "700": "#2c7c74",
                "800": "#24655f",
                "900": "#1c4f4a",
                "A100": "#f3fbfa",
                "A200": "#bbe7e3",
                "A400": "#46bdb2",
                "A700": "#2c7c74",
                'contrastDefaultColor': 'light'
            });

            $mdThemingProvider
                .theme('default')
                .primaryPalette('jellyfish', {
                    'default': '500',
                })
                .accentPalette('lightseagreen', {
                    'default': '500',
                })
                .warnPalette('red', {
                    'default': '700',
                });
                       

            $mdThemingProvider.alwaysWatchTheme(true);
            
        }
    ]
);
