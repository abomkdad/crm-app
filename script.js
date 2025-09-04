const SHEET_CSV_URL = "{CSV_URL}";

async function loadClients() {
  const res = await fetch(SHEET_CSV_URL);
  const text = await res.text();
  const rows = text.trim().split("\n").map(r => r.split(","));

  const tbody = document.querySelector("#clientsTable tbody");
  tbody.innerHTML = "";

  rows.slice(1).forEach(row => {
    const [name, phone, status, assignedTo, notes] = row;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name || ""}</td>
      <td>${phone || ""}</td>
      <td>${status || "جديد"}</td>
      <td>${assignedTo || ""}</td>
      <td>${notes || ""}</td>
      <td>
        <a href="https://wa.me/${phone}" target="_blank">واتساب</a>
        ${phone ? ` | <a href="tel:${phone}">اتصال</a>` : ""}
      </td>`;
    tbody.appendChild(tr);
  });
}

loadClients();
