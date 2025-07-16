'use client'

import { AuthProvider } from '../context/AuthContext'
import { BrandProvider } from '../context/BrandContext'
import { SubCategoryProvider } from '../context/SubCategoryContext'
import { ProductProvider } from '../context/ProductContext'
import { HomePageProvider } from '../context/HomePageContext'
import {UserAuthProvider} from "../context/UserAuthContext"
import { CartProvider } from '../context/CartContext'
import ProtectedRouteUser from '../components/route/ProtectedRouteUser'
import { WishlistProvider } from '../context/WishlistContext'
import { LocationProvider } from '../context/LocationContext'
import { AddressProvider } from '../context/AddressContext'
import { PromoCodeProvider } from '../context/PromoCodeContext'
import { OrderProvider } from '../context/OrderContext'
import { BannerProvider } from '../context/BannerContext'
import { SettingPageProvider } from '../context/SettingPageContext'
import { PaymentProvider } from '../context/PaymentContext'
import { UserProvider } from '../context/UserContext'
import { CategoryProvider } from '../context/CategoryContext'
import { OrderAdminProvider } from '../context/OrderAdminContext'
export default function ClientProvider({ children }) {
  return (
    <OrderProvider>
      <AuthProvider>
        <BrandProvider>
          <SubCategoryProvider>
            <ProductProvider>
              <HomePageProvider>
                <UserAuthProvider>
                      <WishlistProvider>
                         <CartProvider>
                            <LocationProvider>
                              <AddressProvider>
                                <PromoCodeProvider>
                                  <BannerProvider>
                                    <SettingPageProvider>
                                      <PaymentProvider>
                                        <UserProvider>
                                          <CategoryProvider>
                                            <OrderAdminProvider>
                                              {children}

                                            </OrderAdminProvider>
                                            
                                            
                                          </CategoryProvider>
                                        </UserProvider>
                                      </PaymentProvider>
                                    </SettingPageProvider>
                                  </BannerProvider>
                                </PromoCodeProvider>
                              </AddressProvider>
                            </LocationProvider>
                         </CartProvider>
                      </WishlistProvider>
                </UserAuthProvider>
              </HomePageProvider>
            </ProductProvider>
          </SubCategoryProvider>
        </BrandProvider>
      </AuthProvider>
    </OrderProvider>
   
  )
}
