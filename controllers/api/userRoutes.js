const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {

  let userData;

  try {
    userData = await User.findOne({ where: { email: req.body.email } });
  } catch (err) {
    res.status(500).json({ message: "Failed to log in." });
    return;
  }

  const passwordIsCorrect = bcrypt.compareSync(
    req.body.password, userData.password);
    //userData.password should be an encrypted string
  
  if (!passwordIsCorrect) {
    res.status(500).json({message: "Failed to log in."});
    return;
  }
   
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
  });

  res.status(200).json({ message: "You are now logged in!" });
  });

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    
  }
});


router.post("/signup", async (req, res) => {
  let userExists;

  try {
    userExists = await User.findOne({
      where: { email: req.body.email, username: req.body.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify unique name.", error: error });
  }

  if (userExists) {
    res.status(409).json({ message: "Username and Email already taken." });
    return;
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const response = await User.create(req.body);

  res
    .status(200)
    .json({ message: "Account created! Please log in.", error: response });

  return;
});

module.exports = router;
