
*Currently special emotions are not working, hoping to patch that later*

Originally forked from  http://github.com/JangoSteve/jQuery-CSSEmoticons

In the HTML file we have declared a html app store . The controller StoreController from the javascript file is given an alias store. Include the required javascript, css files.The javascript file gem1.js used is described below. The css file required essentially for the special emoticons is cssemoticons.css. The angular-emoticon.js is the filter. This file has to be defined after including the gem1.js. The msg variable contains the raw format of the text which has to be emoticonized.

```
<!DOCTYPE html>
<html ng-app="store">
<body  ng-controller="StoreController as store">
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="gem1.js"></script>
    <link rel="stylesheet" type="text/css" href="cssemoticon.css" />
    <script type="text/javascript" src="angular-emoticon.js"></script>
    <div class="message" ng-bind-html="msg | emoticonize:showEmoticons"></div>
  </body>  
```

In the javascript file declare a controller corresponding to a module. Here we have defined the StoreController corresponding to the angular module store and stored inside the variable app. The emoticonizeFilter is the filter required for converting the text to emoticons. The parameters to the function defined within the controller are scope and sce. The scope is used to define the initial value of the bool variable showEmoticons as well as to store the message that needs to be converted.The sce is used to convert the user text into text that can be trusted as HTML. A self call on this function is performed.

```
(function() {
  var app=angular.module('store',['emoticonizeFilter']);
  
  app.controller('StoreController',function($scope, $sce){
   
   $scope.msg= $sce.trustAsHtml("How cool is that   :-) <br/>=D");
   $scope.showEmoticons = true;
  });
  }).call(this);
```

  In the angular-emoticon.js file we take the user text as the input and try matching it with the pre-defined emoticons using regular expressions. If any such symbol is found it is replaced with the corresponding emoticon.The displayed message contains the emoticons.
