async function myfetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data;
}
export { myfetch };
