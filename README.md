# Koripallon tulostaulu

Selaimessa toimiva koripallon tulostaulu ja pöytäkirja. Ohjaus yhdellä ikkunalla, tulostaulu erillisessä näyttöikkunassa (esim. televisio tai projektori). Toimii myös ilman verkkoyhteyttä.

- Suomenkielinen versio: `index.html`
- Englanninkielinen versio: `en.html`
- Nykyinen versio: **1.12.0** (katso [CHANGELOG.md](CHANGELOG.md))

## Tiedostot

| Tiedosto | Tarkoitus |
|---|---|
| `index.html` | Sovellus suomeksi (kaikki koodi yhdessä tiedostossa) |
| `en.html` | Sovellus englanniksi |
| `sw.js` | Offline-tuki (service worker) |
| `manifest.webmanifest`, `manifest-en.webmanifest` | Asennettavuus omaksi sovellukseksi |
| `icon-192.png`, `icon-512.png` | Sovelluksen kuvakkeet |
| `logos/` | Logokirjasto (valinnainen) |
| `CHANGELOG.md` | Versiohistoria |
| `README.md` | Tämä dokumentti |

## Käyttöönotto GitHub Pagesissa

1. Lataa kaikki yllä luetellut tiedostot repositorion juureen.
2. Valitse **Settings → Pages → Deploy from a branch**, haara `main` ja kansio `/ (root)`.
3. Sovellus löytyy osoitteesta `https://käyttäjänimi.github.io/repositorio/` ja englanniksi `.../en.html`.
4. Avaa sivu kerran netin ollessa päällä niillä laitteilla, joilla sitä käytetään. Sen jälkeen se toimii myös ilman verkkoa.

## Versionhallinta

### Versionumerot

Versiot numeroidaan muodossa `PÄÄ.SIVU.KORJAUS` (semanttinen versiointi):

- **PÄÄ** (esim. 1.0.0 → 2.0.0): iso muutos, joka muuttaa käyttötapaa tai tallennettujen tietojen muotoa.
- **SIVU** (esim. 1.11.0 → 1.12.0): uusi toiminto.
- **KORJAUS** (esim. 1.12.0 → 1.12.1): virheen korjaus tai pieni ulkoasumuutos.

Versionumero näkyy sovelluksessa asetussivun alalaidassa. Sieltä aukeaa myös versiohistoria ja **Tarkista päivitykset** -toiminto, joka kertoo, onko GitHubissa uudempi versio kuin selaimessa käytössä oleva.

### Uuden version julkaisu

Tee nämä aina, kun julkaiset muutoksen:

1. **Päivitä versionumero** molempiin tiedostoihin (`index.html` ja `en.html`). Rivi on muotoa:
   ```js
   const APP_VERSION='1.12.0';
   ```
2. **Lisää uusi rivi sovelluksen versiohistoriaan** samassa kohdassa olevaan `CHANGELOG`-listaan (uusin ylimmäksi), molempiin tiedostoihin omalla kielellään:
   ```js
   {v:'1.13.0',d:'2026-11-20',i:['Kuvaus muutoksesta','Toinen muutos']},
   ```
3. **Päivitä `CHANGELOG.md`** samalla tiedolla.
4. **Päivitä välimuistin nimi** tiedostossa `sw.js`, jotta laitteet hakevat uudet tiedostot offline-käyttöön:
   ```js
   const CACHE='tulostaulu-1.13.0';
   ```
5. **Lataa muuttuneet tiedostot GitHubiin** (Add file → Upload files) ja kirjoita commit-viestiksi esim. `Versio 1.13.0: kuvaus`.
6. **Tarkista**: avaa sivu, lataa se uudelleen ja katso asetusten alalaidasta, että versionumero on vaihtunut.

Vapaaehtoisesti voit merkitä version GitHubissa: **Releases → Draft a new release**, tagiksi `v1.13.0` ja kuvaukseksi CHANGELOGin rivit. Silloin jokaisen version tiedostot löytyvät helposti myöhemmin.

### Paluu vanhaan versioon

Jos uusi versio ei toimi:

1. Avaa repositoriossa tiedosto (esim. `index.html`) ja valitse **History**.
2. Valitse toimiva aiempi versio ja lataa sen tiedosto (**…→ Download** tai **Raw**).
3. Lataa se takaisin repositorioon ja päivitä `sw.js`:n välimuistin nimi, jotta laitteet hakevat palautetun version.

Jos käytössä on Releases-merkinnät, aiemman version kaikki tiedostot saa ladattua suoraan julkaisusta.

### Tallennettu data päivityksissä

Pelin tila, asetukset, pohjat ja loki tallentuvat selaimen paikalliseen muistiin. Ne säilyvät päivitysten yli. Suomen- ja englanninkielisellä versiolla on omat tallennuksensa:

| Tieto | Suomi | Englanti |
|---|---|---|
| Peli ja asetukset | `bb-scoreboard-v1` | `bb-scoreboard-en-v1` |
| Loki | `bb-scoreboard-log-v1` | `bb-scoreboard-en-log-v1` |
| Pohjat | `bb-scoreboard-templates-v1` | `bb-scoreboard-en-templates-v1` |

Jos tallennusmuoto joskus muuttuu niin, ettei vanha data enää kelpaa, nosta pääversiota ja vaihda avaimen loppu (esim. `-v2`).

## Logokirjasto

Lisää repositorioon kansio `logos` ja sinne logot (PNG, JPG, WebP tai SVG). Nimeä tiedostot joukkueen mukaan, esim. `espoon-basket.png`, niin sovellus ehdottaa logoa automaattisesti, kun joukkueen nimi täsmää. Kirjasto toimii vain GitHub-sivulla.

## Sääntöpohja

Erikoisvirheet noudattavat FIBA:n vuoden 2026 sääntömuutoksia, jotka ovat voimassa Koripalloliiton sarjoissa 1.9.2026 alkaen. Lyhenteet (T1, T2, PV, RV, D, C, B) ovat sovelluksen omia, eivät virallisia pöytäkirjamerkintöjä. Tarkista sarjakohtaiset poikkeukset sarjamääräyksistä.
