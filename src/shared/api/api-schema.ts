export interface paths {
  '/auth/login': {
    post: {
      requestBody: {
        content: {
          'application/json': {
            login: string;
            password: string;
          };
        };
      };
      responses: {
        200: {
          content: {
            'application/json': {
              accessToken: string;
            };
          };
        };
        400: {
          content: {
            'application/json': {
              error: string;
            };
          };
        };
        401: {
          content: {
            'application/json': {
              error: string;
            };
          };
        };
      };
    };
  };
}
