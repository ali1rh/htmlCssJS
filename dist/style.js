var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');


var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards() {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach((card, index) => {
    // console.log('index: ', index);
    // console.log('allCards.length: ', allCards.length);

    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });

  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach((cardElement) => {
  var hammertime = new Hammer(cardElement);
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  hammertime.on('pan', (event) => {
    // console.log('event: ', event);
    console.log('event.deltaX: ', event.deltaX);
    console.log('event.deltaY: ', event.deltaY);
    console.log('event.center: ', event.center);

    cardElement.classList.add('moving');



  });
  hammertime.on('pan', (event) => {
    // if (event.deltaX === 0) return;
    // if (event.center.x === 0 && event.center.y === 0) return;


    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 300; // default 80
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';


  });





  hammertime.on('panend', (event) => {
    cardElement.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');




    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    // var keep = Math.abs(event.deltaX) < 80;

    console.log('event.velocityX: ', event.velocityX);
    console.log('event.deltaX: ', event.deltaX);




    event.target.classList.toggle('removed', !keep);

    if (keep) {
      console.log('بازگشت', 'event.deltaX:', event.deltaX, ' | ', 'event.velocityX: ', event.velocityX)
      event.target.style.transform = '';
    } else {
      var moveOutWidth = document.body.clientWidth;

      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      console.log('endX: ', endX);
      
      var toX = event.deltaX > 0 ? endX : -endX;
      console.log('toX: ', toX);
      



      // var endY = Math.abs(event.velocityY) * moveOutWidth;
      // var toY = event.deltaY > 0 ? endY : -endY;

      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return (event) => {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;
    var moveOutHeight = document.body.clientHeight * .3;

    // console.log('cards: ', cards);
    

    // wWhen the cards run out
    if (!cards.length) return 'hiii';


    var card = cards[0];

    card.classList.add('removed');


    

    if (love) {

      card.style.transform = 'translate(' + moveOutWidth + 'px, ' + moveOutHeight +  'px) rotate(30deg)';
    } else {

      card.style.transform = 'translate(-' + moveOutWidth + 'px, ' + moveOutHeight +  'px) rotate(-30deg)';
    }

    initCards();

    event.preventDefault();
  };
}



nope.addEventListener('click', createButtonListener(false));
love.addEventListener('click', createButtonListener(true));