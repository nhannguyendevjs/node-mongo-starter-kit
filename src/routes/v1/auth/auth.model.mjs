import AccountsModel from '../../../models/accounts.model.mjs';
import UsersModel from '../../../models/users.model.mjs';
import * as AccountsSchema from '../../../schemas/accounts.schema.mjs';
import * as JwtSchema from '../../../schemas/jwt.schema.mjs';
import * as JWT from '../../../services/jwt/jwt.mjs';
import * as Crypto from '../../../utils/crypto/crypto.mjs';

const verifyAccessToken = async (req) => {
  try {
    const accessToken = req.headers.authorization;
    const { success, data, error } = await JWT.verifyAccessToken(accessToken);

    if (success) {
      const user = await UsersModel.findOne({ _id: data.payload.userId });

      return user.toObject({
        versionKey: false,
        transform: (_doc, ret) => {
          delete ret.accountId;
          return ret;
        },
      });
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const signUpAccount = async (req) => {
  try {
    const payload = req.body;
    const { success, error } = AccountsSchema.AccountSignUpSchema.safeParse(payload);

    if (success) {
      const account = { username: payload.username, password: Crypto.encrypt(payload.password).data };

      const accountId = (await AccountsModel.create(account))._id;

      const user = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        accountId,
      };

      const { _id } = await UsersModel.create(user);

      return { _id };
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const signInAccount = async (req) => {
  try {
    let hasError = false;

    const payload = req.body;
    const { success, error } = AccountsSchema.AccountSignInSchema.safeParse(payload);

    if (success) {
      const account = await AccountsModel.findOne({ username: payload.username });

      if (account) {
        const user = await UsersModel.findOne({ accountId: account._id });
        const password = Crypto.decrypt(account.password).data;

        if (password === payload.password) {
          const tokenPayload = {
            userId: user.id,
            username: account.username,
            password: account.password,
          };

          let accessToken = '';
          let refreshToken = '';

          // Generate new access token
          {
            const { success, data, error } = JWT.generateAccessToken(tokenPayload);
            if (success) {
              accessToken = data;
            } else {
              throw error;
            }
          }

          // Generate new refresh token
          {
            const { success, data, error } = JWT.generateRefreshToken(tokenPayload);
            if (success) {
              refreshToken = data;
            } else {
              throw error;
            }
          }

          return {
            accessToken,
            refreshToken,
            user: user.toObject({
              versionKey: false,
              transform: (_doc, ret) => {
                delete ret.accountId;
                return ret;
              },
            }),
          };
        } else {
          hasError = true;
        }
      } else {
        hasError = true;
      }

      if (hasError) {
        throw new Error('Invalid username or password.');
      }
    } else {
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const refreshAccessToken = async (req) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (refreshToken) {
      const { success, data, error } = await JWT.verifyRefreshToken(refreshToken);

      if (success) {
        let accessToken = '';
        let refreshToken = '';
        let { payload } = data;

        // Parse payload
        payload = JwtSchema.JwtSignPayloadSchema.parse(payload);

        // Generate new access token
        {
          const { success, data, error } = JWT.generateAccessToken(payload);
          if (success) {
            accessToken = data;
          } else {
            throw error;
          }
        }

        // Generate new refresh token
        {
          const { success, data, error } = JWT.generateRefreshToken(payload);
          if (success) {
            refreshToken = data;
          } else {
            throw error;
          }
        }

        return { accessToken, refreshToken };
      } else {
        throw error;
      }
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export { refreshAccessToken, signInAccount, signUpAccount, verifyAccessToken };
