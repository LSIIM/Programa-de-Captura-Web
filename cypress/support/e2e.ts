import "@cypress/code-coverage/support";
import "./commands.utils";

beforeEach(() => {
    const ALL_PATIENTS = "/v1/patient";
    const ALL_PATIENTS_PAGINATED = "/v1/patient?*";

    const ALL_RECORDINGS_PAGINATED = "/v1/recording?*";
    const SPECIFIC_RECORDING = "/v1/recording/*";

    const ALL_PROJECTS = "/v1/project";

    cy.intercept({ method: "GET", url: ALL_PATIENTS }, { fixture: "patients.json" });
    cy.intercept({ method: "GET", url: ALL_PATIENTS_PAGINATED }, { fixture: "patients.json" });

    cy.intercept({ method: "GET", url: ALL_RECORDINGS_PAGINATED }, { fixture: "recordings.json" });
    cy.intercept({ method: "GET", url: SPECIFIC_RECORDING }, { fixture: "oneRecording.json" });

    cy.intercept({ method: "GET", url: ALL_PROJECTS }, { fixture: "projects.json" });
});
