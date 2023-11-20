const LINK_TO_PORTFOLIOPAGE = "../Portfolio/Portfolio.html";
const API_URL = "https://jsonplaceholder.typicode.com/comments?_limit=50";
const dataTableBody = document.querySelector("#dataTable tbody");

function redirectToPortfolioPage() {
  window.location.href = LINK_TO_PORTFOLIOPAGE;
}

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    data.map((post) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.name}</td>
                <td>${post.email}</td>
            `;
      dataTableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
