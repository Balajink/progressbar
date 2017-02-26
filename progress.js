var config = {
    "buttons": [
        -20,
        38,
        -13
    ],
    "bars": [
         108,
         50,
         62,
         -2
    ],
    "limit" : 230
};

for (var key in config) {

    var obj = config[key];
    var dynamicHtml = '';
    var progressBarHtml = '';
   

    
    for (var prop in obj) {
         var overflow = '';
        if(key == 'buttons'){
          dynamicHtml+="<button value='"+obj[prop]+"'>"+obj[prop]+"</button>  ";
        } else if(key == 'bars'){
          dynamicHtml+="<option value='progressBar-"+prop+"'>Progress Bar #"+prop+"</option>";
          
          if(obj[prop] > 100){
            overflow = "progress-overflow";
          } else if(obj[prop] <= 0){
            obj[prop] = 0;
          }

          progressBarHtml+="<div class='bar-group'><div class='bar bar-color "+overflow+"' style='width: "+obj[prop]+"%;' id='progressBar-"+prop+"'></div><span class='bar-text' id='bar-text-"+prop+"'>"+obj[prop]+"%</span></div><br>";
        }
        
    }
   
    if(dynamicHtml!='' && key == 'buttons'){
       document.getElementById("button-elements").innerHTML=dynamicHtml;
    } else if(dynamicHtml!='' && key == 'bars'){
       document.getElementById("progress-select").innerHTML=dynamicHtml;
       document.getElementById("progressbar-elements").innerHTML=progressBarHtml;
    }
    
}

var all = document.getElementsByTagName("button");

for(var i=0; i<all.length ; i++){
      all[i].addEventListener('click', function() { 

          var progressBar = document.getElementById('progress-select');
          var progressBarSelected = progressBar.options[progressBar.selectedIndex].value;
          
          var currentWidth = document.getElementById(progressBarSelected).style.width;
          var finalWidth = parseInt(currentWidth.substr(0, currentWidth.length - 1)) + parseInt(this.innerHTML);
          
          if(finalWidth < 0){
            finalWidth = 0;
          } else if(finalWidth > 100){
            document.getElementById(progressBarSelected).className='bar progress-overflow';
          } else {
            document.getElementById(progressBarSelected).className='bar bar-color';
          }
        
          document.getElementById('bar-text-'+progressBar.selectedIndex).innerHTML=finalWidth+'%';
          document.getElementById(progressBarSelected).style.width = finalWidth+'%';

     });
}