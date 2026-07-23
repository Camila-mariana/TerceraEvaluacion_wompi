import ticketPurchasesModel from "../models/ticketPurchase.js"

const ticketPurchasesController = {}

ticketPurchasesController.getTicketPurchases = async (req, res) => {
    try {
        const purchases = await ticketPurchasesModel.find()
        .populate("customerId", "name email")

        return res.status(200).json(purchases)
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

ticketPurchasesController.insertTicketPurchase = async (req, res) => {
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus, transactionId} = req.body;

        const newPurchase = new ticketPurchasesModel({
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        })

        await newPurchase.save()

        res.status(200).json({message: "ticket purchase created"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

ticketPurchasesController.updateTicketPurchase = async (req, res) => {
    try {
        const {quantity, purchaseDate, total, paymentStatus, transactionId} = req.body;

        const updatedPurchase = await ticketPurchasesModel.findByIdAndUpdate(
            req.params.id,
            {quantity, purchaseDate, total, paymentStatus, transactionId},
            {new: true}
        )

        if(!updatedPurchase){
            return res.status(404).json({message: "purchase not found"})
        }

        return res.status(200).json({message: "ticket purchase updated"});

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

ticketPurchasesController.deleteTicketPurchase = async (req, res) => {
    try {
        const deletedPurchase = await ticketPurchasesModel.findByIdAndDelete(req.params.id)

        if(!deletedPurchase){
            return res.status(404).json({message: "purchase not found"})
        }

        return res.status(200).json({message: "ticket purchase deleted"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default ticketPurchasesController;
