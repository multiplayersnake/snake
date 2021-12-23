function handleAPIError(serializedError: Error) {
  try {
    const error = JSON.parse(serializedError.message);
    console.log('API error:', error);
  } catch {
    console.log('unknown API error');
  }
}

export default handleAPIError;
