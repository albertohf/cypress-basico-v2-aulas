describe("Verificar o atendimento ao cliente TAT", () => {
  //beforeEach realiza a ação antes de cada teste.
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verificar o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("campos obrigatorios do formulario", () => {
    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("XXXXXXXXXXXXXXX");
    cy.get("#telefone").type("123456789");
    cy.get("#mensagem").type("teste");
    cy.get("#submit").click();
  });
});
