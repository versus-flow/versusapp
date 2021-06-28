import Cart from "../../assets/cart.svg";

const PurchaseHistory = () => {
  return (
    <div className="bg-black-900 text-white py-12">
      <div class="container">
        <h3 class="font-black font-inktrap text-2xl">Purchase History</h3>
        <div class="mt-4">
          <div className="flex items-center mb-4">
            <Cart className="h-8 mr-2" />
            <span className="mr-6">May 14, 2021</span>
            <div class="bg-white h-12 mr-3 p-1 rounded-full shadow-lg w-12">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                class="h-full object-cover rounded-full w-full"
              />
            </div>
            <span>
              @kinger9999 purchased the item for{" "}
              <span className="font-bold">F100</span>
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
