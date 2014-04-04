(function () {
  'use strict';
  /*global angular: false */

  var module = angular.module('Locale', ['tmh.dynamicLocale']);
  var currentLang, translations = {};

  module.factory('localeSvc', function ($http, $interpolate, tmhDynamicLocale) {
    var svc = {};

    function loadTranslations(lang) {
      console.log('locale: loading translations for lang =', lang);
      var url = 'L10n/' + lang + '.json';
      $http.get(url, {ContentType: 'application/json'}).
        success(function (data) {
          translations[lang] = data;
          sessionStorage.translations = JSON.stringify(translations);
        }).
        error(function (err) {
          throw new Error('Failed to load language translations for "' +
            lang + '".');
        });
    }

    svc.getDefaultLang = function () {
      var lang = navigator.language || navigator.userLanguage;
      return lang ? lang.split('-')[0] : 'en'; // default
    };

    svc.setLang = function (lang) {
      if (lang !== currentLang) {
        console.log('locale: changing from', currentLang, 'to', lang);

        // Change i18n language.
        tmhDynamicLocale.set(lang); // causes digest cycle

        // Change L10n language.
        if (!translations[lang]) loadTranslations(lang); // causes digest cycle
        currentLang = sessionStorage.currentLang = lang;
      }
    };

    svc.translate = function (phrase, scope) {
      var t = translations[currentLang];
      var result = t ? t[phrase] : null;
      if (scope && result) reslt = $interpolate(result)(scope);
      return result || phrase;
    };

    return svc;
  });

  module.filter('L10n', function (localeSvc) {
    return function (phrase, scope) {
      if (!currentLang) {
        console.log('locale: loading from sessionStorage');
        // This occurs when the user refreshes a page.
        // Get translations from sessionStorage.
        currentLang = sessionStorage.currentLang;
        translations = JSON.parse(sessionStorage.translations);
      }

      var result = localeSvc.translate(phrase, scope);
      if (phrase === 'Language') {
        console.log('translated', phrase, 'to', result);
      }
      return result;
    };
  });
})();
