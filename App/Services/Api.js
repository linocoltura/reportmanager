// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import env from '../../env'

// our "constructor"
const create = (baseURL = env.WP_REST_API_BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Authorization': env.wpApiToken,
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getAfspraken = () => api.get('wp/v2/afspraak?per_page=100', {})
  const getRapporten = () => api.get('wp/v2/rapport?per_page=100', {})


  const putRapport = (rapport) => {
    return new Promise((resolve) => {
      /*if (suggestie.image) {
        uploadImage(suggestie.image, (remoteImageURL) => {
          createPostWithACF(suggestie, remoteImageURL, () => {
            resolve();
          });
        });
      } else*/ {
        createPostWithACF(rapport, null, () => {
          resolve();
        });
      }
    });
  }

  const createPostWithACF = (data, remoteImageURL, next) => {
    api.post('wp/v2/rapport', { title: data.titel, status: 'publish' })
      .then((response) => {
        if (response.ok) {
          // use the id we got back to edit it to include the custom fields
          api.post(`/acf/v3/rapport/${response.data.id}`, { fields: { ...data, fotos: remoteImageURL } })
            .then((responseAcf) => {
              next();
            })
        } else {
          // future: show user an error message?
          next();
        }
      });
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    putRapport,
    getAfspraken,
    getRapporten,
  }
}

// let's return back our create method as the default.
export default {
  create
}