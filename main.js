let Title = document.querySelector(".input .the_title .Title");
let Price = document.querySelector(".input .the_price .Price");
let taxses = document.querySelector(".input .the_price .taxses");
let Ads = document.querySelector(".input .the_price .Ads");
let Discount = document.querySelector(".input .the_price .Discount");
let total_bacground = document.querySelector(".input .the_price .the_total");
let the_total = document.querySelector(".input .the_price .the_total .Total_number");
let count = document.querySelector(".input .the_count .count");
let category = document.querySelector(".input .the_category .category");
let Creat = document.querySelector(".input .the_creat .Creat");
let update = document.querySelector(".input .the_creat .update");
let table = document.querySelector(".output .table .thetable .tbody");
let the_delet = document.querySelector(".output .the_delet .Delet ");



let tmp;

//get total

function Get_total(){
the_total.innerHTML = '';

if(Price.value != '')
{

    let resulte  = (+Price.value + +taxses.value + +Ads.value ) - +Discount.value;
    the_total.innerHTML = resulte;
    total_bacground.classList.add("green");

}
}
Get_total();
/*============================================================
==========================================================*/


//creat product

let data=[];

if(localStorage.products != null)
{
    data=JSON.parse(localStorage.products);
}

Creat.onclick = function()
{
    let product_one = {
     the_Title : Title.value,
     Price : Price.value,
     taxses : taxses.value,
     Ads : Ads.value,
     Discount : Discount.value,
     the_total : the_total.innerHTML,
     count : count.value,
     category : category.value,
    }


    //count
    if(product_one.count > 1)
    {
        for(let i=0;i<product_one.count;i++)
        {
            data.push(product_one);

        }
    }else
    {
        data.push(product_one);

    }

    //save local storeg
    localStorage.setItem("products" , JSON.stringify(data));
    clearinputs();
    readData();
}


//clear inputs
 function clearinputs()
{
    Title.value ='';
     Price.value ='';
    taxses.value ='';
    Ads.value ='';
    Discount.value ='';
    the_total.innerHTML ='';
    count.value ='';
    category.value ='';
}

//read
function readData()
{
    table.innerHTML = '';
    data.forEach((element,index) => {
       let newTalbel = `
    <tr>
     <th>${index}</th>
     <th>${element.the_Title}</th>
     <th>${element.Price}</th>
     <th>${element.taxses}</th>
     <th>${element.Ads}</th>
     <th>${element.Discount}</th>
     <th>${element.the_total}</th>
     <th>${element.category}</th>
     <th><button onclick=" Update(${index})" class="UPDATE">update</button></th>
     <th><button onclick=" Delet(${index})" class="DELET">delet</button></th>   
    </tr>

       

       ` 
       table.innerHTML += newTalbel;

    });

}
readData();




//delet
function Delet(e)
{
    data.splice(e,1);
    localStorage.products = JSON.stringify(data);
    readData();

}

//update
function Update(e)
{
Title.value = data[e].the_Title;
Price.value = data[e].Price;
taxses.value = data[e].taxses;
Discount.value = data[e].Discount;
Ads.value = data[e].Ads;
category.value = data[e].category;
Get_total();
count.style.display = 'none';
Creat.style.display = 'none';
update.style.display = 'block';
tmp=e;
}

update.onclick = function(){
   data[tmp].the_Title = Title.value;
   data[tmp].Price = Price.value; 
   data[tmp].taxses = taxses.value; 
   data[tmp].Ads = Ads.value; 
   data[tmp].Discount = Discount.value; 
   data[tmp].category = category.value;
   data[tmp].the_total = the_total.innerHTML;
   readData();
   clearinputs();   
    count.style.display = 'block';
    Creat.style.display = 'block';
    update.style.display = 'none';
 


}

//search

    let serch = document.querySelector(".input .the_search .Search");
    let serch_by_title = document.querySelector(".input .secrching_type .Search_by_Title");
    let serch_by_category = document.querySelector(".input .secrching_type .Search_by_Category");
    let serchmood;

  function  GivId(id){
if(id === 'Search_by_Title')
{
    serchmood = 'title';
    serch.placeholder = 'Serching_By_Title';

}else{
    serchmood = 'category';
    serch.placeholder = 'Serching_By_category';

}
serch.focus();
readData();
  }

  function getSerch(Doc)
  {
    table.innerHTML = '';
    if(serchmood === 'title')
    {
        data.forEach((element,index) => {
            if(element.the_Title.toLowerCase().includes(Doc)){
       let tabletwo =      `
    
    <tr>
     <th>${index}</th>
     <th>${element.the_Title}</th>
     <th>${element.Price}</th>
     <th>${element.taxses}</th>
     <th>${element.Ads}</th>
     <th>${element.Discount}</th>
     <th>${element.the_total}</th>
     <th>${element.category}</th>
     <th><button onclick=" Update(${index})" class="UPDATE">update</button></th>
     <th><button onclick=" Delet(${index})" class="DELET">delet</button></th>   
    </tr>` 
    table.innerHTML +=tabletwo;

            }

        });
    }
    else{


        data.forEach((element,index) => {
            if(element.category.toLowerCase().includes(Doc)){
       let    tabletwo = `
    <tr>
     <th>${index}</th>
     <th>${element.the_Title}</th>
     <th>${element.Price}</th>
     <th>${element.taxses}</th>
     <th>${element.Ads}</th>
     <th>${element.Discount}</th>
     <th>${element.the_total}</th>
     <th>${element.category}</th>
     <th><button onclick=" Update(${index})" class="UPDATE">update</button></th>
     <th><button onclick=" Delet(${index})" class="DELET">delet</button></th>   
    </tr> ` 
    table.innerHTML +=tabletwo;

            }

        });


    }
}




//clean data
let Deletbtn = document.querySelector(".output .the_delet .Delet");
Deletbtn.addEventListener('click',()=>{
let newdata = [];
data = newdata;
localStorage.products =JSON.stringify(newdata);
readData();

})