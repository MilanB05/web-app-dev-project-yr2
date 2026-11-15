	
	
	document.addEventListener("DOMContentLoaded",function(){
    // call laod data fucntion from xml file
	loadData("products.xml")
});


	let searchForm = document.getElementById("srch1")
	let searchInput = document.getElementById("srch2")
	let searchErr = document.getElementById("err")
	let searchValid = document.getElementById("tick")
	let ShowAllButton = document.getElementById("ShowAll") // gets show all btn from html

  // runs when user click show all
  ShowAllButton.addEventListener("click",function(){

    // gets all body rows from the table
    let rows = document.querySelectorAll("#tab1 tbody tr")

    //makes all products visible after searching for specific object(this was time consuming...)
    for(let i= 0 ; i < rows.length; i++){
      rows[i].style.display = ""
    }

    // this will clear search box
    searchInput.value = ""

    // now this will remove search meesages
    searchErr.textContent = ""
    searchValid.textContent = ""
  })
  
	searchForm.addEventListener("submit",function(e){
    e.preventDefault();

// checks if code follows the format inspired by slides
		let query = searchInput.value.toLowerCase().trim()
		 let pattern = /^[0-9]{3}-[0-9]{2}$/
		 
     // cleares previous messages
		 searchErr.textContent = ""
		 searchValid.textContent = ""
		
     // gets all product rows from the table
     let rows = document.querySelectorAll("#tab1 tbody tr")

     // chekcs if the user left the search box empty
		if (query === ""){
			searchErr.textContent = ("Please enter a valid code!!! eg: 101-01")
      return
      }
     
		// check if the entered code matches the pattern
		 if(!pattern.test(query)){
			searchErr.textContent = "This is invalid search code, please try again"
      return
		}

    let found = false

    //this one searches for the product if code is correct

    for(let i = 0;i<rows.length;i++){
      let code = rows[i].cells[0].textContent.toLowerCase().trim()

      if(code === query){
        rows[i].style.display = ""
        found = true
      }else{
        rows[i].style.display = "none"
      }
    }
    // checks if matching product is found
    if(found){
      searchValid.textContent ="We sell your desired item!"
    }else{
      searchErr.textContent = "We do not have your product"
    }

		
	});
	   
  // loading products from xml file    
	async function loadData(url) {
  const table = document.querySelector("#tab1 tbody")
  
  try {
    const response = await fetch(url)

   // signals error if the file can't be found
    if (!response.ok) {
      throw new Error("HTTP " + response.status)
    }
	// converts repsonse into text
	const text = await response.text()

    const xmlData = new DOMParser().parseFromString(text, "application/xml")

// gets all product elements from xml document
    const products = xmlData.getElementsByTagName("product")

    // checks if xml has parsing errrors
	if(xmlData.querySelector("parsererror")){
		throw new Error("invalid XML")
	}
	
	
	console.log("Products found:", products.length)
	table.innerHTML = ""
	
   
    for (let i = 0; i < products.length; i++) {
      // declaring constants/varibale and assigning them to xml equivalent values
		const code = products[i].getElementsByTagName("code")[0].textContent.trim()
      const category   = products[i].getElementsByTagName("category")[0].textContent.trim()
      const productName  = products[i].getElementsByTagName("productName")[0].textContent.trim()
      const  description = products[i].getElementsByTagName("description")[0].textContent.trim()
      const quantity = products[i].getElementsByTagName("quantity")[0].textContent.trim()
      
      const price  = products[i].getElementsByTagName("price")[0].textContent.trim()

     const row =  addRow(table, [code, category, productName, description, quantity,"€" + price], "td")

      // this line checks if product is out of stock
      if(Number(quantity) === 0){
        row.classList.add("out-of-stock")
      }
    }
  } catch (error) {
    // disyplays the error
   console.error("Error loading xml", error)
   table.innerHTML = ""
   // creates new table row
   const row = document.createElement("tr")
   // creates a cell for the errror message
   const cell = document.createElement("td")
   // makes errror strech across all six table columns
   cell.colSpan = 6
   cell.textContent = "Sorry, but we ceannot load the products" + error.message
   row.appendChild(cell)
   table.appendChild(row)
   
  }
}

// fucntion for creating table rows
function addRow(table, values, cellType) {
  const row = document.createElement("tr")

  for (const value of values) {
    const cell = document.createElement(cellType)
    cell.textContent = value
    row.appendChild(cell)
  }

  table.appendChild(row)
  return row
}



