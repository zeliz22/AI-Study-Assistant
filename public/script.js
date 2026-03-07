async function ask() {

  const question = document.getElementById("question").value;

  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  if (data.error) {
    document.getElementById("answer").innerText = "Error: " + data.error;
  } else {
    document.getElementById("answer").innerText = data.answer;
  }

}