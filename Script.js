	
	
	document.addEventListener("DOMContentLoaded",function(){
	loadData("products.xml");
});


	let searchForm = document.getElementById("srch1");
	let searchInput = document.getElementById("srch2");
	let searchErr = document.getElementById("err");
	let searchValid = document.getElementById("tick")
	
	searchForm.addEventListener("submit",function(e){
    e.preventDefault();

		let query = searchInput.value.toLowerCase().trim();
		 let pattern = /^[0-9]{3}-[0-9]{2}$/;
		 
		 searchErr.textContent = "";
		 searchValid.textContent = "";
		
     let rows = document.querySelectorAll("#tab1 tbody tr");

     // shows all products if search bar is empty
		if (query === ""){
			for(let i = 0; i < rows.length;i++){
        rows[i].style.display = "";
      }
      return;
		}
		 if(!pattern.test(query)){
			searchErr.textContent = "This is invalis search code, please try again";
      return;
		}
    let found = false;

    //this one searches for the product if code is correct

    for(let i = 0;i<rows.length;i++){
      let code = rows[i].cells[0].textContent.toLowerCase().trim();

      if(code === query){
        rows[i].style.display = "";
        found = true;
      }else{
        rows[i].style.display = "none";
      }
    }
    if(found){
      searchValid.textContent ="We sell your desired item!"
    }else{
      searchErr.textContent = "We do not have your product";
    }

		
	});
	   
           

           
	async function loadData(url) {
  const table = document.querySelector("#tab1 tbody");
  
  try {
    const response = await fetch(url);

   
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
	
	const text = await response.text();

    const xmlData = new DOMParser().parseFromString(text, "application/xml");


    const products = xmlData.getElementsByTagName("product");

	if(xmlData.querySelector("parsererror")){
		throw new Error("invalid XML");
	}
	
	
	console.log("Products found:", products.length);
	table.innerHTML = "";
	
   
    for (let i = 0; i < products.length; i++) {
		const code = products[i].getElementsByTagName("code")[0].textContent.trim();
      const category   = products[i].getElementsByTagName("category")[0].textContent.trim();
      const productName  = products[i].getElementsByTagName("productName")[0].textContent.trim();
      const  description = products[i].getElementsByTagName("description")[0].textContent.trim();
      const quantity = products[i].getElementsByTagName("quantity")[0].textContent.trim();
      
      const price  = products[i].getElementsByTagName("price")[0].textContent.trim();

      addRow(table, [code, category, productName, description, quantity,"€" + price], "td");
    }
  } catch (error) {
   console.error("Error loading xml", error);
   table.innerHTML = "";
   const row = document.createElement("tr");
   const cell = document.createElement("td");
   cell.colSpan = 6;
   cell.textContent = "Sorry, but we ceannot load the products" + error.message;
   row.appendChild(cell);
   table.appendChild(row);
   
  }
}


function addRow(table, values, cellType) {
  const row = document.createElement("tr");

  for (const value of values) {
    const cell = document.createElement(cellType);
    cell.textContent = value;
    row.appendChild(cell);
  }

  table.appendChild(row);
}
	



