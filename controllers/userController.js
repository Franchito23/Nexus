import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { createId } from "../helpers/tokens.js";

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar sesion'
    });
}


const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Crear cuenta'
    });
}


const register = async (req, res) =>{
    //VALIDACIÓN
    await check('name').notEmpty().withMessage('El nombre de usuario es obligatorio').run(req);
    await check('email').isEmail().withMessage('El correono es válido').run(req);
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe ser mínimo de 6 caracteres').run(req);
    let resultado = validationResult(req);

    //VERIFICACIÓN QUE RESULTADO ESTÉ VACIO
    if (!resultado.isEmpty()) {
        return res.render('auth/register', {
            page: 'Crear cuenta',
            errors: resultado.array(),
            user:{
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    //ACCEDEMOS A LOS VALORES QUE SE ENCUENTRAN EN EL BODY
    const { name, email, password } = req.body;

    //VALIDACIÓN PARA QUE NO EXISTAN DOS USUARIOS IGUALES
    const userExist = await User.findOne({ where: { email } })
    if (userExist) {
        return res.render('auth/register', {
            page: 'Crear cuenta',
            errors: [{msg: 'Oops, tu correo ya se encuentra registrado'}],
            user:{
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    //SE CREA EL INSERT EN LA BASE DE DATOS
    await User.create({
        name,
        email,
        password,
        token: createId()
    });

    //MENSAJE DE CONFIRMACIÓN
    res.render('templates/message',{
        page: 'Cuenta creada correctamente',
        message: 'Hemos enviado un mensaje de confirmación, da click en el enlace'
    })
}


const formResetPassword = (req, res) => {
    res.render('auth/resetPassword', {
        page: 'Cambio de contraseña'
    });
}

export{
    formLogin,
    formRegister,
    register,
    formResetPassword
}