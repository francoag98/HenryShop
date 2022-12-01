const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'soyhenryshop@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
});

export const mailOptionsRegister = (mail: string, token: string) => {
  return {
    from: `Remitente`,
    to: mail,
    subject: `Confirma tu email`,
    text: `Confirma tu email:  ${process.env.CLIENT_URL}/users/confirmation/${token}`
  }
};

export const mailRefund = (purchase_id: string, product_name: string, buyer_name: string, reason: string, quantity: Number, customer_email:string) => {
  return {
    from: `Remitente`,
    to: "soyhenryshop@gmail.com",
    subject: `Formulario de devolución`,
    text: `Reconocidos usuarios devolviendo cosas:
      purchase_id: ${purchase_id}, 
      product_name: ${product_name},
      buyer_name: ${buyer_name},
      reason: ${reason},
      quantity:  ${quantity},
      email: ${customer_email}
    `
  }
};

