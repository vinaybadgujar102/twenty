import request from 'supertest';

const client = request(`http://localhost:${APP_PORT}`);

describe('connectedAccountsResolver (integration)', () => {
  it('should find many connectedAccounts', () => {
    const queryData = {
      query: `
        query connectedAccounts {
          connectedAccounts {
            edges {
              node {
                handle
                provider
                accessToken
                refreshToken
                lastSyncHistoryId
                authFailedAt
                handleAliases
                id
                createdAt
                updatedAt
                deletedAt
                accountOwnerId
              }
            }
          }
        }
      `,
    };

    return client
      .post('/graphql')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .send(queryData)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.errors).toBeUndefined();
      })
      .expect((res) => {
        const data = res.body.data.connectedAccounts;

        expect(data).toBeDefined();
        expect(Array.isArray(data.edges)).toBe(true);

        const edges = data.edges;

        if (edges.length > 0) {
          const connectedAccounts = edges[0].node;

          expect(connectedAccounts).toHaveProperty('handle');
          expect(connectedAccounts).toHaveProperty('provider');
          expect(connectedAccounts).toHaveProperty('accessToken');
          expect(connectedAccounts).toHaveProperty('refreshToken');
          expect(connectedAccounts).toHaveProperty('lastSyncHistoryId');
          expect(connectedAccounts).toHaveProperty('authFailedAt');
          expect(connectedAccounts).toHaveProperty('handleAliases');
          expect(connectedAccounts).toHaveProperty('id');
          expect(connectedAccounts).toHaveProperty('createdAt');
          expect(connectedAccounts).toHaveProperty('updatedAt');
          expect(connectedAccounts).toHaveProperty('deletedAt');
          expect(connectedAccounts).toHaveProperty('accountOwnerId');
        }
      });
  });
});