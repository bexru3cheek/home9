const albumId = JSON.parse(localStorage.getItem("ID"));

export const ENDPOINTSTUDEN = `https://64b5702bf3dbab5a95c751ee.mockapi.io/api/v1/categgory/${albumId}/`;

console.log(ENDPOINTSTUDEN);
