import React, { useEffect, useState } from "react";
import { InputCheckboxComponent, InputComponent } from "../InputComponent";
import ImageUploadComponent from "../ImageUploadComp";
import { AccordianComponent } from "../AccordianComponent";
import { useLocation } from "react-router-dom";
import ReviewFormBuilder from "../ReactFormBuilder";

const products = [
  "Wine/Spirits",
  "beer",
  "cigars",
  "coffee",
  "food",
  "product",
];

const ELabels = ({ localQrData, setLocalQrData }) => {
  const location = useLocation();
  const [showCustomQuestion, setShowCustomQuestion] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Wine/Spirits");
  const [showRatings, setShowRatings] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  console.log("checklocalqrdata", localQrData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalQrData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (location.state?.qrData) {
      const localQrDataFromLocation = location?.state?.qrData?.data;
      console.log("localQrDataFromLocation", localQrDataFromLocation);
      setLocalQrData(localQrDataFromLocation);
      setIsEditMode(true);

      // Initialize the state with all false values
      const updatedData = {
        wine: false,
        beer: false,
        cigars: false,
        coffee: false,
        food: false,
        product: false,
      };

      // Only set the value to true for the selected product in the API response
      Object.keys(localQrDataFromLocation).forEach((key) => {
        if (localQrDataFromLocation[key] === "true") {
          updatedData[key] = true;
        }
      });

      setLocalQrData((prevData) => ({
        ...prevData,
        ...updatedData, // Only update true values from API response
      }));

      // Set selected product based on the response
      const selected = Object.keys(localQrDataFromLocation).find(
        (key) => localQrDataFromLocation[key] === "true"
      );
      if (selected) {
        setSelectedProduct(selected);
      }

      if (localQrDataFromLocation?.is_question == "true") {
        setShowCustomQuestion(true);
      }
      if (localQrDataFromLocation?.is_rating == "true") {
        setShowRatings(true);
      }
    }
  }, [location.state?.qrData]);

  const handleProductSelection = (product) => {
    if (isEditMode && selectedProduct === product) return;

    setSelectedProduct(product);

    setLocalQrData((prevData) => ({
      ...prevData,
      wine: product === "Wine/Spirits",
      beer: product === "beer",
      cigars: product === "cigars",
      coffee: product === "coffee",
      food: product === "food",
      product: product === "product",
    }));
  };

  // Use a separate effect to set selectedProduct based on localQrData changes
  useEffect(() => {
    if (localQrData) {
      const productMap = {
        "Wine/Spirits": localQrData.wine,
        beer: localQrData.beer,
        cigars: localQrData.cigars,
        coffee: localQrData.coffee,
        food: localQrData.food,
        product: localQrData.product,
      };

      for (const [product, isSelected] of Object.entries(productMap)) {
        if (isSelected) {
          setSelectedProduct(product);
          break; // Exit once we find the selected product
        }
      }
    }
  }, [localQrData]);

  //SET ADD REVIEW
  const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === "ratings") {
      setShowRatings(!showRatings);
      setLocalQrData((prevData) => ({
        ...prevData,
        is_rating: !prevData.is_rating,
      }));
    } else if (checkboxType === "questions") {
      setShowCustomQuestion(!showCustomQuestion);
      setLocalQrData((prevData) => ({
        ...prevData,
        is_question: !prevData.is_question,
      }));
    }
  };

  const handleImageDelete = (fieldName) => {
    // dispatch(resetField({ field: fieldName }));
    setLocalQrData((prevData) => ({
      ...prevData,
      [fieldName]: "",
    }));
    // console.log(`Deleted image for field: ${fieldName}`);
  };

  // console.log("lcaooqrdtata", localQrData);

  return (
    <>
      <div className="app-page">
        {/* Buttons for selecting product */}
        <div className="product-selection-buttons">
          {products.map((product) => (
            <button
              key={product}
              onClick={() => handleProductSelection(product)}
              className={selectedProduct === product ? "selected" : ""}
              disabled={isEditMode && selectedProduct !== product}
            >
              {product}
            </button>
          ))}
        </div>

        {/* Accordion layout based on selected product */}
        {selectedProduct && (
          <div className="containerr">
            <div className="left">
              {selectedProduct === "Wine/Spirits" && (
                <AccordianComponent title={"Wine/Spirits Details"}>
                  <InputComponent
                    label="Grape Variety"
                    placeholder="Enter Grape Variety"
                    value={localQrData?.grape_variety}
                    name="grape_variety"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Alcohol Volume"
                    placeholder="Enter Alcohol Volume"
                    type="number"
                    value={localQrData?.alcohol_percentage}
                    name="alcohol_percentage"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Tasting Notes"
                    placeholder="Enter Tasting Notes"
                    value={localQrData?.task_notes}
                    name="task_notes"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Website"
                    placeholder="Enter Website URL"
                    value={localQrData?.website}
                    name="website"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Wine/Spirits Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    onImageDelete={handleImageDelete}
                    name="wine_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.wine_image}
                  />
                </AccordianComponent>
              )}

              {selectedProduct === "beer" && (
                <AccordianComponent title={"Beer Details"}>
                  <InputComponent
                    label="Product Name"
                    placeholder="Enter Product Name"
                    value={localQrData?.product_name}
                    name="product_name"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="SKU"
                    placeholder="Enter SKU"
                    value={localQrData?.sku}
                    name="sku"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="beer Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    name="beer_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.beer_image}
                  />
                  <InputComponent
                    label="Description"
                    placeholder="Enter Description"
                    value={localQrData?.description}
                    name="description"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Alcohol %"
                    placeholder="Enter Alcohol Percentage"
                    value={localQrData?.alcohol_percentage}
                    name="alcohol_percentage"
                    type="number"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="IPA"
                    placeholder="Enter IPA"
                    value={localQrData?.ipa}
                    name="ipa"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Nutrition Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    name="nutrition_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.nutrition_image}
                  />
                  <InputComponent
                    label="Brewed"
                    placeholder="Enter Brewing Info"
                    value={localQrData?.brewed}
                    name="brewed"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Website"
                    placeholder="Enter Website URL"
                    value={localQrData?.website}
                    name="website"
                    onChange={handleInputChange}
                  />
                </AccordianComponent>
              )}

              {selectedProduct === "cigars" && (
                <AccordianComponent title={"Cigars Details"}>
                  <InputComponent
                    label="Product Name"
                    placeholder="Enter Product Name"
                    value={localQrData?.product_name}
                    name="product_name"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="SKU"
                    placeholder="Enter SKU"
                    value={localQrData?.sku}
                    name="sku"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Cigars Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    onImageDelete={handleImageDelete}
                    name="cigar_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.cigar_image}
                  />
                  <InputComponent
                    label="Description"
                    placeholder="Enter Description"
                    value={localQrData?.description}
                    name="description"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Where it is made"
                    placeholder="Enter Origin"
                    value={localQrData?.where_it_is_made}
                    name="where_it_is_made"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Size"
                    placeholder="Enter Size"
                    value={localQrData?.size}
                    name="size"
                    type="text"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Wrapper"
                    placeholder="Enter Wrapper"
                    value={localQrData?.wrapper}
                    name="wrapper"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Binder"
                    placeholder="Enter Binder"
                    value={localQrData?.binder}
                    name="binder"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Filler"
                    placeholder="Enter Filler"
                    value={localQrData?.filler}
                    name="filler"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Strength"
                    placeholder="Enter Strength"
                    value={localQrData?.strength}
                    name="strength"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Body"
                    placeholder="Enter Body"
                    value={localQrData?.body}
                    name="body"
                    onChange={handleInputChange}
                  />

                  <InputComponent
                    label="Flavour Profile"
                    placeholder="Enter Flavour Profile"
                    value={localQrData?.flavour_profile}
                    name="flavour_profile"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Best Paired With"
                    placeholder="Enter Best Pairing"
                    value={localQrData?.best_paired_with}
                    name="best_paired_with"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Website"
                    placeholder="Enter Website URL"
                    value={localQrData?.website}
                    name="website"
                    onChange={handleInputChange}
                  />
                </AccordianComponent>
              )}

              {selectedProduct === "coffee" && (
                <AccordianComponent title={"Coffee Details"}>
                  <InputComponent
                    label="Product Name"
                    placeholder="Enter Product Name"
                    value={localQrData?.product_name}
                    name="product_name"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="SKU"
                    placeholder="Enter SKU"
                    value={localQrData?.sku}
                    name="sku"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Coffee Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    onImageDelete={handleImageDelete}
                    name="coffee_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.coffee_image}
                  />
                  <InputComponent
                    label="Description"
                    placeholder="Enter Description"
                    value={localQrData?.description}
                    name="description"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Origin"
                    placeholder="Enter Origin"
                    value={localQrData?.origin}
                    name="origin"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Farm"
                    placeholder="Enter Farm"
                    value={localQrData?.farm}
                    name="farm"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Altitude"
                    placeholder="Enter Altitude"
                    value={localQrData?.altitude}
                    type="number"
                    name="altitude"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Roast"
                    placeholder="Enter Roast"
                    value={localQrData?.roast}
                    name="roast"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Flavour"
                    placeholder="Enter Flavour"
                    value={localQrData?.flavour}
                    name="flavour"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Tasting Notes"
                    placeholder="Enter Tasting Notes"
                    value={localQrData?.task_notes}
                    name="task_notes"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Ingredients"
                    placeholder="Enter Ingredients"
                    value={localQrData?.ingredients}
                    name="ingredients"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Nutritional Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    onImageDelete={handleImageDelete}
                    name="nutrition_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.nutrition_image}
                  />
                  <InputComponent
                    label="Website"
                    placeholder="Enter Website URL"
                    value={localQrData?.website}
                    name="website"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Storage"
                    placeholder="Enter Storage Instructions"
                    value={localQrData?.storage}
                    name="storage"
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-group">
                    <label>
                      Organic
                      <input
                        type="checkbox"
                        name="organic"
                        checked={
                          localQrData?.organic === true ||
                          localQrData?.organic === "true"
                        }
                        onChange={(e) =>
                          setLocalQrData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Fare Trade
                      <input
                        type="checkbox"
                        name="free_trade"
                        checked={
                          localQrData?.free_trade === true ||
                          localQrData?.free_trade === "true"
                        }
                        onChange={(e) =>
                          setLocalQrData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      />
                    </label>
                  </div>
                </AccordianComponent>
              )}

              {selectedProduct === "food" && (
                <AccordianComponent title={"Food Details"}>
                  <InputComponent
                    label="Food Name"
                    placeholder="Enter Food Name"
                    value={localQrData?.product_name}
                    name="product_name"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Cuisine"
                    placeholder="Enter Cuisine"
                    value={localQrData?.cuisine}
                    name="cuisine"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Ingredients"
                    placeholder="Enter Ingredients"
                    value={localQrData?.ingredients}
                    name="ingredients"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Serving Size"
                    placeholder="Enter Serving Size"
                    type="text"
                    value={localQrData?.size}
                    name="size"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Calories"
                    placeholder="Enter Calories"
                    type="number"
                    value={localQrData?.clories}
                    name="clories"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Food Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    onImageDelete={handleImageDelete}
                    name="food_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.food_image}
                  />
                  <InputComponent
                    label="Website"
                    placeholder="Enter Website URL"
                    value={localQrData?.website}
                    name="website"
                    onChange={handleInputChange}
                  />
                </AccordianComponent>
              )}

              {selectedProduct === "product" && (
                <AccordianComponent title={"Product Details"}>
                  <InputComponent
                    label="Product Name"
                    placeholder="Enter Product Name"
                    value={localQrData?.product_name}
                    name="product_name"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="SKU"
                    placeholder="Enter SKU"
                    value={localQrData?.sku}
                    name="sku"
                    onChange={handleInputChange}
                  />
                  <ImageUploadComponent
                    defaultImage="/assets/images/default-img.png"
                    label="Product Image"
                    onImageUpload={(imageUrl, name, file) => {
                      setLocalQrData((prev) => ({
                        ...prev,
                        [name]: file,
                      }));
                    }}
                    name="product_image"
                    localQrData={localQrData}
                    onEditImagePreview={localQrData?.product_image}
                  />
                  <InputComponent
                    label="Description"
                    placeholder="Enter Description"
                    value={localQrData?.description}
                    name="description"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Direction"
                    placeholder="Enter Direction"
                    value={localQrData?.directions}
                    name="directions"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Brand"
                    placeholder="Enter Brand"
                    value={localQrData?.brand}
                    name="brand"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Category"
                    placeholder="Enter Category"
                    value={localQrData?.category}
                    name="category"
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Price"
                    placeholder="Enter Price"
                    value={localQrData?.price}
                    type="number"
                    name="price"
                    onChange={handleInputChange}
                  />

                  <InputComponent
                    label="Warning"
                    placeholder="Enter Warning"
                    value={localQrData?.warning}
                    name="warning"
                    onChange={handleInputChange}
                  />
                </AccordianComponent>
              )}

              <AccordianComponent title={"Add Review"}>
                <div className="d-flex">
                  <InputCheckboxComponent
                    label={"Add Ratings"}
                    onChange={() => handleCheckboxChange("ratings")}
                    checked={showRatings}
                  />
                  <InputCheckboxComponent
                    label={"Add Questions"}
                    onChange={() => {
                      setShowCustomQuestion(!showCustomQuestion);
                      handleCheckboxChange("questions");
                    }}
                    checked={showCustomQuestion}
                  />
                </div>

                {showCustomQuestion && (
                  <ReviewFormBuilder
                    setShowCustomQuestion={setShowCustomQuestion}
                    showCustomQuestion={showCustomQuestion}
                    localQrData={localQrData}
                    setLocalQrData={setLocalQrData}
                  />
                )}
              </AccordianComponent>
            </div>
            <div className="right">
              <img src="/assets/images/phone-website.png" alt="phone-website" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ELabels;
