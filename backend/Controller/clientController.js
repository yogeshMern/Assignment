const Client = require("../Modal/Client")

exports.createClient = async (req, res) => {
    try {
        const { name, lastname, email, mobilenumber, project } = req.body;

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ status: "fail", message: "Email already exists" });
        }

        const data = await Client.create({ name, lastname, email, mobilenumber, project });

        res.status(201).json({
            status: "success",
            message: "Task created Successfully",
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: "Internal Error!"
        });
    }
};

exports.getAllClient = async (req, res) => {
    try {
        const task = await Client.find();

        res.status(200).json({
            status: "success",
            message: "Panels retrieved successfully",
            data: task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: "Internal Error!"
        });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const updatedTask = await Client.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ status: "fail", message: "task not found" });
        }

        res.status(200).json({
            status: "success",
            message: "task updated successfully",
            data: updatedTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: "Internal Error!"
        });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTask = await Client.findByIdAndDelete(id);

        if (!deleteTask) {
            return res.status(404).json({ status: "fail", message: "Task not found" });
        }

        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: "Internal Error!"
        });
    }
};