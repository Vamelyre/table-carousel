const wrapper = document.getElementById("table-body"); 
const belt = document.getElementById("belt");

const SPEED_PX_PER_SEC = 35; 

let y = 0;
let lastTs = null;
let paused = false;

// tu kursori cxrilzea cherdeba
wrapper.addEventListener("mouseenter", () => (paused = true));
wrapper.addEventListener("mouseleave", () => {
  paused = false;
  lastTs = null;
});



fetch("/users") 
  .then(res => res.json())
  .then(users => {
    users.forEach(u => belt.appendChild(makeRow(u)));

    if (belt.children.length > 1) {
      requestAnimationFrame(tick);
    }
  })
  .catch(err => console.error(err));


function makeRow(u) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${u.id ?? ""}</td>
    <td>${u.name ?? ""}</td>
    <td>${u.email ?? ""}</td>
    <td>${u.role ?? ""}</td>
    <td>${u.phone ?? ""}</td>
    <td>${u.age ?? ""}</td>
    <td>${u.country ?? ""}</td>
  `;
  return tr;
}

function tick(ts) {
  if (!paused) {
    if (lastTs === null) lastTs = ts;

    const dt = (ts - lastTs) / 1000;
    lastTs = ts;

    y += SPEED_PX_PER_SEC * dt;
    belt.style.transform = `translateY(-${y}px)`;

    let firstRow = belt.firstElementChild;
    while (firstRow) {
      const h = firstRow.getBoundingClientRect().height;
      if (y < h) break;

      belt.appendChild(firstRow);
      y -= h;
      belt.style.transform = `translateY(-${y}px)`;
      firstRow = belt.firstElementChild;
    }
  }

  requestAnimationFrame(tick);
}







