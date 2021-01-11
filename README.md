# Utazási naplókezelő alkalmazás

## Linkek

- https://backend-travel.herokuapp.com
- https://travel2020.netlify.app

## Feladat funkcionális követelményei

### Projektötlet

A projekt célja a felasználó utazásainak naplózása. A felhasználó feljegyezheti különféle utazásait. Az alkalmazáson belül lehetőség van az utazások listázására, térképen való megtekintésére, utazások felvételére. Az alkalmazást több felhasználó is használhatja egymástól függetlenül.

### Felhasznált technológiák

#### [Backend](https://github.com/MatyiFKBT/travel/wiki/Backend-dokument%C3%A1ci%C3%B3)

- Node.js
- Express.js
- Typescript
- SQLite / Postgres
- REST api (Frotend - Backend kommunikáció)
- Jest (tesztelés)

#### [Frontend](https://github.com/MatyiFKBT/travel/wiki/Frontend-dokument%C3%A1ci%C3%B3)

- Angular

#### [Fejlesztői dokumentáció](https://github.com/MatyiFKBT/travel/wiki/Felhaszn%C3%A1l%C3%B3i-dokument%C3%A1ci%C3%B3)

#### Verziókövető

- GitHub

### Felhasználói történetek

- Felhasználó
  - [ ] Regisztráció lehetőség
  - [ ] Bejelentkezés lehetőség
  - [ ] Utazás rögzítése (bejelentkezve)
  - [ ] Utazások listázása
  - [ ] Egy adott utazás részleteinek megtekintése
  - [ ] Kijelentkezés

### Adatbázis felépítése

- **Felhasználók tábla** (felhasználónév, jelszó, e-mail cím, egyedi azonosító )
- **Utazások tábla** (id, hely(lat,lon), kezd_dátum, vég_dátum, leírás)
- **Kommentek tábla** (utazás_id, felhasználó_id, komment)
- **Címkék tábla** (címke_id, szöveg)

### Objektumok közötti reláció

- **felhasználó - utazás** (1 <-> N)
- **utazás - komment** (n<->n)
- **felhasználó - komment** (1 <-> N)
- **utazás - címke** (n<->n)

## Feladat nem funkcionális követelményei

- CSS keretrendszer használata igényes kinézet céljából
- Felhasználói élmény biztosítása
- Alkalmazáson belüli hibamentesség
- Fejlesztői szinten jól skálázható kódbázis kialakítása
