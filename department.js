//Clas department
class Department {
    constructor(department_id, department_name){
        this.department_id = department_id;
        this.department_name = department_name;
    }

    getID(){
        let departmentID = this.department_id;
        return departmentID;
    }

    getDName(){
        let departmentName = this.department_name;
        return departmentName;
    }
}
module.export = Department;