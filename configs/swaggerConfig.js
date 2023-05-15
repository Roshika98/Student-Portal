const swaggerJsDoc = require('swagger-jsdoc');

/**
 * @swagger 
 * components:
 *  schemas:
 *   page:
 *    type: string
 *    example: '<html>HTML text</html>'
 *   userLogin:
 *    type: object
 *    required:
 *     - username
 *     - password
 *    properties:
 *     username:
 *      type: string
 *      default: 182097
 *     password:
 *      type: string
 *      default: user1234
 *   loginFail:
 *    type: object
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *      default: login failed - invalid credentials
 *   loginsuccess:
 *    type: object
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *      default: login successful
 */


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student-Portal",
            version: "1.0.0",
            description: "A Student portal system for WUSL"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./routes/*.js", "./configs/swaggerConfig.js"]
}

// const specs = swaggerJsDoc(options);

module.exports = { swaggerOptions };