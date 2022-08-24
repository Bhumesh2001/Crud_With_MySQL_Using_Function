const mysql = require('mysql')
const input = require('readline-sync')
const fs = require('fs')
var con = mysql.createConnection({  
    host:"localhost",
    user:"root",
    password:"1",
    database:"bhumesh"
})
let read1 = fs.readFileSync('./database/id.json','utf-8')
    let parse = JSON.parse(read1)
    var us_id = [];
    for(let id_user of parse){
        us_id.push(id_user.id)
    }
function create(con){
    let x = input.questionInt("Enter your Id:- ")
    if(!us_id.includes(x)){
        us_id.push(x)
        let y = input.question("Enter your name:- ")
        let z = input.question("Enter your city name:- ")
        let a = input.question("Enter your contry name:- ")
        let data = [[x,y,z,a]]
        con.query("insert into vishal(id,name,city,contry) VALUES ?",[data],(error)=>{
            if(error) throw error;
            console.log('data has been sent....');
            crud_on_database(con)
        })
    }else{
        console.log('This id already exist');
        crud_on_database(con)
    }
}
function read(con){
    con.query("select * from vishal",(err,result)=>{
        var Id = [];
        if(err) throw err;
        const id = input.questionInt("Enter your id:- ");
        for(let ele of result){
            Id.push(ele.id)
        }
        if(Id.includes(id)){
            result.forEach(element => {
                if(id == element.id){
                    console.log(element);
                }
            });
        }else{
            console.log("id does not exist");
        }
        crud_on_database(con)
    })
}
function update(con){
    const user_id = input.questionInt("Enter your id:- ");
    if(us_id.includes(user_id)){
        console.log("\n1.Id\n2.name\n3.city\n4.contry\n");
        const choice1 = input.questionInt("Enter  your choice:- ")
        if(choice1 == 1){
            const ID = input.questionInt("Enter your new Id:- ");
            con.query(`update vishal set id='${ID}' where id='${user_id}'`,(err)=>{
                if(err) throw err;
                console.log('Your id has been updated  successfully....');
                crud_on_database(con)
            })
        }else if(choice1 == 2){
            const name = input.question("Enter your new name:- ")
            con.query(`update vishal set name='${name}' where id='${user_id}'`,(err)=>{
                if(err) throw err;
                console.log('Your name has been updated  successfully....');
                crud_on_database(con)
            })
        }else if(choice1 == 3){
            const City = input.question("Enter your new city name:- ");
            con.query(`update vishal set city='${City}' where id='${user_id}'`,(err)=>{
                if(err) throw err;
                console.log('Your city has been updated  successfully....');
                crud_on_database(con)
            })
        }else if(choice1 == 4){
            const Contry = input.question("Enter your new contry name:- ")
            con.query(`update vishal set contry='${Contry}' where id='${user_id}'`,(err)=>{
                if(err) throw err;
                console.log('Your contry has been updated  successfully....');
                crud_on_database(con)
            })
        }
    }else{
        console.log('id does not exist');
        crud_on_database(con)
    }
}
function delete1(con){
    const U_id = input.questionInt("Enter your ID:- ");
    if(us_id.includes(U_id)){
        const confirm = input.question("Are your sure to delete your account ? press y or n :- ");
        if(confirm == "y"){
            con.query(`delete from vishal where id='${U_id}'`,(err)=>{
                if(err) throw err;
                console.log('Your account has been deleted  successfully....');
                crud_on_database(con)
            })
        }else if(confirm == "n"){
            crud_on_database(con)
        }
    }else{
        console.log('id does not exist');
        crud_on_database(con)
    }
}
function crud_on_database(connection){
    connection.query("select id from vishal",(err,res)=>{
        if(err) throw err;
        fs.writeFileSync('./database/id.json',JSON.stringify(res,null,4))
        run_call(connection)
    })
    function run_call(connection){
        console.log('\npress 1 for create\npress 2 for read\npress 3 for update\npress 4 for delete\npress 5 for exit\n')
        const choice = input.questionInt("Enter your choice:- ");
        if(choice == 1){
            create(connection)
        }else if(choice == 2){
            read(connection)
        }else if(choice == 3){
            update(connection)
        }else if(choice == 4){
            delete1(connection)
        }else if(choice == 5){
            con.end((err)=>{
                if(err) throw err;
                console.log("🖕🖕");
            })
        }
    }
}
crud_on_database(con)