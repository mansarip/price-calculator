import React, { useState, useEffect } from "react";
import products from "./products.json";

export default function App() {
  const [activeId, setActiveId] = useState(1); // 1 adalah default item id
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    // code dalam ini hanya akan di-execute
    // jika dependencies dia bertukar.
    // dalam kes ini, kita hanya depend (bergantung) pada value 'activeId'

    const item = products.find((prod) => prod.id === activeId);

    if (item) {
      setProductName(item.name);
      setOriginalPrice(item.price);
    } else {
      setProductName("");
      setOriginalPrice(0);
    }

    // reset balik field discount dan final price
    setDiscount("");
    setFinalPrice("");
  }, [activeId]); // <-- dependencies

  function calculateTotalPrice(discountPercentage) {
    let discount = Number(discountPercentage);
    let discountValue = (discount / 100) * originalPrice;
    let resultPrice = originalPrice - discountValue;
    setFinalPrice(resultPrice);
  }

  return (
    <div>
      <div className="products">
        {products.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            isActive={item.id === activeId}
            clickFn={() => {
              setActiveId(item.id);
            }}
          />
        ))}
      </div>

      <table className="details">
        <tbody>
          <tr>
            <td>Product Name</td>
            <td>
              <input type="text" placeholder="Name" readOnly value={productName} />
            </td>
          </tr>
          <tr>
            <td>Original Price</td>
            <td>
              <input type="number" placeholder="Original Price" readOnly value={originalPrice} />
            </td>
          </tr>
          <tr>
            <td>Discount</td>
            <td>
              <input
                type="number"
                placeholder="Discount"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  calculateTotalPrice(e.target.value);
                }}
              />{" "}
              %
            </td>
          </tr>
          <tr>
            <td>Final Price</td>
            <td>
              <input type="number" placeholder="Final Price" readOnly value={finalPrice} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Item({ name, isActive = false, clickFn }) {
  let styleClass = "product";

  if (isActive) {
    styleClass = "product active";
  }

  return (
    <div className={styleClass} onClick={clickFn}>
      {name}
    </div>
  );
}
