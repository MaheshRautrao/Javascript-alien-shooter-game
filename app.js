let jet = document.querySelector(".jet");
let game_container = document.querySelector(".game_container");
let restart_container = document.querySelector(".restart_container");
let points = document.querySelector(".score");

window.addEventListener("keydown", (e) => {
  let left_of_jet = parseInt(
    window.getComputedStyle(jet).getPropertyValue("left")
  );

  if (e.key == "ArrowLeft" && left_of_jet > 0) {
    jet.style.left = left_of_jet - 10 + "px";
  }

  if (e.key == "ArrowRight" && left_of_jet < 480) {
    jet.style.left = left_of_jet + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.key == "Spacebar" || e.key == " ") {
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    game_container.appendChild(bullet);

    let movebullet = setInterval(() => {
      var aliens = document.getElementsByClassName("alien");
      let len = aliens.length;

      if (aliens != undefined) {
        for (let i = 0; i < len; i++) {
          let alien = aliens[i];

          let alienbound = alien.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();

          if (
            bulletbound.left >= alienbound.left &&
            bulletbound.right <= alienbound.right &&
            bulletbound.top >= alienbound.top &&
            bulletbound.bottom <= alienbound.bottom
          ) {
            alien.parentElement.removeChild(alien);

            points.innerHTML = parseInt(points.innerHTML) + 1;
          }
        }
      }

      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      if (bulletbottom >= 400) {
        clearInterval(movebullet);
        bullet.parentElement.removeChild(bullet);
      }

      bullet.style.left = left_of_jet + 5 + "px"; //
      bullet.style.bottom = bulletbottom + 2 + "px";
    });
  }
});

// generate aliens

let generateAliens = setInterval(() => {
  let newAlien = document.createElement("div");
  newAlien.classList.add("alien");

  let left_new_alien = parseInt(
    window.getComputedStyle(newAlien).getPropertyValue("left")
  );

  newAlien.style.left = Math.floor(Math.random() * 450) + "px";

  game_container.appendChild(newAlien);
}, 1500);

// move the aliens downward

let moveAliens = setInterval(() => {
  let aliens = document.getElementsByClassName("alien");

  if (aliens != undefined) {
    len = aliens.length;

    for (var i = 0; i < len; i++) {
      let top_of_alien = parseInt(
        window.getComputedStyle(aliens[i]).getPropertyValue("top")
      );

      if (top_of_alien >= 380) {
        GameOver();
      }

      aliens[i].style.top = top_of_alien + 10 + "px";
    }
  }
}, 500);

// Game Over
function GameOver() {
  clearInterval(generateAliens);
  clearInterval(moveAliens);
  game_container.style.display = "none";
  restart_container.style.display = "flex";
}

let restartBtn = restart_container.getElementsByTagName("button")[0];

restartBtn.addEventListener("click", restartGame);

// restart Game
function restartGame() {
  window.location.reload();
}
