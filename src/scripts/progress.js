window.onload = function () {
    var myApp = myApp || {};
    (function (app) {
        var _scope = {}; //Private variable
        var _cache= { //Priavte variable
            "filter": document.getElementById('progress-select'),
            "buttons": document.getElementById("button-elements"),
            "elements": document.getElementById("progressbar-elements"),
            "allBtns" :document.getElementsByTagName("button")
        };
        
        app.init = function () { // App Initialize function definition
            var config = {
                "endpoint": "http://pb-api.herokuapp.com/bars",
               };


            _getData(config);

        };



        app.render = function () { // render elements to DOM and bind events
            generateElements = (function(){
                 for (var key in _scope) {
                    var obj = _scope[key];
                    var dynamicHtml = '';
                    var progressBarHtml = '';

                        for (var prop in obj) {
                            var overflow = '';
                            if (key == 'buttons') {
                                dynamicHtml += "<button value='" + obj[prop] + "'>" + obj[prop] + "</button>  ";
                            } else if (key == 'bars') {
                                dynamicHtml += "<option value='progressBar-" + prop + "'>Progress Bar #" + prop + "</option>";

                                if (obj[prop] > 100) {
                                    overflow = "progress-overflow";
                                } else if (obj[prop] <= 0) {
                                    obj[prop] = 0;
                                }

                                progressBarHtml += "<div class='bar-group'><div class='bar bar-color " + overflow + "' style='width: " + obj[prop] + "%;' id='progressBar-" + prop + "'></div><span class='bar-text' id='bar-text-" + prop + "'>" + obj[prop] + "%</span></div><br>";
                            }

                        }

                        if (dynamicHtml != '' && key == 'buttons') {
                        _cache.buttons.innerHTML = dynamicHtml;
                        } else if (dynamicHtml != '' && key == 'bars') {
                            document.getElementById("progress-select").innerHTML = dynamicHtml;
                        _cache.elements.innerHTML = progressBarHtml;
                        }

            }
         }()); //end of generateElements
         
            bindEvents = (function(){
                 for (var i = 0; i < _cache.allBtns.length; i++) {
                _cache.allBtns[i].addEventListener('click', function () {

                    var progressBar = _cache.filter;
                    var progressBarSelected = progressBar.options[progressBar.selectedIndex].value;

                    var currentWidth = document.getElementById(progressBarSelected).style.width;
                    var finalWidth = parseInt(currentWidth.substr(0, currentWidth.length - 1)) + parseInt(this.innerHTML);

                    if (finalWidth < 0) {
                        finalWidth = 0;
                    } else if (finalWidth > 100) {
                        document.getElementById(progressBarSelected).className = 'bar progress-overflow';
                    } else {
                        document.getElementById(progressBarSelected).className = 'bar bar-color';
                    }

                    document.getElementById('bar-text-' + progressBar.selectedIndex).innerHTML = finalWidth + '%';
                    document.getElementById(progressBarSelected).style.width = finalWidth + '%';

                });
            }

            }()); //end of bindEvents
      };

      /**--- Get Data - Private Method -- */
        function _getData(config) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    _scope = JSON.parse(this.responseText);
                   app.render();
                }
            };
            xhr.open("GET", config.endpoint, true);
            xhr.send();
        }

    })(myApp); //end of IIFE


    myApp.init(); // Initialize APP


}; //end of onload
