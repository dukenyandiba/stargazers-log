const list = document.querySelector("#starred");

if (!list) {
  console.error("Starred list container not found.");
} else {
  list.setAttribute("aria-live", "polite");
  list.setAttribute("aria-label", "Starred repositories");
  list.setAttribute("aria-busy", "true");

  const loadingItem = document.createElement("li");
  loadingItem.id = "starred-loading";
  loadingItem.textContent = "Loading starred repositories...";
  list.appendChild(loadingItem);
}

fetch("event.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    const list = document.querySelector("#starred");

    if (!list) {
      console.error("Starred list container not found.");
      return;
    }

    const loadingItem = document.querySelector("#starred-loading");
    if (loadingItem) {
      loadingItem.remove();
    }

    list.innerHTML = "";
    list.setAttribute("aria-busy", "false");

    if (!Array.isArray(events) || events.length === 0) {
      const item = document.createElement("li");
      item.textContent = "No starred repositories to show.";
      list.appendChild(item);
      return;
    }

    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  })
  .catch((error) => {
    const list = document.querySelector("#starred");

    if (!list) {
      console.error("Failed to load starred repositories:", error);
      return;
    }

    const loadingItem = document.querySelector("#starred-loading");
    if (loadingItem) {
      loadingItem.remove();
    }

    list.innerHTML = "";
    list.setAttribute("aria-busy", "false");

    const item = document.createElement("li");
    item.textContent = "Unable to load starred repositories right now.";
    list.appendChild(item);

    console.error("Failed to load starred repositories:", error);
  });
