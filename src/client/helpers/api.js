const querystring = require('querystring');
/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb) {
  const promise = getApiPromise(method, data);

  promise.then(json => {
    if (typeof cb === 'function') {
      cb(json);
    }

    console.log('json', json);
  })
  .catch(err => {
    console.log('error:', err);
  });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, data) {
  let url = '/todos';
  if (['DELETE', 'PUT'].indexOf(method) !== -1) {
    url = `${url}/${data.id}`;
  } else if ('PATCH' === method) {
    url = `${url}?${querystring.encode({ id: data.id })}`;
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    options.body = JSON.stringify({
      data,
    });
  }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }
    if (response.status === 204) {
      return;
    }
    return response.json();
  })
};
