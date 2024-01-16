import dotenv from "dotenv";
dotenv.config();
const url = "https://api.flutterwave.com/v3/charges?type=mobile_money_uganda";
const token = process.env.FLW_SECRET_KEY_TEST;

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
// Function to generate a random alphanumeric string
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const tx_ref = generateRandomString(10);

const testUsers = async (req, res) => {
  const { mobileNumber, mobileNetwork, email, price } = req.body;
  const payload = {
    phone_number: mobileNumber,
    network: mobileNetwork,
    amount: parseInt(price, 10),
    currency: "UGX",
    email: email,
    tx_ref: tx_ref,
    redirect_url: `${process.env.PUBLIC_SERVER_URL}/profile`,
  };
  try {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        // Send the Flutterwave API response back to the client
        res
          .json({
            flutterwaveResponse: data,
          })
          .status(201);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error and send an appropriate response to the client
        res.status(500).json({ message: "Error in Flutterwave API call" });
      });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    // Handle error and send an appropriate response to the client
    res.status(500).json({ message: "Internal server error" });
  }

  console.log(req.body);
  // } catch (error) {
  //   next(error);
  // }
};

const getUsers = async (req, res) => {
  try {
    // if (!req.body.email || !req.body.password) {
    //   res.status(400);
    //   throw new Error("faild");
    // }
    res
      .json({
        message: "success",
        email: "frank@gmail.com",
        password: "1234567",
      })
      .status(201);
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};

// decription: create users
// route: /users
// acess: /private
const createUsers = async (req, res, next) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.fullName ||
      !req.body.userName
    ) {
      res.status(400);
      throw new Error("faild");
    }
    res
      .json({
        message: "success",
        email: "frank@gmail.com",
        password: "1234567",
      })
      .status(201);
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};
// decription: update users
// route: /users
// acess: /private
const updateUsers = async (req, res) => {
  res.json({ message: "update user", phone: "0774671234" });
};
// decription: delete users
// route: /users
// acess: /private
const deleteUsers = async (req, res) => {
  res.json({ message: "delete user", phone: "0774671234" });
};
export { getUsers, createUsers, updateUsers, deleteUsers, testUsers };
