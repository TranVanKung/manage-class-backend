const { db } = require("../service/db");
const { RESPONSE_CODE } = require("../constant");

const getAllClassController = async (req, res) => {
    const [rows, fields] = await db.promise().query("SELECT * FROM class");

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: "Get all class successful",
        data: rows
    });
};

const createClassController = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const numberOfStudent = req.body.numberOfStudent;

    if (id === undefined) {
        res.send({
            code: RESPONSE_CODE.INVALID_BODY,
            message: "@id can not be empty",
        });
    }

    const [rows, fields] = await db.promise().query("INSERT INTO class (id, name, numberOfStudent) values(?,?,?)",
        [id, name, numberOfStudent]);

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: "Create class successful",
        data: rows
    });
};

const updateClassController = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const numberOfStudent = req.body.numberOfStudent;

    if (id === undefined) {
        res.send({
            code: RESPONSE_CODE.INVALID_BODY,
            message: "@id can not be empty",
        });
    }

    const [rows, fields] = await db.promise().query(`UPDATE class set name = ?, numberOfStudent = ? where id = ?;`, [name, numberOfStudent, id]);

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: "Update class successful",
        data: rows
    });
};

const deleteClassController = async (req, res) => {
    const classdId = req.params.classdId;

    if (classdId === undefined) {
        res.send({
            code: RESPONSE_CODE.INVALID_BODY,
            message: "@classdId can not be empty",
        });
    }

    const [rows, fields] = await db.promise().query(`delete from class where id = (?);`,
        [classdId]);

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: "Delete class successful",
        data: rows
    });
};


module.exports = {
    getAllClassController,
    createClassController,
    updateClassController,
    deleteClassController
};