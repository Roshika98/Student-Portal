const swaggerJsDoc = require('swagger-jsdoc');

/**
 * @swagger 
 * components:
 *  securitySchemes:
 *   sessionAuth:
 *    type: apiKey
 *    in: cookie
 *    name: session_id
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
 *   unauthorized:
 *    type: object
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *      default: Unauthorized access
 *   user:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *     name:
 *      type: string
 *     id:
 *      type: string
 *     faculty:
 *      type: string
 *     email:
 *      type: string 
 *   servererror:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *      default: error occured on the server
 *   resource:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *      default: resource created successfully
 *   lecturer:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      default: Nimal Perera
 *     lecId: 
 *      type: string
 *      default: LEC00001
 *     deptName:
 *      type: string
 *      default: Department of Mathematical Sciences
 *     email:
 *      type: string
 *      default: nimal@wyb.ac.lk
 *     dob:
 *      type: string
 *      default: 1990/01/01
 *     password:
 *      type: string
 *      default: lec1234
 *     position:
 *      type: string
 *      default: senior lecturer  
 *   undergrad:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      default: Chimitha Bandara
 *     studentId: 
 *      type: string
 *      default: 182095   
 *     email:
 *      type: string
 *      default: chimitha@gmail.com
 *     dateOfBirth:
 *      type: string
 *      default: 1996/08/14
 *     enrolledDate:
 *      type: string
 *      default: 2019/02/07
 *     password:
 *      type: string
 *      default: ug1234
 *     batch:
 *      type: string
 *      default: 18
 *   course-module:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      default: Introduction to mathematics
 *     courseCode:
 *      type: string
 *      default: MATH1113
 *     yearOfStudy:
 *      type: string
 *      default: 1
 *     credits:
 *      type: string
 *      default: 3
 *     description:
 *      type: string
 *      default: Lorem ipsumkkkgkgkgkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgggggg
 *     department: 
 *      type: string
 *      default: Department of Mathematical Sciences
 *   degree:
 *    type: object
 *    properties:
 *     name: 
 *      type: string
 *      default: Bsc (joint major) Computing & Information Systems and Mathematics, Mathematical modelling & Statistics
 *     degreeCode:
 *      type: string
 *      default: 1B
 *     duration:
 *      type: string
 *      default: 4
 *     departments:
 *      type: array
 *      items: 
 *       type: string
 *      default:
 *       - Department of Computing & Information Systems
 *       - Department of Mathematical Sciences  
 *   yearOfStudy:
 *    type: object
 *    properties:
 *     year: 
 *      type: string
 *      default: 1
 *     mandotaryCourseModules:
 *      type: array
 *      items: 
 *       type: string
 *     optionalCourseModules:
 *      type: array
 *      items:
 *       type: string
 *     degree:
 *      type: string
 *   lecturerAssoc:
 *    type: object
 *    properties:
 *     lecturer:
 *      type: string
 *     courseModule:
 *      type: string  
 *   UGResult:
 *    type: object
 *    properties:
 *     undergraduate:
 *      type: string
 *     courseModule:
 *      type: string 
 */


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student-Portal",
      version: "1.0.0",
      description: "A Student portal system for WUSL",
    },
    servers: [
      {
        url: "https://13.233.106.142",
      },
      {
        url: "https://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js", "./configs/swaggerConfig.js"],
};

// const specs = swaggerJsDoc(options);

module.exports = { swaggerOptions };