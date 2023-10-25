import  user1 from "../Models/students.schema.js";


export const createStudent=async(req,res)=>{
    try {
     const student = new user1(req.body);
    const student1=await student.save();

     res.status(200).json(student1);

    } catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
   }
    
   }


export const createMentor=async(req,res)=>{
 try {
  const mentor = new user1(req.body);
 const mentor1=await mentor.save();
  res.status(200).json(mentor1);
 } catch (error) {
  console.error(error);

  res.status(500).send('Internal Server Error');
}
 
}



export const assignMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentNames } = req.body;

    if (!Array.isArray(studentNames)) {
      return res.status(400).json({ error: 'studentNames must be an array' });
    }

    const newStudents = [];
    let i = 0;

    while (i < studentNames.length) {
      const studentName = studentNames[i];

      const newStudent = new user1({ name: studentName });

      const savedStudent = await newStudent.save();
      newStudents.push(savedStudent);
      i++;
    }

    const mentor = await user1.findByIdAndUpdate(
      mentorId,
      { $push: { students: { $each: newStudents.map((student) => student._id) } } },
      { new: true }
    );

      res.json(mentor);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });

  }
};

export const getstudentid= async(req, res) => {
        try {
          const { studentId } = req.params;
          const { mentorName } = req.body;
      
           const student = await user1.findById(studentId);
      
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
          let mentor = await user1.findOne({ mentorName });
      
           if (!mentor) {
            mentor = await user1.create({ mentorName });
          }
      
          student.mentorName = mentor.mentorName;
          await student.save();
      
          res.json({ message: 'Mentor assigned successfully', student });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      export const getmentorname= async(req, res) => {
        try {
           const { mentorName } = req.params;
      
          const mentor = await user1.findOne({ mentorName });
      
          if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
          }
      
          const students = await user1.find({ mentorName });
      
          res.json({ mentor, students });
        } catch (error) {
          console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      export const getstudentdetails= async(req, res) => {
        try {
          const { studentId } = req.params;
      
            const student = await user1.findById(studentId);
      
           if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
      
          const previousMentor = await user1.findOne({ studentName: student.studentName, _id: { $ne: student._id } });
      
             res.json({ student, previousMentor });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      




