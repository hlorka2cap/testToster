const timerElement = document.querySelector("#timer");
const hourElement = timerElement.querySelector("#hour");
const minElement = timerElement.querySelector("#min");
const secElement = timerElement.querySelector("#sec");

function startTimer(hour, min, sec) {
  function render() {
    hourElement.textContent = String(hour).length > 1 ? hour : "0" + hour;
    minElement.textContent = String(min).length > 1 ? min : "0" + min;
    secElement.textContent = String(sec).length > 1 ? sec : "0" + sec;
  }
  return function update() {
    setTimeout(() => {
      if (sec === 0) {
        sec = 59;
        min--;
        if (min === 0) {
          min = 59;
          hour--;
        }
      } else {
        sec--;
      }

      render();
      update();
    }, 1000);
  };
}

/* 
configure the countdown of the offer here
hours, mins, secs
*/
const timer = startTimer(4, 51, 16)();

// configure the prices here
const oldPrice = "250.00";
const newPrice = "160.00";

// setting prices
const oldPriceElement = document.querySelector("#oldPrice");
const newPriceElement = document.querySelector("#newPrice");

oldPriceElement.textContent = "r " + oldPrice;
newPriceElement.textContent = "r " + newPrice;

let data,
  current = 0;
const pagination = document.querySelector(".slider__pagination");
const currentImageElement = document.querySelector(
  ".slider__current-product img"
);

// getting data
fetch("assets/data/product.json")
  .then((response) => response.json())
  .then((json) => (data = json))
  .then(() => {
    data.orthopedicSlippers.forEach((item) => {
      // output of pagination elements
      let li = document.createElement("li");
      li.classList.add("slider__pagination-item");
      li.id = item.id;
      if (+li.id === 0) {
        li.classList.add("active");
        currentImageElement.src = item.image;
      }

      let image = document.createElement("img");
      image.src = item.image;
      li.appendChild(image);
      pagination.appendChild(li);
      li.addEventListener("click", () => {
        if (current == event.target.id) return;

        for (let i = 0; i < data.orthopedicSlippers.length; i++) {
          if (data.orthopedicSlippers[i].id == event.target.id) {
            current = data.orthopedicSlippers[i].id;
            setTimeout(() => {
              currentImageElement.src = item.image;
            }, 500);
            currentImageElement.style.opacity = "0";
            setTimeout(() => (currentImageElement.style.opacity = "1"), 500);
            break;
          } else
            document
              .getElementById(data.orthopedicSlippers[i].id)
              .classList.remove("active");
        }

        data.orthopedicSlippers.forEach((item) => {
          document.getElementById(item.id).classList.remove("active");
        });
        document.getElementById(current).classList.add("active");
      });
    });
  });
