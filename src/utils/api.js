async function myfetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const { errors } = await res.json();
    throw errors;
  }
  const data = await res.json();
  return data;
}
export { myfetch };
