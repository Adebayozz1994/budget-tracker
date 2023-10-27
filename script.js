


let budgetArray = JSON.parse(localStorage.getItem("budget")) || [];

const  addUp = () =>{
  let pName = productName.value;
  let quant = quantityOwn.value;
  let prices = priceName.value;
  let budgetObj = {pName, quant, prices};
  
  if (pName=="" && quant=="" && prices=="") {
    showErr.innerHTML=`<p class="alert alert-info text-center p-2 my-3">Space must be filled</p>`
  }else{
    pName.value=="" && quant.value=="" && prices.value==""
    showErr.innerHTML=""
    budgetArray.push(budgetObj)
  localStorage.setItem("budget", JSON.stringify(budgetArray))
    
    window.location.href = "result.html"
  }
}


if (budgetArray && budgetArray.length > 0) {
  let totalSpent = 0;
  displayAll();
  resultCard.innerHTML += `
  <p class="total">TOTAL-SPENT: $${totalSpent.toFixed(2)}</p>
  `;
  
}
    
    
    const displayAll = () =>{
      resultCard.innerHTML = ""
      budgetArray.map((item, i)=> {
        let itemCost = item.quant * item.prices;
        totalSpent += itemCost;
        resultCard.innerHTML += `
        
        <div class="card1">
        <p class="heading">
          Product Name: ${item.pName}
        </p>
        <p>
          Quantity: ${item.quant} 
        </p>
        <p>
          Price: ${item.prices}
        </p>
        <p class="cost">Total: ${itemCost}
      </p>
      <span>
        <button class="btn btn-outline-danger" onclick="deleteAny(${i})">delete</button>
        <button class="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal-${i}">edit</button>
      </span>
    </div>


            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
              <h1 class="modal-title fs-5 text-bg-success" id="exampleModalLabel">FEEL FREE TO EDIT TO YOUR TASTE</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <input type="text" class="text-bg-warning" placeholder="Product name" id="productName-${i}">
                  <input type="number" class="text-bg-warning"  placeholder="Quantity" id="quantityOwn-${i}">
                  <input type="number" class="text-bg-warning" placeholder="Price" id="priceName-${i}">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" onclick="editAny(${i})" data-bs-dismiss="modal">Save changes</button>
                    
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                      </div>`;
      })
    }
                    const deleteAny = () =>{
                      budgetArray.splice(i, 1);
                      localStorage.setItem("budget", JSON.stringify(budgetArray));
                      totalSpent = 0; 
                      resultCard.innerHTML = ""; 
                      displayAll(); 
                    }
                    
                    const editAny = () =>{
                  
                      budgetArray[i]["pName"] = document.getElementById(`productName-${i}`).value;
                      budgetArray[i]["quant"] =  document.getElementById(`quantityOwn-${i}`).value;
                      budgetArray[i]["prices"] =  document.getElementById(`priceName-${i}`).value;
                      localStorage.setItem("budget", JSON.stringify(budgetArray));
                      totalSpent = 0; // Reset totalSpent
                      resultCard.innerHTML = ""; // Clear the card display
                      displayAll()
                
                    }
                    const goBack = () =>{
                      window.location.href = "index.html"
                    }