// 🔗 استبدل الرابط أدناه برابط النشر بصيغة CSV من Google Sheets
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpH32aTTpTHLWa0Xn5UnfyUvyG4q_fZ5JELYshIerJ55yh0KP9gJ0-e108ABq_-mkoIA2zpGM07bdG/pub?output=csv";

async function loadClients() {
  try {
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
          ${phone ? `<a href="https://wa.me/${phone}" target="_blank">واتساب</a> | <a href="tel:${phone}">اتصال</a>` : ""}
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("خطأ في تحميل البيانات:", err);
  }
}

loadClients();
