console.log('ok');

document.addEventListener('DOMContentLoaded', (evt) => {
  fetch('https://api.digitransit.fi/routing/v1/routers/hsl', {
    mode: 'no-cors',
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({query: '{stop(id: "HSL:1059:0:01"){name}}'}),
  }).then((vastaus) => {
    return vastaus.json();
  }).then((json) => {
    lataaTiedot(json);
    console.log(json);
  }).catch((error) => {
    console.log(error);
  });
});

const lataaTiedot =(data)=>{
  console.log('lataa Tiedot');
  let routerInfo = '';
  routerInfo = data[0].routes.shortName;

  let divi = document.createElement('DIV');
  document.getElementById('tulos').appendChild(divi);

  let route = document.createElement('p');
  divi.appendChild(route);

  route.innerHTML = routerInfo;
};

function tulostaKaikki(k) {
  let nimi, linkki, kuva, kuvaus = '';
  for (let e = 0; e < k.length - 1; e++) {
    nimi = k[e].show.name;
    linkki = k[e].show.officialSite;
    kuvaus = k[e].show.summary;
    console.log('kierros');

    let divi = document.createElement('DIV');
    document.getElementById('tulos').appendChild(divi);
    try {
      kuva = k[e].show.image.medium;
      let image = document.createElement('IMG');
      image.setAttribute('src', kuva);
      divi.appendChild(image);
    } catch {
      let korvaus= document.createElement('h1');
      korvaus.innerHTML= "no img";
      divi.appendChild(korvaus);
      console.log('no img');
    }
    let name = document.createElement('h1');
    divi.appendChild(name);
    let link = document.createElement('a');
    divi.appendChild(link);
    let summary = document.createElement('p');
    divi.appendChild(summary);
    let gen = document.createElement('p');
    divi.appendChild(gen);

    name.innerHTML = nimi;
    link.innerHTML = linkki;
    summary.innerHTML = kuvaus;
    gen.innerHTML = tulostaGenre(k);
  }
};
