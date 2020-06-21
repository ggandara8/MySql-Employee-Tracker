//Class employee
class Employee {
    constructor(first_name, last_name){
        this.first_name = first_name;
        this.last_name = last_name;
    }

    getFirstName(){
        let first_name = this.first_name;
        return first_name;
    }

    getLastName(){
        let last_name = this.last_name;
        return last_name;
    }
}

module.export = Employee;