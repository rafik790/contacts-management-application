import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value){
            return null;
        }
        let password = control.value;
        if(password.length<5 || password.length>10){
            return {badpassword:true}
        }
        if(!password.match(new RegExp("[a-z]"))){
            return {badpassword:true}
        }

        if(!password.match(new RegExp("[A-Z]"))){
            return {badpassword:true}
        }
        
        if(!password.match(new RegExp("[0-9]"))){
            return {badpassword:true}
        }
        return null;
    }
}