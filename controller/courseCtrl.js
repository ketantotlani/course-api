const Course = require('../model/courseModel');

const courseCtrl = {
    getAll: async (req,res) => {
        try {
            let course = await Course.find({});
            if(!course)
                return res.status(400).json({ msg: "No Course found" })

                res.json({
                    length: course.length,
                    data: course
                })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getById: async (req,res) => {
        try {
            let course = await Course.findById({ _id: req.params.id });
            if(!course)
                return res.status(400).json({ msg: "No Course found" })

                res.json({course})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {
            const { title, fee, duration, details } = req.body;

            let course = await Course.findOne({ title })
                if(course)
                    return res.status(400).json({ msg: "Course already exists." })

            let newCourse = Course({
                title,fee,duration,details
            })

            await newCourse.save()

            // res.json({ data: newCourse });
            res.status(200).json({ msg: "Course created successfully" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            let { title, fee, duration, details } = req.body;

            let course = await Course.findById({ _id: req.params.id });
            if(!course)
                return res.status(400).json({ msg: "Course doesn't exists." })


            await Course.findByIdAndUpdate({_id : req.params.id}, {
                title,fee,duration,details
            })

            res.status(200).json({ msg: "Successfully Updated" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {

            let course = await Course.findById({ _id: req.params.id });
            if(!course)
                return res.status(400).json({ msg: "Course doesn't exists." })

            await Course.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json({ msg: "Course Successfully Deleted" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
};

module.exports = courseCtrl;