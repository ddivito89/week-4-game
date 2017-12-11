var charArray = [];
var heroChosen = false;
var defenderChosen = false;
var hero = 1;
var defender = 1;

//Character Constructor
var Character = function(id, name, image_src, health, attackStr) {
  this.createElem = function() {
    var newCharacter = $(`<div class="col-md-12">
        <div class="col-md-12 charName">${name}</div>
        <img src="${image_src}"/>
        <div class="col-md-12 charHealth">${health}</div>
        </div>`);
    newCharacter.attr('height', 100);
    newCharacter.attr('width', 100);
    newCharacter.attr('id', id);
    newCharacter.prop('name', name);
    newCharacter.prop('health', health);
    newCharacter.prop('attackStr', attackStr);
    newCharacter.prop('is_hero', false);
    newCharacter.prop('is_defender', false);
    newCharacter.prop('is_alive', true);
    newCharacter.addClass("character col-md-6")
    return newCharacter;
  }
}

var hanSolo = new Character('hanSolo', 'Han Solo', './assets/images/han-solo.jpg', '100', '10').createElem();
var yoda = new Character('yoda', 'Yoda', './assets/images/yoda.jpg', '100', '5').createElem();
var darthVader = new Character('darthVader', 'Darth Vader', './assets/images/darth-vader.jpg', '100', '25').createElem();
var darthMaul = new Character('darthMaul', 'Darth Maul', './assets/images/darth-maul.jpeg', '100', '30').createElem();

charArray.push(hanSolo, yoda, darthVader, darthMaul)

$(document).ready(function() {

  function restart(){
  $("#characters").append(hanSolo);
  $("#characters").append(yoda);
  $("#characters").append(darthVader);
  $("#characters").append(darthMaul);
  }

  restart();

  $(".character").on("click", function() {
    if (heroChosen === false) {
      heroChosen = true;
      this.is_hero = true;
      console.log(this.name + " is your hero!")
      for (i = 0; i < charArray.length; i++) {
        $("#villains").append(charArray[i]);
      }
      $("#hero").append(this);
      $("#characters").empty();
      hero = this;
    } else {
      if (defenderChosen === false) {
        if (this.is_hero === false) {
          this.is_defender = true;
          defenderChosen = true;
          console.log(this.name + " is your defender!")
          $("#defender").append(this);
          defender = this;
        }
      }
    }
  });

  $("#attackBtn").click(function() {
    if (defenderChosen === true) {
      if (hero.health > 0 && defender.health > 0) {
        hero.health = (hero.health - defender.attackStr)
        defender.health = (defender.health - hero.attackStr)
        hero.attackStr = (hero.attackStr * 2)
        $(hero).children(".charHealth").text(hero.health);
        $(defender).children(".charHealth").text(defender.health);
      } else if (hero.health <= 0) {
        console.log("game over you lose");
        restart();
      } else {
        $(defender).remove();
        defenderChosen = false;
        console.log("next opponent");
      }
    } else {
      console.log("no enemy selected")
    }
  });

});
