interface SingleError {
  source: string;
  detail: string;
}

interface ResponseError {
  message: string;
  errors: SingleError[];
}

const capitalize = (s: string) => {
  return typeof s === 'string' ? s.charAt(0).toUpperCase() + s.substr(1) : '';
};

const responseErrorParser = (errorResponse: ResponseError) => {
  return errorResponse.errors.map(
    e => `${capitalize(e.source)} ${e.detail.toLowerCase()}`
  );
};

export default responseErrorParser;
