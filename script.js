document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("searchBox");
    const resultsContainer = document.getElementById("results");

    let data = [];

    // Load JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            data = json;
        })
        .catch(err => console.error("Error loading data.json:", err));

    // Search function
    searchBox.addEventListener("input", () => {
        const query = searchBox.value.toLowerCase();
        resultsContainer.innerHTML = "";

        const filtered = data.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        if (filtered.length === 0 && query !== "") {
            resultsContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("result-card");

            card.innerHTML = `
    <div class="result-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.url}" target="_blank">Go to Link</a>
    </div>
`;

            resultsContainer.appendChild(card);
        });
    });
});

