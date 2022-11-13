const omikujiButton = document.getElementById("omikuji-button");
const omikujiImage = document.getElementById("omikuji-image");

const omikuji = document.getElementById("omikuji");
const daikichi = document.getElementById("daikichi");
const kichi = document.getElementById("kichi");
const kyou = document.getElementById("kyou");

omikujiButton.onclick = () => {
  const r = Math.random();
  if (r < 0.3) {
    omikuji.style.display = "none";
    daikichi.style.display = "block";
    setTimeout(() => {
      daikichi.style.display = "none";
      omikuji.style.display = "block";
    }, 1000);
  } else if (r < 0.7) {
    omikuji.style.display = "none";
    kichi.style.display = "block";
    setTimeout(() => {
      kichi.style.display = "none";
      omikuji.style.display = "block";
    }, 1000);
  } else {
    omikuji.style.display = "none";
    kyou.style.display = "block";
    setTimeout(() => {
      kyou.style.display = "none";
      omikuji.style.display = "block";
    }, 1000);
  }
};
