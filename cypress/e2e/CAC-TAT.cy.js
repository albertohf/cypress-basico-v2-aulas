describe("Verificar o atendimento ao cliente TAT", () => {
  //beforeEach realiza a ação antes de cada teste.
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verificar o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("campos obrigatorios do formulario", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al";

    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("lallaal@gmail.com");
    cy.get("#phone").type("123456789");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get("button[type='submit']").click();

    cy.get(".success").should("be.visible");
  });

  it("exibir mensagem ao submeter email error", () => {
    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("lallaal");
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });

  it("verificar se campo de telefone aceita strings", () => {
    cy.get("#phone").type("asddasd").should("have.text", "");
  });

  it("verificar se campo de telefone marcado como obrigatorio", () => {
    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("lallaal@gmail.com");

    cy.get("#phone-checkbox").click();

    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });

  it("preencher e limpar os campos", () => {
    cy.get("#firstName")
      .type("alberto")
      .should("have.value", "alberto")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("fernandes")
      .should("have.value", "fernandes")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("12334")
      .should("have.value", "12334")
      .clear()
      .should("have.value", "");
  });

  it("verificar campo obrigatorio", () => {
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });
});
