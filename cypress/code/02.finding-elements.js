// 🐼 Aby znaleźć element cypress wykorzystuje cssowe selektory i przechodzenie pomiędzy elementami na różne sposoby
// poniżej opisane są metody, które mogą ci się przydać do realizacji ćwiczeń

// ============================ METODA GET ============================

// 🐼 Metoda get pozwala na odnalezienie elementu za pomocą cssów
// znaczy to, że możesz szukać za pomocą klas, id czy atrybutów dodanych do htmla
// poniżej znajduje się parę przykładów

cy.get("button"); // znajdź element button
cy.get("#my-id"); // znajdź element o id my-id
cy.get('[name="email"]'); // znajdź element o atrybucie name równym "email"

// ============================ METODA FIND ============================

// 🐼 Metoda find pozwala wyszukać element na wybranej części dokumentu
// zazwyczaj możesz jej użyć po tym, jak wyszukasz już coś za pomocą metody get

cy.get("#container").find(".toast"); // znajdź element o id "container" i wewnątrz niego szukaj elementu z klasą .toast

// ============================ METODA CONTAINS ============================

// 🐼 Metoda contains pozwoli ci na wyszukanie za pomocą tekstu
// Możesz w niej również określić cssowy selektor, który dokładniej pozwoli
// zidentyfikować wyszukiwany element. Można ją również łączyć tak jak metodę find

cy.contains("Save"); // znajdź element z tekstem "Save"
cy.contains('.button[type="submit"]', "Save"); // znajdź submit button z tekstem "Save"

// ============================ METODA NEXT ============================

// 🐼 Metoda next pozwala na wybranie kolejnego elementu "poniżej". Bazuje ona na hierarchii więc trzeba korzystać z niej z rozwagą

// <label>Email</label>
// <input name="email"/>
cy.contains("Email").next(); // metoda pozwoliłaby wybrać input powyżej

// ============================ METODY CHILDREN I PARENT ============================

// 🐼 Metody children i parent pozwalają na przechodzenie pomiędzy elementami "wgląb". Podobnie jak next bazuje jednak na hierarchii
// więc testy z jej użyciem mogą okazać się kruche

// <ol class="list">
//    <li>Uno</li>
//    <li>Dos</li>
//    <li>Tres</li>
// </ol>
cy.get(".list").children(); // metoda zwróci tablicę elementów li

// ============================ METODA AS ============================

// 🐼 Czasem może się zdarzyć, że będziesz chciał zapisać element "na potem". Aby to zrobić możesz zapisać go za pomocą metody as(ALIAS),
// a "potem" pobrać jego wartość za pomocą funkcji get(@ALIAS) - pamiętaj o znaku małpy, dzięki temu cypress wie, że ma szukać w aliasach

cy.get(".use-later").as("later");

// ...

cy.get("@later"); // 🐼 got'em
