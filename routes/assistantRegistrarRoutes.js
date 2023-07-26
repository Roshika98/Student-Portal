const express = require("express");
const wrapper = require("./asyncWrappers/asstWrapper");
const catchAsync = require("../utils/error/catchAsync");
const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Assistant Registrar
 *  description: APIs for assistant registrar user
 */

router.get("/upload", (req, res) => {
	res.send(`
    <h2>With <code>"express"</code> npm package file upload test</h2>
    <form action="/student-portal/employee/registrar/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

router.post("/upload", catchAsync(wrapper.uploadfile));


/**
 * @swagger
 * /student-portal/employee/registrar/create-resource/undergraduate:
 *  post:
 *   tags: [Assistant Registrar]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new undergraduate resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/undergrad'
 *   responses:
 *    200:
 *     description: Resource created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/resource'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/servererror'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/unauthorized'
 */
router.post(
	"/create-resource/undergraduate",
	catchAsync(wrapper.createUndergraduate)
);

/**
 * @swagger
 * /student-portal/employee/registrar/create-resource/undergradResult:
 *  post:
 *   tags: [Assistant Registrar]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new undergraduate Result resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UGResult'
 *   responses:
 *    200:
 *     description: Resource created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/resource'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/servererror'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/unauthorized'
 */
router.post(
	"/create-resource/undergradResult",
	catchAsync(wrapper.createResult)
);

module.exports = router;
