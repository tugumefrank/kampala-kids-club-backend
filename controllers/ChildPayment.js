import dotenv from "dotenv";
dotenv.config();
const url = "https://api.flutterwave.com/v3/charges?type=mobile_money_uganda";
// const url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/charge";
const token = process.env.FLW_SECRET_KEY;

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

const ChildPayment = async (req, res) => {
  const { mobileNumber, mobileNetwork } = req.body;
  const payload = {
    phone_number: mobileNumber,
    network: mobileNetwork,
    amount: 500,
    currency: "UGX",
    email: "frankholmez@gmail.com",
    tx_ref: tx_ref,
    meta: {
      ChildId: "123456789",
    },
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
export { ChildPayment };
