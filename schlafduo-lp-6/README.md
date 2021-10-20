# Änderungen an der Seite

- Code für Produktberater kann entfallen?
- ein Schlafduo-Element streichen
- ID des Input-Elements beim anderen Schlafduo-Element auf **schlafduo-qty**
  ändern (statt _schlafduo-qty-2_)
- Preis des Schlafduos in ein `span`-Element mit der ID **schlafduo-sum**
  wrappen
- `h3`-Element um den Preis darf keine ID mehr haben
- `span`-Element mit dem Streichpreis des Schlafduos muss die ID
  **schlafduo-compare** haben
- für jedes weitere Produkt:
  - Checkbox muss die ID **gn-checkbox** (kerze-checkbox, maske-checkbox,
    matte-checkbox) haben
  - `strong` mit Preis muss die ID **gn-sum** (kerze-sum, maske-sum, matte-sum)
    haben
  - `label` mit Streichpreis muss die ID **gn-compare** (kerze-compare,
    maske-compare, matte-compare) haben
  - `input`-Element für Menge streichen
- Berechnung unter den zusätzlichen Produkten streichen
- `<link>`-Element (siehe before.html) mit FontAwesome im Head einfügen
- CSS-Anweisungen (siehe before.html) im Head einfügen
- `<script src="https://combinatronics.com/sklinkusch/webflow-js/main/schlafduo-lp-6/index.js"></script>`
  am Ende vom Body hinzufügen
- `<a>`-Elemente, die den Cart öffnen sollen, durch `<button>`-Elemente ersetzen
