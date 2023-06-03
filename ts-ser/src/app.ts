import { jsonProperty, jsonIgnore, Serializable } from "ts-serializable"
import "reflect-metadata"
import { square } from './m.js'
import { MaxLength, MinDate, MaxDate } from "class-validator";
import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
  } from 'class-validator';

const num: number = 10;
console.log(num ** 2);

console.log('square=', square);
// console.log(square(3));


console.log('app.ts 2!');

class User extends Serializable {
 
//     // @jsonProperty parrameters is accepted types for json
//     // properties, if property in json will not by found or
//     // will have invalid type, then will return default value
    @jsonProperty(Number, null)
    public id: number | null = null; // default value necessarily
  
    @jsonProperty(String)
    public firstName: string = ''; // default value necessarily
  
    @jsonProperty(String)
    public familyName: string = ''; // default value necessarily
  
    @jsonProperty(String, void 0)
    public lastName?: string = void 0; // default value necessarily
    
    @jsonProperty(Date)
    public birthdate: Date = new Date(); // default value necessarily
    
    @jsonProperty([String])
    public tags: string[] = []; // default value necessarily
    
//     // @jsonProperty(OtherClassConstructor, null)
//     // public other: OtherClassConstructor | null = null; // default value necessarily
    
    public getFullName(): string {
        return [
            this.firstName,
            this.familyName,
            this.lastName
        ].join(' ');
    }
 
    public getAge(): number {
        return new Date().getFullYear() - this.birthdate.getFullYear();
    }
}

// export const a = 1;

// exports

function my(target: any, key: string, descriptor: PropertyDescriptor) {
    // console.log({target, key, descriptor});
    descriptor.value = () => {
        console.log('haha, i changed it');
    }
}
class A {
    @my
    method() {
        console.log('method in class A')
    }
}

// console.log('before class A');
// new A().method();

/**
* Without Serializable
*/
// const user: object = JSON.parse(json);
// user.getFullName();
// // runtime exception: Uncaught TypeError: user.getFullName is not a function
// user.getAge();
// // runtime exception: Uncaught TypeError: user.getAge is not a function

const json = {
    id: 5,
    firstName: 'Alex',
    familyName: 'Petrov'
}
/**
* With Serializable
*/
const user: User = new User().fromJSON(json);
console.log(user.getFullName()); // work fine and return string
console.log(user.getAge()); // work fine and return number

class User2 extends Serializable {
 
    @jsonProperty(String)
    public firstName: string = ''; // default value necessarily
  
    @jsonProperty(String)
    public familyName: string = ''; // default value necessarily
 
    @jsonIgnore()
    public isExpanded: boolean  = false;
 
}

const user2 = new User2();
user2.isExpanded = true;
console.log(JSON.stringify(user2));

class UserProfile extends Serializable {
    @MaxLength(8, {message: 'Max len =8'})
    @jsonProperty(String)
    public firstName: string = '';

    @MinDate(new Date(1971), {message: 'Минимальная дата - 1971 год'})
    @MaxDate(new Date())
    @jsonProperty(Date)
    public birthdate: Date = new Date()
}

const profile = new UserProfile().fromJSON({
    firstName: 'Alex',
    birthdate: new Date(1970)
})
console.log(profile); // work fine and return string

validate(profile).then(errors => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
    } else {
      console.log('validation succeed');
    }
});

export class Post {
    @Length(10, 20)
    title: string;
  
    @Contains('hello')
    text: string;
  
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;
  
    @IsEmail()
    email: string;
  
    @IsFQDN()
    site: string;
  
    @IsDate()
    createDate: Date;
  }
  
  let post = new Post();
  post.title = 'Hello2222222222'; // should not pass
  post.text = 'this is a great post about hell world'; // should not pass
  post.rating = 11; // should not pass
  post.email = 'google.com'; // should not pass
  post.site = 'googlecom'; // should not pass
  
  validate(post).then(errors => {
    // errors is an array of validation errors
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
    } else {
      console.log('validation succeed');
    }
  });
  
  validateOrReject(post).catch(errors => {
    console.log('Promise rejected (validation failed). Errors: ', errors);
  });
