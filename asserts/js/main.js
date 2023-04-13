const inputEl = document.querySelector("input");

async function getJSONData() {
  const response = await fetch("../asserts/json/data.json");
  return await response.json();
}

const searchRecord = async (value) => {
  console.log("I got this value", value.toUpperCase());

  const jsonData = await getJSONData();

  const recordFound = jsonData.find((record) => {
    return record.code === value || value.toUpperCase().startsWith(record.code);
  });
  const resultsectionEl = document.querySelector("#resultSection");

  if (recordFound) {
    resultsectionEl.classList.remove("hidden");

    //update the ui fields
    resultsectionEl.querySelector("#query").innerText = value.toUpperCase();
    resultsectionEl.querySelector("#rto_id").innerText = recordFound.id;
    resultsectionEl.querySelector("#rto_code").innerText = recordFound.code;
    resultsectionEl.querySelector("#rto_location").innerText =
      recordFound.location;
    resultsectionEl.querySelector("#rto_type").innerText = recordFound.type;
    resultsectionEl.querySelector("#rto_district").innerText =
      recordFound.district;
  } else {
    resultsectionEl.classList.add("hidden");
  }
};

inputEl.addEventListener("keyup", (e) => {
  //check my validation here

  if (e.key === "Enter") {
    if (inputEl.value.length > 3) {
      searchRecord(inputEl.value);
    }
  }

  //
});
