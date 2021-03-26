const apiUrl = process.env.API_URL;

export const getData = async (path) => {
  return await (
    await fetch(`${apiUrl}/${path}`, {
      method: 'GET',
    })
  ).json();
};

export const postData = async (path, payload) => {
  return await (
    await fetch(`${apiUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
  ).json();
};

export const patchData = async (path, payload) => {
  return await (
    await fetch(`${apiUrl}/${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
  ).json();
};

export const deleteData = async (path) => {
  return await (
    await fetch(`${apiUrl}/${path}`, {
      method: 'DELETE',
    })
  ).json();
};
