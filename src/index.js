const form = document.querySelector('.search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  /* 
   Hard code query obj to Statue of Liberty
  */
  const query = {
    title: 'Statue of Liberty',
    latlng: {
      lat: 40.689247,
      lng: -74.044502,
    }
  };

  /* 
   Get venue
  */

  const response = await fetch('/.netlify/functions/fsq-search', {
    method: 'POST',
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log(response.response)

  /* 
    Get best photo and description for that venue       
  */

  const venueDetails = await fetch('/.netlify/functions/fsq-venue', {
    method: 'POST',
    body: JSON.stringify({
      query: response.response.venues[0].id,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));


  console.log(venueDetails.response.venue);

  /* 
   create url to photo from the different parts
   and put it on the page
  */
  const prefix = venueDetails.response.venue.bestPhoto.prefix;
  const suffix = venueDetails.response.venue.bestPhoto.suffix;
  const url = `${prefix}300x500${suffix}`;
  console.log(url);


  const postImg = document.querySelector('.post__img')
  postImg.src = url;

  /* 
    Add the venue description to the page
  */
  const postDesc = document.querySelector('.post__desc');
  postDesc.innerHTML = venueDetails.response.venue.description;



});