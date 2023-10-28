"use strict;";

const authValidator = require("./auth.validation");
const authModal = require("../auth/auth.modal");
const becryptService = require("../../services/bcrypt");
const jwtService = require("../../services/jwt/jwt.auth");
const axios = require("axios");

class authController {
  constructor() {}

  login = async (req, res, next) => {
    try {
      const { email, password } = await authValidator
        .loginSchema()
        .validateAsync(req.body);

      const [checkUserExist] = await authModal.getUserByEmail({ email });

      if (!checkUserExist) return next({ code: 404, message: "wrong email" });

      let matchPassword = await becryptService.matchPassword({
        password,
        hash: checkUserExist.password,
      });

      if (!matchPassword)
        return next({ code: 400, message: "Incorrect password" });

      const token = await jwtService.createToken({
        id: checkUserExist.id,
        email: checkUserExist.email,
        firstName: checkUserExist.first_name,
        lastName: checkUserExist.last_name,
      });

      return res.status(200).json({
        code: 200,
        data: {
          id: checkUserExist.id,
          email: checkUserExist.email,
          token: token,
        },
        message: "Login successfull",
      });
    } catch (e) {
      next(e);
    }
  };

  register = async (req, res, next) => {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password,
      } = await authValidator.registerSchema().validateAsync(req.body);

      let checkUserExist = await authModal.getUserByEmail({ email });

      if (checkUserExist.length)
        return next({ code: 409, message: "Email already exists" });

      const newPasword = await becryptService.encryptPassword(password);

      let registerUser = await authModal.registerUser({
        email,
        firstName,
        lastName,
        password: newPasword,
      });
      console.log({registerUser});
      if (!registerUser.affectedRows)
        return next({ code: 400, message: "Error occurred in inserting user" });

      return res.status(200).json({
        code: 201,
        data: {
          id: registerUser.insertId,
          email: email,
        },
        message: "user registered successfully",
      });
    } catch (e) {
      next(e);
    }
  };

  // testApi = async (req,res,next) => {
  //     try{
  //       let data = []; 
  //       const payload = {"ad_title":"","ad_id":"CwxquWx34gl-K","ad_url":"https://www.instagram.com/p/CwxquWx34gl-K","call_to_action":"Contact Us","news_feed_description":"Boost your Influencer Marketing campaign with our experts who are experienced in executing over 5,000 campaigns for over 1,200 brands. \n\nContact us to get a free consultation","image_video_url":"https://scontent.cdninstagram.com/v/t51.2885-15/373696494_3675411449450318_4288928506485900548_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi43MjB4NzIwLnNkciJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=102&_nc_ohc=RI_jLh_KnX4AX8UCN0c&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzE4NDUxNDMxNTAyOTk5NTQwMg%3D%3D.2-ccb7-5&oh=00_AfD6UmNsYLcZ-dNXgDu0MWAtODol7Ct1uyGqudVE_7dXYg&oe=6523506A&_nc_sid=10d13b","post_owner_image":"https://scontent.cdninstagram.com/v/t51.2885-19/340838127_1365569847349613_862320616035793298_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=wGIFsHPouDsAX9HNmDl&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfApXfWDD_EidQj6r_Sv5iFWp_NlRqw1kLoR4ca9IsqwbA&oe=652321B6&_nc_sid=10d13b","post_owner":"The Good Creator Co.","post_date":"1693843710","destination_url":"https://www.facebook.com/ads/ig_redirect/?d=Ad-baWg7m2HkdbJZkqQB9eEbUkge4GqJ9DVMdaOotK32P3TkaVRm0p6EjGH4Pfo29u31UOLT4LvJ-xBvAwVPFgj-1ig1OczcHV9nLyIXrPlkK2jm4Dp5FoGvMByW__kHH3tkAZ32tNSb5o9TJmDa5li1B6QJKZ8TQ7PYBnCiO9xdzQhCbVLoB_iZ5IwNmidn2g_876WVIw4SzBnT3CPwIDFLVrJC7piPF0bF1aPEySYwQVAzkq2tBGsbdWM06BvBnnYtH7IH8qy5vs2vi_EN9N5EF4aO-zKikIKDf36QVxo7wtQiJC80M8MW4M3es5NM_GUWlRecgP27Q8l88XX6wUw-xj2OnQeGFwywBMiGOrAhgEFPCxwG1QN__295_NlerI-L1xgn1Lpl_93UBDf1toxaCYKDBzgaVllBHrmEydD480wAgZt5DToab6GJQb9kHpuJlX2HkBtKuka78k9meyg3QlnDsn_Qx8lSSPkRsDtk_QC6EEatXzt-WDjM80jVFrIu3SPP35KpD_V8HyGyaw3e8VCQZrOtJh7muyjJxYXfeBw7jr8hkyYT0ySpu6wlMGo&a=1&hash=Ad-I4leNphlKvDgRrxw","comment":9,"likes":532,"type":"IMAGE","share":0,"ad_position":"FEED","ad_type":0,"category":"","ad_text":"","other_multimedia":"","side_url":"Not implemented yet","first_seen":"1696492496679","last_seen":"1696492496679","lower_age":"18","upper_age":"30","version":"3.1.2","platform":"3","source":"desktop","country":"India","city":"Bengaluru","state":"Karnataka","instagram_id":"52352488896"}
  //      for (let i = 0; i < 10; i++){
  //       let result = await axios.post("https://instagram-dev.poweradspy.com/instaAdsData",
  //       payload,
  //        {
  //        headers: {
  //         'Content-Type': 'application/json',
  //       },});
  //        data.push(result.data);
  //     }
  //       return res.status(200).json({
  //         code : 200,
  //         data: data,
  //         updated_count : data.length
  //       })
  //     }catch(e){
  //       next(e);
  //     }
  // }
  
  
}

module.exports = new authController();
