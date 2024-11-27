import constants from "../utils/constants";

describe("Patients", () => {
    const ALANA_ID = "25";
    const NEW_PATIENT = {
        name: "New Patient",
        isPremature: true,
        birthDateStr: "2024-08-18",
        gestationalAge: 9,
        atypicalities: "Isto é algo ruim?",
    };

    beforeEach(() => {
        cy.visit(constants.VIEWS.PACTIENTS_PATH);
    });

    it("should view all patients", () => {
        cy.checkOnTable({ length: 37, dataArr: ["Alana", "Ana", "Ana", "Anthony"] });
    });

    it("should registry new patient", () => {
        cy.contains("Cadastrar").click();

        cy.getInputByLabel("Nome do paciente").type(NEW_PATIENT.name);
        cy.getSelectByLabel("Prematuro?").select(NEW_PATIENT.isPremature ? "Sim" : "Não");
        cy.getInputByLabel("Data de nascimento").type(NEW_PATIENT.birthDateStr);
        cy.getInputByLabel("Idade gestacional").type(NEW_PATIENT.gestationalAge.toString());
        cy.getInputByLabel("Atipicidades").type(NEW_PATIENT.atypicalities);

        cy.intercept({ method: "POST", url: constants.API.PATIENT.DEFAULT_PATH }, (req) => {
            const patientCreated = req.body.data[0];

            expect(patientCreated.atipicidades).equal(NEW_PATIENT.atypicalities);
            expect(patientCreated.birthDate).not.equal(undefined);
            expect(patientCreated.gestationalAge).equal(NEW_PATIENT.gestationalAge);
            expect(patientCreated.isPremature).equals(NEW_PATIENT.isPremature);
            expect(patientCreated.name).equal(NEW_PATIENT.name);

            req.reply({});
        });

        cy.getByDataTestId("modal-manage").getByDataTestId("btn-submit").click();
        cy.contains("Paciente cadastrado com sucesso.");
    });

    it("should edit exist patient", () => {
        cy.getByDataTestId("table-body-row").contains("Alana").click();

        cy.contains("Editar").click();

        cy.getSelectByLabel("Prematuro?").select(NEW_PATIENT.isPremature ? "Sim" : "Não");
        cy.getInputByLabel("Idade gestacional").type(NEW_PATIENT.gestationalAge.toString());
        cy.getInputByLabel("Atipicidades").type(NEW_PATIENT.atypicalities);

        cy.intercept({ method: "PATCH", url: constants.API.PATIENT.PATCH_DELETE_PATH }, (req) => {
            const patientCreated = req.body.data;

            expect(patientCreated.atipicidades).equal(NEW_PATIENT.atypicalities);
            expect(patientCreated.gestationalAge).equal(NEW_PATIENT.gestationalAge);
            expect(patientCreated.isPremature).equals(NEW_PATIENT.isPremature);

            req.reply({});
        });

        cy.getByDataTestId("modal-manage").getByDataTestId("btn-submit").click();
        cy.contains("Paciente editado com sucesso.");
    });

    it("should delete exist patient", () => {
        cy.getByDataTestId("table-body-row").contains("Alana").click();

        cy.intercept({ method: "DELETE", url: constants.API.PATIENT.PATCH_DELETE_PATH }, (req) => {
            const urlSplited = req.url.split("/");
            const idToDelete = urlSplited[urlSplited.length - 1];
            expect(idToDelete).equal(ALANA_ID);
            req.reply({});
        });

        cy.contains("Deletar").click();

        //TODO: Deve aparecer um modal de confirmação.
        cy.contains("Paciente deletado.");
    });
});
