(function() {
  var emoticonize, filters;

  emoticonize = function($sce) {
    var emoticon, escapeCharacters, exclude, excludeArray, index, preMatch, specialEmoticons, specialRegex, threeChar, threeCharacterEmoticons, twoChar, twoCharacterEmoticons, _i, _j, _k, _len, _len1, _len2;
    escapeCharacters = [")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "."];
    threeCharacterEmoticons = [":{)", ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\", "?-)", ": )", ": ]", "= ]", "= )", "8 )", ": }", ": D", "8 D", "X D", "x D", "= D", ": (", ": [", ": {", "= (", "; )", "; ]", "; D", ": P", ": p", "= P", "= p", ": b", ": Þ", ": O", "8 O", ": /", "= /", ": S", ": #", ": X", "B )", ": |", ": \\", "= \\", ": *", ": &gt;", ": &lt;"];
    twoCharacterEmoticons = [":)", ":]", "=]", "=)", "8)", ":}", ":D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;"];
    specialEmoticons = {
      ":-)": {
        cssClass: "smile"
      },
      ":)": {
        cssClass: "smile"
      },
      ":smile:": {
        cssClass: "smile"
      },
      ":D": {
        cssClass: "biggrin"
      },
      ":-D": {
        cssClass: "biggrin"
      },
      ":grin:": {
        cssClass: "biggrin"
      },
      ":(": {
        cssClass: "sad"
      },
      ":-(": {
        cssClass: "sad"
      },
      ":sad:": {
        cssClass: "sad"
      },
      "8O": {
        cssClass: "shock"
      },
      "8-O": {
        cssClass: "shock"
      },
      ":shock:": {
        cssClass: "shock"
      },
      ":?": {
        cssClass: "confused"
      },
      ":-?": {
        cssClass: "confused"
      },
      ":???:": {
        cssClass: "confused"
      },
      "8)": {
        cssClass: "cool"
      },
      "8-)": {
        cssClass: "cool"
      },
      ":cool:": {
        cssClass: "cool"
      },
      ":x": {
        cssClass: "mad"
      },
      ":-x": {
        cssClass: "mad"
      },
      ":mad:": {
        cssClass: "mad"
      },
      ":P": {
        cssClass: "razz"
      },
      ":-P": {
        cssClass: "razz"
      },
      ":razz:": {
        cssClass: "razz"
      },
      ":|": {
        cssClass: "neutral"
      },
      ":-|": {
        cssClass: "neutral"
      },
      ":neutral:": {
        cssClass: "neutral"
      },
      ";)": {
        cssClass: "wink"
      },
      ";-)": {
        cssClass: "wink"
      },
      ":wink:": {
        cssClass: "wink"
      },
      ">:(": {
        cssClass: "evil"
      },
      ">;(": {
        cssClass: "evil"
      },
      ">:-(": {
        cssClass: "evil"
      },
      ">:-D": {
        cssClass: "twisted"
      },
      ":lol:": {
        cssClass: "lol"
      },
      ":oops:": {
        cssClass: "oops"
      },
      ":cry:": {
        cssClass: "cry"
      },
      ":roll:": {
        cssClass: "roll"
      },
      ":eek:": {
        cssClass: "eek"
      },
      ":o": {
        cssClass: "eek"
      },
      ":-o": {
        cssClass: "eek"
      },
      ":!:": {
        cssClass: "exclaim"
      },
       ":?:": {
        cssClass: "question"
      },
      ":idea:": {
        cssClass: "idea"
      },
      ":arrow:": {
        cssClass: "arrow"
      },
      ":mrgreen:": {
        cssClass: "mrgreen"
      }

    };
    specialRegex = new RegExp('(\\' + escapeCharacters.join('|\\') + ')', 'g');
    preMatch = '(^|[\\s\\0])';
    for (index = _i = 0, _len = threeCharacterEmoticons.length; _i < _len; index = ++_i) {      
      threeChar = threeCharacterEmoticons[index];          
      threeChar = threeChar.replace(specialRegex, '\\$1');
      threeCharacterEmoticons[index] = new RegExp(preMatch + '(' + threeChar + ')', 'g');      
    }

    for (index = _j = 0, _len1 = twoCharacterEmoticons.length; _j < _len1; index = ++_j) {
           twoChar = twoCharacterEmoticons[index];
      twoChar = twoChar.replace(specialRegex, '\\$1');
      twoCharacterEmoticons[index] = new RegExp(preMatch + '(' + twoChar + ')', 'g');
    }
   
   var specialEmoticonsObject =  {};
   for(emoticon in specialEmoticons)
   {  
      emoticon_new = emoticon.replace(specialRegex, '\\$1'); 
      specialEmoticonsObject[emoticon] = new RegExp(preMatch + '(' + emoticon_new + ')', 'g');
    }
   
    exclude = 'span.css-emoticon';
    exclude += ",pre,code,.no-emoticons";
    excludeArray = exclude.split(',');
    return function(text, showEmoticons) {
      var cssClass, specialCssClass, _l, _len3, _len4, _len5, _m, _n;

      if (!showEmoticons) {
        return text;
      }
      text=text.valueOf();
     cssClass = 'css-emoticon';
            
      for (emoticon in specialEmoticonsObject) {
        specialCssClass = cssClass + " " + specialEmoticons[emoticon].cssClass;

        text = text.replace(specialEmoticonsObject[emoticon], "$1<span class='" + specialCssClass + "'>$2</span>");
      }
      for (_m = 0, _len4 = threeCharacterEmoticons.length; _m < _len4; _m++) {
        threeChar = threeCharacterEmoticons[_m];
        text = text.replace(threeChar, "$1<span class='" + cssClass + "'>$2</span>");
      }
      for (_n = 0, _len5 = twoCharacterEmoticons.length; _n < _len5; _n++) {
        twoChar = twoCharacterEmoticons[_n];
        text = text.replace(twoChar, "$1<span class='" + cssClass + " spaced-emoticon'>$2</span>");
      }
      return $sce.trustAsHtml(text);
    };
  };

  filters = angular.module('emoticonizeFilter', []);

  filters.filter('emoticonize', emoticonize);

}).call(this);
