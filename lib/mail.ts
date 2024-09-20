import {Resend} from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Restablece la contraseña de este usuario",
        html: `<p>Click <a href="${resetLink}">Aqui</a> para restablecer la contraseña de este usuario.</p>`
    });
}


export const sendVerificationEmail =async (
    email: string, 
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm yur email",
        html: `<p>Click <a href="${confirmLink}">Here</a> to confirm email.</p>`
    });
};