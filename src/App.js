import { useEffect, useState } from "react";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

import jsondata from "./db/productwithfilter.json";

function App() {
  const [checkeBoxValue, setCheckeBoxValue] = useState([]);
  const [result, setResult] = useState([]);
  const [checkedCheckboxId, setCheckedCheckboxId] = useState([]);
  const [resetClick, setResetClick] = useState(0);
  // ----------- Input Filter -----------

  const filterCriteria = jsondata.data.item.searchGroups;

  const onFilterClickHandler = () => {
    if (resetClick === 1) {
      setResetClick(0);
    } else {
      setResult(filteredData(jsondata.data.item.categories, checkeBoxValue));
    }
  };

  const onResetClickHandler = () => {
    if (checkedCheckboxId.length > 0) {
      checkedCheckboxId.map(
        (checkBoxId) => (document.getElementById(checkBoxId).checked = false)
      );

      setCheckeBoxValue([]);
      setCheckedCheckboxId([]);
    }
    setResetClick(1);
  };

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    const { value, checked, name, id } = event.target;

    if (checked) {
      setCheckedCheckboxId((prev) => [...prev, id]);

      setCheckeBoxValue((prev) => [
        ...prev,
        { checkBoxType: name, checkBoxValue: value },
      ]);
    } else {
      setCheckedCheckboxId((prev) => {
        return [...prev.filter((checkBoxId) => checkBoxId !== id)];
      });

      setCheckeBoxValue((prev) => {
        return [...prev.filter((sheen) => sheen.checkBoxValue !== value)];
      });
    }
  };

  function filteredData(categories, selectedFilterValue) {
    let filteredProducts = [];
    let found;
    for (let ci = 0; ci < categories.length; ci++) {
      for (let pi = 0; pi < categories[ci].products.length; pi++) {
        let product = {
          productName: "", //categories[ci].products[pi].productName.value,
          productImage: "", //categories[ci].products[pi].productImage.src,
          color: "Test Color",
        };
        found = false;
        if (selectedFilterValue.length > 0) {
          if (categories[ci].products[pi].skuDetailsSection.length > 0) {
            for (
              let si = 0;
              si < categories[ci].products[pi].skuDetailsSection.length;
              si++
            ) {
              if (
                categories[ci].products[pi].skuDetailsSection[si].skuList
                  .length > 0
              ) {
                for (
                  let sli = 0;
                  sli <
                  categories[ci].products[pi].skuDetailsSection[si].skuList
                    .length;
                  sli++
                ) {
                  for (
                    let sfvi = 0;
                    sfvi < selectedFilterValue.length;
                    sfvi++
                  ) {
                    if (
                      categories[ci].products[pi].skuDetailsSection[si].skuList[
                        sli
                      ][`${selectedFilterValue[sfvi].checkBoxType}`].list
                        .length > 0
                    ) {
                      for (
                        let j = 0;
                        j <
                        categories[ci].products[pi].skuDetailsSection[si]
                          .skuList[sli][
                          `${selectedFilterValue[sfvi].checkBoxType}`
                        ].list.length;
                        j++
                      ) {
                        if (
                          categories[ci].products[pi].skuDetailsSection[si]
                            .skuList[sli][
                            `${selectedFilterValue[sfvi].checkBoxType}`
                          ].list[j].facet.value ===
                          selectedFilterValue[sfvi].checkBoxValue
                        ) {
                          found = true;
                          break;
                        }
                      }
                    }
                    if (found == true) {
                      break;
                    }
                  }
                  if (found == true) {
                    break;
                  }
                }
              }
              if (found == true) {
                break;
              }
            }

            if (found == true) {
              product.productName =
                categories[ci].products[pi].productName.value;
              product.productImage =
                categories[ci].products[pi].productImage.src;
              filteredProducts.push(product);
            }
          } /*else {
            product.productName = categories[ci].products[pi].productName.value;
            product.productImage = categories[ci].products[pi].productImage.src;
            filteredProducts.push(product);
          }*/
        } else {
          product.productName = categories[ci].products[pi].productName.value;
          product.productImage = categories[ci].products[pi].productImage.src;
          filteredProducts.push(product);
        }
      }
    }

    //console.log(filteredProducts);

    // Applying selected filter
    //if (selectedFilterValue.length > 0) {
    //  filteredProducts = filteredProducts.filter(({ brand }) =>
    //    selectedFilterValue.includes(brand)
    //  );
    //}

    return filteredProducts.map(({ productImage, productName, color }) => (
      <Card
        key={Math.random()}
        img={productImage}
        title={productName}
        color={color}
      />
    ));
  }

  useEffect(() => {
    setResult(filteredData(jsondata.data.item.categories, checkeBoxValue));
  }, [resetClick]);

  return (
    <>
      <Sidebar
        handleChange={handleChange}
        onFilterClickHandler={onFilterClickHandler}
        onResetClickHandler={onResetClickHandler}
        filterCriteria={filterCriteria}
      />
      <Products result={result} />
    </>
  );
}

export default App;
