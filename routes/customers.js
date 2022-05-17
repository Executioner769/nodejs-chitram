const router = require("express").Router();
const auth = require("../middleware/auth");

const {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customers");

const { validateCustomer } = require("../middleware/validation");

// Routes for /api/customers
router
    .route("/")
    .get(getCustomers)
    .post(auth, validateCustomer, createCustomer);

// Routes for /api/customers/:id
router
    .route("/:id")
    .get(getCustomer)
    .put(auth, validateCustomer, updateCustomer)
    .delete(auth, deleteCustomer);

module.exports = router;
