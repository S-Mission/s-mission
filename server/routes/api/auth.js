const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../../middleware/auth');
const config = require('../../config/index');

const { JWT_SECRET } = config;
const { User } = require('../../models/user');

const router = express.Router();

// LOGIN / POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res.status(400).json({ msg: '비밀번호를 작성해주세요.' });

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: '이메일을 확인해주세요.' });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: '비밀번호를 확인해주세요.' });

      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) return res.status(400).json({ err });

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        },
      );
    });
  });
});

// GOOGLE LOGIN / POST
router.post('/google', (req, res) => {
  const { email, name, tokenId } = req.body;

  if (tokenId) {
    User.findOne({ email }).then((user) => {
      if (!user) {
        const newUser = new User({
          name,
          email,
          password: Math.random().toString(36).slice(-8),
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return res.status(400).json({ err });

            newUser.password = hash;

            newUser.save().then((user) => {
              jwt.sign(
                { id: user.id },
                JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) return res.status(400).json({ err });

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                    },
                  });
                },
              );
            });
          });
        });
      } else {
        jwt.sign(
          { id: user.id },
          JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) return res.status(400).json({ err });

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          },
        );
      }
    });
  }
});

// LOGOUT / POST
router.post('/logout', (req, res) => {
  res.json('LOGOUT SUCCESS');
});

// Authentication / GET
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: '유저가 존재하지 않습니다.' });
    }

    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
