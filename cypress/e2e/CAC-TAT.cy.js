describe("Verificar o atendimento ao cliente TAT", () => {
  //beforeEach realiza a ação antes de cada teste.
  beforeEach(() => {
    cy.viewport(410, 860);
    cy.visit("./src/index.html");
  });

  it("Verificar o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("campos obrigatorios do formulario", () => {
    cy.fillMandatoryFieldsAndSubmit("alberto", "fernandes");
    cy.get(".success").should("be.visible");
  });

  it("exibir mensagem ao submeter email error", () => {
    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("lallaal");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("verificar se campo de telefone aceita strings", () => {
    cy.get("#phone").type("asddasd").should("have.text", "");
  });

  it("verificar se campo de telefone marcado como obrigatorio", () => {
    cy.get("#firstName").type("teste");
    cy.get("#lastName").type("teste");
    cy.get("#email").type("lallaal@gmail.com");

    cy.get("#phone-checkbox").check();

    cy.contains("button", "Enviar").click();
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
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("enviar formulario com comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit("alberto", "fernandes");
    cy.get(".success").should("be.visible");
  });

  it("selecionar campos options em campo flutuante", () => {
    cy.get("#product").select("Blog").invoke("val").should("eq", "blog");
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
    cy.get("#product").select(4).should("have.value", "youtube");
  });

  it("selecionar campos do tipo radios", () => {
    cy.get("#support-type > :nth-child(2) > input")
      .check()
      .should("be.checked")
      .and("have.value", "ajuda");

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked")
      .and("have.value", "feedback");
  });

  it("selecionar campos do tipo radios usando interações", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check().should("be.checked");
      });
  });
  it("selecionar campos de checkbox marcar e desmarcar", () => {
    // verificando usando each mas nao é necessario com checkbox
    cy.get('input[type="checkbox"]')
      .should("have.length", 2)
      .each(($checkbox) => {
        cy.wrap($checkbox)
          .check()
          .should("be.checked")
          .uncheck()
          .should("not.be.checked");
      });

    //marcar todos e desmarcar apenas o ultimo e fist o primeiro
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("upload de arquivos para verificação", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Lidando com links que abrem em outra aba", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click().$checkbox;

    cy.contains("Talking About Testing").should("be.visible");
    cy.title().should(
      "be.equal",
      "Central de Atendimento ao Cliente TAT - Política de privacidade"
    );
  });
});
