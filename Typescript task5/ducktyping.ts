class Manager {
    makePlan() {
        console.log("Working on Project");
    }
}

class TeamLead {
    makePlan() {
        console.log("Make Design");
    }
}

interface Employee {
    makePlan(): void;
}

let manager: Employee = new Manager();
let teamlead: Employee = new TeamLead();

manager.makePlan(); 
teamlead.makePlan(); 
