// 🐼 Najprostszym sposobem na debugowanie może okazać się przenalizowanie błędu cypressa - są bardzo opisowe
// i "cofanie się w czasie" klikająć po krokach i sprawdzając ich rezultaty

// 🐼 Jeżeli potrzebujesz zatrzymać test w danym miejscu i sprawdzić, co aktualnie robił cypress
// możesz użyć metody .debug() Pamiętaj żeby otworzyć devtoolsy z przeglądarki za pomocą przycisku F12
// pozwoli ci to na podglądnięcie szczegółów dotyczących kroku

// 🐼 Żeby zatrzymać test i sprawdzić jaki jest w danej chwili stan aplikacji, możesz użyć .pause()
// cypress przejdzie wtedy w tryb krokowy - będziesz w stanie przechodzić kolejno po krokach
// lub wznowić test. Może się to okazać przydatne szczególnie podczas testowania requestów, ponieważ
// można monitorować sprawdzić zakładkę network

// 🐼 Ostatni sposób na debuggowanie może okazać się być "tricky". Możesz dodać słowo kluczowe debugger
// w konkretnym miejscu w teście, ale musisz pamiętać o tym, że cypress działa asynchronicznie. Dodaj
// debugger po "wyczekaniu" komendy dzięki methodzie then()

// cy.get('.my-item').then(item => {
//     debugger;
// })
