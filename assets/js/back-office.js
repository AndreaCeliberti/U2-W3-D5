fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
  },
});
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {
  document.getElementById("product-id").value = productId;

  document.getElementById("button-addon2").click();
}

const URL = `https://striveschool-api.herokuapp.com/api/product/`;

// form aggiunta

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

// form modifica

document.getElementById("change-form").addEventListener("click", async () => {
  const id = document.getElementById("product-id").value.trim();
  const messaggio = document.getElementById("messaggio");

  if (!id) {
    messaggio.textContent = "Inserisci un ID valido.";
    return;
  }

  try {
    const response = await fetch(`${URL}/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
      },
    });

    if (!response.ok) {
      throw new Error("Prodotto non trovato.");
    }

    const prodotto = await response.json();

    const form = document.getElementById("change-form");
    form.name.value = prodotto.name || "";
    form.description.value = prodotto.description || "";
    form.brand.value = prodotto.brand || "";
    form.price.value = prodotto.price || "";
    form.imageUrl.value = prodotto.imageUrl || "";

    messaggio.textContent = "Prodotto caricato correttamente!";
  } catch (error) {
    document.getElementById("messaggio").textContent = `Errore: ${error.message}`;
    console.error(error);
  }
});

// Invia le modifiche via PUT
document.getElementById("button-addon2").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;
  const id = form.id.value;
  const URL = `URL/${id}`;

  const data = {
    name: form.name.value,
    description: form.description.value,
    brand: form.brand.value,
    price: parseFloat(form.price.value),
    imageUrl: form.imageUrl.value,
  };

  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMGQ4OTZmMzAyMjAwMTUxMDgwY2IiLCJpYXQiOjE3NTgyNjg4MTAsImV4cCI6MTc1OTQ3ODQxMH0.LcrCflFm5XXuR7qw1ePLI0A5nXGptRP2VN7Q9NImD9A",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      document.getElementById("messaggio").textContent = "Prodotto modificato con successo!";
      form.reset();
    } else {
      const error = await response.json();
      document.getElementById("messaggio").textContent = "Errore: " + (error.message || "Impossibile completare la modifica.");
    }
  } catch (error) {
    document.getElementById("messaggio").textContent = "Errore di rete o server non raggiungibile.";
    console.error(error);
  }
});
