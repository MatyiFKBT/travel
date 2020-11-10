# Utazási naplókezelő alkalmazás

## Feladat funkcionális követelményei
### Projektötlet

A projekt célja a felasználó utazásainak naplózása. A felhasználó feljegyezheti különféle utazásait. Az alkalmazáson belül lehetőség van az utazások listázására, naptárban/térképen való megtekintésére, utazások felvételére, módosítására törlésre. Az alkalmazást több felhasználó is használhatja egymástól függetlenül. Az alkalmazásban lehetőség van egy utazást publikusként is rögzíteni, ekkor az összes felhasználó láthatja azt.

### Felhasznált technológiák

#### Backend

- Node.js
- Express.js
- Typescript
- SQLite / Postgres
- REST api  (Frotend - Backend kommunikáció)
- Jest (tesztelés)

#### Frontend

- Angular

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

- **Felhasználók tábla**  (felhasználónév, jelszó, e-mail cím, egyedi azonosító )
- **Utazások tábla** (id, hely(lat,lon), kezd_dátum, vég_dátum, leírás)
- **Kommentek tábla** (utazás_id, felhasználó_id, komment)
- **Címkék tábla** (címke_id, szöveg)
  
### Objektumok közötti reláció  
  
- **felhasználó - utazás**  (1 <-> N)
- **utazás - komment**  (n<->n)
- **felhasználó - komment** (1 <-> N)
- **utazás - címke** (n<->n)

## Feladat nem funkcionális követelményei  
  
- CSS keretrendszer használata igényes kinézet céljából  
- Felhasználói élmény biztosítása  
- Alkalmazáson belüli hibamentesség  
- Fejlesztői szinten jól skálázható kódbázis kialakítása
