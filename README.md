# Sanapeli

**Sanapeli** on selainpohjainen sanapeli, jossa pelaajan tehtävänä on arvata satunnainen viisikirjaiminen suomenkielinen sana kuuden yrityksen aikana. Peli toimii Wordle-tyyppisesti: jokaisella arvauksella kirjaimet värjäytyvät vihreäksi, oranssiksi tai mustaksi sen mukaan, ovatko ne oikeassa paikassa, väärässä paikassa vai eivät sanassa lainkaan.

SANAPELI/
├── index.html # Pelin HTML-rakenne 
├── style.css # Tyylit ja responsiivinen ulkoasu 
├── code.js # Pelilogiikka ja toiminnallisuus 
└── data/ 
└── viisikirjaimiset.txt # Sanalista (muokattu stripped.txt)

## Käyttöohjeet

1. Avaa `index.html` selaimessa.
2. Syötä viisikirjaiminen sana tekstikenttään ja paina Enter.
3. Saat palautteen jokaisesta kirjaimesta:
   - **Vihreä** = oikea kirjain oikeassa paikassa
   - **Oranssi** = kirjain on sanassa mutta väärässä paikassa
   - **Musta** = kirjain ei ole sanassa
4. Sinulla on **6 yritystä** arvata sana oikein.
5. Voit aloittaa uuden pelin painamalla **"Pelaa uusi"** -nappia.

## Responsiivisuus

Sanapeli on suunnilteltu toimimaan myös mobiililaitteen näytöllä. CSS:n media queryt mukauttavat fonttikoot, solujen mitat ja syötekentän leveyden pienemmille näytöille. 

## Jatkokehitysmahdollisuuksia

- Oikean sanan voisi näyttää visuaalisesti taulukossa tappion jälkeen.
- Virheilmoitukset voisi tulla alertin sijaan kentän alle.
- Mobiilikäyttöön voisi tehdä visuaalisen näppäimistön, jossa voisi myös näkyä mitä kirjaimia on jo arvattu.
- Arvattavan sanan kirjaimet voisi näkyä suoraan taulukon ruuduissa, jo ennen enterin painamista.
- Sovellukseen voisi tehdä kirjautumismahdollisuuden ja käyttäjänhallinnan. Sovellusta voisi laajentaa niin, että se muistaisi käyttäjän statistiikan, kuinka monta peliä on ratkaissut kuinka monella yrityksellä ja kuinka monta peliä on kokonaan hävitty.

## Sanalähde

Sanalista on otettu [qalle.neocities.org/kotuslistat](https://qalle.neocities.org/kotuslistat#johdanto) -sivustolta `stripped.txt`-tiedostosta. Sanalistan alkuperäinen lähde on Kotimaisten kielten keskuksen (Kotus) nykysuomen sanalista. Lista on muokattu Pythonilla niin, että siihen on jätetty vain:

- Viisikirjaimiset sanat
- Yksittäiset sanat (ei osia kaksiosaisista termeistä)

###  Python-koodi sanalistan suodattamiseen

```python
with open("sanalista.txt", "r", encoding="utf-8") as file:
    sanat = file.readlines()

ilman_valilyontia = [sana.strip() for sana in sanat if " " not in sana.strip()]
viisikirjaimiset = [sana for sana in ilman_valilyontia if len(sana) == 5]

with open("viisikirjaimiset.txt", "w", encoding="utf-8") as file:
    for sana in viisikirjaimiset:
        file.write(sana + "\n")