import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBeerPage() {
  // State variables to store the values of the form inputs. You can leave these as they are.
  const initialState = {
    name: "",
    tagline: "",
    description: "",
    imageUrl: "",
    firstBrewed: "",
    brewersTips: "",
    attenuationLevel: 0,
    contributedBy: "",
  };
  const [beer, setBeer] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
		let value = e.target.value
		if (e.target.type === "number") {
			value = e.target.valueAsNumber
		}
		setBeer({ ...beer, [e.target.name]: value })
		
	};

  // Handler functions for the form inputs. You can leave these as they are.

  // TASK:
  // 1. Create a function to handle the form submission and send the form data to the Beers API to create a new beer.
  // 2. Use axios to make a POST request to the Beers API.
  // 3. Once the beer is created, navigate the user to the page showing the list of all beers.
  async function handleCreate(e) {
    e.preventDefault();
    const beerToCreate = {
      name: beer.name,
      tagline: beer.tagline,
      description: beer.description,
      image_url: beer.imageUrl,
      first_brewed: beer.firstBrewed,
      brewers_tips: beer.brewersTips,
      attenuation_level: beer.attenuationLevel,
      contributed_by: beer.contributedBy,
    };
    try {
      await axios.post(
        "https://ih-beers-api2.herokuapp.com/beers/new",
        beerToCreate
      );
      navigate("/beers");
    } catch (error) {
      console.error(error);
    }
  }

  // Structure and the content of the page showing the form for adding a new beer. You can leave this as it is.
  return (
    <>
      <div className="d-inline-flex flex-column w-100 p-4">
        <form onSubmit={handleCreate}>
          <label>Name</label>
          <input
            className="form-control mb-4"
            type="text"
            name="name"
            placeholder="Beer Name"
            value={beer.name}
            onChange={handleChange}
          />
          <label>Tagline</label>
          <input
            className="form-control mb-4"
            type="text"
            name="tagline"
            placeholder="Beer Tagline"
            value={beer.tagline}
            onChange={handleChange}
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-4"
            type="text"
            name="description"
            placeholder="Description"
            rows="3"
            value={beer.description}
            onChange={handleChange}
          ></textarea>

          <label>Image</label>
          <input
            className="form-control mb-4"
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={beer.imageUrl}
            onChange={handleChange}
          />

          <label>First Brewed</label>
          <input
            className="form-control mb-4"
            type="text"
            name="firstBrewed"
            placeholder="Date - MM/YYYY"
            value={beer.firstBrewed}
            onChange={handleChange}
          />

          <label>Brewer Tips</label>
          <input
            className="form-control mb-4"
            type="text"
            name="brewersTips"
            placeholder="..."
            value={beer.brewersTips}
            onChange={handleChange}
          />

          <label>Attenuation Level</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                %
              </span>
            </div>
            <input
              className="form-control mb-4"
              type="number"
              name="attenuationLevel"
              value={beer.attenuationLevel}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>

          <label>Contributed By</label>
          <input
            className="form-control mb-4"
            type="text"
            name="contributedBy"
            placeholder="Contributed by"
            value={beer.contributedBy}
            onChange={handleChange}
          />
          <button className="btn btn-primary btn-round">Add Beer</button>
        </form>
      </div>
    </>
  );
}

export default AddBeerPage;
