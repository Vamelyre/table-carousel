const belt = document.getElementById("belt");
const wrapper = document.getElementById("table-body");

const searchEl = document.getElementById("search");
const roleEl = document.getElementById("role");
const countryEl = document.getElementById("country");
const minAgeEl = document.getElementById("minAge");
const maxAgeEl = document.getElementById("maxAge");
const applyBtn = document.getElementById("applyFilter");

const SPEED_PX_PER_SEC = 35;
const MIN_ROWS_TO_SCROLL = 6;

let y = 0;
let lastTs = null;
let paused = false;
let running = false;
let rafId = null;

// hoverze cherdeba cxrili
wrapper.addEventListener("mouseenter", () => (paused = true));
wrapper.addEventListener("mouseleave", () => {
  paused = false;
  lastTs = null;
});

applyBtn.addEventListener("click", loadUsers);

loadUsers();

function buildQuery() {
  const params = new URLSearchParams();

  if (searchEl.value.trim()) params.set("search", searchEl.value.trim());
  if (roleEl.value) params.set("role", roleEl.value);
  if (countryEl.value.trim()) params.set("country", countryEl.value.trim());
  if (minAgeEl.value) params.set("minAge", minAgeEl.value);
  if (maxAgeEl.value) params.set("maxAge", maxAgeEl.value);

  const qs = params.toString();
  return qs ? `/users?${qs}` : "/users";
}

function stopWheel() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}
function startWheel() {
  if (belt.children.length < MIN_ROWS_TO_SCROLL) {
    belt.style.transform = "translateY(0)";
    return;
  }

  y = 0;
  lastTs = null;
  belt.style.transform = "translateY(0)";
  running = true;
  rafId = requestAnimationFrame(tick);
}


function loadUsers() {
  stopWheel();
  belt.innerHTML = "";

  fetch(buildQuery())
    .then(res => res.json())
    .then(users => {
      users.forEach(u => belt.appendChild(makeRow(u)));
      startWheel();
    })
    .catch(err => console.error("Failed to load users:", err));
}

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
if (belt.children.length >= 5) {
  startWheel();
}

function tick(ts) {
  if (!running) return;

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

  rafId = requestAnimationFrame(tick);
}






