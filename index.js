const dateComponent = document.querySelector(".pagination");
const today = new Date();

let i = 0;
while (i <= 7) {
  let future = new Date(today);
  future.setDate(today.getDate() + i);

  const span = document.createElement("span");
  span.innerText = future.toLocaleDateString("en-US", { weekday: "long" });

  const h1 = document.createElement("h1");
  h1.innerText = future.getDate();

const newDiv = document.createElement("div");
newDiv.className = "box";

  dateComponent.appendChild(newDiv);
  newDiv.appendChild(span);
  newDiv.appendChild(h1);
newDiv.style.background = "gray";
span.style.color = "#fff";
span.style.fontSize = "clamp(14px, 16px)";
h1.style.color = "#fff";
h1.style.fontSize =  "clamp(14px, 16px)";
    i++;
}
