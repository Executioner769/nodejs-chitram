const Customer = require("../models/customer");
const asyncMiddleware = require("../middleware/async");

exports.getCustomers = asyncMiddleware(async (req, res, next) => {
    const customers = await Customer.find().sort("name");
    res.status(200).send({
        customers,
    });
});

exports.getCustomer = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    res.status(200).send({
        customer,
    });
});

exports.createCustomer = asyncMiddleware(async (req, res, next) => {
    const customer = new Customer({
        ...req.body,
    });
    await customer.save();
    res.status(201).send({
        customer,
    });
});

exports.updateCustomer = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!customer) return res.status(404).send("Customer not found");
    res.status(200).send({
        customer,
    });
});

exports.deleteCustomer = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    res.status(200).send({
        customer,
    });
});
