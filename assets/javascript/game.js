var startGame = function() {
  charArray = [];
  heroChosen = false;
  defenderChosen = false;
  hero = 1;
  defender = 1;
  victoryCount = 0;

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
  var yoda = new Character('yoda', 'Yoda', './assets/images/yoda.jpg', '125', '5').createElem();
  var darthVader = new Character('darthVader', 'Darth Vader', './assets/images/darth-vader.jpg', '200', '20').createElem();
  var darthMaul = new Character('darthMaul', 'Darth Maul', './assets/images/darth-maul.jpeg', '150', '30').createElem();

  charArray.push(hanSolo, yoda, darthVader, darthMaul)

  //store in variable to increase performance(selector caching)
  var charactersDiv = $("#characters")
  var heroDiv = $("#hero")
  var villainsDiv = $("#villains")
  var defenderDiv = $("#defender")



  charactersDiv.html('<H1>Choose your character....</H1>');
  charactersDiv.append(hanSolo);
  charactersDiv.append(yoda);
  charactersDiv.append(darthVader);
  charactersDiv.append(darthMaul);

  $(".character").on("click", function() {
    if (heroChosen === false) {
      heroChosen = true;
      this.is_hero = true;

      heroDiv.html('<H1>Hero</H1>');
      defenderDiv.html('<H1>Defender</H1>');
      villainsDiv.html('<H1>Villains</H1>');


      for (i = 0; i < charArray.length; i++) {
        villainsDiv.append(charArray[i]);
      }
      charactersDiv.html('<H1>Choose an opponent...</H1>');
      hero = this;
      heroDiv.append(hero);
    } else {
      if (defenderChosen === false) {
        if (this.is_hero === false) {
          charactersDiv.html('');
          $("#attackBtn").removeClass("hidden")
          this.is_defender = true;
          defenderChosen = true;
          defender = this;
          defenderDiv.append(defender);
        }
      }
    }
  });

  $("#attackBtn").click(function() {
    console.log(hero)
    if (defenderChosen === true) {
      if (hero.health > 0 && defender.health > 0) {
        hero.health = (hero.health - defender.attackStr)
        defender.health = (defender.health - hero.attackStr)
        hero.attackStr = (hero.attackStr * 2)
        $(hero).children(".charHealth").text(Math.max(hero.health,0));
        $(defender).children(".charHealth").text(Math.max(defender.health,0));
        if (hero.health<=0){
          $("#attackBtn").text("start over")
        }else if (defender.health<=0){
          $("#attackBtn").text("remove body")
        }
      } else if (hero.health <= 0) {
        $("#attackBtn").text("ATTACK").addClass("hidden")
        $(".character").remove()
        startGame();
      } else {
        $("#attackBtn").text("ATTACK").addClass("hidden")
        charactersDiv.html('<H1>Choose an opponent...</H1>');
        $(defender).remove();
        victoryCount++;
        if (victoryCount < charArray.length - 1) {
          defenderChosen = false;
        } else {
          $("#attackBtn").text("ATTACK").addClass("hidden")
          alert("game over you WIN!");
          $(".character").remove();
          startGame();
        }
      }
    }
  });
}

$(document).ready(function() {
  var charArray = [];
  var heroChosen = false;
  var defenderChosen = false;
  var hero = 1;
  var defender = 1;
  var victoryCount = 0;

  startGame();
})
