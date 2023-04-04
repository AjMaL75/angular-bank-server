//export asa object
const jwt=require("jsonwebtoken")
const db=require('./db')

userDetails = {
  1000: { username: "anu", accno: 1000, password: "abc123", balance: 0, transaction: [] },
  1001: { username: "arif", accno: 1001, password: "abc123", balance: 0, transaction: [] },
  1002: { username: "anoop", accno: 1002, password: "abc123", balance: 0, transaction: [], },
  1003: { username: "sanu", accno: 1003, password: "abc123", balance: 0, transaction: [] },
  1004: { username: "sujith", accno: 1004, password: "abc123", balance: 0, transaction: [] }

}
register = (accno, uname, pass) => {
                              //store the resolved output in a variable user
  return db.User.findOne({accno}).then(user=>{
    //
    if(user)
    {
      return {
        status: false,
        message: "user already exist",
        statusCode: 404
      }
    }
    else
    {
         newUser=new db.User({
          username:uname,accno,password:pass,balance:0,transaction:[]
        })
        newUser.save()
        return {
          status: true,
          message: "registered successfully",
          statusCode: 200
        }

    }
  })
  


  
}
login = (accno, pass) => {
 return db.User.findOne({accno,password:pass}).then(user=>{
    if(user)
    {
     
          currentUser=user.username
          currentAccountno=accno
          const token=jwt.sign({accno},"tokenkey123")
          return {
        status: true,
        message: "login successfully",
        currentUser,
        currentAccountno,
        statusCode: 200,
        token
      }
     }
     else
     {
        return {
          status: false,
          message: "incorrect password or not registered",
           statusCode: 404
          }
        }
      
    
   
  })
  // if (accno in userDetails) {
  //   if (pass == userDetails[accno]['password']) {
  //     currentUser = userDetails[accno]["username"]
  //     currentAccountno = accno

  //     //token generate
  //       const token=jwt.sign({accno},"superkey123")

  //     return {
  //       status: true,
  //       message: "login successfully",
  //       currentUser,
  //       currentAccountno,
  //       statusCode: 200,
  //       token
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       message: "incorrect password",
  //       statusCode: 400
  //     }
  //   }
  // }
  // return {
  //   status: false,
  //   message: "not registered",
  //   statusCode: 400
  // }
}
deposit = (accno, passw, amont) => {
  var amnt = parseInt(amont)
  return db.User.findOne({accno,password:passw}).then(user=>{
    if(user)
    {
        user.balance+=amnt
        user.transaction.push({
          type: "Credit",
        amount: amnt
        })
        user.save()
        return {
          status: true,
          message: `your acc has been credited with amount ${amnt} and available balance is ${user.balance}`,
          statusCode: 200
        }
    }
    else
    {
      return {
        status: false,
        message: "incorrect password or accno",
        statusCode: 400
      }
    }
  })
  // if (accno in userDetails) {
  //   if (passw == userDetails[accno]['password']) {
  //     userDetails[accno]['balance'] += amnt
  //     //add transaction deposit data
  //     userDetails[accno]['transaction'].push({
  //       type: "Credit",
  //       amount: amnt
  //     })


  //     return {
  //       status: true,
  //       message: `your acc has been credited with amount ${amnt} and available balance is ${userDetails[accno]["balance"]}`,
  //       statusCode: 200
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       message: "incorrect password",
  //       statusCode: 400
  //     }
  //   }
  // }
  // else {
  //   return {
  //     status: false,
  //     message: "not registered",
  //     statusCode: 400
  //   }
  // }

}
withdrawl = (accno, pass, amont) => {
  var amnt = parseInt(amont)
  return db.User.findOne({accno,password:pass}).then(user=>{
    if(user)
    {
      if(amnt<=user.balance)
      {
      user.balance-=amnt
      user.transaction.push({
        type: "Debit",
          amount: amnt
      })
      user.save()
      return{
        status: true,
          message: `your acc has been debited with amount ${amnt} and available balance is ${user.balance}`,
            statusCode: 200
      }
    }
    else
    {
      return {
              status: false,
                message: "insufficient balance",
               statusCode: 404
             }
    }

    }
    else
    {
      return {
        status: false,
        message: "incorrect password or accno",
        statusCode: 404
      }
    }
  })

  // if (accno in userDetails) {
  //   if (pass == userDetails[accno]['password']) {
  //     if (amnt <= userDetails[accno]['balance']) {
  //       userDetails[accno]['balance'] -= amnt
  //       //add transaction withdraw data
  //       userDetails[accno]['transaction'].push({
  //         type: "Debit",
  //         amount: amnt
  //       })
  //       // console.log(this.userDetails);
  //       // this.saveDetails()


  //       return{
  //         status: true,
  //           message: `your acc has been debited with amount ${amnt} and available balance is ${userDetails[accno]["balance"]}`,
  //             statusCode: 200
  //       }


  //     }
  //     else {
  //       return {
  //         status: false,
  //         message: "insufficient balance",
  //         statusCode: 404
  //       }
  //     }
  //   }
  //   else {
  //     return {
  //       status: false,
  //       message: "incorrect password",
  //       statusCode: 400
  //     }
  //   }
  // }
  // else {
  //   return {
  //     status: false,
  //     message: "not registered",
  //     statusCode: 400
  //   }
  // }
}
getTransaction=(accno)=>
{
  return db.User.findOne({accno}).then(user=>{
    if(user)
    {
      return {
        status:true,
        transactions:user.transaction,
        statusCode:200
      }
    }
    else
    {
      return {
        status:false,
        message:"no transaction has done in this account",
        statusCode:404
      }
    }
  })
//   if(userDetails[accno].transaction!=0)
//   {
//   return {
//     status:true,
//     message:`Transaction history is ${userDetails[accno].transaction.map(n=>
//       `${n.type}:${n.amount}`
//     )}`,
//     statusCode:200
//   }
// }
// else{
//   return {
//     status:false,
//     message:"no transaction has done in this account",
//     statusCode:400
//   }
// }
  
  
  
}
deleteAcc=accno=>
{
  return db.User.deleteOne({accno}).then(user=>{
    if(user)
    {
      return {
        status:true,
        message:"account has deleted successfully",
        statusCode:200
      }
    }
    else
    {
      return {
        status:false,
        message:"cannot find account number",
        statusCode:400
      }
    }
  })
}
//export which files want to use in main
module.exports = {
  register, userDetails, login, deposit, withdrawl,getTransaction,deleteAcc
}