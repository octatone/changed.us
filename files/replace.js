var typingSpeed = 25;

function getTypeDelay () {

  return typingSpeed + Math.floor(Math.random() * 100);
}

function redact ($elem) {

  var redactionDeferred = new $.Deferred();

  function _redactor ($elem) {

    var text = $elem.text();
    if (text && text.length) {
      text = text.substr(0, text.length -1);
      $elem.text(text);
      window.setTimeout(function () {
        _redactor($elem);
      }, getTypeDelay());
    }
    else {
      redactionDeferred.resolve();
    }
  }

  _redactor($elem);

  return redactionDeferred.promise();
}

function replaceIt ($elem) {

  var replacementDeferred = new $.Deferred();

  var replaceText = $elem.attr('data-replacer');
  var length = replaceText.length;

  function _replacer ($elem) {

    if (replaceText && length >= 1) {

      --length;

      var text = replaceText.substr(0, replaceText.length - length);
      $elem.text(text);
      window.setTimeout(function () {
        _replacer($elem);
      }, getTypeDelay());
    }
    else {
      replacementDeferred.resolve();
    }
  }

  _replacer($elem);

  return replacementDeferred.promise();
}

function start () {

  var $replacements = $('.replace');

  var idx = 0;
  var length = $replacements.length;

  function _replaceNext () {

    var $elem = $($replacements[idx]);
    console.log($elem);
    $elem.addClass('redacting');
    redact($elem).done(function () {

      $elem.removeClass('redacting').addClass('replacing');

      replaceIt($elem).done(function () {

        window.setTimeout(function () {
          $elem.removeClass('replacing').addClass('replaced');
        }, getTypeDelay() * 50);

        if (idx < length - 1) {
          ++idx;
          window.setTimeout(_replaceNext, getTypeDelay() * 10);
        }
        else {

          $('.hidden').removeClass('hidden');
        }
      });
    });
  }

  _replaceNext();
}

$(function () {

  // start the magic
  window.setTimeout(start, 2000);

  // convert all # links to a random location change
  var links = [
    'https://www.eff.org/nsa-spying',
    'http://www.aclu.org/national-security/surveillance-privacy',
    'http://www.restorethefourth.net/'
  ];

  $('a').on('click', function (e) {

    var $el = $(e.target);
    if ($el.attr('href') === '#') {

      e.preventDefault();
      window.location.href = links[Math.floor(Math.random() * links.length)];
    }
  });

});