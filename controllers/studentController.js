const data = {
    students: require('../models/students.json'),
   setStudents: function (data)  {
        this.students =data
    }
}


const getAllStudents = (req, res) => {
    res.json(data.students);
};

const createNewStudent = (req, res) => {
    const newStudent = {
       id: data.students[data.students.length -1].id + 1 || 1,
       firstname: req.body.firstname ,
       lastname: req.body.lastname,
    };

    if(!newStudent.firstname || !newStudent.lastname) {
        return res
        .status(400)
        .json({message: "First name and last name are required"})
    }

    data.setStudents([...data.students, newStudent])

    res.status(201).json(data.students);
}

const updateStudent = (req, res) => {
    const student= data.students.find(
          (emp) => emp.id === parseInt(req.body.id)
    )

    if (!student){
          return res
          .status(400)
          .json({message: `student Id ${req.body.id} not found`})
    }

    if (req.body.firstname) student.firstname = req.body.firstname;// if we found an id
    if (req.body.firstname) student.lastname = req.body.lastname;

    const filteredArray = data.students.filter(
          (std) => std.id !== parseInt(req.body.id)
    )

    const unsortedArray = [...filteredArray, student];

    data.setStudents(
          unsortedArray.sort((a,b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    )

res.json(data.students);
};


const deleteStudent = (req, res) => {
    const student = data.students.find(
        (stud) => stud.id === parseInt(req.body.id)
      );
      if (!student) {
        return res
          .status(400)
          .json({ message: `Employee ID ${req.body.id} not found` });
      }
      const filteredStudentsArr = data.students.filter(
        (emp) => emp.id !== parseInt(req.body.id)
      );

      data.setStudents([...filteredStudentsArr]);
      res.json(data.students);
}


const getStudent = (req, res) => {
    const student = data.students.find(
        (std) => std.id === parseInt(req.params.id)
      );
      if (!student) {
        return res
          .status(400)
          .json({ message: `Employee ID ${req.params.id} not found` });
      }
      res.json(student);
}

module.exports = { createNewStudent, updateStudent, deleteStudent, getAllStudents, getStudent}


