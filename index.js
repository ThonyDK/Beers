//https://api.punkapi.com/v2/beers
export function encode(str) {
    let encoded = "" + str
    encoded = encoded.replace(/&/g, "&amp;");
    encoded = encoded.replace(/>/g, "&gt;");
    encoded = encoded.replace(/</g, "&lt;");
    encoded = encoded.replace(/"/g, "&quot;");
    encoded = encoded.replace(/'/g, "&#039;");
    return encoded;
}

getAllBeers()
getBeersAbv()

//document.getElementById("abv-btn").onclick = getBeerAbvAbove

    function getAllBeers() {
        console.log("Called")
        fetch("https://api.punkapi.com/v2/beers")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const rows = data.map(beer => `
    <tr>
      <th>${(beer.name)} </th>
      <th>${(beer.tagline)} </th>
      <th>${(beer.abv)} </th>
      <th>${(beer.ibu)} </th>
    </tr>
    `).join("\n")
                document.getElementById("tbl1").innerHTML = rows;
            })
            .catch(err => console.error("UPPPPPS: " + err))
            .finally(e => console.log("Finally Done"))
    }

document.getElementById("filter-abv").onclick = getBeersAbv
function getBeersAbv() {
    const abv = document.getElementById("input-abv").value//Value input by user
    fetch("https://api.punkapi.com/v2/beers")
        .then(res => {
            if (!res.ok) {
                return Promise.reject("Error :" + "incorrect abv value entered")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const rows = data.filter(function(beer) {
                return beer.abv > abv}).map(beer => `
      <tr>
        <td>${beer.name} </td>
        <td>${beer.tagline} </td>
        <td>${beer.abv} </td>
        <td>${beer.ibu} </td>
      </tr>
      `).join("\n")
            document.getElementById("tbl1").innerHTML = rows;
        })
        .catch(err => {
            document.getElementById("error").innerText = err
        })
        .finally(e => console.log("Done with getBeersAbv"))
}


