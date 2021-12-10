import React, { useState, useEffect } from "react";

function App() {
  const [prizes, setPrizes] = useState(null);
  const YearStart = 2015;
  const YearEnd = 2017;
  const apiUrl =
    "https://api.nobelprize.org/2.0/nobelPrizes?nobelPrizeYear=" +
    YearStart +
    "&yearTo=" +
    YearEnd;

  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Success!" + data.nobelPrizes.length + " prizes awarded.");
      console.log(data);

      // store the data into our books variable
      setPrizes(data.nobelPrizes);
    }
  }, [apiUrl]);

  return (
    <div>
      <h1>
        Nobel Prizes awarded between {YearStart} & {YearEnd}{" "}
      </h1>

      {/* display prizes from the API */}
      {prizes && (
        <div className="prizes">
          {/* loop over the prizes */}
          {prizes.map((prize, index) => (
            <div key={index}>
              <table>
                <tr>
                  <td>Year</td>
                  <td>{prize.awardYear}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{prize.categoryFullName.en}</td>
                </tr>
                {/* loop over the laureates*/}
                {prize.laureates && (
                  <tr className="laureates">
                    <td>Laureates</td>
                    <td>
                      {prize.laureates.map((laureate, index2) => (
                        <span key={index2}>
                          {laureate.knownName
                            ? laureate.knownName.en
                            : laureate.orgName.en}
                          {index2 < prize.laureates.length - 1 ? ", " : <br />}
                        </span>
                      ))}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>Motivation</td>
                  <td>{prize.laureates[0].motivation.en}</td>
                </tr>
              </table>
              <p />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
