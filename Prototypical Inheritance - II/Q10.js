// Base class: User
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getDetails() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}

// Student class inherits from User
class Student extends User {
    constructor(name, email, studentId) {
        super(name, email); // Calls the User constructor
        this.studentId = studentId;
    }

    enroll() {
        console.log(`Student ${this.name} has enrolled.`);
    }
}

// Instructor class inherits from User
class Instructor extends User {
    constructor(name, email, instructorId) {
        super(name, email); // Calls the User constructor
        this.instructorId = instructorId;
    }

    assignGrade() {
        console.log(`Instructor ${this.name} assigned a grade.`);
    }
}

// Demonstration
const student1 = new Student("John Doe", "john@example.com", "S123");
const instructor1 = new Instructor("Jane Smith", "jane@example.com", "I456");

// Call methods
student1.getDetails();
student1.enroll();

instructor1.getDetails();
instructor1.assignGrade();
