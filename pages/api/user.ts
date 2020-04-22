import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jwt-simple';
import query from '../../server/db';
import firebaseAdmin from '../../utils/firebase/admin';


const request = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let user;

    const { token } = req.cookies;

    if (token) {
      try {

        const { uid } = await firebaseAdmin.auth().verifySessionCookie(token, true);

        user = await query('select * from users where id = $1', [
          uid,
        ]);

        const { email, displayName } = await firebaseAdmin.auth().getUser(uid);

        return res.status(200).json({
          token,
          user: {
            username: displayName,
            email,
            units: user.rows[0].units
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(401).json({
          message: 'could not retrieve token',
        });
      }

    } else {
      return res.status(401).json({
        message: 'could not retrieve token',
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { token } = req.cookies;

      if (token) {
        const { sub } = await jwt.decode(token, process.env.JWT_SECRET);
        const deletedUser = await query('delete from users where id = $1', [sub]);
        const deletedRoutes = await query('delete from routes where user_id = $1', [sub]);

        return res.status(200).json({
          token,
          user: deletedUser.rows[0],
        });

      } else {
        return res.status(401).json({
          message: 'could not retrieve token',
        });
      }
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: 'error retrieving user',
      });
    }
  }
};

export default request;
