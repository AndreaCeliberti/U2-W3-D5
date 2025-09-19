fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
  },
});

const URL = `https://striveschool-api.herokuapp.com/api/product/`;

document.getElementById("product-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    name: form.name.value,
    description: form.description.value,
    brand: form.brand.value,
    price: parseFloat(form.price.value),
    imageUrl: form.imageUrl.value,
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      document.getElementById("messaggio").textContent = "Prodotto inserito con successo!";
      form.reset();
    } else {
      const error = await response.json();
      document.getElementById("messaggio").textContent = "Errore: " + (error.message || "Impossibile completare l'invio.");
    }
  } catch (error) {
    document.getElementById("messaggio").textContent = "Errore di rete o server non raggiungibile.";
    console.error(error);
  }
});
