//Class role
class Role {
    constructor(role_id, title, salary, department_id){
        this.role_id = role_id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    getRoleId(){
        let roleId = this.role_id;
        return roleId;
    }

    getTitle(){
        let title = this.title;
        return title;
    }

    getSalary(){
        let salary = this.salary;
        return salary;
    }

    getDepartId(){
        let department_id = this.department_id;
        return department_id;
    }
}
module.export = Role;