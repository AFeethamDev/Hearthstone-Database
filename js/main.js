document.querySelector('[data-search]').addEventListener('click',getHS);
document.querySelector('[data-clear]').addEventListener('click',clearDeck);
document.querySelector('[data-hide]').addEventListener ('click',hideBar);
document.querySelector('#myImgs').addEventListener('click', elem => {saveCard(elem.srcElement.currentSrc)});

function isChecked(str){
  return document.getElementById(str).checked == true;
}

function getHS(){
  let chosenCard = document.querySelector('input').value;
  let searchParameters;
  let selectMode;

  isChecked('cardName') ? searchParameters = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" : searchParameters = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/"
  isChecked('constructed') ? selectMode = "?collectible=1" : selectMode = "";
  document.querySelector('#myImgs').innerHTML = '';

  fetch(searchParameters+chosenCard+selectMode, {
	   "method": "GET",
	    "headers": {
		      "x-rapidapi-key": "ceaa1d9eedmshdc4bcc96e0d8f2bp14ea31jsn0b7a3eacafb7",
		        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
	         }
         })
         .then(res => res.json())
         .then(data => {
           if(isChecked('battlegrounds')){
             data = data.filter(x => x.cardSet == "Battlegrounds");
           }
	          console.log(data);
            for(let i = 0; i < data.length; i++){
               if(data[i].img){
                document.querySelector('#myImgs').innerHTML += ('<img src='+data[i].img+' alt="'+data[i].cardSet+'" title="'+data[i].cardSet+'">');
              }
            }
          })
          .catch(err => {
	           console.error(err);
           });
}

function saveCard(card){
  if(card !== undefined){
    document.querySelector('#myDeck').innerHTML += ('<img src='+card+'>');
  }
}

function clearDeck(){
  document.querySelector('#myDeck').innerHTML = '';
}

function hideBar(){
  if(document.querySelector('#deckBar').style.display !== "none"){
    document.querySelector('#deckBar').style.display = "none";
    document.querySelector('header').style.display = "none";
  }else{
    document.querySelector('#deckBar').style.display = "block";
    document.querySelector('header').style.display = "block";
  }
}
