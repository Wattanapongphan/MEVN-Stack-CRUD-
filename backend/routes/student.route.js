const express = require('express');
const studentRoute = express.Router();

// Student model
let StudentModel = require('../models/Student');

// Get all data
studentRoute.route('/').get(async (req, res, next) => {
    try {
        const data = await StudentModel.find(); // ใช้ async/await
        res.json(data);
    } catch (error) {
        next(error); // ถ้ามีข้อผิดพลาดให้ส่งต่อไปที่ error handler
    }
});

// Create student data
studentRoute.route('/create-student').post(async (req, res, next) => {
    try {
        const data = await StudentModel.create(req.body); // ใช้ async/await
        res.json(data);
    } catch (error) {
        next(error); // ถ้ามีข้อผิดพลาดให้ส่งต่อไปที่ error handler
    }
});

// Edit student data
studentRoute.route('/edit-student/:id').get(async (req, res, next) => {
    try {
        const data = await StudentModel.findById(req.params.id); // ใช้ async/await
        if (!data) {
            return res.status(404).json({ msg: 'Student not found' }); // ถ้าไม่พบ student ให้ส่ง status 404
        }
        res.json(data);
    } catch (error) {
        next(error); // ถ้ามีข้อผิดพลาดให้ส่งต่อไปที่ error handler
    }
});

// Update student data
studentRoute.route('/update-student/:id').put(async (req, res, next) => {
    try {
        const data = await StudentModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // ใช้ async/await
        if (!data) {
            return res.status(404).json({ msg: 'Student not found' }); // ถ้าไม่พบ student ให้ส่ง status 404
        }
        res.json(data);
        console.log('Student successfully updated');
    } catch (error) {
        next(error); // ถ้ามีข้อผิดพลาดให้ส่งต่อไปที่ error handler
    }
});

// Delete student data
studentRoute.route('/delete-student/:id').delete(async (req, res, next) => {
    try {
        const data = await StudentModel.findByIdAndDelete(req.params.id); // ใช้ async/await
        if (!data) {
            return res.status(404).json({ msg: 'Student not found' }); // ถ้าไม่พบ student ให้ส่ง status 404
        }
        res.status(200).json({ msg: 'Student successfully deleted', data });
    } catch (error) {
        next(error); // ถ้ามีข้อผิดพลาดให้ส่งต่อไปที่ error handler
    }
});

module.exports = studentRoute;
