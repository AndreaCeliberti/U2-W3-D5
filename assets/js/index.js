fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
  },
});
const URL = `https://striveschool-api.herokuapp.com/api/product/`;
const getProduct = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((product) => {
      console.log(product);
      const row = document.getElementById("cardRow");
      row.innerHTML = "";

      product.forEach((products) => {
        const col = document.createElement("div");
        col.className = "col col-md-4 col-xl-3";

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm ";

        card.innerHTML = `
                
                  
                    <img class="img-fluid object-fit-cover" style="height: 200px;" 
                      src="${product.imgUrl}"
                    />
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">
                        ${product.brand}
                      </p>
                      <p class="card-text">
                        ${product.description}
                      </p>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            class="hideBtn btn btn-sm btn-outline-secondary"
                          >
                            Hide
                            </button>
                            </div>
                            <small class="text-muted">${product.price}</small>
                            </div>
                            </div>
                            
                            
                            `;
        col.appendChild(card);
        row.appendChild(col);

        const hideButtons = document.querySelectorAll(".hideBtn");
        hideButtons.forEach((btn) => {
          btn.addEventListener("click", (event) => {
            const col = event.target.closest(".col");
            if (col) {
              col.classList.add("d-none");
            }
          });
        });
      });
    })

    .catch((error) => {
      alert(error);
    });
};
