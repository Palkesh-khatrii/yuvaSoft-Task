
import User from '../models/user'
import {encryptPass,decryptPass}  from "../middleware/common"
import {createToken} from "../middleware/auth"
import Global  from "../helper/message"
import ExcelJS from 'exceljs';


export const register = async (req, res) => {
    console.log(req.file, "reqqqqqqqqqqqqqqqqq");
    const { username, email, password } = req.body;

    try {
        if (!username) {
            throw Global.message.FULL_NAME_REQ;
        }

        if (!email) {
            throw Global.message.EMAIL_REQR;
        }

        if (!password) {
            throw Global.message.PASSWORD;
        }

        const findUser = await User.findOne({ email: email });

        if (findUser !== null) {
            res.status(200).json({
                success: true,
                message: Global.message.ALREAY_CREATE,
            });
        } else {
            let myPass = encryptPass(password);
            let registerCustomers = new User({
                username: username,
                email: email,
                password: myPass,
                
            });

            let saveUser = await registerCustomers.save();
            res.status(201).json({
                success: true,
                data: saveUser,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error,
        });
    }
};


// login 
export const login = async (req, res) => {
    const { email, password, } = req.body
    try {
        const findUser = await User.findOne({ email: email })
        if (findUser && findUser !== null) {
            const checkPass = decryptPass(findUser.password)
            if (password == checkPass) {
                let token = createToken(findUser.email, findUser._id);
                res.status(200).json({
                    success: true,
                    data: findUser,
                    token: token
                })
            }
            else
                throw Global.message.PASSWORD_NOT_MATCH

        }
        else
            throw Global.message.CHECK_EMAIL_PASS


    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}
// Assuming you have 'exceljs' installed


