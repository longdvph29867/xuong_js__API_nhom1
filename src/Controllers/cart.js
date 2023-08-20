import Cart from "../models/Cart.js";

export const getAll = async (req, res) => {
    try {
      const cart = await Cart.find({user: req.params.id}).populate({
        path: 'items.product',
        select: '_id productName slug price image'
      });
      if (!cart && cart.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy sp",
        });
      }
      return res.status(200).json({
        message: "Lấy thành công!",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        name: error.message,
        message: "Lỗi trong quá trình lấy dữ liệu",
      });
    }
  };

export const create = async (req, res) => {
  try {
    // validate

    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({user: userId})
    if(!cart) {
        cart = new Cart({
            user: userId,
            items: [],
        });
    }
    // add data base
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if(existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({
            product: productId,
            quantity: quantity,
        })
    }
    const savedCart = await cart.save();
    if(!savedCart) {
      return res.status(404).json({
        message: 'Thêm thất bại'
      })
    }

    return res.status(200).json({
      message: "Thêm thành công",
      data: savedCart,
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productIdToRemove = req.body.productId;

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: productIdToRemove } } },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({
        message: "Không tìm thấy giỏ hàng hoặc sản phẩm trong giỏ hàng",
      });
    }


    return res.status(200).json({
      message: "Xoá thành công",
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};  

