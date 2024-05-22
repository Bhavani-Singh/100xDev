const z = require('zod');

const userNameValidation = z.object({
    username: z.string().email('')
})

const passwordValidation = z.object({ 
    password: z.string()
            .min(8, 'Password should be atleast 8 character long')
            .regex(/[A-Z]/, 'Password should contain atleast one upper case letter')
            .regex(/[a-z]/, 'Password should contain atleast one lowwer case letter')
            .regex(/[0-9]/, 'Password should contain atleast one numberic character')
            .regex(/[@$!%*?&#]/, 'Password should contain atleast one special character')
})

const userInformation = z.object({
    name: z.string().min(1),
    designation: z.string().min(1),
    interest: z.array(z.string().min(1)),
    twitter: z.string().min(1),
    linkedin: z.string().min(1)
})


module.exports = {
    userNameValidation,
    passwordValidation,
    userInformation
}

