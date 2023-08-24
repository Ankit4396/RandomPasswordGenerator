export class PasswordService{

    static getRandomAlpha(){
      return String.fromCharCode(Math.floor( Math.random()*26) + 97) 
    
    }

    static getRandomNum(){
        return String.fromCharCode(Math.floor( Math.random()*10) + 48) 
    }

    static getRandomSpecialChar(){
        let specialChar = `!@#$%^&*(){}[]/<>`
        return specialChar[Math.floor(Math.random()*specialChar.length)];
    }

    static getPasswordObj(state){ 
        let passwordObj = [];
        for(let key of Object.keys(state)){
            if(typeof state[key] === 'boolean' && state[key]){
                passwordObj = {
                    ...passwordObj,
                    [key] : state[key]
                }
            }
        }
        return passwordObj; 
    }


    static generatePassword(passwordObj, passwordLength){
        let thePassword = '';
        for(let i = 0 ; i<Number(passwordLength); i+= Object.keys(passwordObj).length){
             if(passwordObj.alphabet) thePassword += `${this.getRandomAlpha()}`;
             if(passwordObj.specialChar) thePassword += `${this.getRandomSpecialChar()}`;
             if(passwordObj.number) thePassword += `${this.getRandomNum()}`;
             
        }
        return thePassword.substring(0,Number(passwordLength));
    }
}