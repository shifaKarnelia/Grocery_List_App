const form = document.getElementById("groceryForm");
const input = document.getElementById("itemInput");
const list = document.getElementById("groceryList");
const emptyState = document.getElementById("emptyState");
const progressLabel = document.getElementById("progressLabel");
const progressCount = document.getElementById("progressCount");
const progressFill = document.getElementById("progressFill");

const items = [];

function renderItems() {
  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = `grocery-item${item.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "item-check";
    checkbox.checked = item.done;
    checkbox.setAttribute("aria-label", `Mark ${item.name} complete`);

    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      renderItems();
    });

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = item.name;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.setAttribute("aria-label", `Delete ${item.name}`);
    deleteButton.textContent = "x";

    deleteButton.addEventListener("click", () => {
      const index = items.indexOf(item);
      if (index >= 0) {
        items.splice(index, 1);
        renderItems();
      }
    });

    li.append(checkbox, text, deleteButton);
    list.appendChild(li);
  });

  updateProgress();
  emptyState.hidden = items.length > 0;
}

function updateProgress() {
  const total = items.length;
  const completed = items.filter((item) => item.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressLabel.textContent = `${percent}% done`;
  progressCount.textContent = `${completed} / ${total} items`;
  progressFill.style.width = `${percent}%`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();
  if (!value) {
    return;
  }

  items.push({
    name: value,
    done: false,
  });

  input.value = "";
  input.focus();
  renderItems();
});

renderItems();
