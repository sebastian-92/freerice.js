function start() {
  return fetch("https://engine.freerice.com/games", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrerPolicy: "same-origin",
    body: '{"category":"66f2a9aa-bac2-5919-997d-2d17825c1837","level":1,"user":null}',
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
async function doProblem(data) {
  var numbers = data.data.attributes.question.text.split(" x ");
  answer = numbers[0] * numbers[1];
  answerId = data.data.attributes.question.options.find(
    (option) => Number(option.text) === answer
  ).id;
  return fetch(`https://engine.freerice.com/games/${data.data.id}/answer`, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrerPolicy: "same-origin",
    body: `{"answer":"${answerId}","question":"${data.data.attributes.question_id}","user":null}`,
    method: "PATCH",
  })
    .catch((error) => {
      console.error("Fetch error:", error);
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data2) => {
      return data2;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
async function feed(repeater) {
  var beginning = await start();

  for (var i = 0; i < repeater; i++) {
    await beginning;
    beginning = await doProblem(beginning);
    console.log("Total rice: " + beginning.data.attributes.rice);
  }
}
//change this to change how many questions are answered. Rice to question ratio is ten to one.
feed(1000);
