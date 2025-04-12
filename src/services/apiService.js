export async function fetchDataFromAPI() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const apiData = await response.json();
    console.log(apiData);
    const locations = {};

    apiData.forEach((item) => {
      const locationId = `LOC${String(item.albumId).padStart(3, "0")}`;

      if (!locations[locationId]) {
        locations[locationId] = {
          LocationCode: locationId,
          LocationDesc: `Location ${item.albumId}`,
          items: [],
        };
      }

      locations[locationId].items.push({
        ItemCode: `ITEM${String(item.id).padStart(3, "0")}`,
        ItemDesc: `Product ${Math.floor(Math.random() * 100)}`,
        Qty: Math.floor(Math.random() * 100),
        Rate: (Math.random() * 100).toFixed(2),
        Amount: (Math.random() * 1000).toFixed(2),
      });
    });

    return locations;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
