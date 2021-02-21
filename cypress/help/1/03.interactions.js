// 🐼 Cypress ma wbudowane wiele funkcji, które pozwalają na interakcję ze znalezionymi elementami.
// Większość z ich nazw może być bardzo intuicyjna. Poniżej znajdziesz parę, które mogą ci się przydać w ćwiczeniach

cy.click(); // kliknij w element na stronie
cy.focus(); // sfocusuj element
cy.type(); // wpisz tekst do inputa, lub wciśnij przycisk na klawiaturze (należy podać string z jego nazwą np. {ENTER})
cy.clear(); // wyczyść input
cy.check(); // zaznacz i odznacz checkbox
cy.uncheck();
cy.select(); // wybierz opcję w dropdownie

// 🐼 Oprócz tego przyda ci się także stubowanie requestów z przeglądarki. Dzięki temu możesz
// upewnić się, że request został zrobiony. Pamiętaj aby zapisać odniesienie do requestu do aliasu i wywołać
// metodę wait wtedy kiedy spodziewasz się jego realizacji

cy.intercept("GET", "http://my-api.com/things").as("request");
cy.wait("@request");

// 🐼 Możesz również zapewnić określoną odpowiedź serwera na przykład poprzez ładowanie swojego pliku fixture (wystarczy, że wrzucisz jsona do folderu fixtures)

cy.intercept("POST", "http://my-api.com/things", { fixture: "fixture.json" });
