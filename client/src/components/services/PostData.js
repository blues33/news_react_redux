export function PostData(type, userData) {
  let BaseURL = 'http://localhost:3000/';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
      .then((resolve) => resolve.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  });
}
