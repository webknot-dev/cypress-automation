const value = "test";

switch (value) {
    case "test1":
        require('./ex201dz.cy.js');
        break;
    case "test2":
        require('./ex201im.cy.js');
        break;
    case "test3":
        require('./ex201reim.cy.js');
        break;
    case "test4":
        require('./ex202adz.cy.js');
        break;
    case "test5":
        require('./ex202aidzncc.cy.js');
        break;
    case "test6":
        require('./ex202aidznccre.cy.js');
        break;
    case "test7":
        require('./ex202apwdz.cy.js');
        break;
    case "test8":
        require('./ex202argdzncc.cy.js');
        break;
    case "test9":
        require('./ex202atgedz.cy.js');
        break;
    case "test10":
        require('./ex202bpd.cy.js');
        break;
    case "test11":
        require('./ex203alpf.cy.js');
        break;
    case "test12":
        require('./ex203detf.cy.js');
        break;
    case "test13":
        require('./ex203dsd.cy.js');
        break;
    default:
        describe("NO MATCHING TEST CASE", () => {
            it("NO MATCHING TEST CASE", () => {
                cy.log("NO MATCHING TEST CASE");
            });
        });
}