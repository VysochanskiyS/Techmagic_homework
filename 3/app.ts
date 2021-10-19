interface IEl {
    userID:number,
    id:number,
    title:string,
    body:string
}
let block:HTMLElement = document.getElementById('block')
 function getData ():Promise<Response>{
   return fetch('https://jsonplaceholder.typicode.com/posts') ;
}

getData ().then((response)=>{
return response.json()})
.then((json:IEl[] )=>{
    json.forEach((el:IEl) => {
        block.innerHTML += `<div class='el'>${el.title} </div>`
    });
    })



// TASK 2

interface Iarray{
    id:number,
    name:string,
   [key:string]:number | string  

 }
 const array: Iarray[] = [
     {id:0, name:"Vasya" },
     {id:1, name:"Sergiy" },
     {id:2, name:"Galuna" },
     {id:3, name:"Ivanka" },
     {id:4, name:"Andriana" },
     {id:5, name:"Maks" },
 ]

 function updateObjectInArray<ObjectShape>(initialArray:Iarray[], keyToFind:string,keyValueToFind:string , patch:Iarray){
     const arr:Iarray[] = JSON.parse(JSON.stringify(initialArray));
    initialArray.map((el,index)=>{
       el[keyToFind] == keyValueToFind ?(el.id = patch.id, el.name = patch.name) :'';
})
console.log(initialArray)
    return initialArray;
 }
 let patch :Iarray = {
     name : 'Vysochanskiy',
     id:20
 }
console.log(updateObjectInArray <Iarray> (array,"name","Maks",patch))