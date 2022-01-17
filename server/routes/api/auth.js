const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../../middleware/auth');
const config = require('../../config/index');

const nodemailer = require('nodemailer');
const ejs = require('ejs');

const { JWT_SECRET, NODEMAILER_USER, NODEMAILER_PASS } = config;
const { User } = require('../../models/user');
const { Post } = require('../../models/post');

const router = express.Router();

// LOGIN / POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ msg: '이메일을 작성해주세요.' });
  else if (!password)
    return res.status(400).json({ msg: '비밀번호를 작성해주세요.' });

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: '이메일을 확인해주세요.' });

    if (user.login_way === 'google')
      return res.status(400).json({ msg: '구글 아이디로 로그인 해주세요.' });

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
          login_way: 'google',
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

// CLOSE ACCOUNT / DELETE
router.delete('/closeaccount/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await Post.deleteMany({ creator: req.params.id });

    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});

// Check Email / POST
router.post('/password/email', (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: '이메일을 확인해주세요.' });

    if (user.login_way === 'google')
      return res
        .status(401)
        .json({ msg: '구글 계정은 비밀번호를 변경할 수 업습니다.' });

    return res
      .status(200)
      .json({ success: true, msg: '이메일이 인증되었습니다.' });
  });
});

// mail 인증
// 메일이 2번 보내지는데..
router.post('/mail', async (req, res) => {
  var authNum = Math.random().toString().substr(2, 6);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  var mailOptions = await transporter.sendMail({
    from: `S-Mission`,
    to: req.body.email,
    subject: '회원가입을 위한 인증번호를 입력해주세요.',
    text: authNum,
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log('Finish sending email : ' + info.response);
    res.send(authNum);
    transporter.close();
  });
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
