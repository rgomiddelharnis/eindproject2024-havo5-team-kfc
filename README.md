[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/nMKE9hqF)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13657597)

> Project Team KFC 2024 Informatica © Jasper van Es, Jaron Lugtenburg, Ahmad Yasen

# Takenlijst

- [Jasper van Es](/JASPER.md)
- [Ahmad Yasen](/AHMAD.md)

# Game

Recreatie van Plants vs Zombies waarin AI zowel tijdens het programmeren als gedurende de game gebruikt wordt, aldus een
live implementatie van AI doormiddel van het gebruik van de API.

## Storyline

We zijn in het huis van meneer de Groot, hij heeft de laatste tijd spookachtige ervaringen gehad. Wij (als speler) zijn
in dienst genomen om de spoken te bestrijden en tegen te houden. De map zal er dus ook als volgt uitzien van links naar
rechts:

> Slaapkamer met bed van meneer de Groot 's nachts > Game area waar de defence geplaatst moet worden > een
> vloerkleed/rode loper (wat dat ook mag doen in meneer zijn huis) waar de geesten vandaan komen (zie voorbeeld A)

## Screens

- Main menu
    - Start button
    - Settings button (niet noodzakelijk)
    - Algemene achtergrondmuziek
- In game
    - Game scherm
        - HUD (balk bovenaan het scherm)
            - Wolkjes aantallen
            - Button per defender die je kunt plaatsen
    - Pause menu
- Game done
    - Game over
    - Game success

## Voorbeelden & inspiratie

###### Voorbeeld A - huis

![Voorbeeld gamesherm]()

###### Inspiratie map

![Voorbeeld gamesherm](images/image.png)

## Assets

- Map
    - Stijl: Griezelig (spookhuis)
    - Oude houten vloer (tiles: 2 verschillende voor om en om)
    -
- Lettertype voor de game zoeken
- Embleem (optioneel) voor linksonder in scherm
- Geesten (5 verschillende) > Functie = zombie
    - Standaard geest (h: 20, d: 2, f: 1, s: 0.5)
        - Vrouwelijke geest
        - Mannelijke geest
    - Geest met pet, ketting, tatoeage (meer damage, langzamer) (h: 100)
    - Woedende geest, stomend (h: ...)
- Defenders
    - Waterpistool > functie peashooter (h: 10, d: 2, f: 1, c: 100)
    - Stofzuiger > functie grasmaaier (verschoont regel) (h: N/A, d: inf., f: N/A)
    - Gebroken vloer, water val > Functie landmijn (h: N/A, d: inf., f: N/A)
    - (heilige) Kruis > Functie potato (vertraging/zakt in grond en laat geest met rust)
    - Spiegel (h: 2x, d: inf. unless woedende geest) (breekt wanneer 2 keer gedood)
- Producers
    - Wolk > Functie zonnebloem (geeft waterdruppels i.p.v. zonnetjes) (h: 10, p: 25, f: 1/24, c: 50)

## Implementatie van AI

# Rollen & taken

### Jasper

- Karakters maken
    - Schieters
    - Zonnebloem (variant)
    - Landmijn (variant)
    - Potato

### Jaron

- Programmeren

### Ahmad

- Soundeffects