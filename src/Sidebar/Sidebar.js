import Input from "../components/Input";
import "./Sidebar.css";
import "./Accordion.css";

const Sidebar = ({
  onFilterClickHandler,
  onResetClickHandler,
  handleChange,
  filterCriteria,
}) => {
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        //panel.style.maxHeight = 150 + "px";
        //panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = "100%";
      }
    });
  }

  const getFacetElementName = (facetName) => {
    if (facetName === "Surfaces") {
      return "surfaces";
    } else if (facetName === "Finishes") {
      return "finishes";
    } else if (facetName === "Tint Base") {
      return "tintBase";
    } else if (facetName === "Conditions") {
      return "conditions";
    } else if (facetName === "VOC") {
      return "vOC";
    } else if (facetName === "Product Types") {
      return "productTypes";
    } else if (facetName === "Project Types") {
      return "projectTypes";
    } else if (facetName === "Color Groups") {
      return "colorGroups";
    }
  };

  return (
    <>
      <section className="sidebar">
        <div className="button-container">
          <button onClick={onFilterClickHandler} value="" className="btns">
            Filter
          </button>
          <button onClick={onResetClickHandler} value="" className="btns">
            Reset
          </button>
        </div>

        {filterCriteria.filters.map((criteria, criteriaIndex) => (
          <div key={criteriaIndex} className="filter-card-container">
            <button className="accordion">{criteria.facetName}</button>
            {/*<h2 className="sidebar-title">{criteria.facetName}</h2>*/}
            <div className="panel">
              {criteria.facetValues.map((eachValue, eachValueIndex) => (
                <Input
                  key={eachValueIndex}
                  handleChange={handleChange}
                  value={eachValue.facet.value}
                  title={eachValue.facet.value}
                  name={getFacetElementName(criteria.facetName)}
                  id={criteria.facetKey + eachValueIndex}
                />
              ))}
            </div>
          </div>
        ))}
        {/* 
        <Brands handleChange={handleChange} />
        <Surfaces handleChange={handleChange} />
        <Colors handleChange={handleChange} />
        <Sheen handleChange={handleChange} /> 
        */}
      </section>
    </>
  );
};

export default Sidebar;
