//Class employee
class Employee {
    constructor(id, first_name, last_name, role_id, manager_id){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this. role_id = role_id;
        this.manager_id = manager_id;
    }

    getId(){
        let id = this.id;
        return id;
    }

    getFirstName(){
        let first_name = this.first_name;
        return first_name;
    }

    getLastName(){
        let last_name = this.last_name;
        return last_name;
    }

    getRole(){
        let roleId = this.role_id;
        return roleId;
    }

    getManagerId(){
        let managerId = this.manager_id;
        return managerId;
    }
}

module.export = Employee;