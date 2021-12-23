function handleError(e: unknown) {
  const error = e as Error;

  console.log('----- API error -----');
  console.log('Name:', error.name);
  console.log('Message:', error.message);
  console.log('Stack:', error.stack);
  console.log('---------------------');
}

export default handleError;
