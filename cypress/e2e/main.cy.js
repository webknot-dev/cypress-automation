// excise201import
// excise201releasefromdesignatedzone
// excise201importtoreexport
// excise202areleasegoodsfromdzintofreecirculation
// excise202aconsumptionofgoodswithindz
// excise202aentergoodsintoadesignatedzone
// ex202atransfergoodstoanotherdz-
// ex202atransfergoodsforexportfromadesignatedzone-
// ex202aimporttodesignatedzoneswherethereisnocustomscheck-
// copyofex202importtodesignatedzoneswherethereisnocustomscheck-
// ex202aproductionwithindesignatedzone-
// ex202bproducerdeclaration-
// ex203excisetaxdeductibledeclaration-
// ex203alocalpurchaseform-
// ex203ctransferofownershipwithindesignatedzones

const value = "ex203ctransferofOwnershipwithinDesignatedZones";

switch (value) {
    case "excise201releasefromdesignatedzone":
        require('./ex201dz.cy.js');
        break;
    case "excise201import":
        require('./ex201im.cy.js');
        break;
    case "excise201importtoreexport":
        require('./ex201reim.cy.js');
        break;
    case "excise202aconsumptionofgoodswithindz":
        require('./ex202adz.cy.js');
        break;
    case "ex202aimporttodesignatedzoneswherethereisnocustomscheck":
        require('./ex202aidzncc.cy.js');
        break;
    case "copyofex202importtodesignatedzoneswherethereisnocustomscheck":
        require('./ex202aidznccre.cy.js');
        break;
    case "ex202aproductionwithindesignatedzone":
        require('./ex202apwdz.cy.js');
        break;
    case "excise202areleasegoodsfromdzintofreecirculation":
        require('./ex202argdzncc.cy.js');
        break;
    case "ex202atransfergoodsforexportfromadesignatedzone":
        require('./ex202atgedz.cy.js');
        break;
    case "ex202bproducerdeclaration":
        require('./ex202bpd.cy.js');
        break;
    case "ex203alocalpurchaseform":
        require('./ex203alpf.cy.js');
        break;
    case "ex203excisetaxdeductibledeclaration":
        require('./ex203detf.cy.js');
        break;
    case "test13":
        require('./ex203dsd.cy.js');
        break;
    case "excise202aentergoodsintoadesignatedzone":
        require('./EX202A_EGDZ.cy.js');
        break;
    case "ex202atransfergoodstoanotherdz":
        require('./EX202A_TGADZ.cy.js');
        break;
    case "ex203blostndeclaration":
        require('./EX203B_LD.cy.js');
        break;
    case "ex203ctransferofOwnershipwithinDesignatedZones":
        require('./EX203C_TransferOf_DZ.cy.js');
        break;
    case "ex203fregisteredSellertoNonRegisteredPurchaser":
        require('./Ex203F_TO.cy.js');
        break;

    default:
        describe("NO MATCHING TEST CASE", () => {
            it("NO MATCHING TEST CASE", () => {
                cy.log("NO MATCHING TEST CASE");
            });
        });
}