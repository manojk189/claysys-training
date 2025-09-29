
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }


  updateQuantity(amount) {
    this.quantity += amount;
  }


  getDetails() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity
    };
  }
}


let inventory = [];
function addProduct() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert("Please enter valid product details.");
    return;
  }

  const product = new Product(name, price, quantity);
  inventory.push(product);

  displayInventory();


  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}


function displayInventory() {
  const table = document.getElementById("inventoryTable");
  table.innerHTML = `
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      `;
  inventory.forEach(product => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = product.name;
    cell2.textContent = `$${product.price.toFixed(2)}`;
    cell3.textContent = product.quantity;
  });
}
