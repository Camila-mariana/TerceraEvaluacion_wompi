import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import model from '../models/customer.js';
import { config } from '../../config.js';
const controller = {
    post: async (req, res) => {
        const {
            name, email, password, isVerified
        } = req.body;
        try {
            const exists = await model.findOne({ email });
            if (exists) {
                return res.status(400).json({
                    message: 'customer already exists'
                });
            }
            const hash = await bcryptjs.hash(password, 10);
            const random = crypto.randomBytes(3).toString('hex');
            const token = jsonwebtoken.sign({
                random, name, email, password: hash, isVerified
            }, config.jwt.secret, {
                expiresIn: '15m'
            });
            res.cookie('cookie', token, {
                maxAge: 15 * 60 * 1000
            });
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.email.email,
                    pass: config.email.password
                }
            });
            transport.sendMail({
                from: config.email.email,
                to: email,
                subject: 'Verificación de correo',
                text: `Para verificar use este código: ${random}. Expira en 15 minutos.`
            }, (error, info) => {
                if (error) return res.status(500).json({
                    message: 'error sending the email'
                });
                return res.status(200).json({
                    message: 'email sent'
                });
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: 'internal server error'
            });
        }
    },
    verify: async (req, res) => {
        try {
            const { code } = req.body;
            const decoded = jsonwebtoken.verify(req.cookies.cookie, config.jwt.secret);
            const {
                random, name, email, password, branch, isVerified
            } = decoded;
            if (code !== random) return res.status(400).json({
                message: 'invalid code'
            });
            const customer = new model({
                name, email, password, branch, isVerified: true
            });
            await customer.save();
            res.clearCookie('cookie');
            return res.status(200).json({
                message: 'customer saved'
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: 'internal server error'
            });
        }
    }
};

export default controller;