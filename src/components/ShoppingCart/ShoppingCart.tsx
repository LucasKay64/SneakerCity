import { BoxContainer } from "../BoxContainer/BoxContainer";
import DropdownMenuMobile from "../DropdownMenuMobile/DropdownMenuMobile";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { FloatingActionButton } from "../FAB/FloatingActionButton";

import Backdrop from "../Backdrop/Backdrop";
import CrossIconWhite from "../../assets/icons/cross-icon-white.svg";
import { Button } from "../Button/Button";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import {
  selectIsCartOpen,
  toggleCartOpen,
} from "../../store/cartSlice/cartSlice";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const isCartOpen = useAppSelector(selectIsCartOpen);

  const handleToggleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  return (
    <>
      {/* hidden on lg display */}
      <DropdownMenuMobile isMenuOpen={isCartOpen}>
        <div className="px-4">
          <h1 className="text-2xl font-bold text-center">Cart</h1>
          <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
          <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
          <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
          <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />

          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">$300</p>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </DropdownMenuMobile>

      {isCartOpen && (
        <FloatingActionButton
          className="fixed 
            bottom-5 left-1/2 -translate-x-1/2
            lg:hidden
            z-40 "
          onClick={handleToggleCartOpen}
        >
          <img src={CrossIconWhite} alt="close cart icon" className="h-6 w-6" />
        </FloatingActionButton>
      )}

      {/* visible on lg display */}
      <BoxContainer
        className={`
            hidden lg:fixed md:top-navbar-md right-2 min-w-[33%] px-4 
            lg:grid transition-all duration-500 ease-in-out z-40
            ${
              isCartOpen
                ? "grid-rows-[1fr] py-2"
                : "grid-rows-[0fr] border-none"
            }
        `}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-scroll">
            <h1 className="text-2xl font-bold text-center">Cart</h1>
            <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
            <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
            <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
            <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
            <ShoppingCartItem name="Nike Air Force 1" price={100} size="7" />
          </div>
          <hr />
          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">$300</p>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </BoxContainer>

      <Backdrop isVisible={isCartOpen} onBackdropClick={handleToggleCartOpen} />
    </>
  );
};

export default ShoppingCart;
