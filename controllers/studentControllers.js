import { mysqlpool } from "../config/db.js";

export const getstudents = async (req,res) => {
    try {
        const [data] = await mysqlpool.query('SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success:false,
                msg:'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            msg:"All Student Records ",
            length:data.length,
            data,
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Error in get All Student Api",
            error
        })
        
        
    }

};

//// get by ig

export const getstudentById = async(req,res) =>{
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(400).send({
                success:false,
                msg:"Error in Get Student by id API"
            })
        }
        const [data] = await mysqlpool.query('SELECT * FROM students WHERE id=? ',[studentId])
        if(!data){
            return res.status(400).send({
                success:false,
                msg:"no data found"
            })  

        }
        res.status(200).send({
            success:true,
            studentDetails: data,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Error in get All Student Api",
            error
        })
        
    }


}

// create table

// export const createStudent = async (req,res) => {

//     try {
//         const {id,name,medium,std} = req.body  //  , roll_no , fees , medium
//         if(!id || !name || !medium || !std){    //  || !roll_no || !fees  || !medium
//             return res.status(500).send({
//                 success:false,
//                 msg:'Please Provide All Fields'
//             })

//         }


//         const [data] = await mysqlpool.query(`INSERT INTO students (id ,name , medium , std) VALUES (?,?,?,?)`)
//         if(!data){
//             return res.status(404).send({
//                 success:false,
//                 msg:"Error In INSERT Querys"
//             })
//         }
//         res.status(200).send({
//             success:true,
//             msg:'New Student Records Created',
//         })



        
//     } catch (error) {

//         console.log(error);
//         res.status(500).send({
//             success:false,
//             msg:"Error in get All Student Api",
//             error
//         })
        
//     }



// }

// create data base

export const createStudentData = async(req, res) => {

    try {

        const { id,name , medium , std} = req.body;
        if(!id || !name || !medium || !std){
            return res.status(500).send({
                success:false,
                msg:'Please Provide All Fields'
            })
        }

        const data = await mysqlpool.query(`INSERT INTO students (id,name,medium,std) VALUES (?,?,?,?)`,[id,name,medium,std])
        if(!data){
            return res.status(404).send({
                success:false,
                msg:"error in Insert query",

            })
        }

        res.status(201).send({
            success:true,
            msg:"created Data Successfull"
        })



        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Error in get All Student Api",
            error
        })
        
    }

}


export const updateDetails = async(req,res) => {

    try {

        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success:false,
                msg:'Invalid id or Provide id'
            })
        }

        const {name , medium , std} = req.body;
        const data  = await mysqlpool.query(`UPDATE students SET name = ?, medium = ? , std = ? WHERE id = ?`,[name , medium , std,studentId]);
        if(!data){
            return res.status(500).send({
                success:false,
                msg:'Error in update data'
            });

        }
        res.status(200).send({
            success:true,
            msg:"student details updated"
        })



        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Error in get All Student Api",
            error
        })
        
    }

}

export const deleteData =  async(req,res) => {
    try {

        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success:false,
                msg:'Plese provide valid id'
            })
        }

        await mysqlpool.query('DELETE FROM students WHERE id=?',[studentId])
        res.status(200).send({
            success:true,
            msg:"Student Deleted Successfully"

        })





        
    } catch (error) {

        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Error in get All Student Api",
            error
        })
        
    }

}

