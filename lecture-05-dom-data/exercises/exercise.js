console.log("JS connected ✅");

/* =========================================================
   L05 — DOM • State • Browser APIs
   Annotated version for classroom explanation
   ========================================================= */


/* =========================================================
   1) DOM EASY — Live Character Counter
   Concept:
   - Event-driven programming
   - Reading input value
   - Updating DOM dynamically
   ========================================================= */

// Get references to DOM elements
// document.getElementById returns a live DOM node reference
const msgInput = document.getElementById("msgInput");
const msgStats = document.getElementById("msgStats");

// addEventListener attaches a callback function
// "input" event fires on every keystroke / paste / delete
msgInput.addEventListener("input", function () {

  // Read current input length
  const len = msgInput.value.length;

  // Compute derived value
  const remaining = 50 - len;

  // Update DOM text (UI is a reflection of data)
  msgStats.innerText = `Length: ${len} | Remaining: ${remaining}`;

  // Conditional UI styling
  // We directly manipulate style for simplicity
  if (remaining < 10) {
    msgStats.style.color = "crimson";
    msgStats.style.fontWeight = "bold";
  } else {
    msgStats.style.color = "";
    msgStats.style.fontWeight = "";
  }
});


/* =========================================================
   2) DOM MEDIUM — Event Delegation Pattern
   Concepts:
   - createElement
   - dataset
   - classList
   - event delegation
   ========================================================= */

const itemInput = document.getElementById("itemInput");
const btnAddItem = document.getElementById("btnAddItem");
const btnClearItems = document.getElementById("btnClearItems");
const itemList = document.getElementById("itemList");
const listStats = document.getElementById("listStats");

// Simple ID generator (stateful counter)
let nextId = 1;

// Derived data from DOM
// We compute stats from actual DOM nodes
function updateListStats() {

  // querySelectorAll returns a static NodeList
  const total = itemList.querySelectorAll("li").length;

  // We use CSS class to represent DONE state
  const done = itemList.querySelectorAll("li.done").length;

  listStats.innerText = `Items: ${total} | Done: ${done}`;
}

// Add new item
btnAddItem.onclick = function () {

  const text = itemInput.value.trim();
  if (text === "") return; // Guard clause

  // Create new <li>
  const li = document.createElement("li");

  // dataset is used for storing custom metadata
  li.dataset.id = String(nextId);

  // Create text span
  const span = document.createElement("span");
  span.textContent = text;

  // Create remove button
  const btnX = document.createElement("button");
  btnX.textContent = "x";

  // Mark this button action
  btnX.dataset.action = "remove";

  // Build DOM structure
  li.appendChild(span);
  li.appendChild(btnX);
  itemList.appendChild(li);

  itemInput.value = "";
  nextId++;

  updateListStats();
};

// Clear entire list
btnClearItems.onclick = function () {
  itemList.innerHTML = ""; // Fast DOM reset
  updateListStats();
};

// Event delegation:
// Instead of attaching click to each li,
// we attach ONE listener to the parent <ul>
itemList.onclick = function (e) {

  // Find closest li ancestor of clicked element
  const li = e.target.closest("li");
  if (!li) return;

  // If clicked element has data-action="remove"
  if (e.target.dataset.action === "remove") {
    li.remove();
  } else {
    // Toggle CSS class to represent DONE state
    li.classList.toggle("done");
  }

  updateListStats();
};

updateListStats();


/* =========================================================
   3) STATE EASY — Counter (State → Render)
   Concepts:
   - Single source of truth
   - Derived UI from state
   - Separation of concerns
   ========================================================= */

const btnMinus = document.getElementById("btnMinus");
const btnPlus = document.getElementById("btnPlus");
const btnZero = document.getElementById("btnZero");
const countOut = document.getElementById("countOut");
const parityOut = document.getElementById("parityOut");

// Central state object
// UI must reflect this object
const counterState = { count: 0 };

// render function = pure UI update from state
function renderCounter() {

  countOut.innerText = `Count: ${counterState.count}`;

  // Derived state (computed, not stored)
  parityOut.innerText =
    `Parity: ${counterState.count % 2 === 0 ? "EVEN" : "ODD"}`;
}

// Handlers modify state ONLY
btnPlus.onclick = function () {
  counterState.count++;
  renderCounter();
};

btnMinus.onclick = function () {
  counterState.count--;
  renderCounter();
};

btnZero.onclick = function () {
  counterState.count = 0;
  renderCounter();
};

renderCounter();


/* =========================================================
   4) STATE MEDIUM — Mini Cart (Reducer-like)
   Concepts:
   - Action dispatch
   - Derived totals
   - Render after mutation
   ========================================================= */

