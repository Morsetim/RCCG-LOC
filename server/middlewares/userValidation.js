import validator from 'validator';


class userValidator{

signUp(req, res, next){
  const {fullname, email, password} = req.body;

  const checkers = {};

  if(fullname == undefined || email == undefined || password == undefined){
    return res.status(400).json({message:'All/Some fields are empty'});
  }
  if(!validator.isEmpty(password)){
    if(!validator.isLength(password, {min:6})){
      checkers.password = 'Password too short';
    }
  }else{
    checkers.password = 'Password field is required';
  }
if(!validator.isEmpty(fullname)){
  for(let i = 0; i<fullname.length; i++){
    if(validator.toInt(fullname[i])){
      checkers.fullname = 'Field must be an Alphabet';
    }
  }
}else{checkers.fullname = 'Field must not be empty';}
if(!validator.isEmpty(email)){
  if(!validator.isEmail(email)){
    checkers.email = 'Field must be an Email';
}
}else{checkers.email = 'Email field is empty';}
  if(Object.keys(checkers).length !== 0){
     res.status(400).json({checkers});
  }
  next();
}
signIn(req, res, next){
const {email, password} = req.body;
const checkers2 = {};
if(email == undefined || password == undefined){
  res.status(401)
    .json({
      status: 'Failed',
      message: 'All or Some fields are Empty'
    });
}
if(!validator.isEmpty(email)){
  if(!validator.isEmail(email)){
    checkers2.email = 'Field must be an Email';
  }
}else{checkers2.email = 'Email field cannot be Empty';}
if(!validator.isEmpty(password)){
  if(!validator.isLength(password, {min:6})){
    checkers2.password = 'Password must be  atleast eight characters';
  }
}else{checkers2.password = 'Password field is Empty';}
if(Object.keys(checkers2).length !== 0){
  res.status(400).json({checkers2});
}
next();
}
}

export default new userValidator();




