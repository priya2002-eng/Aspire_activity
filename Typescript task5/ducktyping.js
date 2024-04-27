var Manager = /** @class */ (function () {
    function Manager() {
    }
    Manager.prototype.makePlan = function () {
        console.log("Working on Project");
    };
    return Manager;
}());
var TeamLead = /** @class */ (function () {
    function TeamLead() {
    }
    TeamLead.prototype.makePlan = function () {
        console.log("Make Design");
    };
    return TeamLead;
}());
var manager = new Manager();
var teamlead = new TeamLead();
manager.makePlan();
teamlead.makePlan();
