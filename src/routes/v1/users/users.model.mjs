import { UserUpdatedSchema } from '../../../schemas/users.schema.mjs';
import UsersModel from '../../../models/users.model.mjs';

const getUsers = async (req) => {
  try {
    const query = req.body.query;
    const users = await UsersModel.find(query);

    return users.map((user) =>
      user.toObject({
        versionKey: false,
        transform: (_doc, ret) => {
          delete ret.accountId;
          return ret;
        },
      })
    );
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const readUser = async (req) => {
  try {
    const query = req.body.query;
    const user = await UsersModel.findOne(query);

    return user.toObject({
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret.accountId;
        return ret;
      },
    });
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const updateUser = async (req) => {
  try {
    const { query, data } = req.body;

    const { success, error } = UserUpdatedSchema.safeParse(data);

    if (success && query) {
      const user = await UsersModel.findOneAndUpdate(query, data);

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

const deleteUser = async (req) => {
  try {
    const query = req.body.query;
    const user = await UsersModel.findOneAndDelete(query);

    return user.toObject({
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret.accountId;
        return ret;
      },
    });
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export { deleteUser, getUsers, readUser, updateUser };
