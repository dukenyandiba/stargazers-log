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

    list.innerHTML = "";

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

    list.innerHTML = "";

    const item = document.createElement("li");
    item.textContent = "Unable to load starred repositories right now.";
    list.appendChild(item);

    console.error("Failed to load starred repositories:", error);
  });
