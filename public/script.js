let chatHistory = [];

async function ask(newChat) {
  const questionElem = document.getElementById("question");
  const answerElem = document.getElementById("answer");

  if (newChat) {
    chatHistory = [];
    answerElem.innerText = "";
  }

  const question = questionElem.value.trim();
  if (!question) return;

  chatHistory.push({ role: "user", content: question });

  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages: chatHistory })
  });

  const data = await response.json();

  if (data.error) {
    answerElem.innerText = "Error: " + data.error;
  } else {
    const answer = data.answer;
    chatHistory.push({ role: "assistant", content: answer });
    answerElem.innerText = answer;
  }

  questionElem.value = "";
}