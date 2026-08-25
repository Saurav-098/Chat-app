const userModel = require("../models/user.model");
const uploadOnCloudinary = require("../service/storage.service");

async function getCurrentUser(req, res) {
  try {
    return res.status(200).json({
      message: "User retrieved successfully",
      user: req.user,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Current user error: ${error.message}`,
    });
  }
}

// async function editProfile(req,res){
//   try {
//      console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     console.log("USER:", req.user);
//     const {name}= req.body
//     let image = req.user.image;
//     if(req.file){
//       image = await uploadOnCloudinary(req.file.path)
//     }

//     const user = await userModel.findByIdAndUpdate(req.user_Id,{
//       name,
//       image
//     })

//     if(!user){
//       return res.status(400).json({
//         message: "User not found"
//       })
//     }

//     return res.status(200).json(user)
//   } catch (error) {
//     return res.status(500).json({
//       message: `Profile error: ${error.message}`,
//     });
//   }
// }
async function editProfile(req, res) {
  try {

    const { name } = req.body;

    let image = req.user.image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name,
        image
      },
      {
        new: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {

    return res.status(500).json({
      message: `Profile error: ${error.message}`
    });
  }
}

async function getOtherUser(req,res){
  try {
    let users = await userModel.find({
      _id:{$ne:req.user._id}
    }).select("-password")
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message: `get other users error ${error}`})
  }
}

async function search(req,res){
  try {
    const{query} = req.query
    if(!query){
      return res.status(400).json({
        message: "query is required"
      })
    }
    const users = await userModel.find({
      $or:[
        {name:{$regex:query,$options:"i"}},
        {username:{$regex:query,$options:"i"}},
      ]
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({
      message:`Search users errr: ${error}`
    })
  }
}

module.exports = {getCurrentUser,editProfile,getOtherUser,search};


