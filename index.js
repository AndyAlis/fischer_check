import { shops } from "./shops.js";

const burger = document.querySelector(".header-burger");
const mobLinks = document.querySelectorAll(".mobile-nav-link");

const form = document.getElementById("send_us_letter");

const btn_address_list = document.getElementById("btn_address_list");
const address_list = document.getElementById("address_list");

const btn_address_map = document.getElementById("btn_address_map");
const map = document.getElementById("map");

burger.addEventListener("click", () => {
  document.getElementById("mobile-nav").classList.toggle("display-none");
});

mobLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // console.log("clicked!");
    document.getElementById("mobile-nav").classList.add("display-none");
  });
});

// *************************
// yandex maps
// https://yandex.ru/dev/jsapi30/doc/ru/?from=mapsapi
// *************************
try {
  ymaps3.ready.then(init);
  function init() {
    // Создание карты
    const map = new ymaps3.YMap(document.getElementById("map"), {
      location: {
        // Координаты центра карты
        // Порядок по умолчанию: «долгота, широта»
        center: [37.61755947247549, 55.75242679785425],
        // Уровень масштабирования
        // Допустимые значения: от 0 (весь мир) до 21.
        zoom: 7,
      },
    });
    // Добавляем слой для отображения схематической карты, при отключении - выключает карту
    map.addChild(new ymaps3.YMapDefaultSchemeLayer());
    // слой для добавления маркеров
    map.addChild(new ymaps3.YMapDefaultFeaturesLayer({ zIndex: 1800 }));
    // *************************
    // маркер 1
    // *************************

    // const markerElement = document.createElement('div');
    // markerElement.className = 'marker-class';
    // // markerElement.innerText = "I'm marker!";

    // const mark2 = new ymaps3.YMapMarker(
    // {
    //     // source: 'markerSource',
    //     coordinates: [37.61755947247549, 55.75242679785425 ],
    //     draggable: false,
    //     mapFollowsOnDrag: true
    // },
    // markerElement
    // );
    // map.addChild(mark2);

    // *************************
    // добавляем сразу несколько маркеров из массива
    // *************************

    shops.forEach((el) => {
      let isShown = false;

      const markerElement = document.createElement("div");
      markerElement.className = "marker-class";

      const dialogElement = document.createElement("dialog");
      dialogElement.className = "dialogElement";

      const dialogHeader = document.createElement("h3");
      dialogHeader.textContent = `${el.name}`;

      const dialogAddress = document.createElement("p");
      dialogAddress.textContent = `${el.address || ""}`;

      const dialogPhone = document.createElement("p");
      const dialogPhoneLink = document.createElement("a");
      dialogPhoneLink.textContent = `${el.phone || ""}`;
      dialogPhoneLink.href = `tel:${el.phoneLink || ""}`;
      dialogPhone.appendChild(dialogPhoneLink);

      dialogElement.appendChild(dialogHeader);
      dialogElement.appendChild(dialogAddress);
      dialogElement.appendChild(dialogPhone);
      markerElement.appendChild(dialogElement);

      markerElement.addEventListener("click", () => {
        // window.alert(el.name);
        if (!isShown) {
          dialogElement.showModal();
          isShown = !isShown;
        } else {
          dialogElement.close();
          isShown = !isShown;
        }
      });

      const mark = new ymaps3.YMapMarker(
        {
          // source: 'markerSource',
          coordinates: el.coordinates,
          draggable: false,
          mapFollowsOnDrag: true,
        },
        markerElement
      );
      map.addChild(mark);
    });
  }
} catch (err) {
  console.log(err);
}

form.addEventListener("submit", (e) => {
  e.preventDefault;
  window.alert("Пока не работает!");
});

btn_address_list.addEventListener("click", () => {
  // window.alert("Пока не работает!");
  map.classList.add("display-none");
  address_list.classList.remove("display-none");
  btn_address_list.classList.add("display-none");
  btn_address_map.classList.remove("display-none");
});

btn_address_map.addEventListener("click", () => {
  map.classList.remove("display-none");
  address_list.classList.add("display-none");
  btn_address_map.classList.add("display-none");
  btn_address_list.classList.remove("display-none");
});

//creating adress list
shops.forEach((el) => {
  const shop = document.createElement("div");
  shop.className = "shop";

  const shopHeader = document.createElement("h3");
  shopHeader.textContent = `${el.name}`;

  const shopAddress = document.createElement("p");
  shopAddress.textContent = `${el.address || ""}`;

  const shopPhone = document.createElement("p");
  const shopPhoneLink = document.createElement("a");
  shopPhoneLink.textContent = `${el.phone || ""}`;
  shopPhoneLink.href = `tel:${el.phoneLink || ""}`;
  shopPhone.appendChild(shopPhoneLink);

  const shopSite = document.createElement("p");
  const shopSiteLink = document.createElement("a");
  shopSiteLink.textContent = `${el.site || ""}`;
  shopSiteLink.href = `${el.site || ""}`;
  shopSiteLink.target = `_blank`;
  shopSite.appendChild(shopSiteLink);

  shop.appendChild(shopHeader);
  shop.appendChild(shopAddress);
  shop.appendChild(shopPhone);
  shop.appendChild(shopSite);

  address_list.appendChild(shop);
});