const btnAddApple = document.getElementById("btnAddApple");
const btnAddBanana = document.getElementById("btnAddBanana");
const btnRemoveLast = document.getElementById("btnRemoveLast");
const btnCartClear = document.getElementById("btnCartClear");
const cartOut = document.getElementById("cartOut");
const cartTotals = document.getElementById("cartTotals");

const cartState = { items: [] };

// Dispatch function controls all mutations
function dispatch(action) {

  if (action.type === "ADD") {
    cartState.items.push(action.item);
  }
  else if (action.type === "REMOVE_LAST") {
    if (cartState.items.length > 0) {
      cartState.items.pop();
    }
  }
  else if (action.type === "CLEAR") {
    cartState.items = [];
  }

  renderCart();
}

function renderCart() {

  // Map items to names
  const names = cartState.items.map(it => it.name);

  const listText =
    names.length === 0 ? "(empty)" : names.join(", ");

  // Compute derived total
  let total = 0;
  for (const it of cartState.items) {
    total += it.price;
  }

  cartOut.innerText = `Cart: ${listText}`;
  cartTotals.innerText =
    `Items: ${cartState.items.length} | Total: €${total}`;
}

btnAddApple.onclick = function () {
  dispatch({ type: "ADD", item: { name: "Apple", price: 2 } });
};

btnAddBanana.onclick = function () {
  dispatch({ type: "ADD", item: { name: "Banana", price: 1 } });
};

btnRemoveLast.onclick = function () {
  dispatch({ type: "REMOVE_LAST" });
};

btnCartClear.onclick = function () {
  dispatch({ type: "CLEAR" });
};

renderCart();


/* =========================================================
   5) Browser API EASY — localStorage
   Concepts:
   - Persistent key-value storage
   - Synchronous API
   - Only stores strings
   ========================================================= */

const noteInput = document.getElementById("noteInput");
const btnSaveNote = document.getElementById("btnSaveNote");
const btnLoadNote = document.getElementById("btnLoadNote");
const btnClearNote = document.getElementById("btnClearNote");
const noteOut = document.getElementById("noteOut");

const NOTE_KEY = "L05_NOTE";

// Render helper
function renderNote(saved) {
  if (saved === null || saved === "") {
    noteOut.innerText = "Saved note: (none)";
  } else {
    noteOut.innerText = `Saved note: ${saved}`;
  }
}

btnSaveNote.onclick = function () {
  const text = noteInput.value.trim();

  // localStorage only stores strings
  localStorage.setItem(NOTE_KEY, text);

  renderNote(text);
  noteInput.value = "";
};

btnLoadNote.onclick = function () {
  const saved = localStorage.getItem(NOTE_KEY);
  renderNote(saved);
};

btnClearNote.onclick = function () {
  localStorage.removeItem(NOTE_KEY);
  renderNote(null);
};

// Initialize UI from persistent storage
renderNote(localStorage.getItem(NOTE_KEY));


/* =========================================================
   6) Browser API MEDIUM — Geolocation
   Concepts:
   - Callback-based async API
   - Permission handling
   - Error codes
   ========================================================= */

const btnGetLocation = document.getElementById("btnGetLocation");
const btnClearLocation = document.getElementById("btnClearLocation");
const geoStatus = document.getElementById("geoStatus");
const geoOut = document.getElementById("geoOut");

function clearGeoUI() {
  geoStatus.innerText = "Status: ...";
  geoOut.innerText = "...";
}

btnGetLocation.onclick = function () {

  // Feature detection
  if (!("geolocation" in navigator)) {
    geoStatus.innerText = "Status: Error: Not supported";
    return;
  }

  geoStatus.innerText = "Status: Requesting permission...";

  navigator.geolocation.getCurrentPosition(

    // SUCCESS callback
    function success(pos) {

      const { latitude, longitude, accuracy } = pos.coords;

      geoStatus.innerText = "Status: OK";

      geoOut.innerText =
        `latitude:  ${latitude}\n` +
        `longitude: ${longitude}\n` +
        `accuracy:  ${accuracy} meters\n` +
        `timestamp: ${new Date(pos.timestamp).toISOString()}`;
    },

    // ERROR callback
    function error(err) {

      let msg = err.message;

      if (err.code === 1) msg = "Permission denied";
      else if (err.code === 2) msg = "Position unavailable";
      else if (err.code === 3) msg = "Timeout";

      geoStatus.innerText = `Status: Error: ${msg}`;
      geoOut.innerText = "";
    },

    // Options object
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    }
  );
};

btnClearLocation.onclick = clearGeoUI;

clearGeoUI();
