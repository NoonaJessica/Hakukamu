# Hakukamu

Hakukamu on yksinkertainen sovellus työnhaun hallintaan. Sen avulla käyttäjä voi tallentaa ja seurata lähettämiään työhakemuksia sekä niiden tilaa rekrytointiprosessin aikana.

## Features

* Lisää uusi työhakemus
* Seuraa hakemuksen tilaa
* Tallenna muistiinpanoja hakemuksista
* Linkitä työpaikkailmoitus hakemukseen
* Yksinkertainen tietokantarakenne

## Tech Stack

* **Node.js**
* **SQLite**
* **Drizzle ORM**
* **TypeScript**

## Database

Sovellus käyttää SQLite-tietokantaa.

### Tables

#### user

Tallentaa käyttäjän tiedot.

| Column | Type    | Description                 |
| ------ | ------- | --------------------------- |
| id     | text    | Uniikki käyttäjä-ID         |
| age    | integer | Käyttäjän ikä (valinnainen) |

#### job_application

Tallentaa käyttäjän työhakemukset.

| Column  | Type    | Description                  |
| ------- | ------- | ---------------------------- |
| id      | integer | Hakemuksen ID                |
| company | text    | Yrityksen nimi               |
| role    | text    | Haettu työ                   |
| status  | text    | Hakemuksen tila              |
| notes   | text    | Muistiinpanot                |
| url     | text    | Linkki työpaikkailmoitukseen |

### Status values

Hakemuksilla voi olla seuraavat tilat:

* `LAHETETTY`
* `KASITTELYSSA`
* `HAASTATTELU`
* `TARJOUS`
* `HYLATTY`

## Installation

1. Kloonaa repository

```
git clone https://github.com/NoonaJessica/Hakukamu.git
```

2. Siirry projektiin

```
cd Hakukamu
```

3. Asenna riippuvuudet

```
npm install
```

4. Käynnistä projekti

```
npm run dev
```

## Database Setup

Sovellus käyttää Drizzle ORM:ää tietokantahallinnan ja migraatioiden kanssa.

### Migraatioiden ajaminen

Migraatiot ajaetaan automaattisesti sovellusta käynnistäessä. Voit myös ajaa migraatiot manuaalisesti:

```
npm run db:push
```

### Migraatioiden luominen

Jos teit muutoksia `schema.ts` tiedostoon, luo uusi migraatio:

```
npm run db:migrate
```

### Tietokannan tarkasteleminen

Voit tarkastella ja hallita tietokantaa Drizzle Studiolla:

```
npm run db:studio
```

Tämä avaa selaimen, jossa voit selata tauluja, lisätä tai muokata tietoa.

### Tietokannan nollaaminen

Tietokannan poistamiseksi ja uudelleenluomiseksi:

```
npm run db:reset
```

**Varoitus:** Tämä poistaa kaikki tiedot tietokannasta.

## Project Structure

```
Hakukamu
│
├── db
│   └── schema.ts
│
├── src
│   └── application logic
│
│
└── README.md
```

## Future Improvements

Mahdollisia kehityskohteita:

* käyttäjäkohtaiset hakemukset (`userId`)
* hakemusten aikaleimat (`created_at`, `updated_at`)
* hakemusten analytiikka


## Screenshots

![Hakukamu Screenshot 1](src/lib/assets/Hakukamu_sc_1.png)

![Hakukamu Screenshot 2](src/lib/assets/Hakukamu_sc_2.png)

![Hakukamu Screenshot 3](src/lib/assets/Hakukamu_sc_3.png)

![Hakukamu Screenshot 4](src/lib/assets/Hakukamu_sc_4.png)