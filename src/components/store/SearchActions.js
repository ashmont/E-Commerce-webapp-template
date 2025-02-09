import { searchActions } from "./SearchSlice";

// fetches matches based on whats in the search bar at the moment
export const fetchMatches = (term) => {
  const request = { searchTerm: term };
  return async (dispatch) => {
    const fetchData = async (term) => {
      const response = await fetch("http://localhost:5000/searchBar/", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error could not fetch");
      }
      const data = await response.json();

      return data;
    };

    try {
      //stores data fetched
      const response = await fetchData();
      dispatch(searchActions.storeResults(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCollList = (term) => {
  const request = { searchTerm: term };
  return async (dispatch) => {
    const fetchData = async (term) => {
      const response = await fetch("http://localhost:5000/collectionProducts", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error could not fetch");
      }
      const data = await response.json();

      return data;
    };

    try {
      const response = await fetchData();
      dispatch(searchActions.storeResults(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// fetches full data for each item
export const fetchFull = (term) => {
  const request = { searchTerm: term };
  return async (dispatch) => {
    const fetchSingle = async (term) => {
      const response = await fetch("http://localhost:5000/search/", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error could not fetch");
      }
      const data = await response.json();

      return data;
    };

    try {
      const response = await fetchSingle();
      dispatch(searchActions.productResult(response));
    } catch (error) {
      console.log(error);
    }
  };
};

// fetches collections
export const fetchCollections = () => {
  return async (dispatch) => {
    const fetchColl = async () => {
      const response = await fetch("http://localhost:5000/collections/", {});

      if (!response.ok) {
        throw new Error("Error could not fetch");
      }
      const data = await response.json();

      return data;
    };

    try {
      const response = await fetchColl();
      dispatch(searchActions.collectionResult(response));
    } catch (error) {
      console.log(error);
    }
  };
};
