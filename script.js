document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(".clickable");

  headings.forEach((heading) => {
    heading.addEventListener("click", function () {
      const details = this.nextElementSibling;

      // Toggle visibility
      if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
      } else {
        details.style.display = "none";
      }
    });
  });
});
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, address }),
  });

  const data = await response.json();
  alert(data.message);

  // ✅ Clear form fields after submission
  document.querySelector("form").reset();
});
