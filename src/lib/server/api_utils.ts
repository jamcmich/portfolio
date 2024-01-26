export const handleError = (error: any) => {
  console.log(error.response);

  switch (error.response.status) {
    case 401:
      console.log('Unauthorized');
      return JSON.stringify({ error: undefined });
    case 403:
      console.log('Forbidden');
      break;
    case 404:
      console.log('Not Found');
      break;
    case 500:
      console.log('Internal Server Error');
      break;
    default:
      console.log(error.response.status);
  }
}