const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const User =require('./models/User.js')
const Place = require ('./models/Place.js')
const Payment = require ('./models/Payment.js');
const cookieParser = require('cookie-parser');
const imageDownloader =require('image-downloader');
const path = require('path'); 
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const {cloudinary} = require('./utils/cloudinary.js');
const axios = require('axios');


require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'faSdjf55Af1ksd88vnlaDsjd';

app.use(express.json());
app.use(cookieParser());

// Enable CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
  next();
});

//compressing the file
app.use(compression());

// Set the maximum payload size to 50 megabytes (adjust as needed)
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)

app.post('/register', async(req,res)=>{
    const {name,email,password}= req.body;
    try{   
        const userDoc= await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
} catch(e){
    res.status(422).json(e);
}

});

app.post('/login', async (req,res)=>{
    const {email,password}= req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password)
        if (passOk){
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
                }, jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            })
            
        }else {
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found')
    }
})

app.get('/profile', (req,res)=>{
    const {token}= req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            const {name,email,_id}= await User.findById(userData.id);
        res.json({name,email,_id});
        })
    }else{
        res.json(null)
    }
    
});

app.post('/logout', (req,res)=>{
    res.cookie('token','').json(true);
})

//upload image by link
app.post('/upload-by-link', async (req, res) => {
  try {
    let { link } = req.body;
    
    
    
    // // Check if the link starts with 'http://' or 'https://', and prepend 'http://' if it doesn't
    // if (!link.startsWith('http://') && !link.startsWith('https://')) {
    //   link = 'http://' + link;
    // }

    
    
    const fileExtension = path.extname(link); // Extract the file extension from the URL

    // Generate a new name for the file
    const newName = 'photo' + Date.now() + fileExtension;

    const uploadedResponse = await cloudinary.uploader.upload(link, {
      public_id: newName,
      upload_preset: 'dev_setups'
    })
    

    res.json(uploadedResponse.secure_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload the image' });
  }
});


  app.post('/places',(req,res)=>{
    const {token}= req.cookies;
    const {title,address,category,addedPhotos,description,contactCode, contact, email, perks,extraInfo,website,youtube, latitude, longitude, currency, price}= req.body; 
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
      if(err) throw err;
     const placeDoc=  await Place.create({
        owner:userData.id,
        title,address,category,photos:addedPhotos,
        description, contactCode, contact, email, perks,extraInfo,website, youtube, latitude, longitude, currency, price
  });
      res.json(placeDoc);
    })
  })

  
  app.get('/user-places',(req,res)=>{
    const {token}= req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
      const {id} = userData;
      res.json(await Place.find({owner:id}))
    });
  })

  app.get('/places/:id', async (req,res)=>{
    const {id} = req.params
    res.json(await Place.findById(id));
  });

  app.put('/places',async (req,res)=>{
    const {token}= req.cookies;
    const {id,title,address,category,addedPhotos,
      description, contactCode, contact, email, perks,
      extraInfo,website,youtube, latitude, longitude, currency, price}= 
      req.body;
      jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
          placeDoc.set({
            title,address,category,photos:addedPhotos,
            description, contactCode, contact, email, perks,extraInfo, website,youtube, latitude, longitude, currency, price
          })
          await placeDoc.save();
          res.json('ok');
        }
      });
  })

  app.post('/get-public-id', async (req, res) => {
    const { publicId } = req.body;
    
    cloudinary.api.delete_resources([publicId], {type: 'upload', resource_type: 'image'}).then(
      console.log("Image Deleted")
    );

    res.status(200);
    

  });

  // DELETE the listing property
app.delete('/places/:id', async (req, res) => {
  const placeId = req.params.id;

  try {
    // Replace this with your actual logic to delete the place from the database
    // For example, using Mongoose:
    const deletedPlace = await Place.findByIdAndDelete(placeId);
    
    // If the place is not found, return a 404 response
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found.' });
    }

    // If the place is successfully deleted, send a 204 No Content response
    return res.status(204).end();
  } catch (error) {
    // If any error occurs during the deletion process, return a 500 response
    return res.status(500).json({ message: 'Error deleting place.', error: error.message });
  }
});

  app.get('/places', async (req,res)=>{
    res.json( await Place.find())
  })

  // app.get("/token",(req,res)=>{
  //   generateToken()
  // })

  // middleware to generate token
  const generateToken = async (req,res,next)=>{
    const secret= process.env.M_SECRET_KEY;
    const consumer = process.env.M_CONSUMER_KEY;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString('base64')

    await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        authorization: `Basic ${auth}`,
      }
    }).then((response)=>{
      // console.log(response.data.access_token)
      token = response.data.access_token;
      next();
    }).catch((err)=>{
      console.log(err);
    })
  }

  app.post('/stk', generateToken, async (req, res) => {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;

    const date = new Date();
    const timestamp = date .getFullYear() + 
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

    const shortcode = process.env.M_PAYBILL;
    const passkey = process.env.PASSKEY;
    const password= new Buffer.from(shortcode + passkey +timestamp).toString('base64')
    
    await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortcode,
        PhoneNumber: `254${phone}`,
        CallBackURL: "https://d469-197-136-156-40.ngrok-free.app/callback",
        AccountReference: "ONA PROPERTIES",
        TransactionDesc: "Test"
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }
    ).then((response)=>{
      // console.log(response.data)
      res.status(200).json(response.data)
    }).catch((err)=>{
      console.log(err.message)
      res.status(400).json(err.message)
    })
  });
  
  app.post("/callback", (req,res)=>{
    const callbackData = req.body;
    console.log(callbackData)
    if(!callbackData.Body.stkCallback.CallbackMetadata){
      console.log(callbackData)
      res.json("OK")
    }
    console.log(callbackData.Body.stkCallback.CallbackMetadata)

    const phone=callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value
    const amount= callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const trnx_id=callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;

    console.log({phone, amount,trnx_id})

    const payment = Payment();

    payment.number =phone;
    payment.amount =amount;
    payment.trnx_id =trnx_id;
    
    payment.save().then((data)=>{
      console.log({message:"saved the data", data})
    }).catch((err)=>{
      console.log(err.message)
    })
  })

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });